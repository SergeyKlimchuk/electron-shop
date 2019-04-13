package usrt.technospace.models.addresses

import com.fasterxml.jackson.annotation.JsonBackReference
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "addresses")
class Address : Point() {
    @Id
    var id: Long? = null

    @ManyToOne
    @JoinColumn(name = "city_id")
    @JsonBackReference
    lateinit var city: City

    @Column(name = "info")
    lateinit var info: String

    @Column(name = "begin_work_day")
    lateinit var beginWotkDay: Date

    @Column(name = "end_work_day")
    lateinit var endWotkDay: Date

    @ElementCollection
    @Column(name = "work_days")
    lateinit var workDays: List<Int>
}