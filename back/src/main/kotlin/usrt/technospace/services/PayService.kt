package usrt.technospace.services

import com.qiwi.billpayments.sdk.client.BillPaymentClient
import com.qiwi.billpayments.sdk.client.BillPaymentClientFactory
import com.qiwi.billpayments.sdk.model.MoneyAmount
import com.qiwi.billpayments.sdk.model.`in`.PaymentInfo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.stereotype.Service
import usrt.technospace.models.payment.Bill
import usrt.technospace.models.product.Product
import usrt.technospace.repository.BillRepository
import java.math.BigDecimal
import java.util.*

@Service
class PayService {

    @Value("\${qiwi.secret}")
    var secret: String? = null

    @Value("\${qiwi.pub}")
    var pub: String? = null

    @Autowired
    lateinit var client: BillPaymentClient

    @Autowired
    lateinit var billRepository: BillRepository

    @Autowired
    lateinit var userService: UserService

    @Bean
    fun paymentClient(): BillPaymentClient {
        return BillPaymentClientFactory.createDefault(secret)
    }

    fun generatePayLink(bill: Bill, successUrl: String): String {
        if (bill.id == null) {
            throw Error("Could not use unsaved bill!")
        }

        val totalPrice = bill.products!!.sumBy { x -> x.price!! }
        val amount = MoneyAmount(
                BigDecimal.valueOf(totalPrice.toDouble()),
                Currency.getInstance("KZT")
        )
        return client.createPaymentForm(PaymentInfo(pub, amount, bill.externalBillId, successUrl))
    }

    fun createBillForProducts(products: List<Product>): Bill {
        val bill = Bill()
        bill.author = userService.getCurrentUser()
        bill.products = products
        bill.externalBillId = UUID.randomUUID().toString()
        return billRepository.save(bill)
    }
}