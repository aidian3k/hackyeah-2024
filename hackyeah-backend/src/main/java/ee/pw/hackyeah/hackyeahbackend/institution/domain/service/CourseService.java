package ee.pw.hackyeah.hackyeahbackend.institution.domain.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import ee.pw.hackyeah.hackyeahbackend.institution.application.in.course.CourseSearchFiltersDTO;
import ee.pw.hackyeah.hackyeahbackend.institution.application.in.course.PolonFacultyCoursesDTO;
import ee.pw.hackyeah.hackyeahbackend.institution.application.in.institution.CourseOutDTO;
import ee.pw.hackyeah.hackyeahbackend.institution.domain.Course;
import ee.pw.hackyeah.hackyeahbackend.institution.domain.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CourseService {

    private final CourseClient courseClient;
    private final FacultyService facultyService;
    private final CourseRepository courseRepository;
    private final ObjectMapper objectMapper;

    @SneakyThrows
    public CourseOutDTO handleUnitCoursesSearch(
            CourseSearchFiltersDTO courseSearchFiltersDTO
    ) {
        List<CourseOutDTO.SingleCourse> singleCourses =
                courseClient
                        .handleGetUnitCoursesRequest(
                                objectMapper.writeValueAsString(courseSearchFiltersDTO)
                        )
                        .getStudies()
                        .stream()
                        .map(this::mapToSingleCourse)
                        .toList();

        singleCourses.forEach(this::saveIfCourseNotPersisted);

        return new CourseOutDTO(singleCourses);
    }

    private CourseOutDTO.SingleCourse mapToSingleCourse(PolonFacultyCoursesDTO.CourseInfo courseInfo) {
        return new CourseOutDTO.SingleCourse(courseInfo.getUid(),
                courseInfo.getCourseId(),
                courseInfo.getName(),
                courseInfo.getLevel(),
                courseInfo.getProfile(),
                courseInfo.getTitle(),
                courseInfo.getForms(),
                courseInfo.getInstitutions());
    }

    private void saveIfCourseNotPersisted(CourseOutDTO.SingleCourse singleCourse) {
        if (!courseRepository.existsById(singleCourse.uid())) {
            courseRepository.save(
                    Course
                            .builder()
                            .id(singleCourse.uid())
                            .courseId(singleCourse.courseId())
                            .forms(singleCourse.forms())
                            .title(singleCourse.title())
                            .faculty(facultyService.getFacultyByUid(singleCourse.institutions().getFirst()))
                            .name(singleCourse.name())
                            .level(singleCourse.level())
                            .profile(singleCourse.profile())
                            .build()
            );
        }
    }
}
