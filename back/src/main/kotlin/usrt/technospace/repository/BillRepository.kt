package usrt.technospace.repository

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import usrt.technospace.models.payment.Bill

@Repository
interface BillRepository: JpaRepository<Bill, Long> {
    fun findAllByAuthorId(userId: Long): List<Bill>
    fun findAllByAuthorId(userId: Long, pageable: Pageable): Page<Bill>
}