package ee.pw.hackyeah.hackyeahbackend.user.domain;

import ee.pw.hackyeah.hackyeahbackend.infrastructure.exception.GenericAppException;
import ee.pw.hackyeah.hackyeahbackend.user.application.in.UserRegistrationInput;
import ee.pw.hackyeah.hackyeahbackend.user.application.out.UserRegistrationResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserRegistrationResponse registerUser(
        UserRegistrationInput userRegistrationInput
    ) {
        if (userRepository.existsByEmail(userRegistrationInput.email())) {
            throw GenericAppException.of(
                "User with email " +
                userRegistrationInput.email() +
                " already exists",
                new IllegalArgumentException(),
                HttpStatus.BAD_REQUEST
            );
        }

        User user = User
            .builder()
            .firstName(userRegistrationInput.firstName())
            .email(userRegistrationInput.email())
                .tokens(1L)
            .lastName(userRegistrationInput.lastName())
            .nickName(userRegistrationInput.nickName())
            .password(passwordEncoder.encode(userRegistrationInput.password()))
            .phoneNumber(userRegistrationInput.phoneNumber())
            .build();

        User registeredUser = userRepository.save(user);

        return UserRegistrationResponse
            .builder()
            .firstName(registeredUser.getFirstName())
            .email(registeredUser.getLastName())
            .nickName(registeredUser.getNickName())
            .build();
    }

    @Transactional
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User getCurrentUser() {
        return (User) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> GenericAppException.of(
            "User with id " + email + " not found",
            new IllegalArgumentException(),
            HttpStatus.NOT_FOUND
        ));
    }
}
