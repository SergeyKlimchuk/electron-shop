package usrt.technospace.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import usrt.technospace.repository.DeliveryAddressRepository

@Service
class DeliveryAddressService {

    @Autowired
    lateinit var deliverAddressRepository: DeliveryAddressRepository

    @Autowired
    lateinit var userService: UserService

    fun setFavoriteAddress(addressId: Long) {
        val newAddress = deliverAddressRepository.getOne(addressId)
        val currentUser = userService.getCurrentUser()
        val oldAddress = deliverAddressRepository.findByUserAndIsFavoriteIsTrue(currentUser)

        oldAddress.isFavorite = false
        newAddress.isFavorite = true
        deliverAddressRepository.saveAll(arrayListOf(oldAddress, newAddress))
    }
}