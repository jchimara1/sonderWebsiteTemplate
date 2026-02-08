package sondered.lawncare.customerEntity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "contact_requests")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerEntity {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String email;
    private String phone;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Column(name = "service_type")
    private String serviceType;

    private String address;

    @Column(name = "preferred_contact")
    private String preferredContact;

    private String status = "NEW";
    private String source = "website";

    @Column(name = "consent_to_contact")
    private boolean consentToContact;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public UUID getId() { return id; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getMessage() { return message; }
    public String getServiceType() { return serviceType; }
    public String getAddress() { return address; }
    public String getPreferredContact() { return preferredContact; }
    public String getStatus() { return status; }
    public String getSource() { return source; }
    public boolean isConsentToContact() { return consentToContact; }
    public LocalDateTime getCreatedAt() { return createdAt; }

}


