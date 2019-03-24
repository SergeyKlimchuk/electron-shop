package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import usrt.technospace.models.dictionary.Dictionary
import usrt.technospace.models.dictionary.DictionaryValue
import usrt.technospace.repository.DictionaryValueRepository

@RestController
class DictionaryValueController {

    @Autowired
    lateinit var dictionaryValueRepository: DictionaryValueRepository

    @PostMapping("/dictionaries/{dictionaryId}/values")
    fun add(@PathVariable dictionaryId: Long, @RequestBody value: DictionaryValue): DictionaryValue {
        return update(dictionaryId, value)
    }

    @GetMapping("/dictionaries/{dictionaryId}/values")
    fun getAll(@PathVariable dictionaryId: Long): List<DictionaryValue> {
        return dictionaryValueRepository.findAllByDictionaryId(dictionaryId)
    }

    @GetMapping("/dictionaries/{dictionaryId}/values/{id}")
    fun getOne(@PathVariable dictionaryId: Long, @PathVariable id: Long): DictionaryValue {
        // TODO: Доделать сложный ключ состоящий из айдишника справочника и айдишника значения
        return dictionaryValueRepository.getOne(id)
    }

    @PutMapping("/dictionaries/{dictionaryId}/values")
    fun update(@PathVariable dictionaryId: Long, @RequestBody value: DictionaryValue): DictionaryValue {
        if (value.dictionary?.id == null) {
            val dictionaryReference = Dictionary()
            dictionaryReference.id = dictionaryId
            value.dictionary = dictionaryReference
        }
        return dictionaryValueRepository.save(value)
    }

    @DeleteMapping("/dictionaries/{dictionaryId}/values/{id}")
    fun update(@PathVariable dictionaryId: Long, @PathVariable id: Long) {
        return dictionaryValueRepository.deleteById(id)
    }

}