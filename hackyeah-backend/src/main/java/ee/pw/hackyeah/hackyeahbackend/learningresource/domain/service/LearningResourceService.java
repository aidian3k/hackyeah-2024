package ee.pw.hackyeah.hackyeahbackend.learningresource.domain.service;

import ee.pw.hackyeah.hackyeahbackend.institution.domain.Subject;
import ee.pw.hackyeah.hackyeahbackend.institution.domain.service.SubjectService;
import ee.pw.hackyeah.hackyeahbackend.learningresource.application.in.LearningResourceCreationDTO;
import ee.pw.hackyeah.hackyeahbackend.learningresource.application.out.LearningResourceCreationOutDTO;
import ee.pw.hackyeah.hackyeahbackend.learningresource.domain.LearningResource;
import ee.pw.hackyeah.hackyeahbackend.media.domain.Media;
import ee.pw.hackyeah.hackyeahbackend.media.domain.service.MediaService;
import ee.pw.hackyeah.hackyeahbackend.user.domain.User;
import ee.pw.hackyeah.hackyeahbackend.user.domain.UserService;
import jakarta.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class LearningResourceService {

    private final LearningResourceRepository learningResourceRepository;
    private final MediaService mediaService;
    private final SubjectService subjectService;
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
            .numberOfDownloads(0L)
            .build();
        Subject subject = subjectService.attachSubjectToCourseFor(
            learningResourceCreationDTO.courseId(),
            learningResourceCreationDTO.subjectName()
        );
        learningResource.setSubject(subject);
        LearningResource savedLearningResource =
            learningResourceRepository.save(learningResource);

        List<Media> learningResourceMedia = filesList
            .stream()
            .map(mediaService::uploadMediaToUploadBucket)
            .toList();

        learningResourceMedia.forEach(media ->
            media.setLearningResource(savedLearningResource)
        );

        Set<Media> savedMedia = new HashSet<>(
            mediaService.saveAllMedia(learningResourceMedia)
        );
        learningResource.setMedia(savedMedia);

        return LearningResourceCreationOutDTO
            .builder()
            .id(savedLearningResource.getId())
            .title(savedLearningResource.getTitle())
            .description(savedLearningResource.getDescription())
            .build();
    }
}
