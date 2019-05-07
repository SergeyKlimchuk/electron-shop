package usrt.technospace.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpStatus
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.crypto.password.NoOpPasswordEncoder
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler
import usrt.technospace.services.CustomUserDetailService
import javax.sql.DataSource

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@ComponentScan(basePackageClasses = [CustomUserDetailService::class])
class SecurityConfig : WebSecurityConfigurerAdapter() {

    @Autowired
    lateinit var dataSource: DataSource

    override fun configure(http: HttpSecurity?) {
        http
                ?.authorizeRequests()
                ?.antMatchers(
                        "/",
                        "/actions",
                        "/actions/**",
                        "/registration",
                        "/user/current/email",
                        "/user/current/secondaryEmail",
                        "/user/current/bills/{billId}/products",
                        "/user/current/bills/**",
                        "/user/current/bills",
                        "/login",
                        "/logout",
                        "/map",
                        "/map/**",
                        "/search",
                        "/products",
                        "/products/**",
                        "/dictionaries",
                        "/dictionaries/**",
                        "/product-info-titles",
                        "/product-info-titles/**",
                        "/product-info-values",
                        "/product-info-values/**",
                        "/product-types",
                        "/files",
                        "/files/**",
                        "/product-types/**")
                        ?.permitAll()
                ?.antMatchers(
                        "/author/current",
                        "/cart",
                        "/cart/**",
                        "/favorites",
                        "/favorites/**",
                        "/generate-pay-link")
                        ?.authenticated()
                ?.anyRequest()?.authenticated()
            ?.and()
                ?.formLogin()
                ?.loginPage("/login")
                ?.usernameParameter("email")
                ?.passwordParameter("password")
                ?.successHandler { _, _, _ ->
                }
                ?.permitAll()
            ?.and()
                ?.logout()
                ?.logoutUrl("/logout")
                ?.logoutSuccessHandler(HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK))
                ?.permitAll()
            ?.and()
                http
                ?.csrf()
                ?.disable()
    }

    override fun configure(auth: AuthenticationManagerBuilder?) {
        auth?.jdbcAuthentication()
            ?.dataSource(dataSource)
            ?.passwordEncoder(NoOpPasswordEncoder.getInstance()) //SCryptPasswordEncoder()
            ?.usersByUsernameQuery("SELECT email, password, active FROM users WHERE email=?")
            ?.authoritiesByUsernameQuery("SELECT u.email, ur.roles FROM users u INNER JOIN user_roles ur ON ur.user_id=u.id WHERE u.email=?")
    }
}