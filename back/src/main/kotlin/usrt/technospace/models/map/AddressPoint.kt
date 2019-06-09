package usrt.technospace.models.map

import usrt.technospace.converters.WorkDaysConverter
import java.time.LocalTime
import javax.persistence.*

@Entity
@Table(name = "address_points")
class AddressPoint : PointNode() {
    @Column(name = "begin_work_day", columnDefinition = "TIME")
    var beginWorkDay: LocalTime? = null

    @Column(name = "end_work_day", columnDefinition = "TIME")
    var endWorkDay: LocalTime? = null

    @Convert(converter = WorkDaysConverter::class)
    @Column(name = "work_days")
    var workDays: List<Int> = arrayListOf()

    @Column(name = "is_main")
    var isMain: Boolean = false
}