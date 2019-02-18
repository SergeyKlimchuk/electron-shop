package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import usrt.technospace.exceptions.NotFoundException
import usrt.technospace.models.product.ProductType
import usrt.technospace.repository.ProductTypeRepository
import javax.validation.Valid

@RestController
class ProductTypeController {

    @Autowired
    private lateinit var productTypeRepository: ProductTypeRepository

    @GetMapping("/product-types/{productTypeId}")
    fun getProductType(@PathVariable productTypeId: Long): ProductType {
        return productTypeRepository.getOne(productTypeId)
    }

    @PostMapping("/product-types")
    fun addProductType(@Valid @RequestBody productType: ProductType): ProductType {
        return productTypeRepository.save(productType)
    }

    @DeleteMapping("/product-types/{productTypeId}")
    fun deleteProductType(@PathVariable productTypeId: Long) {
        val productType = productTypeRepository.findById(productTypeId)
        if (productType.isPresent) {
            productTypeRepository.delete(productType.get())
        } else {
            throw NotFoundException()
        }
    }
}