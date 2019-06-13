package usrt.technospace.models.map

import usrt.technospace.models.payment.DeliveryAddress
import javax.persistence.*

@Entity
@Table(name = "city_points")
open class CityPoint : PointNode() {
    @Column(name = "is_main")
    var isMain: Boolean = false

    @OneToMany(cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    open var addresses: List<DeliveryAddress> = emptyList()
}