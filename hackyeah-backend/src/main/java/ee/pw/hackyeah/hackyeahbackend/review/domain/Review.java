package ee.pw.hackyeah.hackyeahbackend.review.domain;

import ee.pw.hackyeah.hackyeahbackend.learningresource.domain.LearningResource;
import ee.pw.hackyeah.hackyeahbackend.user.domain.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "reviews")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Review {

    @Id
    @GeneratedValue(
        generator = "reviews_seq",
        strategy = GenerationType.SEQUENCE
    )
    private Long id;

    @Min(0)
    @Max(5)
    @Column(name = "review_grade")
    private Long rating;

    @NotNull @Column(name = "comment", length = 1024)
    private String comment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User author;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "note_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private LearningResource learningResource;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
