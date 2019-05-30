package usrt.technospace.controllers.user

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import usrt.technospace.models.payment.DeliveryAddress
import usrt.technospace.repository.UserAddressRepository
import usrt.technospace.repository.UserRepository
import usrt.technospace.services.UserService

@RestController
class UserAddressController {

    @Autowired
    lateinit var userService: UserService

    @Autowired
    lateinit var userRepository: UserRepository

    @Autowired
    lateinit var addressRepository: UserAddressRepository

    @PostMapping("/user/current/address")
    fun addAddress(@RequestBody address: DeliveryAddress) {
        val user = userService.getCurrentUser()
        user.addresses.add(address)
        userRepository.save(user)
    }

    @DeleteMapping("/user/current/address/{addressId}")
    fun removeAddress(@PathVariable addressId: Long) {
        addressRepository.deleteById(addressId)
    }
}