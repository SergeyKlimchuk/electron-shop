package usrt.technospace.repository

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import usrt.technospace.models.actions.Action

@Repository
interface ActionRepository: JpaRepository<Action, Long> {

    @Query("SELECT a FROM Action a WHERE CURRENT_DATE BETWEEN a.dateStart AND a.dateFinish")
    fun findAllActive(pageable: Pageable): Page<Action>

    @Query("SELECT a FROM Action a WHERE CURRENT_DATE NOT BETWEEN a.dateStart AND a.dateFinish")
    fun findAllNotActive(pageable: Pageable): Page<Action>
}
