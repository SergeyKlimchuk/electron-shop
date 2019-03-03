package usrt.technospace.models.dictionary

import javax.persistence.*

@Entity
@Table(name = "dictionaries")
class Dictionary {
    @Id
    @GeneratedValue
    var id: Long? = null

    @Column(name = "name", nullable = false)
    var name: String? = null

    @OneToMany(mappedBy = "dictionary", cascade = [CascadeType.ALL])
    val values: Set<DictionaryValue>? = null
}