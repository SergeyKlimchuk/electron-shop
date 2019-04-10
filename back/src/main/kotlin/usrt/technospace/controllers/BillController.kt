package usrt.technospace.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.PageableDefault
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import usrt.technospace.exceptions.NotFoundException
import usrt.technospace.models.payment.Bill
import usrt.technospace.models.product.Product
import usrt.technospace.repository.BillRepository
import usrt.technospace.services.UserService

@RestController
class BillController {
    @Autowired
    lateinit var billRepository: BillRepository

    @Autowired
    lateinit var userService: UserService

    @GetMapping("/user/current/bills/{billId}")
    fun getMyBillById(@PathVariable billId: Long): Bill {
        val currentUser = userService.getCurrentUser()
        val bill = billRepository.getOne(billId)
        if (bill.author!!.id == currentUser.id) {
            return bill
        }
        throw NotFoundException()
    }

    @GetMapping("/user/current/bills")
    fun getMyBillsAsPageable(@PageableDefault(sort = ["createdDate"], direction = Sort.Direction.DESC)
                        pageable: Pageable): Page<Bill> {
        val currentUser = userService.getCurrentUser()
        return billRepository.findAllByAuthorId(currentUser.id!!, pageable)
    }

    @GetMapping("/bills/{billId}")
    @PreAuthorize("hasRole('ADMIN')")
    fun getBillById(@PathVariable billId: Long): Bill {
        return billRepository.getOne(billId)
    }
}