package ee.pw.hackyeah.hackyeahbackend.unit.application.out;

import lombok.Builder;

import java.util.List;

@Builder
public record UnitOutDTO(List<SingleUnit> units) {
    public record SingleUnit(String uuid, String name, String status) {}
}
