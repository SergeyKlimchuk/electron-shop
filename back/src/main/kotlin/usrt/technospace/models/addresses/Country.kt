package usrt.technospace.models.addresses

import javax.persistence.*

@Entity
@Table(name = "countries")
class Country : Point() {
    @Id
    var id: Long? = null

    @OneToMany(mappedBy = "country", fetch = FetchType.LAZY)
    lateinit var cities: List<City>
}