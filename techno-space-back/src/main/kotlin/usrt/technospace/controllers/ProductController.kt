package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import usrt.technospace.models.product.Product
import usrt.technospace.repository.ProductRepository
import javax.validation.Valid

@RestController
class ProductController {

    @Autowired
    private lateinit var productRepository: ProductRepository

    @GetMapping("/products/{productId}")
    fun getProduct(@PathVariable productId: Long): Product {
        return productRepository.getOne(productId)
    }

    @PostMapping("/products")
    fun addProduct(@Valid @RequestBody product: Product): Product {
        return productRepository.save(product)
    }
}