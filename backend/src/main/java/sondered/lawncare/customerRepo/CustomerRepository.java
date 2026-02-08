package sondered.lawncare.customerRepo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sondered.lawncare.customerEntity.CustomerEntity;

import java.util.UUID;
@Repository
public interface CustomerRepository extends JpaRepository<CustomerEntity, UUID> {
}
