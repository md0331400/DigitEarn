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

/**
 * Digit Earn Admin — admin panel-এর native Android shell (WebView).
 *
 * App-এ site-এর same Vercel URL ব্যবহার হচ্ছে — শুধু /admin.html page,
 * যেখানে admin panel থাকে। সাইটের বাকি অংশ user-দের জন্য।
 */
class MainActivity : Activity() {

    // ================== ADMIN PANEL URL ==================
    private const val ADMIN_URL = "https://digitearn.vercel.app/admin.html"
    // ======================================================

    private lateinit var web: WebView

    private val setupHtml = """
        <html><body style="font-family:sans-serif;background:#fffbeb;padding:24px;color:#1f2937">
        <h2 style="color:#d97706">Digit Earn Admin</h2>
        <p><b>Admin URL set করা নেই।</b></p>
        <p>App-এর <b>MainActivity.kt</b> ফাইল খুলে <b>ADMIN_URL</b>-এ আপনার
        admin panel-এর Vercel URL দিন (যেমন: https://xyz.vercel.app), তারপর
        আবার Run করুন।</p>
        </body></html>
    """.trimIndent()

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        web = findViewById(R.id.webview)

        web.settings.apply {
            javaScriptEnabled = true            // Firebase web auth-এর জন্য লাগবে
            domStorageEnabled = true             // localStorage (session save)
            cacheMode = WebSettings.LOAD_DEFAULT
            allowFileAccess = false
            mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
        }
        web.webViewClient = object : WebViewClient() {
            // সব navigation এই WebView-এর ভেতরে (নতুন tab-এ না)
            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                val url = request?.url?.toString() ?: return false
                // admin site-এর বাইরে (telegram ইত্যাদি) → system browser-এ
                if (!url.startsWith(ADMIN_URL.trimEnd('/'))) {
                    startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
                    return true
                }
                return false
            }
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                findViewById<ImageButton>(R.id.refreshBtn).visibility = android.view.View.VISIBLE
            }
        }

        findViewById<ImageButton>(R.id.refreshBtn).setOnClickListener { web.reload() }

        if (ADMIN_URL.contains("YOUR-ADMIN-URL")) {
            web.loadDataWithBaseURL(null, setupHtml, "text/html", "utf-8", null)
        } else {
            web.loadUrl(ADMIN_URL)
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

    // memory save (session fresh রাখতে)
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
