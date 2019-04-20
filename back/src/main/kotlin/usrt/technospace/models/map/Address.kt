package usrt.technospace.models.map

import com.fasterxml.jackson.annotation.JsonBackReference
import java.time.LocalTime
import javax.persistence.*

@Entity
@Table(name = "addresses")
class Address : Point() {
    @Id
    @GeneratedValue
    var id: Long? = null

    @ManyToOne
    @JoinColumn(name = "city_id")
    @JsonBackReference
    lateinit var city: City

    @Column(name = "info")
    lateinit var info: String

    @Column(name = "begin_work_day", columnDefinition = "TIME")
    lateinit var beginWotkDay: LocalTime

    @Column(name = "end_work_day", columnDefinition = "TIME")
    lateinit var endWotkDay: LocalTime

    @ElementCollection
    @Column(name = "work_days")
    var workDays: List<Int> = arrayListOf()
}