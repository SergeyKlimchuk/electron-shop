package usrt.technospace.models.actions

import java.util.*
import javax.persistence.*
import javax.validation.constraints.NotBlank

@Entity
@Table(name = "actions")
class Action {
    @Id
    @GeneratedValue(generator = "action_generator")
    @SequenceGenerator(
            name = "action_generator",
            sequenceName = "action_generator",
            initialValue = 1
    )
    var id: Long? = null

    @NotBlank
    @Column(name = "name")
    var name: String? = null

    @Column(name = "date_start")
    var dateStart: Date? = null

    @Column(name = "date_finish")
    var dateFinish: Date? = null

    @NotBlank
    @Column(name = "info")
    var info: String? = null

    @NotBlank
    @Column(name = "image_url")
    var imageUrl: String? = null
}
