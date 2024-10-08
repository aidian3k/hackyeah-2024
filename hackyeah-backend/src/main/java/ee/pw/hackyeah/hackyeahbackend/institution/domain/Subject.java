package ee.pw.hackyeah.hackyeahbackend.institution.domain;

import ee.pw.hackyeah.hackyeahbackend.learningresource.domain.LearningResource;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "subjects")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Subject {

    @Id
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "subjects_seq"
    )
    @SequenceGenerator(name = "subjects_seq", allocationSize = 1)
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Course course;

    @OneToMany(
        fetch = FetchType.LAZY,
        cascade = CascadeType.ALL,
        mappedBy = "subject"
    )
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @Builder.Default
    private Set<LearningResource> learningResources = new HashSet<>();
}
