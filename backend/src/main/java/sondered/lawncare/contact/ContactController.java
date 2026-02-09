package sondered.lawncare.contact;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sondered.lawncare.contact.ContactRequest;
import sondered.lawncare.contact.EmailService;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final EmailService emailService;

    public ContactController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<?> submit(@RequestBody ContactRequest req) {
        // minimal validation
        if (req.getEmail() == null || req.getEmail().isBlank()) {
            return ResponseEntity.badRequest().body("Email is required");
        }
        if (req.getMessage() == null || req.getMessage().isBlank()) {
            return ResponseEntity.badRequest().body("Message is required");
        }

        emailService.sendServiceRequest(req);
        return ResponseEntity.ok().build();
    }
}
