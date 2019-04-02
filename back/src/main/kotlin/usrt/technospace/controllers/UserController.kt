package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import usrt.technospace.dto.ChangeEmailRequest
import usrt.technospace.dto.ChangePasswordRequest
import usrt.technospace.exceptions.WrongPassword
import usrt.technospace.models.identity.User
import usrt.technospace.repository.UserRepository
import usrt.technospace.services.UserService

@RestController
class UserController {

    @Autowired
    lateinit var userService: UserService

    @Autowired
    lateinit var userRepository: UserRepository

    @GetMapping("/user/current")
    fun getCurrentUser(): User {
        return userService.getCurrentUser()
    }

    @PostMapping("/user/current/email")
    fun changeEmail(@RequestBody request: ChangeEmailRequest): User {
        val user = userService.getCurrentUser()
        if (user.password != request.password) {
            throw WrongPassword()
        }
        return userService.updateEmail(user, request.newEmail)
    }

    @PostMapping("/user/current/secondaryEmail")
    fun changeSecondaryEmail(@RequestBody request: ChangeEmailRequest): User {
        val user = userService.getCurrentUser()
        if (user.password != request.password) {
            throw WrongPassword()
        }
        return userService.updateSecondaryEmail(user, request.newEmail)
    }

    @PostMapping("/user/current/password")
    fun changePassword(@RequestBody request: ChangePasswordRequest): User {
        val user = userService.getCurrentUser()
        if (user.password != request.currentPassword) {
            throw WrongPassword()
        }
        return userService.updatePassword(user, request.newPassword)
    }

    @PutMapping("/user/current")
    fun updateUser(@RequestBody user: User): User {
        val currentUser = userService.getCurrentUser()
        currentUser.name = user.name
        currentUser.lastName = user.lastName
        currentUser.secondName = user.secondName
        currentUser.phoneNumber = user.phoneNumber
        return userRepository.save(currentUser)
    }
}