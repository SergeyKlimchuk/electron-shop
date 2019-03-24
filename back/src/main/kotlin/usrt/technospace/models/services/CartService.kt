package usrt.technospace.models.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import usrt.technospace.models.product.Product
import usrt.technospace.repository.ProductRepository
import usrt.technospace.repository.UserRepository

@Service
class CartService {

    @Autowired
    lateinit var userService: UserService

    @Autowired
    lateinit var userRepository: UserRepository

    @Autowired
    lateinit var productRepository: ProductRepository

    @GetMapping("/cart")
    fun getProductsInUserCart(): List<Product>? {
        return userService.getCurrentUser().cart
    }

    @PostMapping("/cart/{productId}")
    fun addProductInCart(@PathVariable productId: Long) {
        val user = userService.getCurrentUser()
        val product = productRepository.getOne(productId)
        user.cart!!.add(product)
        userRepository.save(user)
    }

    @DeleteMapping("/cart/{productId}")
    fun removeFromCart(@PathVariable productId: Long) {
        val user = userService.getCurrentUser()
        val product = productRepository.getOne(productId)
        user.cart!!.remove(product)
    }
}