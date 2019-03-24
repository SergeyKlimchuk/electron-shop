package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import usrt.technospace.models.product.Product
import usrt.technospace.models.services.CartService

@RestController
class CartController {

    @Autowired
    lateinit var cartService: CartService

    @GetMapping("/cart")
    fun getProductsInUserCart(): List<Product>? {
        return cartService.getProductsInUserCart()
    }

    @PostMapping("/cart/{productId}")
    fun addProductInCart(@PathVariable productId: Long) {
        cartService.addProductInCart(productId)
    }

    @DeleteMapping("/cart/{productId}")
    fun removeFromCart(@PathVariable productId: Long) {
        cartService.removeFromCart(productId)
    }
}