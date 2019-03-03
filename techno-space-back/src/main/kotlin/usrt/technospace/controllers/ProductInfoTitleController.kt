package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.PageableDefault
import org.springframework.web.bind.annotation.*
import usrt.technospace.models.product.ProductInfoTitle
import usrt.technospace.repository.ProductInfoTitleRepository
import javax.validation.Valid

@RestController
class ProductInfoTitleController {
    @Autowired
    private lateinit var productInfoTitleRepository: ProductInfoTitleRepository

    @PostMapping("/product-info-titles")
    fun addProductType(@Valid @RequestBody productInfoTitle: ProductInfoTitle): ProductInfoTitle {
        return productInfoTitleRepository.save(productInfoTitle)
    }

    @GetMapping("/product-info-titles/{id}")
    fun getProductType(@PathVariable id: Long): ProductInfoTitle {
        return productInfoTitleRepository.getOne(id)
    }

    @GetMapping("/product-info-titles")
    fun getProductTypes(@PageableDefault(sort = ["name"], direction = Sort.Direction.DESC)
                        pageable: Pageable): Page<ProductInfoTitle> {
        return productInfoTitleRepository.findAll(pageable)
    }

    @PutMapping("/product-info-titles")
    fun updateProductType(@Valid @RequestBody productInfoTitle: ProductInfoTitle): ProductInfoTitle {
        return productInfoTitleRepository.save(productInfoTitle)
    }

    @DeleteMapping("/product-info-titles/{id}")
    fun deleteProductType(@PathVariable id: Long) {
        val productType = productInfoTitleRepository.getOne(id)
        productInfoTitleRepository.delete(productType)
    }
}