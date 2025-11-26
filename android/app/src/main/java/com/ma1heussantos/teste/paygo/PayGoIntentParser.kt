package com.ma1heussantos.teste.paygo

import android.net.Uri
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap

object PayGoIntentParser {

    fun parse(uri: Uri): WritableMap {
        val map = Arguments.createMap()

        map.putString("scheme", uri.scheme)
        map.putString("host", uri.host)
        map.putString("path", uri.path)

        uri.queryParameterNames.forEach { key ->
            map.putString(key, uri.getQueryParameter(key))
        }

        return map
    }
}
