package ee.pw.hackyeah.hackyeahbackend.institution.domain.service;

import ee.pw.hackyeah.hackyeahbackend.institution.application.in.faculty.PolonInstitutionFacultyDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
    name = "unitClient",
    url = "https://polon.nauka.gov.pl/opi-ws/api/institutions"
)
interface FacultyClient {

    @GetMapping("/{institutionId}/units")
    PolonInstitutionFacultyDTO handleGetInstitutionFacultiesRequest(
        @PathVariable("institutionId") String institutionId
    );
}
