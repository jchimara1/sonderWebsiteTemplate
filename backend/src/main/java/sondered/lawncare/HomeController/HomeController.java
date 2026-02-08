package sondered.lawncare.HomeController;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    // GET / → simple root endpoint
    @GetMapping("/")
    public String home() {
        return "LawnCare API is running!";
    }
}
