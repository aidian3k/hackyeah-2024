package ee.pw.hackyeah.hackyeahbackend.institution.domain.service;

import ee.pw.hackyeah.hackyeahbackend.institution.domain.Course;
import ee.pw.hackyeah.hackyeahbackend.institution.domain.Subject;
import ee.pw.hackyeah.hackyeahbackend.institution.domain.repository.CourseRepository;
import ee.pw.hackyeah.hackyeahbackend.institution.domain.repository.SubjectRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubjectService {

    private final SubjectRepository subjectRepository;
    private final CourseRepository courseRepository;

    @Transactional
    public Subject attachSubjectToCourseFor(
        String courseId,
        String subjectName
    ) {
        Course course = courseRepository
            .findById(courseId)
            .orElseThrow(() -> new IllegalStateException("Course not found"));

        Subject subject = Subject
            .builder()
            .name(subjectName)
            .course(course)
            .build();

        Subject savedSubject = subjectRepository.save(subject);
        course.getSubjects().add(subject);
        courseRepository.save(course);

        return savedSubject;
    }
}
