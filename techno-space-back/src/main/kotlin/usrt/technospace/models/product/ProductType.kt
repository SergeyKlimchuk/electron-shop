package usrt.technospace.models.product

import javax.persistence.*
import javax.validation.constraints.NotBlank

@Entity
@Table(name = "productTypes")
class ProductType {
    @Id
    @GeneratedValue
    var id: Long? = null

    @NotBlank
    @Column(name = "name", nullable = false)
    var name: String? = null

    @Column(name = "image_url")
    var imageUrl: String? = null

    // TODO: Выкосить зависимость
    @OneToMany(
            cascade = [CascadeType.ALL],
            mappedBy = "productType",
            orphanRemoval = true
    )
    var titles: List<ProductInfoTitle>? = null
}