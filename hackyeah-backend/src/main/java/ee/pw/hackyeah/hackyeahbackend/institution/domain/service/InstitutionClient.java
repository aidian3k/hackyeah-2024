package ee.pw.hackyeah.hackyeahbackend.institution.domain.service;

import ee.pw.hackyeah.hackyeahbackend.institution.application.in.institution.OuterInstitutionDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(
    name = "institutionClient",
    url = "https://polon.nauka.gov.pl/opi-ws/api/academicInstitutions"
)
interface InstitutionClient {
    @GetMapping
    OuterInstitutionDTO handleGetInstitutionRequest(
        @RequestParam String filters
    );
}
