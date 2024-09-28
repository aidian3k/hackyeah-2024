package ee.pw.hackyeah.hackyeahbackend.media.domain;

import ee.pw.hackyeah.hackyeahbackend.learningresource.domain.LearningResource;
import ee.pw.hackyeah.hackyeahbackend.user.domain.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
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
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "media")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Media {

    @Id
    @GeneratedValue(
        generator = "medias_seq",
        strategy = GenerationType.SEQUENCE
    )
    @SequenceGenerator(name = "medias_seq", allocationSize = 1)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "note_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private LearningResource learningResource;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User user;

    @NotNull @Column(name = "object_key")
    private String objectKey;

    @NotNull @Enumerated(EnumType.STRING)
    private MediaType mediaType;

    @CreationTimestamp
    private LocalDateTime created;

    @UpdateTimestamp
    private LocalDateTime updated;
}
