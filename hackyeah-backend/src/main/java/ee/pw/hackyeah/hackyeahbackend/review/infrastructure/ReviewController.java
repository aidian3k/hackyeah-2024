package ee.pw.hackyeah.hackyeahbackend.review.infrastructure;

import ee.pw.hackyeah.hackyeahbackend.review.application.in.ReviewInputDTO;
import ee.pw.hackyeah.hackyeahbackend.review.application.out.ReviewDTO;
import ee.pw.hackyeah.hackyeahbackend.review.domain.service.ReviewService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/review")
@RequiredArgsConstructor
class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/{learningResourceId}")
    public List<ReviewDTO> getReviews(@PathVariable Long learningResourceId) {
        return reviewService.getReviewsByLearningId(learningResourceId);
    }

    @PostMapping
    public ReviewDTO createReviewFor(
        @RequestBody ReviewInputDTO reviewInputDTO
    ) {
        return reviewService.createReview(reviewInputDTO);
    }
}
