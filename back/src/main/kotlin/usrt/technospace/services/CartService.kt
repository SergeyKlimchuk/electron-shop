package usrt.technospace.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
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

    fun getProductsInUserCart(): List<Product>? {
        return userService.getCurrentUser().cart
    }

    fun addProductInCart(productId: Long) {
        val user = userService.getCurrentUser()
        val product = productRepository.getOne(productId)
        user.cart!!.add(product)
        userRepository.save(user)
    }

    fun removeFromCart(productId: Long) {
        val user = userService.getCurrentUser()
        val product = productRepository.getOne(productId)
        user.cart!!.remove(product)
        userRepository.save(user)
    }

    fun clearCart() {
        val user = userService.getCurrentUser()
        user.cart!!.clear()
        userRepository.save(user)
    }
}