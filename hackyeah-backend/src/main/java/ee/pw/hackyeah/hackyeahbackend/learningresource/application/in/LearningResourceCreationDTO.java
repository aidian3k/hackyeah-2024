package ee.pw.hackyeah.hackyeahbackend.learningresource.application.in;

import lombok.Builder;

@Builder
public record LearningResourceCreationDTO(
    String title,
    String institutionId,
    String unitId,
    String courseId,
    String subjectName,
    String description
) {}
