package ee.pw.hackyeah.hackyeahbackend.learningresource.application.in;

import lombok.Builder;

@Builder
public record LearningResourceSearchInputDTO(
    String subjectName,
    String courseId,
    String institutionId,
    String unitId
) {}
