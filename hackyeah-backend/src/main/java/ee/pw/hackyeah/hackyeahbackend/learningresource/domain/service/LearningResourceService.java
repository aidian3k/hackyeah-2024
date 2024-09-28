package ee.pw.hackyeah.hackyeahbackend.learningresource.domain.service;

import ee.pw.hackyeah.hackyeahbackend.learningresource.application.in.LearningResourceCreationDTO;
import ee.pw.hackyeah.hackyeahbackend.learningresource.application.out.LearningResourceCreationOutDTO;
import ee.pw.hackyeah.hackyeahbackend.learningresource.domain.LearningResource;
import ee.pw.hackyeah.hackyeahbackend.user.domain.User;
import ee.pw.hackyeah.hackyeahbackend.user.domain.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LearningResourceService {
    private final LearningResourceRepository learningResourceRepository;
    private final UserService userService;

    @Transactional
    public LearningResourceCreationOutDTO handleUserLearningResourceCreation(
        LearningResourceCreationDTO learningResourceCreationDTO,
        List<MultipartFile> filesList
    ) {
        final User authorOfLearningMaterial = userService.getCurrentUser();

        final LearningResource learningResource = LearningResource
                .builder()
                .author(authorOfLearningMaterial)
                .title(learningResourceCreationDTO.title())
                .description(learningResourceCreationDTO.description())
                .build();

        return null; //to be implemented
    }
}
