package usrt.technospace.models.identity

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.AuthorityUtils
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.util.StringUtils

class CustomUserDetails(private val user: User) : UserDetails {

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        val roles = StringUtils.collectionToCommaDelimitedString(user.roles)
        return AuthorityUtils.commaSeparatedStringToAuthorityList(roles)
    }

    override fun isEnabled(): Boolean {
        return user.active
    }

    override fun getUsername(): String {
        return user.name ?: ""
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun getPassword(): String {
        return user.password ?: ""
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return user.active
    }
}