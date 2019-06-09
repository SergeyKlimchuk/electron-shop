package usrt.technospace.models.map

import com.fasterxml.jackson.annotation.JsonBackReference
import javax.persistence.*

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
abstract class PointNode : Point(), NamedPoint, Zoomed {
    @Id
    @GeneratedValue
    var id: Long? = null

    @Column(name = "name")
    override lateinit var name: String

    @Column(name = "nameEn")
    override lateinit var nameEn: String

    @Column(name = "zoom")
    override var zoom: Int = 0

    @OneToMany(mappedBy = "parent", targetEntity = PointNode::class)
    open var childrens: Set<PointNode> = emptySet()

    @JsonBackReference
    @ManyToOne(
            cascade = [CascadeType.ALL],
            fetch = FetchType.LAZY,
            optional = true
    )
    open var parent: PointNode? = null
}