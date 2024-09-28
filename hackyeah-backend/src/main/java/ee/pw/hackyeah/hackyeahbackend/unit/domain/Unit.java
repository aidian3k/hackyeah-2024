package ee.pw.hackyeah.hackyeahbackend.unit.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "institution_units")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Unit {

    @Id
    private String id;

    private String name;

    private String status;
}
