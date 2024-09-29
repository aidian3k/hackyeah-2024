package ee.pw.hackyeah.hackyeahbackend.user.infrastructure.rest;

import ee.pw.hackyeah.hackyeahbackend.user.application.in.UserRegistrationInput;
import ee.pw.hackyeah.hackyeahbackend.user.application.out.CurrentUserDTO;
import ee.pw.hackyeah.hackyeahbackend.user.application.out.UserRegistrationResponse;
import ee.pw.hackyeah.hackyeahbackend.user.domain.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

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

    @GetMapping("/currentUserInfo")
    public ResponseEntity<CurrentUserDTO> getCurrentUserInfo() {
        return ResponseEntity.ok(Optional.ofNullable(userService.getCurrentUser())
                .map(user -> CurrentUserDTO.builder()
                        .userId(user.getId())
                        .firstName(user.getFirstName())
                        .nickName(user.getNickName())
                        .email(user.getEmail())
                        .tokens(user.getTokens())
                        .build()).get());
    }
}
