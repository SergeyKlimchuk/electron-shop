package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.PageableDefault
import org.springframework.web.bind.annotation.*
import usrt.technospace.models.dictionary.Dictionary
import usrt.technospace.repository.DictionaryRepository

@RestController
class DictionaryController {

    @Autowired
    lateinit var dictionaryRepository: DictionaryRepository

    @PostMapping("/dictionaries")
    fun add(@RequestBody dictionary: Dictionary): Dictionary {
        return dictionaryRepository.save(dictionary)
    }

    @GetMapping("/dictionaries")
    fun getAll(@PageableDefault(sort = ["name"], direction = Sort.Direction.DESC)
               pageable: Pageable): Page<Dictionary> {
        return dictionaryRepository.findAll(pageable)
    }

    @GetMapping("/dictionaries/{id}")
    fun getOne(@PathVariable id: Long): Dictionary {
        return dictionaryRepository.getOne(id)
    }

    @PutMapping("/dictionaries")
    fun update(@RequestBody dictionary: Dictionary): Dictionary {
        return dictionaryRepository.save(dictionary)
    }

    @DeleteMapping("/dictionaries/{id}")
    fun update(@PathVariable id: Long) {
        return dictionaryRepository.deleteById(id)
    }

}