package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import usrt.technospace.models.product.Product
import usrt.technospace.models.services.CartService
import usrt.technospace.models.services.UserService

@RestController
class CartController {

    @Autowired
    lateinit var userService: UserService

    @Autowired
    lateinit var cartService: CartService

//    @GetMapping("/cart")
//    fun getProductsInCart(): List<Product> {
//        val currentUser = userService.getCurrentUser()
//        return cartService.getProductsInUserCart(currentUser.id!!)
//    }
//
//    fun addProduct(productId: Long) {
//    }
}