package usrt.technospace.models.map

import javax.persistence.*

@Entity
@Table(name = "countries")
class Country : Point() {
    @Id
    @GeneratedValue
    var id: Long? = null

    @Column(name = "name")
    lateinit var name: String

    @OneToMany(mappedBy = "country", fetch = FetchType.LAZY)
    var cities: MutableList<City> = arrayListOf()
}