package usrt.technospace.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import usrt.technospace.models.product.Product
import usrt.technospace.repository.ProductRepository
import usrt.technospace.repository.UserRepository

@Service
class FavoriteService {

    @Autowired
    lateinit var userService: UserService

    @Autowired
    lateinit var userRepository: UserRepository

    @Autowired
    lateinit var productRepository: ProductRepository

    fun getProductsInUserFavorites(): List<Product> {
        return userService.getCurrentUser().favorites
    }

    fun checkProductInFavorites(productId: Long): Boolean {
        return getProductsInUserFavorites()
                .stream()
                .anyMatch { x-> x.id == productId }
    }

    fun addProductInFavorites(productId: Long) {
        val user = userService.getCurrentUser()
        val product = productRepository.getOne(productId)
        user.favorites.add(product)
        userRepository.save(user)
    }

    fun removeFromFavorites(productId: Long) {
        val user = userService.getCurrentUser()
        val product = productRepository.getOne(productId)
        user.favorites.remove(product)
        userRepository.save(user)
    }
}