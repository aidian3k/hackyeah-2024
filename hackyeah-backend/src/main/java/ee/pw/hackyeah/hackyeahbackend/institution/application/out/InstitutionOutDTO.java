package ee.pw.hackyeah.hackyeahbackend.institution.application.out;

import java.util.List;
import lombok.Builder;

@Builder
public record InstitutionOutDTO(List<SingleInstitution> institutions) {
    public record SingleInstitution(String id, String name) {}
}
