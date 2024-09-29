package ee.pw.hackyeah.hackyeahbackend.institution.application.in.institution;

import java.util.List;
import lombok.Builder;

@Builder
public record CourseOutDTO(List<SingleCourse> courses) {
    public record SingleCourse(
        String uid,
        String courseId,
        String name,
        String level,
        String profile,
        String title,
        String forms,
        List<String> institutions
    ) {}
}
