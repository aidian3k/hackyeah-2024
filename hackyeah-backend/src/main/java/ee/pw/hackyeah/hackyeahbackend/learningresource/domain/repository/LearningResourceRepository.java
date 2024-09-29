package ee.pw.hackyeah.hackyeahbackend.learningresource.domain.repository;

import ee.pw.hackyeah.hackyeahbackend.learningresource.domain.LearningResource;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearningResourceRepository
    extends JpaRepository<LearningResource, Long> {
    Set<LearningResource> findLearningResourcesBySubjectNameAndCourseIdAndInstitutionIdAndUnitId(
        String subjectName,
        String courseId,
        String institutionId,
        String unitId
    );
}
