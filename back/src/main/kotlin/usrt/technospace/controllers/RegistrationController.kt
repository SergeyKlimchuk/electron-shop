package usrt.technospace.controllers

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import usrt.technospace.models.identity.User
import usrt.technospace.models.roles.Role
import usrt.technospace.repository.UserRepository
import usrt.technospace.services.UserService
import javax.validation.Valid


@RestController
class RegistrationController {
    var logger = LoggerFactory.getLogger(RegistrationController::class.java)!!

    @Autowired
    lateinit var userRepository: UserRepository

    @Autowired
    lateinit var userService: UserService

    @GetMapping("/registration")
    fun registration(): String {
        userService.getCurrentUser()
        return "registration"
    }


    @PostMapping("/registration")
    fun addNewUser(@Valid @RequestBody user: User): User? {
        val userWasFounded = userRepository.findByEmail(user.email) != null
        if (userWasFounded) {
            throw IllegalArgumentException("Email already exists!")
        }

        user.roles = hashSetOf(Role.ROLE_USER)
        user.active = true
        userRepository.save(user)
        logger.info("Registered new user \"${user.id}\"")
        return user
    }
}