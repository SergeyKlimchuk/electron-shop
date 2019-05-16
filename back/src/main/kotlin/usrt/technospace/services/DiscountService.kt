package usrt.technospace.services

import org.springframework.stereotype.Service
import usrt.technospace.models.actions.Action
import usrt.technospace.models.product.Product
import java.util.stream.Collectors

@Service
class DiscountService {
    fun calculateDiscount(product: Product): Int {
        val actionsWithDiscount = product.actions
                .stream()
                .filter { x -> x.hasDiscount }
                .sorted { x, y -> sortByDiscountType(x, y) }
                .collect(Collectors.toList())

        var price = product.price.toDouble()
        for (action in actionsWithDiscount) {

            price -= if (action.discountInPercent) {
                (price / 100) * action.discountValue!!
            } else {
                price - action.discountValue!!
            }
        }
        return product.price - price.toInt()
    }

    private fun sortByDiscountType(x: Action, y: Action): Int {
        if (x.discountInPercent == y.discountInPercent) {
            return 0
        }
        if (x.discountInPercent) {
            return -1
        }
        return 1
    }
}