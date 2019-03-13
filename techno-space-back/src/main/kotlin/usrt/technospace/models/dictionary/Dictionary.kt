package usrt.technospace.models.dictionary

import com.fasterxml.jackson.annotation.JsonBackReference
import javax.persistence.*

@Entity
@Table(name = "dictionaries")
class Dictionary {
    @Id
    @GeneratedValue
    var id: Long? = null

    @Column(name = "name", nullable = false)
    var name: String? = null

    @JsonBackReference
    @OneToMany(mappedBy = "dictionary", cascade = [CascadeType.ALL])
    val values: List<DictionaryValue>? = null
}