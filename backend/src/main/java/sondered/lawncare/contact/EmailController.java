package sondered.lawncare.contact;

import com.resend.core.exception.ResendException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class EmailController {

    private final ResendEmailService resendEmailService;

    public EmailController(ResendEmailService resendEmailService) {
        this.resendEmailService = resendEmailService;
    }

    public record EmailRequest(String email, String name) {}

    @PostMapping("/emails")
    public ResponseEntity<?> send(@RequestBody EmailRequest req) {
        System.out.println("BODY email=" + req.email() + " name=" + req.name());
        if (req.email() == null || req.email().isBlank()) {
            return ResponseEntity.badRequest().body("Missing email");
        }

        try {
            String id = resendEmailService.sendConfirmation(req.email(), req.name());
            return ResponseEntity.ok().body(id);
        } catch (ResendException e) {
            return ResponseEntity.status(500).body("Resend error: " + e.getMessage());
        }
    }
}
