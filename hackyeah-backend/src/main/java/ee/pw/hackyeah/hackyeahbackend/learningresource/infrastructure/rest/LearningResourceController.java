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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class LearningResourceController {

    private final LearningResourceService learningResourceService;

    @PostMapping("/learning-resource/create")
    public ResponseEntity<LearningResourceBoughtDTO> handleLearningResourceCreation(
        @ModelAttribute(
            "learningResourceCreationDTO"
        ) LearningResourceCreationDTO learningResourceCreationDTO,
        @ModelAttribute("filesList") List<MultipartFile> filesList
    ) {
        final LearningResourceBoughtDTO learningResourceBoughtDTO =
            learningResourceService.handleUserLearningResourceCreation(
                learningResourceCreationDTO,
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
