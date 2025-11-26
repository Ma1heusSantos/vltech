package com.ma1heussantos.teste.paygo

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import com.facebook.react.bridge.*

class PayGoModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), ActivityEventListener {

    private var pendingPromise: Promise? = null

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getName() = "PayGo"

    @ReactMethod
    fun iniciarTransacao(valorCentavos: String, metodo: String, promise: Promise) {

        val activity = currentActivity ?: run {
            promise.reject("NO_ACTIVITY", "Nenhuma Activity ativa.")
            return
        }

        pendingPromise = promise

        val uri = Uri.parse(
            "app://payment/input?" +
                "currencyCode=986" +
                "&transactionId=1" +
                "&amount=$valorCentavos" +    // valor em centavos
                "&operation=VENDA"
        )

        val posData = Bundle().apply {
            putString("posDeveloper", "VLTECH")
            putString("posName", "VLTECH PDV")
            putString("posVersion", "1.0.0")
            putBoolean("allowCashback", false)
            putBoolean("allowDiscount", false)
            putBoolean("allowShortReceipt", true)
            putBoolean("allowDifferentReceipts", true)
        }

        val intent = Intent("br.com.setis.payment.TRANSACTION", uri).apply {
            putExtra("posData", posData)
            putExtra("package", reactContext.packageName)
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }

        try {
            activity.startActivity(intent)
        } catch (e: Exception) {
            pendingPromise?.reject("INTENT_ERROR", e.message)
            pendingPromise = null
        }
    }

    override fun onNewIntent(intent: Intent?) {}

    override fun onActivityResult(
        activity: Activity?,
        requestCode: Int,
        resultCode: Int,
        data: Intent?
    ) {
        val promise = pendingPromise ?: return
        pendingPromise = null

        val result = Arguments.createMap()

        data?.extras?.keySet()?.forEach { key ->
            result.putString(key, data.extras?.get(key).toString())
        }

        promise.resolve(result)
    }
}
