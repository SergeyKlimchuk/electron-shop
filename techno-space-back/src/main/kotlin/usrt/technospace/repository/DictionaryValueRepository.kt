package usrt.technospace.repository

import org.springframework.data.jpa.repository.JpaRepository
import usrt.technospace.models.dictionary.DictionaryValue

interface DictionaryValueRepository: JpaRepository<DictionaryValue, Long> {
    fun findAllByDictionaryId(dictionaryId: Long): List<DictionaryValue>
}