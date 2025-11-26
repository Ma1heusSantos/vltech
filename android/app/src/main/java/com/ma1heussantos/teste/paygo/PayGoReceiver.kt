package com.ma1heussantos.teste.paygo

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.net.Uri
import com.facebook.react.modules.core.DeviceEventManagerModule

class PayGoReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {

        // ---- GARANTE QUE A URI NÃO É NULL ----
        val data = intent.data ?: return
        val uri: Uri = data

        // ---- Obtém o ReactContext corretamente ----
        val reactContext =
            (context.applicationContext as? com.ma1heussantos.teste.MainApplication)
                ?.reactNativeHost
                ?.reactInstanceManager
                ?.currentReactContext ?: return

        // ---- Faz o parse garantido (não-null) ----
        val map = PayGoIntentParser.parse(uri)

        // ---- Envia evento para o JS ----
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("PayGoEvent", map)
    }
}
