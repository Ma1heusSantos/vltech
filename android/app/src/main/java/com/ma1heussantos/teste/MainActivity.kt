package com.ma1heussantos.teste

import android.content.Intent
import com.facebook.react.ReactActivity

class MainActivity : ReactActivity() {

    override fun getMainComponentName(): String = "main"

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
    }
}
