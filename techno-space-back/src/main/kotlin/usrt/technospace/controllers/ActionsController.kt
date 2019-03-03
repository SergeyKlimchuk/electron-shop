package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.PageableDefault
import org.springframework.web.bind.annotation.*
import usrt.technospace.models.actions.Action
import usrt.technospace.repository.ActionRepository
import javax.validation.Valid

@RestController
class ActionsController {

    @Autowired
    lateinit var actionRepository: ActionRepository

    @PostMapping("/actions")
    fun addAction(@Valid action: Action): Action {
        return actionRepository.save(action)
    }

    @GetMapping("/actions")
    fun getActions(@RequestParam active: Boolean?,
                   @PageableDefault(sort = ["dateStart"], direction = Sort.Direction.DESC)
                   pageable: Pageable): Page<Action> {
        if (active == null) {
            return actionRepository.findAll(pageable)
        }
        if (active) {
            return actionRepository.findAllActive(pageable)
        }
        return actionRepository.findAllNotActive(pageable)
    }

    @GetMapping("/actions/{id}")
    fun getAction(@PathVariable id: Long): Action {
        return actionRepository.getOne(id)
    }

    @DeleteMapping("/actions/{id}")
    fun deleteAction(@PathVariable id: Long) {
        val action = actionRepository.getOne(id)
        actionRepository.delete(action)
    }
}