package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.PageableDefault
import org.springframework.web.bind.annotation.*
import usrt.technospace.models.product.ProductType
import usrt.technospace.repository.ProductTypeRepository
import javax.validation.Valid

@RestController
class ProductTypeController {

    @Autowired
    private lateinit var productTypeRepository: ProductTypeRepository

    @PostMapping("/product-types")
    fun addProductType(@Valid @RequestBody productType: ProductType): ProductType {
        return productTypeRepository.save(productType)
    }

    @GetMapping("/product-types/{id}")
    fun getProductType(@PathVariable id: Long): ProductType {
        return productTypeRepository.getOne(id)
    }

    @GetMapping("/product-types")
    fun getProductTypes(@PageableDefault(sort = ["name"], direction = Sort.Direction.DESC)
                        pageable: Pageable): Page<ProductType> {
        return productTypeRepository.findAll(pageable)
    }

    @PutMapping("/product-types")
    fun updateProductType(@Valid @RequestBody productType: ProductType): ProductType {
        return productTypeRepository.save(productType)
    }

    @DeleteMapping("/product-types/{id}")
    fun deleteProductType(@PathVariable id: Long) {
        val productType = productTypeRepository.getOne(id)
        productTypeRepository.delete(productType)
    }
}