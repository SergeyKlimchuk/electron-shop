package usrt.technospace.models.map

import com.fasterxml.jackson.annotation.JsonBackReference
import java.time.LocalTime
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
    lateinit var beginWotkDay: LocalTime

    @Column(name = "end_work_day")
    lateinit var endWotkDay: LocalTime

    @ElementCollection
    @Column(name = "work_days")
    lateinit var workDays: List<Int>
}