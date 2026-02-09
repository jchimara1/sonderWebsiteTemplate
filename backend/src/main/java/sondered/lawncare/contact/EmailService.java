package sondered.lawncare.contact;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${APP_CONTACT_TO_EMAIL:}")
    private String toEmail;

    @Value("${spring.mail.username:}")
    private String fromEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendServiceRequest(ContactRequest req) {

        // ✅ REQUIRED GUARD — PUTS FAILURE HERE, NOT AT BOOT
        if (toEmail == null || toEmail.isBlank()) {
            throw new IllegalStateException("Missing APP_CONTACT_TO_EMAIL (recipient).");
        }

        SimpleMailMessage msg = new SimpleMailMessage();

        msg.setTo(toEmail);

        if (fromEmail != null && !fromEmail.isBlank()) {
            msg.setFrom(fromEmail);
        }

        msg.setReplyTo(req.getEmail());
        msg.setSubject("New Lawn Care Request from " + safe(req.getName()));

        String body = """
                You received a new service request:

                Name: %s
                Email: %s
                Phone: %s

                Message:
                %s
                """.formatted(
                safe(req.getName()),
                safe(req.getEmail()),
                safe(req.getPhone()),
                safe(req.getMessage())
        );

        msg.setText(body);
        mailSender.send(msg);
    }

    private String safe(String s) {
        return s == null ? "" : s.trim();
    }
}
