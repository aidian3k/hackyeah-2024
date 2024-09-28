package ee.pw.hackyeah.hackyeahbackend.infrastructure.clock;

import java.time.Clock;
import java.time.LocalDate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration(proxyBeanMethods = false)
@Slf4j
class ClockConfiguration {

    @Bean
    public Clock configureClock() {
        Clock clock = Clock.systemUTC();
        log.debug(
            "Configured clock: {} with current time: {}",
            clock,
            LocalDate.now(clock)
        );

        return clock;
    }
}
