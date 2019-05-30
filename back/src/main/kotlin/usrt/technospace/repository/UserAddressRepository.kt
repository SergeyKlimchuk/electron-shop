package usrt.technospace.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import usrt.technospace.models.payment.DeliveryAddress

@Repository
interface UserAddressRepository : JpaRepository<DeliveryAddress, Long>