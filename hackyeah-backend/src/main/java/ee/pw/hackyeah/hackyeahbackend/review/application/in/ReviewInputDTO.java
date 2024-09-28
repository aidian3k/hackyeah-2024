package ee.pw.hackyeah.hackyeahbackend.review.application.in;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Builder;

@Builder
public record ReviewInputDTO(
    Long learningResourceId,
    @Min(0) @Max(5) Long rating,
    String comment
) {}
