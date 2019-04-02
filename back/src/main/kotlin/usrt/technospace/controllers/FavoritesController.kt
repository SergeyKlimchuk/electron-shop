package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import usrt.technospace.models.product.Product
import usrt.technospace.services.FavoriteService

@RestController
class FavoritesController {

    @Autowired
    lateinit var favoriteService: FavoriteService

    @GetMapping("/favorites")
    fun get(): List<Product>? {
        return favoriteService.getProductsInUserFavorites()
    }

    @PostMapping("/favorites/{productId}")
    fun add(@PathVariable productId: Long) {
        favoriteService.addProductInFavorites(productId)
    }

    @DeleteMapping("/favorites/{productId}")
    fun remove(@PathVariable productId: Long) {
        favoriteService.removeFromFavorites(productId)
    }
}