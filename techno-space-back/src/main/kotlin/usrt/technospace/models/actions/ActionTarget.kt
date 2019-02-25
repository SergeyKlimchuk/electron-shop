package usrt.technospace.models.actions

import javax.persistence.*
import javax.validation.constraints.NotBlank

//@Entity
//@Table(name = "action_targets")
class ActionTarget {

    @NotBlank
    @Column(name = "action_id", nullable = false)
    var action: Long? = null

    @NotBlank
    @Column(name = "target_id", nullable = false)
    var target: Long? = null

    @NotBlank
    @Column(name = "targetType", nullable = false)
    var targetType: Int = ActionTargetType.PRODUCT.type
}