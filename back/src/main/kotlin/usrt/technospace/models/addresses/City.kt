package usrt.technospace.models.addresses

import javax.persistence.*

@Entity
@Table(name = "cities")
class City : Point() {
    @Id
    var id: Long? = null

    @Column(name = "name")
    lateinit var name: String

    @Column(name = "name_en")
    lateinit var nameEn: String

    @OneToMany(mappedBy = "city")
    lateinit var addresses: List<Address>

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id")
    lateinit var country: Country
}