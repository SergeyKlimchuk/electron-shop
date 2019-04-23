package usrt.technospace.models.map

import org.hibernate.annotations.Cascade
import org.hibernate.annotations.CascadeType
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
    @Cascade(CascadeType.DELETE)
    var cities: MutableList<City> = arrayListOf()
}