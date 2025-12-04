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
    fun iniciarTransacao(
        valorCentavos: String,
        posId: String,
        promise: Promise
    ) {

        val activity = currentActivity ?: run {
            promise.reject("NO_ACTIVITY", "Nenhuma Activity ativa.")
            return
        }

        pendingPromise = promise

        // === URI COMPLETA E CORRETA ===
        val uriString = buildString {
            append("app://payment/input?")
            append("operation=VENDA")
            append("&transactionId=1")
            append("&amount=$valorCentavos")
            append("&currencyCode=986")
            append("&provider=DEMO")
            append("&cardType=CARTAO_CREDITO")
            append("&finType=A_VISTA")
            append("&paymentMode=PAGAMENTO_CARTAO")
            append("&installments=1")
            append("&posId=$posId")
        }

        val uri = Uri.parse(uriString)

        // === DADOS DA AUTOMAÇÃO — OBRIGATÓRIOS ===

          val dadosAutomacao = buildString {
            append("app://payment/posData?")
            append("posDeveloper=VLTECH")
            append("&posName=VLTECH PDV")
            append("&posVersion=1.0.0")
            append("&allowCashback=false")
            append("&allowDiscount=false")
            append("&allowShortReceipt=true")
            append("&allowDifferentReceipts=true")
        }

        // === PERSONALIZAÇÃO — OPCIONAL ===
        val personalizacao = Bundle().apply {
            // Pode adicionar cores aqui no futuro
        }

        // === INTENT CORRETA ===
        val intent = Intent("br.com.setis.payment.TRANSACTION", uri).apply {
            putExtra("DadosAutomacao", dadosAutomacao)
            putExtra("Personalizacao", personalizacao)
            putExtra("package", reactContext.packageName)

            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_SINGLE_TOP
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
