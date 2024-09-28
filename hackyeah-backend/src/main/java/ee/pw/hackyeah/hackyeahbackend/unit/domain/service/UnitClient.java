package ee.pw.hackyeah.hackyeahbackend.unit.domain.service;

import ee.pw.hackyeah.hackyeahbackend.unit.application.in.PolonInstitutionUnitsDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
    name = "unitClient",
    url = "https://polon.nauka.gov.pl/opi-ws/api/institutions"
)
interface UnitClient {
    @GetMapping("/{institutionId}/units")
    PolonInstitutionUnitsDTO handleGetInstitutionUnitsRequest(
        @PathVariable("institutionId") String institutionId
    );
}
