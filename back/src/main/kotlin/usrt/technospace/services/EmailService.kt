package usrt.technospace.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Service
import java.io.File
import java.nio.charset.StandardCharsets

@Service
class EmailService {

    @Autowired
    var emailSender: JavaMailSender? = null

    @Value("\${spring.mail.username}")
    var currentEmail: String? = null
    @Value("\${email.from}")
    var siteName: String? = null

    fun send(message: String, recipientMail: String) {
        val mimeMessage = emailSender!!.createMimeMessage()
        val mimeMessageHelper = MimeMessageHelper(mimeMessage, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name())
        mimeMessageHelper.setTo(recipientMail)
        mimeMessageHelper.setText(message, true)
        mimeMessageHelper.setSubject(siteName!!)
        mimeMessageHelper.setFrom(currentEmail!!)
        attachDefault(mimeMessageHelper)
        this.emailSender!!.send(mimeMessage)
    }

    private fun attachDefault(helper: MimeMessageHelper) {
        attachFile(helper, "facebook.png")
        attachFile(helper, "googleplus.png")
        attachFile(helper, "icon.png")
        attachFile(helper, "twitter.png")
    }

    private fun attachFile(helper: MimeMessageHelper, fileName: String) {
        val attachment = getStaticAttachment(fileName)
        val fileNameClear = fileName.replace(".", "_")
        helper.addInline(fileNameClear, attachment)
    }

    private fun getStaticAttachment(fileName: String): File {
        val resource = javaClass.classLoader.getResource("static/$fileName")
        return File(resource.toURI())
    }
}