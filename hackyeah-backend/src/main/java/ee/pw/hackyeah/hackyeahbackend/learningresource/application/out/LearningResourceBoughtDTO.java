package ee.pw.hackyeah.hackyeahbackend.learningresource.application.out;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;

@Builder
public record LearningResourceBoughtDTO(
    Long id,
    String title,
    String description,
    LocalDateTime createdAt,
    List<String> pdfMediaResources,
    List<String> videoMediaResources,
    List<String> imageMediaResources,
    List<String> otherMediaResources
) {}
