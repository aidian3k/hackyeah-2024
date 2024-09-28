package ee.pw.hackyeah.hackyeahbackend.institution.domain.repository;

import ee.pw.hackyeah.hackyeahbackend.institution.domain.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, String> {
}
