package usrt.technospace.models.map

import com.fasterxml.jackson.annotation.JsonBackReference
import org.hibernate.annotations.Cascade
import org.hibernate.annotations.CascadeType
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

    @Column(name = "is_main")
    var isMain: Boolean = false

    @OneToMany(mappedBy = "city")
    @Cascade(CascadeType.DELETE)
    var addresses: MutableList<Address> = arrayListOf()

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id")
    lateinit var country: Country
}