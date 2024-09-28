package ee.pw.hackyeah.hackyeahbackend.user.application.out;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

@Builder
@Jacksonized
@Getter
@Setter
@AllArgsConstructor
public class UserRegistrationResponse {

    private String nickName;
    private String firstName;
    private String email;
}
