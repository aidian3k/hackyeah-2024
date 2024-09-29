package ee.pw.hackyeah.hackyeahbackend.institution.domain.service;

import ee.pw.hackyeah.hackyeahbackend.institution.application.in.faculty.PolonInstitutionFacultyDTO;
import ee.pw.hackyeah.hackyeahbackend.institution.application.out.FacultyOutDTO;
import ee.pw.hackyeah.hackyeahbackend.institution.domain.Faculty;
import ee.pw.hackyeah.hackyeahbackend.institution.domain.repository.FacultyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class FacultyService {

    private final FacultyClient facultyClient;
    private final FacultyRepository facultyRepository;
    private final InstitutionService institutionService;

    public FacultyOutDTO handleInstitutionUnitsSearch(String institutionId) {
        List<FacultyOutDTO.SingleUnit> singleUnits = facultyClient
                .handleGetInstitutionFacultiesRequest(institutionId).getUnits().stream()
                .map(this::mapToSingleUnits)
                .toList();

        singleUnits.forEach(unit -> saveIfUnitNotPersisted(unit, institutionId));

        return new FacultyOutDTO(singleUnits);
    }

    private FacultyOutDTO.SingleUnit mapToSingleUnits(PolonInstitutionFacultyDTO.UnitInfo singleUnit) {
        return new FacultyOutDTO.SingleUnit(singleUnit.getUid(),
                singleUnit.getName(),
                singleUnit.getStatus());
    }

    private void saveIfUnitNotPersisted(FacultyOutDTO.SingleUnit singleUnit, String institutionId) {
        if (!facultyRepository.existsById(singleUnit.uuid())) {
            facultyRepository.save(
                    Faculty
                            .builder()
                            .id(singleUnit.uuid())
                            .name(singleUnit.name())
                            .status(singleUnit.status())
                            .institution(institutionService.getInstitutionByUid(institutionId))
                            .build()
            );
        }
    }

    public Faculty getFacultyByUid(String uid) {
        return facultyRepository.findById(uid).orElse(null);
    }
}
