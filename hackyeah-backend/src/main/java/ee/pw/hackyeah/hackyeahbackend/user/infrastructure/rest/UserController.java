package ee.pw.hackyeah.hackyeahbackend.user.infrastructure.rest;

import ee.pw.hackyeah.hackyeahbackend.user.application.in.UserRegistrationInput;
import ee.pw.hackyeah.hackyeahbackend.user.application.out.UserRegistrationResponse;
import ee.pw.hackyeah.hackyeahbackend.user.domain.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserRegistrationResponse> handleUserRegistration(
        @RequestBody UserRegistrationInput userRegistrationInput
    ) {
        return new ResponseEntity<>(
            userService.registerUser(userRegistrationInput),
            HttpStatus.CREATED
        );
    }
}
