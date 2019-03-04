package usrt.technospace.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.crypto.password.NoOpPasswordEncoder
import usrt.technospace.models.services.CustomUserDetailService
import javax.sql.DataSource


@Configuration
@EnableWebSecurity
@ComponentScan(basePackageClasses = [CustomUserDetailService::class])
class SecurityConfig : WebSecurityConfigurerAdapter() {

    @Autowired
    lateinit var dataSource: DataSource

    override fun configure(http: HttpSecurity?) {
        http    ?.formLogin()
                ?.loginPage("/login")
                ?.usernameParameter("email")
                ?.passwordParameter("password")
                ?.permitAll()
            ?.and()
                ?.authorizeRequests()
                ?.antMatchers(
                        "/",
                        "/registration",
                        "/search",
                        "/products",
                        "/products/**",
                        "/product-types",
                        "/product-types/**")?.permitAll()
                ?.antMatchers("/user/current")?.authenticated()
                ?.anyRequest()?.authenticated()
            ?.and()
                ?.logout()
                ?.permitAll()
        http?.csrf()?.disable()
    }

    override fun configure(auth: AuthenticationManagerBuilder?) {
        auth?.jdbcAuthentication()
            ?.dataSource(dataSource)
            ?.passwordEncoder(NoOpPasswordEncoder.getInstance()) //SCryptPasswordEncoder()
            ?.usersByUsernameQuery("SELECT email, password, active FROM users WHERE email=?")
            ?.authoritiesByUsernameQuery("SELECT u.email, ur.roles FROM users u INNER JOIN user_roles ur ON ur.user_id=u.id WHERE u.email=?")
    }
}