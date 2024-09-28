package ee.pw.hackyeah.hackyeahbackend.institution.infrastructure.rest;

import ee.pw.hackyeah.hackyeahbackend.institution.application.in.course.CourseSearchFiltersDTO;
import ee.pw.hackyeah.hackyeahbackend.institution.application.in.institution.CourseOutDTO;
import ee.pw.hackyeah.hackyeahbackend.institution.domain.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/course")
public class CourseController {

    private final CourseService courseService;

    @PostMapping("/all")
    @Cacheable("faculty-courses-cache")
    public ResponseEntity<CourseOutDTO> handleGetUnitCoursesRequest(
        @RequestBody CourseSearchFiltersDTO filters
    ) {
        return ResponseEntity.ok(
            courseService.handleUnitCoursesSearch(filters)
        );
    }
}
