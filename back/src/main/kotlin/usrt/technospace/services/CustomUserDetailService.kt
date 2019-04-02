package usrt.technospace.services

import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.core.userdetails.UserDetails
import usrt.technospace.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
import usrt.technospace.models.identity.CustomUserDetails


@Service
class CustomUserDetailService : UserDetailsService {

    @Autowired
    lateinit var userRepository: UserRepository


    override fun loadUserByUsername(email: String): UserDetails {

        val user = userRepository.findByEmail(email)

        if (null == user) {
            throw UsernameNotFoundException("No author present with username: $email")

        } else {

            return CustomUserDetails(user)

        }

    }
}