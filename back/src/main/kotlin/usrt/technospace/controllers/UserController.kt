package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import usrt.technospace.models.identity.User
import usrt.technospace.models.services.UserService

@RestController
class UserController {

    @Autowired
    lateinit var userService: UserService

    @GetMapping("/user/current")
    fun getCurrentUser(): User {
        return userService.getCurrentUser()
    }
}