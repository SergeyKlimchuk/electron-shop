package usrt.technospace.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import usrt.technospace.models.product.Product

@RestController("cart")
class CartController {
    @GetMapping("/")
    fun getProductsInCart(): Array<Product> {
        return getProductsInCart()
    }
}