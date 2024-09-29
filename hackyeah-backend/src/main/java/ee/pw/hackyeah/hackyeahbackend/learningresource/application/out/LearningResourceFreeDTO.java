package ee.pw.hackyeah.hackyeahbackend.learningresource.application.out;

import ee.pw.hackyeah.hackyeahbackend.review.application.out.ReviewDTO;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record LearningResourceFreeDTO(
    Long id,
    String title,
    String description,
    LocalDateTime createdAt,
    ReviewDTO reviewDTO,
    int numberOfPhotos,
    int numberOfVideos,
    int numberOfPdfs,
    int otherMaterials
) {}
