package usrt.technospace.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class MainPageController {

    @GetMapping("/slider-pages")
    fun getPagesForSlider(): List<Any> {
        return emptyList()
    }

}