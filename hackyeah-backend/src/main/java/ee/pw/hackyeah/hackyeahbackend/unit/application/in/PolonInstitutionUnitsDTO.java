package ee.pw.hackyeah.hackyeahbackend.unit.application.in;

import lombok.*;
import lombok.extern.jackson.Jacksonized;

import java.util.List;

@Jacksonized
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Getter
@Setter
public class PolonInstitutionUnitsDTO {

    private List<UnitInfo> units;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UnitInfo {

        private String uid;
        private String name;
        private String status;
    }
}
