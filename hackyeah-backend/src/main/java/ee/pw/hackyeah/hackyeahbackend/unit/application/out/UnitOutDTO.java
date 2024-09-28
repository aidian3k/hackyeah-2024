package ee.pw.hackyeah.hackyeahbackend.unit.application.out;

import java.util.List;
import lombok.Builder;

@Builder
public record UnitOutDTO(List<SingleUnit> units) {
    public record SingleUnit(String uuid, String name, String status) {}
}
