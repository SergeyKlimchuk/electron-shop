package usrt.technospace.models.payment

import com.fasterxml.jackson.annotation.JsonBackReference
import usrt.technospace.models.core.Auditable
import usrt.technospace.models.identity.User
import javax.persistence.*

@Entity
@Table(name = "delivery_addresses")
class DeliveryAddress : Auditable() {

    @Id
    @GeneratedValue
    var id: Long? = null

//    @JoinColumn(name = "city_id", nullable = false)
//    @ManyToOne(
//            cascade = [CascadeType.ALL],
//            fetch = FetchType.LAZY,
//            optional = false
//    )
//    var city: City? = null

    @JsonBackReference
    @JoinColumn(name = "user_id", nullable = false)
    @ManyToOne(
            fetch = FetchType.LAZY,
            optional = false
    )
    var user: User? = null

    var address: String? = null

    var comment: String? = null

    var isFavorite: Boolean = false
}