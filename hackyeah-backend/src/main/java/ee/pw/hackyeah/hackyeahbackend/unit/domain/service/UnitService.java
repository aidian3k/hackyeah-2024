package ee.pw.hackyeah.hackyeahbackend.unit.domain.service;

import ee.pw.hackyeah.hackyeahbackend.unit.application.in.PolonInstitutionUnitsDTO;
import ee.pw.hackyeah.hackyeahbackend.unit.application.out.UnitOutDTO;
import ee.pw.hackyeah.hackyeahbackend.unit.domain.Unit;
import ee.pw.hackyeah.hackyeahbackend.unit.domain.repository.UnitRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UnitService {

    private final UnitClient unitClient;
    private final UnitRepository unitRepository;

    public UnitOutDTO handleInstitutionUnitsSearch(String institutionId) {
        List<UnitOutDTO.SingleUnit> singleUnits = unitClient
            .handleGetInstitutionUnitsRequest(institutionId)
            .getUnits()
            .stream()
            .map(this::mapToSingleUnits)
            .toList();

        singleUnits.forEach(this::saveIfUnitNotPersisted);

        return new UnitOutDTO(singleUnits);
    }

    private UnitOutDTO.SingleUnit mapToSingleUnits(
        PolonInstitutionUnitsDTO.UnitInfo singleUnit
    ) {
        return new UnitOutDTO.SingleUnit(
            singleUnit.getUid(),
            singleUnit.getName(),
            singleUnit.getStatus()
        );
    }

    private void saveIfUnitNotPersisted(UnitOutDTO.SingleUnit singleUnit) {
        if (!unitRepository.existsById(singleUnit.uuid())) {
            unitRepository.save(
                Unit
                    .builder()
                    .id(singleUnit.uuid())
                    .name(singleUnit.name())
                    .status(singleUnit.status())
                    .build()
            );
        }
    }
}
