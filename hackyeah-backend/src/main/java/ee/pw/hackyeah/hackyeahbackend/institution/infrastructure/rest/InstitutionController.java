package ee.pw.hackyeah.hackyeahbackend.institution.infrastructure.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import ee.pw.hackyeah.hackyeahbackend.institution.application.in.institution.InstitutionSearchFiltersDTO;
import ee.pw.hackyeah.hackyeahbackend.institution.application.out.InstitutionOutDTO;
import ee.pw.hackyeah.hackyeahbackend.institution.domain.service.InstitutionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/institution")
public class InstitutionController {

    private final InstitutionService institutionService;

    @PostMapping
    public ResponseEntity<InstitutionOutDTO> handleGetOuterInstitutionRequest(
        @RequestBody InstitutionSearchFiltersDTO filters
    ) throws JsonProcessingException {
        return ResponseEntity.ok(
            institutionService.handleInstitutionSearch(filters)
        );
    }
}
