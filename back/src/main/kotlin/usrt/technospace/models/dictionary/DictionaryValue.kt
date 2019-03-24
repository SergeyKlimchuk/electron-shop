package usrt.technospace.models.dictionary

import com.fasterxml.jackson.annotation.JsonBackReference
import javax.persistence.*

@Entity
@Table(name = "dictionary_values")
class DictionaryValue {
    @Id
    @GeneratedValue
    var id: Long? = null

    @Column(name = "name", nullable = false)
    var name: String? = null

    @JsonBackReference
    @ManyToOne
    @JoinColumn(nullable = false)
    var dictionary: Dictionary? = null
}