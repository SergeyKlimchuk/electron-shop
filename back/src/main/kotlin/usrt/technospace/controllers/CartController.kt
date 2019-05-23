package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import usrt.technospace.dto.ProductDto
import usrt.technospace.services.CartService
import usrt.technospace.utils.ProductDtoConverter

@RestController
class CartController {

    @Autowired
    lateinit var cartService: CartService

    @Autowired
    lateinit var productDtoConverter: ProductDtoConverter

    @GetMapping("/cart")
    fun getProductsInUserCart(): List<ProductDto>? {
        return productDtoConverter.convert(cartService.getProductsInUserCart())
    }

    @GetMapping("/cart/check/{productId}")
    fun checkProductInFavorites(@PathVariable productId: Long): Boolean {
        return cartService.checkProductInFavorites(productId)
    }

    @PostMapping("/cart/{productId}")
    fun addProductInCart(@PathVariable productId: Long) {
        cartService.addProductInCart(productId)
    }

    @DeleteMapping("/cart/{productId}")
    fun removeFromCart(@PathVariable productId: Long) {
        cartService.removeFromCart(productId)
    }

    @DeleteMapping("/cart")
    fun removeAllFromCart() {
        cartService.clearCart()
    }
}