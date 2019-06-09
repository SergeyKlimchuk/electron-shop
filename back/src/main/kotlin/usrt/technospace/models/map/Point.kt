package usrt.technospace.models.map

import usrt.technospace.models.core.Auditable
import javax.persistence.*

@MappedSuperclass
open class Point : Auditable() {
    @Column(name = "latitude")
    open var latitude: Double? = null

    @Column(name = "longitude")
    open var longitude: Double? = null
}