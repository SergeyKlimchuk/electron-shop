package usrt.technospace.models.map

import javax.persistence.*

@Entity
@Table(name = "countries")
class Country : Point() {
    @Id
    var id: Long? = null

    @Column(name = "name")
    lateinit var name: String

    @OneToMany(mappedBy = "country", fetch = FetchType.LAZY)
    lateinit var cities: List<City>
}