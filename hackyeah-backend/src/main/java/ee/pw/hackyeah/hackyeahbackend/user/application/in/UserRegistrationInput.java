package ee.pw.hackyeah.hackyeahbackend.user.application.in;

import java.time.LocalDate;
import lombok.Builder;
import lombok.extern.jackson.Jacksonized;

@Jacksonized
@Builder
public record UserRegistrationInput(
    String email,
    String firstName,
    String lastName,
    String nickName,
    String phoneNumber,
    LocalDate birthDate,
    String organization,
    String password
) {}
