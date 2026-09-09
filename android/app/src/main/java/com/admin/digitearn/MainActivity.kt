package com.admin.digitearn

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.KeyEvent
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
        }
        web.webViewClient = object : WebViewClient() {
            // page-র script চলা আগেই config inject করি (core.js window-এ থেকে পড়ে)
            override fun onPageStarted(view: WebView?, url: String?, extra: android.graphics.Bitmap?) {
                super.onPageStarted(view, url, extra)
                if (fbConfigJson.isNotEmpty()) {
                    view?.evaluateJavascript("window.__DIGITEARN_FB_CONFIG__ = $fbConfigJson;", null)
                }
            }
            // admin site-এর বাইরের link (telegram ইত্যাদি) → system browser
            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                val url = request?.url?.toString() ?: return false
                if (url.startsWith("http://") || url.startsWith("https://")) {
                    startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
                    return true
                }
                return false
            }
        }
        findViewById<ImageButton>(R.id.refreshBtn).setOnClickListener { web.reload() }

        if (fbConfigJson.isEmpty()) {
            Toast.makeText(this, "firebase.json set করুন — বিস্তারিত নিচে", Toast.LENGTH_LONG).show()
            web.loadDataWithBaseURL("file:///android_asset/admin/", missingConfigHtml, "text/html", "utf-8", null)
        } else {
            web.loadUrl("file:///android_asset/admin/index.html")
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
    }

    override fun onDestroy() {
        web.destroy()
        super.onDestroy()
    }
}
