package ee.pw.hackyeah.hackyeahbackend.institution.application.out;

import java.util.List;
import lombok.Builder;

@Builder
public record FacultyOutDTO(List<SingleUnit> units) {
    public record SingleUnit(String uuid, String name, String status) {}
}
