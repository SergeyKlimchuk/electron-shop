package usrt.technospace.models.actions

import com.fasterxml.jackson.annotation.JsonManagedReference
import usrt.technospace.models.core.Auditable
import usrt.technospace.models.product.Product
import java.util.*
import javax.persistence.*
import javax.validation.constraints.NotBlank

@Entity
@Table(name = "actions")
class Action : Auditable() {
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

    @Column(name = "discount_in_percent")
    var discountInPercent: Boolean? = false

    @Column(name = "discount_value")
    var discountValue: Double? = 0.0

    @Column(name = "has_discount")
    var hasDiscount: Boolean? = false

    @Column(name = "img_url")
    var imageUrl: String? = null

    @NotBlank
    @Column(name = "info")
    var info: String? = null

    @ManyToMany
    @JoinTable(
            name = "action_product",
            joinColumns = [JoinColumn(name = "action_id")],
            inverseJoinColumns = [JoinColumn(name = "product_id")]
            )
    var products: List<Product> = arrayListOf()
}
