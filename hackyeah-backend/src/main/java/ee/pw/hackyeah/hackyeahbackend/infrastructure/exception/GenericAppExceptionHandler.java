package ee.pw.hackyeah.hackyeahbackend.infrastructure.exception;

import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;

public record GenericAppExceptionHandler(
    Throwable throwable,
    String message,
    HttpStatus httpStatus,
    LocalDateTime localDateTime
) {}
