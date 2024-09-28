package ee.pw.hackyeah.hackyeahbackend.unit.infrastructure.rest;

import ee.pw.hackyeah.hackyeahbackend.unit.application.out.UnitOutDTO;
import ee.pw.hackyeah.hackyeahbackend.unit.domain.service.UnitService;
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
public class UnitController {

    private final UnitService unitService;

    @GetMapping("/all")
    @Cacheable("units-cache")
    public ResponseEntity<UnitOutDTO> handleGetInstitutionUnitsRequest(
        @RequestParam(name = "institutionId") String institutionId
    ) {
        return ResponseEntity.ok(
            unitService.handleInstitutionUnitsSearch(institutionId)
        );
    }
}
