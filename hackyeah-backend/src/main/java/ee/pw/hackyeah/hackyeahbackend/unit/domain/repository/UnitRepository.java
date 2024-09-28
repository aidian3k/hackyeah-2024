package ee.pw.hackyeah.hackyeahbackend.unit.domain.repository;

import ee.pw.hackyeah.hackyeahbackend.unit.domain.Unit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UnitRepository extends JpaRepository<Unit, String> {
    boolean existsById(String id);
}
