package com.admin.digitearn

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.KeyEvent
import android.webkit.JavascriptInterface
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.ImageButton
import android.widget.Toast
import org.json.JSONObject

/**
 * Digit Earn Admin — self-contained admin app.
 *
 * Admin panel APK-এর ভেতরেই embedded (assets/admin/) — public website-তে
 * admin page থাকে না। Server action (approve/reject ইত্যাদি) Vercel API-তে
 * (https://digitearn.vercel.app/api/admin/panel) — token-verified।
 *
 * Firebase config: assets/firebase.json (user নিজে সেট করে —
 * Firebase Console → Project settings → Your apps → Web app-এর config)।
 */
class MainActivity : Activity() {

    private lateinit var web: WebView
    private var fbConfigJson: String = ""

    private val adminStartUrl = "file:///android_asset/admin/index.html"

    private val missingConfigHtml = """
        <html><body style="font-family:sans-serif;background:#fffbeb;padding:24px;color:#1f2937">
        <h2 style="color:#d97706">Digit Earn Admin</h2>
        <p><b>Firebase config পাওয়া যায়নি।</b></p>
        <p>APK build করার আগে <b>app/src/main/assets/firebase.json</b> ফাইলে
        আপনার Firebase project-এর web app config বসান:</p>
        <p><b>Firebase Console → Project settings → Your apps → (Web app) →
        SDK setup and configuration</b> — সেখানকার <code>firebaseConfig</code>-এর
        ৬টা value (apiKey, authDomain, projectId, storageBucket,
        messagingSenderId, appId) firebase.json-এ বসিয়ে আবার build করুন।</p>
        <p style="color:#dc2626">⚠️ Service account-এর private key JSON এখানে দেবেন না —
        সেটা শুধু server-এ থাকবে।</p>
        </body></html>
    """.trimIndent()

    /**
     * Panel-এর JS এই bridge থেকে config পড়ে — sync, page load-এর আগে/পরে যখনই
     * চায় তখনই পাওয়া যায়। (evaluateJavascript injection-এর চেয়ে নির্ভরযোগ্য।)
     * নিরাপত্তা: bridge শুধু web app-এর ৬টা public value দেয় — সেগুলো website-এর
     * bundle-এও আছে; service account key এখানে নেই (সেটা শুধু server-এ)।
     */
    private inner class ConfigBridge {
        @JavascriptInterface
        fun getFirebaseConfig(): String = fbConfigJson
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        web = findViewById(R.id.webview)

        // assets-এর firebase.json পড় + validate
        val raw = try { assets.open("firebase.json").bufferedReader().readText() } catch (e: Exception) { "" }
        val valid = try { JSONObject(raw).has("apiKey") } catch (e: Exception) { false }
        if (valid && !raw.contains("PASTE-YOUR")) {
            fbConfigJson = raw.trim()
        }

        web.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            cacheMode = WebSettings.LOAD_DEFAULT
            // local (file://) admin panel load + সেখান থেকে server API call-এর জন্য
            allowFileAccess = true
            allowFileAccessFromFileURLs = true
            allowUniversalAccessFromFileURLs = true
            mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
            // file:// page + localStorage → session টিকতে হলে দরকার
            databaseEnabled = true
        }
        // loadUrl-এর আগেই bridge যোগ করতে হবে (panel init-এর সময় এটা পড়ে)
        web.addJavascriptInterface(ConfigBridge(), "DigitEarnBridge")
        web.webViewClient = object : WebViewClient() {
            // ফallback injection: page-র script চলাশুরু হওয়ার আগে global-টা বসিয়ে দেওয়ার
            // চেষ্টা (bridge না থাকলে/পুরনো cache হলে কাজে লাগে)
            override fun onPageStarted(view: WebView?, url: String?, extra: android.graphics.Bitmap?) {
                super.onPageStarted(view, url, extra)
                if (fbConfigJson.isNotEmpty()) {
                    view?.evaluateJavascript("window.__DIGITEARN_FB_CONFIG__ = $fbConfigJson;", null)
                }
            }

            // BUGFIX: আগের version-এ injection শুধু onPageStarted-এ হতো — ওই মুহূর্তে
            // নতুন document-এর JS context তৈরি হয়নি, তাই script প্রায়ই আগের (blank)
            // page-এ চলে যেত → panel খালি config দিয়ে boot হয়ে "Firebase env variables
            // set নেই" দেখাত (আবার refresh দিলে কখনো চলত, কখনো না)। এখন bridge
            // প্রধান পথ, আর এটা guarantee দেয় যে load শেষ হওয়ার পরেও global বসে যাবে
            // (core.js config lazy-read করে — দেখুন src/admin/core.js)।
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                if (fbConfigJson.isNotEmpty()) {
                    view?.evaluateJavascript("window.__DIGITEARN_FB_CONFIG__ = $fbConfigJson;", null)
                }
            }

            // admin site-এর বাইরের link (telegram ইত্যাদি) → system browser
            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                val url = request?.url?.toString() ?: return false
                if (url.startsWith("http://") || url.startsWith("https://")) {
                    try {
                        startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
                    } catch (e: Exception) {
                        // Activity context নেওয়া হয় — view?.context nullable, Toast.makeText
                        // non-null Context চায় (nullable দিলে compile fail)
                        Toast.makeText(this@MainActivity, "Link খোলা যায়নি", Toast.LENGTH_SHORT).show()
                    }
                    return true
                }
                return false
            }
        }
        findViewById<ImageButton>(R.id.refreshBtn).setOnClickListener { web.reload() }

        if (fbConfigJson.isEmpty()) {
            Toast.makeText(this, "firebase.json set করুন — বিস্তারিত নিচে", Toast.LENGTH_LONG).show()
            web.loadDataWithBaseURL("file:///android_asset/admin/", missingConfigHtml, "text/html", "utf-8", null)
        } else if (savedInstanceState == null) {
            // BUGFIX: আগে loadUrl সর্বদাই চলত, তারপর onRestoreInstanceState-এ
            // restoreState → একই page দুবার load হতো (login state flash/loss)।
            web.loadUrl(adminStartUrl)
        }
    }

    // Phone back button → web-এ পেছনে যাবে (সব পেছনে গেলে app বন্ধ)
    override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
        if (keyCode == KeyEvent.KEYCODE_BACK && web.canGoBack()) {
            web.goBack()
            return true
        }
        return super.onKeyDown(keyCode, event)
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        web.saveState(outState)
    }

    override fun onRestoreInstanceState(savedInstanceState: Bundle) {
        super.onRestoreInstanceState(savedInstanceState)
        web.restoreState(savedInstanceState)
        // restore কিছু দিলে না (system WebView state ফেলে দিয়েছে) → নিজে load করি
        if (web.url == null && fbConfigJson.isNotEmpty()) web.loadUrl(adminStartUrl)
    }

    override fun onDestroy() {
        web.destroy()
        super.onDestroy()
    }
}
