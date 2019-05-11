package usrt.technospace.services

import org.springframework.stereotype.Service
import usrt.technospace.models.actions.Action
import usrt.technospace.models.product.Product

@Service
class DiscountService {
    fun getPriceWithDiscount(product: Product): Int {
        if (product.actions.isEmpty() || !product.actions.any { x -> x.hasDiscount!!}) {
            return product.price!!
        }

        return product.actions.stream()
                .filter { x -> x.hasDiscount!! }
                .map { x -> calculateDiscount(product, x) }
                .max { o1, o2 -> maxOf(o1, o2) }
                .get()
    }

    private fun calculateDiscount(product: Product, action: Action): Int {
        return if (action.discountInPercent!!) { //TODO: GET PERCENTAGE
            ((product.price!!.toDouble() / 100) * (100 - action.discountValue!!)).toInt()
        } else {
            (product.price!!.toDouble() - action.discountValue!!).toInt()
        }
    }
}