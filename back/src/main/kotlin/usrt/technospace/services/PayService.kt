package usrt.technospace.services

import com.qiwi.billpayments.sdk.client.BillPaymentClient
import com.qiwi.billpayments.sdk.model.MoneyAmount
import com.qiwi.billpayments.sdk.model.`in`.CreateBillInfo
import com.qiwi.billpayments.sdk.model.`in`.Customer
import com.qiwi.billpayments.sdk.model.out.BillResponse
import org.apache.logging.log4j.util.Strings
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import usrt.technospace.models.payment.Bill
import usrt.technospace.models.payment.BillStatus
import usrt.technospace.models.product.Product
import usrt.technospace.repository.BillRepository
import java.math.BigDecimal
import java.time.ZonedDateTime
import java.util.*

@Service
class PayService {

    @Value("\${bill.await}")
    var billAwait: Long = 1

    @Value("\${bill.await}")
    var billCurrency: String = "RUB"

    @Autowired
    lateinit var client: BillPaymentClient

    @Autowired
    lateinit var billRepository: BillRepository

    @Autowired
    lateinit var userService: UserService

    fun generatePayLink(bill: Bill, successUrl: String): String {
        validateBill(bill)

        val totalPrice = bill.products!!.sumBy { x -> x.price!! }
        val amount = MoneyAmount(
                BigDecimal.valueOf(totalPrice.toDouble()),
                Currency.getInstance(billCurrency)
        )
        val productNames = Strings.join(bill.products!!.map { x -> x.name }, ',')
        val customer = Customer(bill.author!!.email, bill.author!!.id.toString(), bill.author!!.phoneNumber)
        val billExpireDate = ZonedDateTime.now().plusDays(billAwait)
        val billInfo = CreateBillInfo(bill.id.toString(), amount, productNames, billExpireDate, customer, successUrl)
        val externalBill = client.createBill(billInfo)
        return externalBill.payUrl
    }

    fun getBillIdFromResponse(response: Any): Long {
        if (response is BillResponse) {
            return response.billId.toLong()
        } else {
            throw Error("Response type is not allowed!")
        }
    }

    fun updateBillStatus(billId: Long): Bill {
        val externalBillInfo = client.getBillInfo(billId.toString())
        val billStatus = convertExternalBillStatusToLocal(externalBillInfo.status.value)
        val bill = billRepository.getOne(billId)
        bill.status = billStatus
        return billRepository.save(bill)
    }

    fun convertExternalBillStatusToLocal(status: com.qiwi.billpayments.sdk.model.BillStatus): BillStatus {
        return when(status) {
            com.qiwi.billpayments.sdk.model.BillStatus.EXPIRED -> BillStatus.EXPIRED
            com.qiwi.billpayments.sdk.model.BillStatus.PAID -> BillStatus.PAYED
            com.qiwi.billpayments.sdk.model.BillStatus.REJECTED -> BillStatus.REJECTED
            com.qiwi.billpayments.sdk.model.BillStatus.WAITING -> BillStatus.PENDING_PAY
        }
    }

    fun validateBill(bill: Bill) {
        if (bill.id == null) {
            throw Error("Could not use unsaved bill!")
        }
        if (bill.status.ordinal > BillStatus.PENDING_PAY.ordinal) {
            throw Error("Could not generate pay link for bill, because bill already paid!")
        }
        if (bill.products?.count() == 0) {
            throw Error("Bill could not contain 0 products!")
        }
    }

    fun createBillForProducts(products: List<Product>): Bill {
        val bill = Bill()
        bill.author = userService.getCurrentUser()
        bill.products = products
        return billRepository.save(bill)
    }
}