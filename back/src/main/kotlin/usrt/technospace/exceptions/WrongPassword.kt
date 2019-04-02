package usrt.technospace.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(value = HttpStatus.LOCKED, reason = "Wrong password!")
class WrongPassword: Error("Wrong password!")
