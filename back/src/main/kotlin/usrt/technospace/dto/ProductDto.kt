package usrt.technospace.dto

import usrt.technospace.models.actions.Action
import usrt.technospace.models.product.ProductInfoValue
import usrt.technospace.models.product.ProductType

class ProductDto {
    var id: Long? = null

    var name: String? = null

    var price: Int? = null

    var imageUrl: String? = null

    var productType: ProductType? = null

    var count: Int = 0

    var description: String? = null

    var discount: Int = 0

    var actions: List<Action> = arrayListOf()

    var values: Set<ProductInfoValue> = emptySet()
}