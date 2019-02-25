package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import usrt.technospace.models.identity.User
import usrt.technospace.models.roles.Role
import usrt.technospace.repository.UserRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestBody


@RestController
class RegistrationController {

    @Autowired
    lateinit var userRepository: UserRepository

    @GetMapping("/registration")
    fun registration(): String {
        return "registration"
    }


    @PostMapping("/registration")
    fun addNewUser(@RequestBody user: User): User? {
        if (user.username == null) {
            throw IllegalArgumentException("Username cannot be NULL!")
        }

        val userWasFounded = userRepository.findByUsername(user.username) != null
        if (userWasFounded) {
            throw IllegalArgumentException("Username already exists!")
        }

        user.roles = hashSetOf(Role.USER)
        user.active = true
        return userRepository.save(user)
    }
}