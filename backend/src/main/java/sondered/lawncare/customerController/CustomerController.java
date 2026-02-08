package sondered.lawncare.customerController;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sondered.lawncare.customerEntity.CustomerEntity;
import sondered.lawncare.customerService.CustomerService;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping
    public ResponseEntity<CustomerEntity> addCustomer(@RequestBody CustomerEntity newCustomer) {
        return ResponseEntity.ok(customerService.createCustomer(newCustomer));
    }
    @GetMapping
    public ResponseEntity<List<CustomerEntity>> getAllCustomers() {
        return ResponseEntity.ok(customerService.fetchCustomers());
    }
}
