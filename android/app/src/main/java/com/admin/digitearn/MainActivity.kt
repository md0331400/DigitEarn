package com.admin.digitearn

import android.annotation.SuppressLint
import android.app.Activity
import android.app.AlertDialog
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.VibrationEffect
import android.os.Vibrator
import android.view.KeyEvent
import android.webkit.JavascriptInterface
import android.webkit.JsPromptResult
import android.webkit.JsResult
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.EditText
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

    /* কেন panel boot হয়নি — সেটা screen-এ লিখে দিই (আগে শুধু "config পাওয়া যায়নি"
       দেখাত, ব্যবহারকারী বোঝাই যেতে না যেতে ভুল ফাইলটাই বসিয়ে দিতেন — যেমন
       google-services.json (Android config) বসেছিল, web app config নয়)। */
    private var configError: String = ""

    private val missingConfigHtml: String
        get() = """
        <html><body style="font-family:sans-serif;background:#fffbeb;padding:24px;color:#1f2937">
        <h2 style="color:#d97706">Digit Earn Admin</h2>
        <p><b>Firebase config পাওয়া যায়নি।</b></p>
        ${if (configError.isEmpty()) "" else "<p style=\"color:#b45309\"><b>সমস্যা:</b> " + configError + "</p>"}
        <p>APK build করার আগে <b>app/src/main/assets/firebase.json</b> ফাইলে
        আপনার Firebase project-এর <b>web app</b> config বসান (৬টা field, ফ্ল্যাট JSON):</p>
        <pre style="background:#fff;border:1px solid #fde68a;border-radius:8px;padding:10px;font-size:12px">{
  "apiKey": "AIza...",
  "authDomain": "your-app.firebaseapp.com",
  "projectId": "your-app",
  "storageBucket": "your-app.firebasestorage.app",
  "messagingSenderId": "1234567890",
  "appId": "1:1234567890:web:abcdef"
}</pre>
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

        /**
         * Panel থেকে নোটিফিকেশন (যেমন: নতুন উইথড্র রিকোয়েস্ট)।
         * JS: window.DigitEarnBridge.notify(title, body)
         * POST_NOTIFICATIONS না থাকলে (Android 13+) শুধু Toast দেখানো হয় — crash নয়।
         */
        @JavascriptInterface
        fun notify(title: String?, body: String?) {
            val t = (title ?: "DigitEarn Admin").take(120)
            val b = (body ?: "").take(240)
            runOnUiThread { postNotification(t, b) }
        }
    }

    /* ---------- native notification + vibration (admin app) ---------- */
    private val notifyChannelId = "digitearn_admin_alerts"

    private fun notificationsAllowed(): Boolean {
        if (Build.VERSION.SDK_INT < 33) return true
        return checkSelfPermission(android.Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED
    }

    private fun postNotification(title: String, body: String) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val nmCh = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            if (nmCh.getNotificationChannel(notifyChannelId) == null) {
                nmCh.createNotificationChannel(
                    NotificationChannel(notifyChannelId, "অ্যাডমিন রিকোয়েস্ট", NotificationManager.IMPORTANCE_HIGH)
                )
            }
        }
        if (!notificationsAllowed()) {
            Toast.makeText(this, title, Toast.LENGTH_LONG).show()
            tryVibrate()
            return
        }
        val intent = Intent(this, MainActivity::class.java)
        val flags = if (Build.VERSION.SDK_INT >= 23) PendingIntent.FLAG_IMMUTABLE else 0
        val pi = PendingIntent.getActivity(this, 0, intent, flags)
        val builder = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
            Notification.Builder(this, notifyChannelId) else Notification.Builder(this)
        val n = builder
            .setContentTitle(title)
            .setContentText(body)
            .setStyle(Notification.BigTextStyle().bigText(body))
            .setSmallIcon(R.mipmap.ic_launcher)
            .setAutoCancel(true)
            .setContentIntent(pi)
            .build()
        val nm = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        nm.notify(7701, n)
        tryVibrate()
    }

    private fun tryVibrate() {
        try {
            val v = getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator ?: return
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                v.vibrate(VibrationEffect.createOneShot(220, VibrationEffect.DEFAULT_AMPLITUDE))
            } else {
                @Suppress("DEPRECATION")
                v.vibrate(220)
            }
        } catch (_: Exception) {
        }
    }

    /*
     * BUGFIX (admin app): WebChromeClient না থাকলে WebView-এর alert()/confirm()/prompt()
     * কিছুই দেখায় না — confirm() সরাসরি false, prompt() সরাসরি null ফেরায়। মানে APK-তে
     * "অনুমোদন/বাতিল" প্রতিটা confirm-gated action চুপচাপ বাতিল হয়ে যাচ্ছিল।
     * এখন platform AlertDialog দিয়ে তিনটাই আসল ডায়ালগ।
     */
    private fun installJsDialogs() {
        web.webChromeClient = object : WebChromeClient() {
            override fun onJsAlert(view: WebView?, url: String?, message: String?, result: JsResult?): Boolean {
                AlertDialog.Builder(this@MainActivity)
                    .setTitle("DigitEarn Admin")
                    .setMessage(message ?: "")
                    .setPositiveButton("ঠিক আছে") { _, _ -> result?.confirm() }
                    .setOnCancelListener { result?.cancel() }
                    .show()
                return true
            }

            override fun onJsConfirm(view: WebView?, url: String?, message: String?, result: JsResult?): Boolean {
                AlertDialog.Builder(this@MainActivity)
                    .setMessage(message ?: "")
                    .setPositiveButton("হ্যাঁ") { _, _ -> result?.confirm() }
                    .setNegativeButton("না") { _, _ -> result?.cancel() }
                    .setOnCancelListener { result?.cancel() }
                    .show()
                return true
            }

            override fun onJsPrompt(
                view: WebView?, url: String?, message: String?, defaultValue: String?, result: JsPromptResult?
            ): Boolean {
                val input = EditText(this@MainActivity)
                input.setText(defaultValue ?: "")
                input.maxLines = 4
                AlertDialog.Builder(this@MainActivity)
                    .setTitle(message ?: "")
                    .setView(input)
                    .setPositiveButton("পাঠান") { _, _ -> result?.confirm(input.text.toString()) }
                    .setNegativeButton("বাতিল") { _, _ -> result?.cancel() }
                    .setOnCancelListener { result?.cancel() }
                    .show()
                return true
            }
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        web = findViewById(R.id.webview)

        // assets-এর firebase.json পড় + validate (Web app config-ই লাগে — Android/
        // google-services JSON-এর shape সম্পূর্ণ আলাদা, তাই সেটা paste করলে apiKey পাওয়া
        // যায় না আর panel চুপচাপ boot fail করত)
        val raw = try { assets.open("firebase.json").bufferedReader().readText() } catch (e: Exception) { "" }
        val cfg = try { JSONObject(raw) } catch (e: Exception) { null }
        val need = arrayOf("apiKey", "authDomain", "projectId", "appId")
        val missing = need.filter { cfg == null || cfg.optString(it).isNullOrEmpty() }
        if (cfg != null && missing.isEmpty() && !raw.contains("PASTE-YOUR")) {
            fbConfigJson = raw.trim()
        } else {
            configError = when {
                raw.isBlank() -> "assets/firebase.json ফাইলটা APK-তে নেই"
                cfg == null -> "firebase.json পড়া গেছে কিন্তু JSON parse হয়নি"
                cfg.has("project_info") || cfg.has("client") ->
                    "এটা google-services.json (Android config) — panel-কে Web app-এর firebaseConfig লাগে"
                else -> "firebase.json-এ এই field গুলো নেই: " + missing.joinToString(", ")
            }
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
        installJsDialogs()
        // Android 13+ → notification permission (না দিলেও app চলে, শুধু Toast দেখায়)
        if (Build.VERSION.SDK_INT >= 33 &&
            checkSelfPermission(android.Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED
        ) {
            try {
                requestPermissions(arrayOf(android.Manifest.permission.POST_NOTIFICATIONS), 51)
            } catch (_: Exception) {
            }
        }
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
            Toast.makeText(this, "firebase.json ঠিক নয় — বিস্তারিত নিচে", Toast.LENGTH_LONG).show()
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
