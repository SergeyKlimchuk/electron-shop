package usrt.technospace.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class MainController {
    @GetMapping("/")
    fun getMainPage() {
    }

    @PostMapping("/")
    fun postMainPage() {
    }
}