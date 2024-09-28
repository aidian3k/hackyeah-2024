package ee.pw.hackyeah.hackyeahbackend.institution.domain.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import ee.pw.hackyeah.hackyeahbackend.institution.application.in.institution.InstitutionSearchFiltersDTO;
import ee.pw.hackyeah.hackyeahbackend.institution.application.out.InstitutionOutDTO;
import ee.pw.hackyeah.hackyeahbackend.institution.domain.Institution;
import ee.pw.hackyeah.hackyeahbackend.institution.domain.repository.InstitutionsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class InstitutionService {
    private final InstitutionClient institutionClient;
    private final InstitutionsRepository institutionsRepository;
    private final ObjectMapper objectMapper;

    public InstitutionOutDTO handleInstitutionSearch(InstitutionSearchFiltersDTO institutionSearchFiltersDTO)
            throws JsonProcessingException {
        List<InstitutionOutDTO.SingleInstitution> singleInstitutions = institutionClient.handleGetInstitutionRequest(objectMapper.writeValueAsString(institutionSearchFiltersDTO))
                .getInstitutions()
                .stream()
                .map(institutionInfo -> new InstitutionOutDTO.SingleInstitution(
                        institutionInfo.getUid(),
                        institutionInfo.getName()
                ))
                .toList();

        singleInstitutions.forEach(
                singleInstitution -> {
                    if(!institutionsRepository.existsById(singleInstitution.id())) {
                        institutionsRepository.save(Institution
                                .builder()
                                .id(singleInstitution.id())
                                .name(singleInstitution.name())
                                .build());
                    }
                }
        );

        return new InstitutionOutDTO(singleInstitutions);
    }
}
