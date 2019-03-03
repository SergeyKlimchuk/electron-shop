package usrt.technospace.repository

import org.springframework.data.jpa.repository.JpaRepository
import usrt.technospace.models.dictionary.Dictionary

interface DictionaryRepository: JpaRepository<Dictionary, Long>