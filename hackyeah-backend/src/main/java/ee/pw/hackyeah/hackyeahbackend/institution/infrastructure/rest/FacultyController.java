package ee.pw.hackyeah.hackyeahbackend.institution.infrastructure.rest;

import ee.pw.hackyeah.hackyeahbackend.institution.application.out.FacultyOutDTO;
import ee.pw.hackyeah.hackyeahbackend.institution.domain.service.FacultyService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/unit")
public class FacultyController {

    private final FacultyService facultyService;

    @GetMapping("/all")
    @Cacheable("units-cache")
    public ResponseEntity<FacultyOutDTO> handleGetInstitutionFacultiesRequest(
        @RequestParam(name = "institutionId") String institutionId
    ) {
        return ResponseEntity.ok(
            facultyService.handleInstitutionUnitsSearch(institutionId)
        );
    }
}
