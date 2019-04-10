package usrt.technospace.models.payment

import com.fasterxml.jackson.annotation.JsonBackReference
import usrt.technospace.models.core.Auditable
import usrt.technospace.models.identity.User
import usrt.technospace.models.product.Product
import javax.persistence.*

@Entity
@Table(name = "bills")
class Bill: Auditable() {
    @Id
    @GeneratedValue
    var id: Long? = null

    @JsonBackReference
    @JoinColumn(name = "author_id", nullable = false)
    @ManyToOne(
            fetch = FetchType.LAZY,
            optional = false,
            cascade = [CascadeType.ALL])
    var author: User? = null

    @ManyToMany
    @JoinTable(name = "bill_product",
            joinColumns = [JoinColumn(name = "bill_id")],
            inverseJoinColumns = [JoinColumn(name = "product_id")]
    )
    var products: List<Product>? = null

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "status")
    var status: BillStatus = BillStatus.PENDING_PAY
}
