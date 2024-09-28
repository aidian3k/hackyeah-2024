package ee.pw.hackyeah.hackyeahbackend.review.application.out;

import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record ReviewDTO(
    Long subjectId,
    Long reviewId,
    Long rating,
    String comment,
    String authorName,
    LocalDateTime createdAt
) {}
