package sondered.lawncare.contact;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ResendEmailService {

    private final Resend resend;

    public ResendEmailService(@Value("${resend.api-key}") String apiKey) {
        System.out.println("RESEND key loaded (len=" + apiKey.length() +
                ", last4=" + apiKey.substring(Math.max(0, apiKey.length() - 4)) + ")");
        this.resend = new Resend(apiKey);
    }


    public String sendConfirmation(String toEmail, String name) throws ResendException {
        String safeName = (name == null || name.isBlank()) ? "there" : name;

        String html = """
      <div style="font-family: Arial, Helvetica, sans-serif; max-width:600px; margin:auto; color:#111;">
        <h2>We Received Your Junk Removal Request</h2>
        <p>Hi %s,</p>
        <p>Thanks for contacting <strong>512 Junk Removal</strong>. Your request has been received and we’ll follow up shortly.</p>
        <p>We typically respond within <strong>1–2 hours during business hours</strong>.</p>
        <p>If urgent, reply to this email or call <strong>(512) XXX-XXXX</strong>.</p>
        <hr style="margin:24px 0;" />
        <p>— 512 Junk Removal<br/>Austin, Texas<br/>service@512junkremoval.com</p>
      </div>
      """.formatted(escapeHtml(safeName));

        CreateEmailOptions params = CreateEmailOptions.builder()
                // IMPORTANT: use your verified domain in Resend:
                .from("512 Junk Removal <info@512junkremoval.com>")
                .to(toEmail)
                .subject("Your Junk Removal Request — Quote & Next Steps")
                .html(html)
                .build();

        CreateEmailResponse data = resend.emails().send(params);
        return data.getId();
    }

    private static String escapeHtml(String s) {
        return s.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;")
                .replace("\"","&quot;").replace("'","&#39;");
    }
}
