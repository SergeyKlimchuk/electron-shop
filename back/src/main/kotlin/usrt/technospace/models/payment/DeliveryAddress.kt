package usrt.technospace.models.payment

import com.fasterxml.jackson.annotation.JsonIgnore
import usrt.technospace.models.core.Auditable
import usrt.technospace.models.identity.User
import usrt.technospace.models.map.CityPoint
import javax.persistence.*

@Entity
@Table(name = "delivery_addresses")
class DeliveryAddress : Auditable() {

    @Id
    @GeneratedValue
    var id: Long? = null

    @JoinColumn(name = "city_id", nullable = false)
    @ManyToOne
    var city: CityPoint? = null

    @JsonIgnore
    @JoinColumn(name = "user_id", nullable = false)
    @ManyToOne
    var user: User? = null

    var address: String? = null

    var comment: String? = null

    var isFavorite: Boolean = false
}