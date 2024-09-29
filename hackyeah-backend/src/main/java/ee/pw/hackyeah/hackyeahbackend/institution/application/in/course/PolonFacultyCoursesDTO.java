package ee.pw.hackyeah.hackyeahbackend.institution.application.in.course;

import java.util.List;
import lombok.*;
import lombok.extern.jackson.Jacksonized;

@Jacksonized
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Getter
@Setter
public class PolonFacultyCoursesDTO {

    private List<CourseInfo> studies;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CourseInfo {

        private String uid;
        private String courseId;
        private String name;
        private String level;
        private String profile;
        private String title;
        private String forms;
        private List<String> institutions;
    }
}
