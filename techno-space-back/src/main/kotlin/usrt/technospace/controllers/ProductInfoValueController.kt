package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.PageableDefault
import org.springframework.web.bind.annotation.*
import usrt.technospace.models.product.ProductInfoValue
import usrt.technospace.repository.ProductInfoValueRepository
import javax.validation.Valid

@RestController
class ProductInfoValueController {
    @Autowired
    private lateinit var productInfoValueRepository: ProductInfoValueRepository

    @PostMapping("/product-info-values")
    fun addProductType(@Valid @RequestBody productInfoValue: ProductInfoValue): ProductInfoValue {
        return productInfoValueRepository.save(productInfoValue)
    }

    @GetMapping("/product-info-values/{id}")
    fun getProductType(@PathVariable id: Long): ProductInfoValue {
        return productInfoValueRepository.getOne(id)
    }

    @GetMapping("/product-info-values")
    fun getProductTypes(@PageableDefault(sort = ["name"], direction = Sort.Direction.DESC)
                        pageable: Pageable): Page<ProductInfoValue> {
        return productInfoValueRepository.findAll(pageable)
    }

    @PutMapping("/product-info-values")
    fun updateProductType(@Valid @RequestBody productInfoValue: ProductInfoValue): ProductInfoValue {
        return productInfoValueRepository.save(productInfoValue)
    }

    @DeleteMapping("/product-info-values/{id}")
    fun deleteProductType(@PathVariable id: Long) {
        val productType = productInfoValueRepository.getOne(id)
        productInfoValueRepository.delete(productType)
    }
}