package ee.pw.hackyeah.hackyeahbackend.user.application.out;

import lombok.Builder;

@Builder
public record CurrentUserDTO(Long userId, String firstName, String nickName, String email, Long tokens){}
