package usrt.technospace.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.provisioning.InMemoryUserDetailsManager
import org.springframework.context.annotation.Bean
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.core.userdetails.User
import org.springframework.security.crypto.password.NoOpPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.crypto.scrypt.SCryptPasswordEncoder
import javax.sql.DataSource


@Configuration
@EnableWebSecurity
class SecurityConfig : WebSecurityConfigurerAdapter() {

    @Autowired
    lateinit var dataSource: DataSource

    override fun configure(http: HttpSecurity?) {
        http?.authorizeRequests()
                ?.antMatchers("/", "/registration")?.permitAll()
                ?.anyRequest()?.authenticated()
            ?.and()
                ?.formLogin()
                ?.loginPage("/login")
                ?.permitAll()
            ?.and()
                ?.logout()
                ?.permitAll()
        http?.csrf()?.disable()
    }

    override fun configure(auth: AuthenticationManagerBuilder?) {
        auth?.jdbcAuthentication()
            ?.dataSource(dataSource)
            ?.passwordEncoder(NoOpPasswordEncoder.getInstance()) //SCryptPasswordEncoder()
            ?.usersByUsernameQuery("SELECT username, password, active FROM users WHERE username=?")
            ?.authoritiesByUsernameQuery("SELECT u.username, ur.roles " +
                                               "FROM users AS u " +
                                               "INNER JOIN user_roles AS ur ON u.id = ur.user_id " +
                                               "WHERE u.username=?")
    }
}