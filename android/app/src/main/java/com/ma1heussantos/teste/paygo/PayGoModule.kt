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
        paymentMode: String,
        posId: String,
        promise: Promise
    ) {

        val activity = currentActivity ?: run {
            promise.reject("NO_ACTIVITY", "Nenhuma Activity ativa.")
            return
        }

        pendingPromise = promise

        // ----------------------------
        // 🔵 Monta a URI de TRANSAÇÃO
        // ----------------------------
        val uriString = buildString {
            append("app://payment/input?")
            append("operation=VENDA")
            append("&transactionId=1")
            append("&amount=$valorCentavos")
            append("&currencyCode=986")
            append("&provider=DEMO")
            append("&cardType=$paymentMode")
            append("&finType=A_VISTA")
            append("&paymentMode=PAGAMENTO_CARTAO")
            append("&installments=1")
            append("&posId=$posId")
        }

        val uri = Uri.parse(uriString)

        // ----------------------------
        // 🔵 Monta Dados Automação
        // ----------------------------
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

        val personalizacao = Bundle()

        // ----------------------------
        // 🔵 Dispara a Intent PayGo
        // ----------------------------
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

    // --------------------------------------------------------------------
    // 🔵 Aqui recebemos a resposta PayGo via esquema URI app://payment/output?
    // --------------------------------------------------------------------
    override fun onNewIntent(intent: Intent?) {
        val promise = pendingPromise ?: return

        val data = intent?.data
        if (data != null) {
            val result = Arguments.createMap()
            val query = data.query ?: ""

            // converte "key=value" para Map
            query.split("&").forEach { param ->
                val parts = param.split("=")
                if (parts.size == 2) {
                    result.putString(parts[0], parts[1])
                }
            }

            pendingPromise = null
            promise.resolve(result)
        }
    }

    // Não usado pelo PayGo, mas deve existir
    override fun onActivityResult(
        activity: Activity?,
        requestCode: Int,
        resultCode: Int,
        data: Intent?
    ) {}
}
