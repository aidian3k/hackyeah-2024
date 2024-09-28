package ee.pw.hackyeah.hackyeahbackend.institution.application.in.institution;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

@Jacksonized
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Getter
@Setter
public class OuterInstitutionDTO {

    private List<InstitutionInfo> institutions;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class InstitutionInfo {

        private String uid;
        private String name;
    }
}
