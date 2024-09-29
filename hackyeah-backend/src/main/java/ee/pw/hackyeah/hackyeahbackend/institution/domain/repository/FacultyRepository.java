package ee.pw.hackyeah.hackyeahbackend.institution.domain.repository;

import ee.pw.hackyeah.hackyeahbackend.institution.domain.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultyRepository extends JpaRepository<Faculty, String> {
    boolean existsById(String id);
}
