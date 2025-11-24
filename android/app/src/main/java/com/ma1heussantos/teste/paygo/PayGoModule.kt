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
    fun iniciarTransacao(valor: String, metodo: String, promise: Promise) {

        val activity = currentActivity ?: run {
            promise.reject("NO_ACTIVITY", "Nenhuma Activity ativa.")
            return
        }

        pendingPromise = promise

        // ------------------ URI PRINCIPAL DA TRANSAÇÃO ------------------
        val transacaoUri = Uri.parse(
            "app://payment/input?" +
                    "operation=VENDA" +
                    "&transactionId=12345" +
                    "&amount=$valor" +
                    "&currencyCode=986"
        )

        // ------------------ URI posData (OBRIGATÓRIA) ------------------
        val posDataUri = Uri.parse(
            "app://payment/posData?" +
                    "posName=VLTECH" +
                    "&posVersion=1.0.0" +
                    "&posDeveloper=Matheus" +
                    "&allowCashback=false" +
                    "&allowDiscount=false" +
                    "&allowShortReceipt=true" +
                    "&allowDifferentReceipts=true"
        )

        // Bundle com a URI (documentação exige)
        val posDataBundle = Bundle().apply {
            putString("uri", posDataUri.toString())
        }

        // ------------------ Personalização opcional ------------------
        val customUri = Uri.parse(
            "app://payment/posCustomization?" +
                    "fontColor=%23000000&screenBackgroundColor=%23FFFFFF"
        )

        val customBundle = Bundle().apply {
            putString("uri", customUri.toString())
        }

        // ------------------ MONTAR INTENT ------------------
        val intent = Intent("br.com.setis.payment.TRANSACTION", transacaoUri).apply {
            putExtra("DadosAutomacao", posDataBundle)
            putExtra("Personalizacao", customBundle)
            putExtra("package", reactContext.packageName)
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK)
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

        val map = Arguments.createMap()

        data?.extras?.keySet()?.forEach { key ->
            map.putString(key, data.extras?.get(key).toString())
        }

        promise.resolve(map)
    }
}
