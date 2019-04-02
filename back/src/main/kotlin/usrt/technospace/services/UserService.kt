package usrt.technospace.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import usrt.technospace.exceptions.UserNotFoundException
import usrt.technospace.models.identity.User
import usrt.technospace.models.mails.MailTemplate
import usrt.technospace.repository.UserRepository


@Service
class UserService {

    @Autowired
    lateinit var userRepository: UserRepository

    @Autowired
    lateinit var mailTemplateService: MailTemplateService

    @Autowired
    lateinit var emailService: EmailService

    fun getCurrentUser(): User {
        val principal = SecurityContextHolder.getContext().authentication.principal
        val usr = (principal as org.springframework.security.core.userdetails.User)
        val email = usr.username
        val user = userRepository.findByEmail(email)
        if (user == null) {
            throw UserNotFoundException()
        } else {
            return user
        }
    }

    fun updateEmail(user: User, newEmail: String): User {
        val oldEmail = user.email
        user.email = newEmail
        userRepository.save(user)

        val values = hashMapOf("old_email" to oldEmail!!)
        val message = mailTemplateService.build(MailTemplate.CHANGE_EMAIL, values)
        emailService.send(message, user.email!!)
        return user
    }

    fun updateSecondaryEmail(user: User, newEmail: String): User {
        val oldEmail = user.secondaryEmail
        user.secondaryEmail = newEmail
        userRepository.save(user)

        val values = hashMapOf("old_email" to oldEmail!!)
        mailTemplateService.build(MailTemplate.CHANGE_SECONDARY_EMAIL, values)
        return user
    }

    fun updatePassword(user: User, newPassword: String): User {
        user.secondaryEmail = newPassword
        userRepository.save(user)

        // Notify about action
        mailTemplateService.build(MailTemplate.CHANGE_PASSWORD, hashMapOf())
        return user
    }
}