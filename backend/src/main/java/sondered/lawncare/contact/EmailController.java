
package sondered.lawncare.contact;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class EmailController {

    public record EmailRequest(String email, String name) {}

    private final ResendEmailService resendEmailService;

    public EmailController(ResendEmailService resendEmailService) {
        this.resendEmailService = resendEmailService;
    }

    @PostMapping("/emails")
    public ResponseEntity<?> sendEmail(@RequestBody EmailRequest req) {
        if (req.email() == null || req.email().isBlank()) {
            return ResponseEntity.badRequest().body("Missing email");
        }
        resendEmailService.sendConfirmation(req.email(), req.name());
        return ResponseEntity.ok().build();
    }
}
