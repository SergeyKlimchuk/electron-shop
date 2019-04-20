package usrt.technospace.models.map

import com.fasterxml.jackson.annotation.JsonBackReference
import javax.persistence.*

@Entity
@Table(name = "cities")
class City : Point() {
    @Id
    @GeneratedValue
    var id: Long? = null

    @Column(name = "name")
    lateinit var name: String

    @Column(name = "name_en")
    lateinit var nameEn: String

    @OneToMany(mappedBy = "city")
    lateinit var addresses: List<Address>

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id")
    lateinit var country: Country
}