package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController
import usrt.technospace.dto.PayRequest
import usrt.technospace.repository.ProductRepository
import usrt.technospace.services.PayService


@RestController
class PayController {

    @Autowired
    lateinit var productRepository: ProductRepository

    @Autowired
    lateinit var payService: PayService

    @PostMapping("/generate-pay-link")
    @ResponseBody fun generatePayLink(@RequestBody request: PayRequest): String {
        val products = productRepository.findAllById(request.productIds)
        val bill = payService.createBillForProducts(products)
        val payLink = payService.generatePayLink(bill, request.successUrl)
        return "\"$payLink\""
    }
}