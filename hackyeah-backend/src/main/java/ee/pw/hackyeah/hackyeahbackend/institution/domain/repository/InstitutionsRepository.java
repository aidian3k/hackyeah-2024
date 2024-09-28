package ee.pw.hackyeah.hackyeahbackend.institution.domain.repository;

import ee.pw.hackyeah.hackyeahbackend.institution.domain.Institution;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstitutionsRepository extends JpaRepository<Institution, String> {
    boolean existsById(String id);
}