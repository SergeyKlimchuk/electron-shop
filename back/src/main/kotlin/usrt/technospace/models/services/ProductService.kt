package usrt.technospace.models.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import usrt.technospace.dto.ProductProperty
import usrt.technospace.models.product.ProductInfoValueType
import usrt.technospace.repository.DictionaryValueRepository
import usrt.technospace.repository.ProductInfoValueRepository

@Service
class ProductService {

    @Autowired
    private lateinit var productInfoValueRepository: ProductInfoValueRepository

    @Autowired
    private lateinit var dictionaryValueRepository: DictionaryValueRepository

    fun getProductInfo(productId: Long): List<ProductProperty> {
        val productInfoValues = productInfoValueRepository.findAllByProductId(productId)

        val properties = mutableListOf<ProductProperty>()
        for (productInfoValue in productInfoValues) {
            val value: String
            value = when(productInfoValue.title?.type) {
                ProductInfoValueType.Dictionary -> {
                    val dictionaryValueId = productInfoValue.value.toLong()
                    val dictionaryValue = dictionaryValueRepository.getOne(dictionaryValueId)
                    dictionaryValue.name!!
                }
                else -> productInfoValue.value
            }
            val property = ProductProperty()
            property.name = productInfoValue.title?.name !!
            property.value = value
            properties.add(property)
        }
        return properties
    }
}