package usrt.technospace.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import usrt.technospace.models.actions.Action

interface ActionRepository: JpaRepository<Action, Long> {

    @Query("SELECT a FROM Action AS a WHERE a.date >= CURRENT_DATE")
    fun getActiveActions(): Array<Action>
}
