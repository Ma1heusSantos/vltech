package com.ma1heussantos.teste.paygo

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule

class PayGoReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        val reactContext = PayGoReactContextHolder.reactContext ?: return

        val map = Arguments.createMap()

        intent.extras?.keySet()?.forEach { key ->
            map.putString(key, intent.extras?.get(key).toString())
        }

        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("PayGoResultado", map)
    }
}
