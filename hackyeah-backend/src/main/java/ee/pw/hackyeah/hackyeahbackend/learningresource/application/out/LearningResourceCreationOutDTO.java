package ee.pw.hackyeah.hackyeahbackend.learningresource.application.out;

import lombok.Builder;

@Builder
public record LearningResourceCreationOutDTO(Long id, String title, String description) {
}
