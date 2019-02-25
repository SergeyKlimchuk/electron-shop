package usrt.technospace.models.product

import javax.persistence.*
import javax.validation.constraints.NotBlank

@Entity
@Table(name = "productTypes")
class ProductType {
    @Id
    @GeneratedValue(generator = "product_type_generator")
    @SequenceGenerator(
            name = "product_type_generator",
            sequenceName = "product_type_generator",
            initialValue = 1
    )
    var id: Long? = null

    @NotBlank
    @Column(name = "name", nullable = false)
    var name: String? = null

    @Column(name = "image_url")
    var imageUrl: String? = null
}