package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.*
import usrt.technospace.repository.ProductRepository
import usrt.technospace.services.PayService

@RestController
class PayController {

    @Autowired
    lateinit var productRepository: ProductRepository

    @Autowired
    lateinit var payService: PayService

    @Value("\${site.domain}")
    lateinit var siteDomain: String

    @RequestMapping(
            value = ["/generate-pay-link"],
            method = [RequestMethod.POST],
            produces = ["text/plain"]
            )
    @ResponseBody fun generatePayLink(@RequestBody productIds: List<Long>): String {
        val products = productRepository.findAllById(productIds)
        val bill = payService.createBillForProducts(products)
        return payService.generatePayLink(bill, "$siteDomain/pay-success")
    }

    @PostMapping("/pay-success")
    fun paySuccess(@RequestBody billResponse: Any) {
        val billId= payService.getBillIdFromResponse(billResponse)
        payService.updateBillStatus(billId)
    }
}