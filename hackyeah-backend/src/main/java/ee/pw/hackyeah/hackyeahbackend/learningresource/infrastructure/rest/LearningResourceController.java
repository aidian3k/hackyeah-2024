package ee.pw.hackyeah.hackyeahbackend.learningresource.infrastructure.rest;

import ee.pw.hackyeah.hackyeahbackend.learningresource.application.in.LearningResourceCreationDTO;
import ee.pw.hackyeah.hackyeahbackend.learningresource.application.out.LearningResourceCreationOutDTO;
import ee.pw.hackyeah.hackyeahbackend.learningresource.domain.service.LearningResourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class LearningResourceController {
    private final LearningResourceService learningResourceService;

    @PostMapping("/learning-resource")
    public ResponseEntity<LearningResourceCreationOutDTO> handleLearningResourceCreation(
            @ModelAttribute("learningResourceCreationDTO") LearningResourceCreationDTO learningResourceCreationDTO,
            @ModelAttribute("filesList") List<MultipartFile> filesList
    ) {
        final LearningResourceCreationOutDTO learningResourceCreationOutDTO = learningResourceService.handleUserLearningResourceCreation(
                learningResourceCreationDTO,
                filesList
        );

        return ResponseEntity.ok(learningResourceCreationOutDTO);
    }
}
