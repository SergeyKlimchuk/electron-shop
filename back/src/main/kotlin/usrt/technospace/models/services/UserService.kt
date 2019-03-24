package usrt.technospace.models.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import usrt.technospace.exceptions.UserNotFoundException
import usrt.technospace.models.identity.User
import usrt.technospace.repository.UserRepository


@Service
class UserService {

    @Autowired
    lateinit var userRepository: UserRepository

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
}