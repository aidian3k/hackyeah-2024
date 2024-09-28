package ee.pw.hackyeah.hackyeahbackend.user.domain;

import ee.pw.hackyeah.hackyeahbackend.user.application.in.UserRegistrationInput;
import ee.pw.hackyeah.hackyeahbackend.user.application.out.UserRegistrationResponse;
import lombok.RequiredArgsConstructor;
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
        User user = User
            .builder()
            .firstName(userRegistrationInput.firstName())
            .email(userRegistrationInput.email())
            .birthDate(userRegistrationInput.birthDate())
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
}
