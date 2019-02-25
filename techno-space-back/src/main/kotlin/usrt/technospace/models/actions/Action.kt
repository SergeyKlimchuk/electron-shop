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
    @Column(name = "name", nullable = false)
    var name: String? = null

    @NotBlank
    @Column(name = "date", nullable = false)
    var date: Date? = null

    @NotBlank
    @Column(name = "info", nullable = false)
    var info: String? = null
}
