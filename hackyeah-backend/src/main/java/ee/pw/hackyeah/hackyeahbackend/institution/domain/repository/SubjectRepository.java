package ee.pw.hackyeah.hackyeahbackend.institution.domain.repository;

import ee.pw.hackyeah.hackyeahbackend.institution.domain.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
}
