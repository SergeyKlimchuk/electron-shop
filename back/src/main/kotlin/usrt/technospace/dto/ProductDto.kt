package usrt.technospace.dto

import usrt.technospace.models.actions.Action
import usrt.technospace.models.product.ProductType

class ProductDto {
    var id: Long? = null

    var name: String? = null

    var price: Int? = null

    var imageUrl: String? = null

    var productType: ProductType? = null

    var count: Int? = null

    var description: String? = null

    var priceWithDiscount: Int? = null

    var actions: Set<Action>? = null
}