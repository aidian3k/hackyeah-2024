package ee.pw.hackyeah.hackyeahbackend.institution.application.out;

import lombok.Builder;

import java.util.List;

@Builder
public record CourseOutDTO(List<SingleUnit> units) {
    public record SingleUnit(String uuid, String name, String status) {}
}
