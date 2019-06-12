package usrt.technospace.models.map

import javax.persistence.*

@Entity
@Table(name = "city_points")
open class CityPoint : PointNode() {
    @Column(name = "is_main")
    var isMain: Boolean = false
}