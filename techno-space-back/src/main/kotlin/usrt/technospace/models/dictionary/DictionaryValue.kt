package usrt.technospace.models.dictionary

import javax.persistence.*

@Entity
@Table(name = "dictionary_values")
class DictionaryValue {
    @Id
    @GeneratedValue
    var id: Long? = null

    @Column(name = "name", nullable = false)
    var name: String? = null

    @ManyToOne
    @JoinColumn
    var dictionary: Dictionary? = null
}