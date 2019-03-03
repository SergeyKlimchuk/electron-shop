package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.PageableDefault
import org.springframework.web.bind.annotation.*
import usrt.technospace.models.dictionary.DictionaryValue
import usrt.technospace.repository.DictionaryValueRepository

@RestController
class DictionaryValueController {

    @Autowired
    lateinit var dictionaryValueRepository: DictionaryValueRepository

    @PostMapping("/dictionary-values")
    fun add(@RequestParam dictionary: DictionaryValue): DictionaryValue {
        return dictionaryValueRepository.save(dictionary)
    }

    @GetMapping("/dictionary-values")
    fun getAll(@PageableDefault(sort = ["name"], direction = Sort.Direction.DESC)
               pageable: Pageable): Page<DictionaryValue> {
        return dictionaryValueRepository.findAll(pageable)
    }

    @GetMapping("/dictionary-values/{id}")
    fun getOne(@PathVariable id: Long): DictionaryValue {
        return dictionaryValueRepository.getOne(id)
    }

    @PutMapping("/dictionary-values")
    fun update(@RequestBody dictionary: DictionaryValue): DictionaryValue {
        return dictionaryValueRepository.save(dictionary)
    }

    @DeleteMapping("/dictionary-values/{id}")
    fun update(@PathVariable id: Long) {
        return dictionaryValueRepository.deleteById(id)
    }

}