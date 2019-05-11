package usrt.technospace.utils

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import usrt.technospace.dto.ProductDto
import usrt.technospace.models.product.Product
import usrt.technospace.services.DiscountService

@Service
class ProductDtoConverter {

    @Autowired
    private lateinit var discountService: DiscountService

    fun convert(product: Product): ProductDto {
        val productDto = ProductDto()
        productDto.id = product.id
        productDto.count = product.count
        productDto.description = product.description
        productDto.price = product.price
        productDto.imageUrl = product.imageUrl
        productDto.name = product.name
        productDto.productType = product.productType
        productDto.priceWithDiscount = discountService.getPriceWithDiscount(product)
        productDto.actions = product.actions
        return productDto
    }
}