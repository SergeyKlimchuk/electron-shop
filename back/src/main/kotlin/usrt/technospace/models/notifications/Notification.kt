package usrt.technospace.models.notifications

import usrt.technospace.models.identity.User
import javax.persistence.*

@Entity
@Table(name = "notifications")
class Notification {
    @Id
    var id: Long? = null

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    lateinit var user: User
}