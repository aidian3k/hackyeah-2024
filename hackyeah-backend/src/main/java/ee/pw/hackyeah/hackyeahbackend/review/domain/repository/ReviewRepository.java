package ee.pw.hackyeah.hackyeahbackend.review.domain.repository;

import ee.pw.hackyeah.hackyeahbackend.review.domain.Review;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query(
        "SELECT r FROM Review r WHERE r.learningResource.id = :learningResourceId"
    )
    Set<Review> findAllByLearningResourceId(Long learningResourceId);
}
