package usrt.technospace.models.carts

import usrt.technospace.models.identity.User
import usrt.technospace.models.product.Product
import javax.persistence.ManyToOne
import javax.persistence.Table

//@Table(name = "carts")
class Cart {

//    @ManyToOne
    lateinit var user: User

    // TODO: понять что нужно сделать что бы убрать зависимость из пользователя

//    @ManyToOne
    lateinit var product: Product
}