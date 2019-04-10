package usrt.technospace.config

import com.qiwi.billpayments.sdk.client.BillPaymentClient
import com.qiwi.billpayments.sdk.client.BillPaymentClientFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class QiwiConfiguration {

    @Value("\${qiwi.secret}")
    var secret: String? = null

    @Bean
    fun paymentClient(): BillPaymentClient {
        return BillPaymentClientFactory.createDefault(secret)
    }
}