package ee.pw.hackyeah.hackyeahbackend.learningresource.domain.repository;

import ee.pw.hackyeah.hackyeahbackend.learningresource.domain.LearningResource;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LearningResourceRepository
    extends JpaRepository<LearningResource, Long> {

    @Query("select lr from LearningResource lr" +
            " where lr.subject.name like %:subjectName%" +
            " or lr.subject.course.id = :courseId " +
            "or lr.subject.course.faculty.id = :unitId " +
            "or lr.subject.course.faculty.institution.id = :institutionId")
    Set<LearningResource> findLearningResourcesBySubjectNameAndCourseIdAndInstitutionIdAndUnitId(
        String subjectName,
        String courseId,
        String institutionId,
        String unitId
    );

    @Query("select lr from LearningResource lr" +
            " where lr.subject.id = :subjectId")
    Set<LearningResource> findLearningResourcesBySubjectId(Long subjectId);
}
