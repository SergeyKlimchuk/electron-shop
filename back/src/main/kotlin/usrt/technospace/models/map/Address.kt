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

    @Column(name = "name")
    lateinit var name: String

    @Column(name = "begin_work_day", columnDefinition = "TIME")
    var beginWorkDay: LocalTime? = null

    @Column(name = "end_work_day", columnDefinition = "TIME")
    var endWorkDay: LocalTime? = null

    @ElementCollection
    @Column(name = "work_days")
    var workDays: List<Int> = arrayListOf()
}