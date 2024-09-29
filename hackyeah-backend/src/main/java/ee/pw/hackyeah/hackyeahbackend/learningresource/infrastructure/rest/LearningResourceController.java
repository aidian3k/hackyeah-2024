package ee.pw.hackyeah.hackyeahbackend.learningresource.infrastructure.rest;

import ee.pw.hackyeah.hackyeahbackend.learningresource.application.in.LearningResourceBuyInputDTO;
import ee.pw.hackyeah.hackyeahbackend.learningresource.application.in.LearningResourceCreationDTO;
import ee.pw.hackyeah.hackyeahbackend.learningresource.application.in.LearningResourceSearchInputDTO;
import ee.pw.hackyeah.hackyeahbackend.learningresource.application.out.LearningResourceBoughtDTO;
import ee.pw.hackyeah.hackyeahbackend.learningresource.application.out.LearningResourceFreeDTO;
import ee.pw.hackyeah.hackyeahbackend.learningresource.domain.service.LearningResourceService;
import java.util.List;
import java.util.Set;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class LearningResourceController {

    private final LearningResourceService learningResourceService;

    @GetMapping("/learning-resource/{subjectId}")
    public ResponseEntity<Set<LearningResourceBoughtDTO>> handleLearningResourcesBought(
        @RequestBody Long subjectId
    ) {
        final Set<LearningResourceBoughtDTO> learningResourceFreeDTO =
            learningResourceService.getLearningResourceBoughtForSubjectId(
                subjectId
            );

        return ResponseEntity.ok(learningResourceFreeDTO);
    }

    @GetMapping("/learning-resource/bought")
    public ResponseEntity<Set<LearningResourceBoughtDTO>> handleLearningResourcesBought() {
        final Set<LearningResourceBoughtDTO> learningResourceFreeDTO =
            learningResourceService.getLearningResourceBought();

        return ResponseEntity.ok(learningResourceFreeDTO);
    }

    @PostMapping( path = "/learning-resource/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<LearningResourceBoughtDTO> handleLearningResourceCreation(
        @RequestParam(
            "subjectName"
        ) String subjectName,
        @RequestParam(
            "courseId"
        ) String courseId,
        @RequestParam(
            "institutionId"
        ) String institutionId,
        @RequestParam(
            "unitId"
        ) String unitId,
        @RequestParam(
            "description"
        ) String description,
        @RequestParam(
            "title"
        ) String title,
        @RequestParam("filesList") List<MultipartFile> filesList
    ) {
        final LearningResourceBoughtDTO learningResourceBoughtDTO =
            learningResourceService.handleUserLearningResourceCreation(
                LearningResourceCreationDTO.
                    builder()
                        .unitId(unitId)
                        .institutionId(institutionId)
                        .courseId(courseId)
                        .subjectName(subjectName)
                        .title(title)
                        .description(description)
                        .build(),
                filesList
            );

        return ResponseEntity.ok(learningResourceBoughtDTO);
    }

    @PostMapping("/learning-resources/free")
    public ResponseEntity<Set<LearningResourceFreeDTO>> handleSearchOfMaterialsFor(
        @RequestBody LearningResourceSearchInputDTO learningResourceSearchInputDTO
    ) {
        final Set<LearningResourceFreeDTO> learningResourceFreeDTO =
            learningResourceService.getLearningResourceFreeFor(
                learningResourceSearchInputDTO
            );

        return ResponseEntity.ok(learningResourceFreeDTO);
    }

    @PostMapping("/learning-resources/{learningResourceId}/buy")
    public ResponseEntity<LearningResourceBoughtDTO> handleLearningResourcePurchase(
        @RequestBody LearningResourceBuyInputDTO learningResourceId
    ) {
        final LearningResourceBoughtDTO learningResourceBoughtDTO =
            learningResourceService.handleUserLearningResourcePurchase(
                learningResourceId
            );

        return ResponseEntity.ok(learningResourceBoughtDTO);
    }
}
