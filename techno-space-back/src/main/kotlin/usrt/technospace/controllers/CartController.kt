package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import usrt.technospace.models.product.Product
import usrt.technospace.models.services.UserService

@RestController
class CartController {

    @Autowired
    lateinit var userService: UserService

    @GetMapping("/cart")
    fun getProductsInCart(): List<Product> {
        val a = SecurityContextHolder.getContext().authentication
        val currentUser = userService.getCurrentUser()
        return listOf()
    }
}