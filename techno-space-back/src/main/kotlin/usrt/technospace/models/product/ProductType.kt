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
            mappedBy = "productType",
            cascade = [CascadeType.ALL]
    )
    var titles: List<ProductInfoTitle>? = null



//    @ManyToMany
//    @JoinTable(
//            name = "product_dictionaries",
//            joinColumns = @JoinColumn(name = "student_id"),
//            inverseJoinColumns = @JoinColumn(name = "course_id"))
//    var dictionaries: List<Dictionary>? = null
}