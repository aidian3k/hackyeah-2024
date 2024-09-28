package ee.pw.hackyeah.hackyeahbackend.institution.application.out;

import lombok.Builder;

import java.util.List;

@Builder
public record InstitutionOutDTO(List<SingleInstitution> institutions) {
    public record SingleInstitution(String id, String name) {
    }
}
