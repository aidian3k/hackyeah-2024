package ee.pw.hackyeah.hackyeahbackend.institution.domain.service;

import ee.pw.hackyeah.hackyeahbackend.institution.application.in.course.PolonFacultyCoursesDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(
    name = "courseClient",
    url = "https://polon.nauka.gov.pl/opi-ws/api/studies"
)
interface CourseClient {
    @GetMapping
    PolonFacultyCoursesDTO handleGetUnitCoursesRequest(
        @RequestParam String filters
    );
}
