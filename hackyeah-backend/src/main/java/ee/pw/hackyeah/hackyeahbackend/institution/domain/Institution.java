package ee.pw.hackyeah.hackyeahbackend.institution.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
@Table(name = "institution")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Institution {

    @Id
    private String id;

    private String name;

    @OneToMany(
        fetch = FetchType.LAZY,
        mappedBy = "institution",
        cascade = CascadeType.ALL
    )
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Set<Faculty> faculties = new HashSet<>();
}
