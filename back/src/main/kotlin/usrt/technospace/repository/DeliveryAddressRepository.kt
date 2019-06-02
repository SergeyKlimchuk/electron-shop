package usrt.technospace.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import usrt.technospace.models.identity.User
import usrt.technospace.models.payment.DeliveryAddress

@Repository
interface DeliveryAddressRepository : JpaRepository<DeliveryAddress, Long> {
    fun findByUserAndIsFavoriteIsTrue(user: User): DeliveryAddress
}