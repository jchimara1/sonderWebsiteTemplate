package sondered.lawncare.customerService;

import org.springframework.stereotype.Service;
import sondered.lawncare.customerEntity.CustomerEntity;
import sondered.lawncare.customerRepo.CustomerRepository;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public CustomerEntity createCustomer(CustomerEntity customer) {
        return customerRepository.save(customer);
    }

    public List<CustomerEntity> fetchCustomers() {
        return customerRepository.findAll(); // returns full entities
    }

}
