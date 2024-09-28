package ee.pw.hackyeah.hackyeahbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableCaching
@EnableFeignClients
class HackYeahBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(HackYeahBackendApplication.class, args);
    }
}
