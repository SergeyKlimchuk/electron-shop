package usrt.technospace.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import usrt.technospace.models.identity.User


@Service
class NotificationService {

    @Autowired
    lateinit var emailService: EmailService

    fun notifyUser(message: String, user: User) {
        emailService.send(message, user.email!!)
    }
}