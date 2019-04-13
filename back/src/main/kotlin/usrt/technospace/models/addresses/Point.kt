package usrt.technospace.models.addresses

import usrt.technospace.models.core.Auditable
import javax.persistence.Column
import javax.persistence.MappedSuperclass

@MappedSuperclass
open class Point : Auditable() {
    @Column(name = "latitude")
    lateinit var latitude: String

    @Column(name = "longitude")
    lateinit var longitude: String
}