package ee.pw.hackyeah.hackyeahbackend.review.domain.service;

import ee.pw.hackyeah.hackyeahbackend.learningresource.domain.LearningResource;
import ee.pw.hackyeah.hackyeahbackend.review.application.in.ReviewInputDTO;
import ee.pw.hackyeah.hackyeahbackend.review.application.out.ReviewDTO;
import ee.pw.hackyeah.hackyeahbackend.review.domain.Review;
import ee.pw.hackyeah.hackyeahbackend.review.domain.repository.ReviewRepository;
import ee.pw.hackyeah.hackyeahbackend.user.domain.User;
import ee.pw.hackyeah.hackyeahbackend.user.domain.UserService;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final EntityManager entityManager;
    private final UserService userService;

    @Transactional
    public ReviewDTO createReview(ReviewInputDTO reviewInputDTO) {
        final User user = userService.getCurrentUser();
        LearningResource learningResource = entityManager.getReference(
            LearningResource.class,
            reviewInputDTO.learningResourceId()
        );
        final var review = Review
            .builder()
            .author(user)
            .rating(reviewInputDTO.rating())
            .comment(reviewInputDTO.comment())
            .learningResource(learningResource)
            .build();
        var savedReview = reviewRepository.save(review);
        learningResource.getReviews().add(savedReview);

        entityManager.merge(learningResource);

        return ReviewDTO
            .builder()
            .createdAt(savedReview.getCreatedAt())
            .authorName(user.getFirstName())
            .rating(savedReview.getRating())
            .learningResourceId(learningResource.getId())
            .reviewId(savedReview.getId())
            .comment(savedReview.getComment())
            .build();
    }

    @Transactional(readOnly = true)
    public List<ReviewDTO> getReviewsByLearningId(Long learningResourceId) {
        return reviewRepository
            .findAllByLearningResourceId(learningResourceId)
            .stream()
            .map(review -> ReviewDTO
                .builder()
                .createdAt(review.getCreatedAt())
                .authorName(review.getAuthor().getFirstName())
                .rating(review.getRating())
                .learningResourceId(review.getLearningResource().getId())
                .reviewId(review.getId())
                .comment(review.getComment())
                .build()
            )
            .toList();
    }
}
