package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.PageableDefault
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*
import usrt.technospace.dto.ProductProperty
import usrt.technospace.models.product.Product
import usrt.technospace.services.ProductService
import usrt.technospace.repository.ProductRepository
import javax.validation.Valid
import javax.validation.constraints.NotNull

@RestController
class ProductController {

    @Autowired
    private lateinit var productRepository: ProductRepository

    @Autowired
    private lateinit var productService: ProductService

    @PostMapping("/products")
    @Transactional
    fun addProduct(@Valid @RequestBody @NotNull product: Product): Product {
        product.values!!.forEach { x -> x.product = product }
        return productRepository.save(product)
    }

    @GetMapping("/products/{id}")
    fun getProduct(@PathVariable id: Long): Product {
        return productRepository.getOne(id)
    }

    @GetMapping("/products")
    fun getProductsByProductTypeId(
            @RequestParam("productTypeId")
            productTypeId: Long?,
            @PageableDefault(sort = ["createdAt"], direction = Sort.Direction.DESC)
            pageable: Pageable): Page<Product> {

        if (productTypeId == null) {
            return productRepository.findAll(pageable)
        }

        return productRepository.findAllByProductTypeId(productTypeId, pageable)
    }

    @PutMapping("/products")
    fun updateProduct(@Valid @RequestBody product: Product): Product {
        return productRepository.save(product)
    }

    @GetMapping("/products/count")
    fun getProductsCount(@RequestParam("productTypeId") productTypeId: Long): Long {
        return productRepository.countProductsByProductTypeId(productTypeId)
    }

    @DeleteMapping("/products/{id}")
    fun deleteProduct(@PathVariable id: Long) {
        val product = productRepository.getOne(id)
        productRepository.delete(product)
    }

    @GetMapping("/products/{productId}/properties")
    fun getProductProperties(@PathVariable productId: Long): List<ProductProperty> {
        return productService.getProductInfo(productId)
    }
}