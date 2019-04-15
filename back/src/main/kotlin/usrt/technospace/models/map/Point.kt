package usrt.technospace.models.map

import usrt.technospace.models.core.Auditable
import javax.persistence.Column
import javax.persistence.MappedSuperclass

@MappedSuperclass
open class Point : Auditable() {
    @Column(name = "latitude")
    var latitude: Double? = null

    @Column(name = "longitude")
    var longitude: Double? = null
}