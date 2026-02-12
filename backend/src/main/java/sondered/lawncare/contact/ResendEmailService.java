package sondered.lawncare.contact;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ResendEmailService {

    private final HttpClient client = HttpClient.newHttpClient();

    @Value("${resend.api-key}")
    private String apiKey;

    public void sendConfirmation(String toEmail, String name) {
        String safeName = (name == null || name.isBlank()) ? "there" : name;

        String html = """
      <div style="font-family: Arial, Helvetica, sans-serif; max-width:600px; margin:auto; color:#111;">
        <h2>We Received Your Junk Removal Request</h2>
        <p>Hi %s,</p>
        <p>Thank you for contacting <strong>512 Junk Removal</strong>. Your request has been received and we’ll follow up shortly.</p>
        <p>We typically respond within <strong>1–2 hours during business hours</strong>.</p>
        <p>If urgent, reply to this email or call <strong>(512) XXX-XXXX</strong>.</p>
        <hr style="margin:24px 0;" />
        <p>— 512 Junk Removal<br/>Austin, Texas<br/>service@512junkremoval.com</p>
      </div>
      """.formatted(escapeHtml(safeName));

        String json = """
      {
        "from": "512 Junk Removal <service@512junkremoval.com>",
        "to": ["%s"],
        "subject": "Your Junk Removal Request — Quote & Next Steps",
        "html": %s
      }
      """.formatted(escapeJson(toEmail), toJsonString(html));

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.resend.com/emails"))
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                throw new RuntimeException("Resend failed: " + response.statusCode() + " " + response.body());
            }
        } catch (Exception e) {
            throw new RuntimeException("Email send failed", e);
        }
    }

    // minimal helpers (good enough for names/emails)
    private static String escapeHtml(String s) {
        return s.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;").replace("\"","&quot;").replace("'","&#39;");
    }
    private static String escapeJson(String s) {
        return s.replace("\\","\\\\").replace("\"","\\\"");
    }
    private static String toJsonString(String s) {
        return "\"" + escapeJson(s) + "\"";
    }
}
