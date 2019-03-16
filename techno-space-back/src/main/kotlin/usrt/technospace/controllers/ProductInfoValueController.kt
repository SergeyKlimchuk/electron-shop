package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import usrt.technospace.models.product.ProductInfoValue
import usrt.technospace.repository.ProductInfoValueRepository
import javax.validation.Valid

@RestController
class ProductInfoValueController {
    @Autowired
    private lateinit var productInfoValueRepository: ProductInfoValueRepository

    @PostMapping("/product-info-values")
    fun add(@Valid @RequestBody productInfoValue: ProductInfoValue): ProductInfoValue {
        return productInfoValueRepository.save(productInfoValue)
    }

    @GetMapping("/product-info-values/{id}")
    fun getById(@PathVariable id: Long): ProductInfoValue {
        return productInfoValueRepository.getOne(id)
    }

    @GetMapping("/product-info-values")
    fun getByFilter(@RequestParam titleId: Long?, @RequestParam productId: Long?): List<ProductInfoValue> {
        if (titleId != null) {
            return productInfoValueRepository.findAllByTitleId(titleId)
        }
        if (productId != null) {
            return productInfoValueRepository.findAllByProductId(productId)
        }
        return productInfoValueRepository.findAll()
    }

    @PutMapping("/product-info-values")
    fun update(@Valid @RequestBody productInfoValue: ProductInfoValue): ProductInfoValue {
        return productInfoValueRepository.save(productInfoValue)
    }

    @DeleteMapping("/product-info-values/{id}")
    fun delete(@PathVariable id: Long) {
        val productType = productInfoValueRepository.getOne(id)
        productInfoValueRepository.delete(productType)
    }
}