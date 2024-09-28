package ee.pw.hackyeah.hackyeahbackend.infrastructure.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class GenericAppException extends RuntimeException{
    private final HttpStatus httpStatus;
    private final String message;
    private final Throwable throwable;

    private GenericAppException(String message, Throwable throwable, HttpStatus httpStatus) {
        super(message, throwable);
        this.message = message;
        this.throwable = throwable;
        this.httpStatus = httpStatus;
    }

    public static GenericAppException of(String message, Throwable throwable, HttpStatus httpStatus) {
        return new GenericAppException(message, throwable, httpStatus);
    }
}
