package usrt.technospace

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaAuditing

@SpringBootApplication
@EnableJpaAuditing
class TechnoSpaceApplication

fun main(args: Array<String>) {
	runApplication<TechnoSpaceApplication>(*args)
}

