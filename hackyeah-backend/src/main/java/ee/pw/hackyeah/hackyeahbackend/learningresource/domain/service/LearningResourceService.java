package ee.pw.hackyeah.hackyeahbackend.learningresource.domain.service;

import ee.pw.hackyeah.hackyeahbackend.institution.domain.Subject;
import ee.pw.hackyeah.hackyeahbackend.institution.domain.service.SubjectService;
import ee.pw.hackyeah.hackyeahbackend.learningresource.application.in.LearningResourceBuyInputDTO;
import ee.pw.hackyeah.hackyeahbackend.learningresource.application.in.LearningResourceCreationDTO;
import ee.pw.hackyeah.hackyeahbackend.learningresource.application.in.LearningResourceSearchInputDTO;
import ee.pw.hackyeah.hackyeahbackend.learningresource.application.out.LearningResourceBoughtDTO;
import ee.pw.hackyeah.hackyeahbackend.learningresource.application.out.LearningResourceFreeDTO;
import ee.pw.hackyeah.hackyeahbackend.learningresource.domain.LearningResource;
import ee.pw.hackyeah.hackyeahbackend.learningresource.domain.repository.LearningResourceRepository;
import ee.pw.hackyeah.hackyeahbackend.media.domain.Media;
import ee.pw.hackyeah.hackyeahbackend.media.domain.service.MediaService;
import ee.pw.hackyeah.hackyeahbackend.review.domain.service.ReviewService;
import ee.pw.hackyeah.hackyeahbackend.user.domain.User;
import ee.pw.hackyeah.hackyeahbackend.user.domain.UserService;
import jakarta.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
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
    private final ReviewService reviewService;

    @Transactional
    public LearningResourceBoughtDTO handleUserLearningResourceCreation(
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

        return LearningResourceBoughtDTO
            .builder()
            .id(savedLearningResource.getId())
            .title(savedLearningResource.getTitle())
            .description(savedLearningResource.getDescription())
            .build();
    }

    @Transactional
    public Set<LearningResourceFreeDTO> getLearningResourceFreeFor(
        LearningResourceSearchInputDTO learningResourceSearchInputDTO
    ) {
        return learningResourceRepository
            .findLearningResourcesBySubjectNameAndCourseIdAndInstitutionIdAndUnitId(
                learningResourceSearchInputDTO.subjectName(),
                learningResourceSearchInputDTO.courseId(),
                learningResourceSearchInputDTO.institutionId(),
                learningResourceSearchInputDTO.unitId()
            )
            .stream()
            .map(learningResource ->
                LearningResourceFreeDTO
                    .builder()
                    .id(learningResource.getId())
                    .title(learningResource.getTitle())
                    .reviewDTO(
                        Optional
                            .ofNullable(
                                reviewService.getReviewsByLearningId(
                                    learningResource.getId()
                                )
                            )
                            .filter(reviews -> !reviews.isEmpty())
                            .map(review -> review.get(0))
                            .orElse(null)
                    )
                    .createdAt(learningResource.getCreationDate())
                    .description(learningResource.getDescription())
                    .build()
            )
            .collect(Collectors.toSet());
    }

    @Transactional
    public LearningResourceBoughtDTO handleUserLearningResourcePurchase(
        LearningResourceBuyInputDTO learningResourceId
    ) {
        final User user = userService.getCurrentUser();

        if(user.getTokens() <= 0) {
            throw new IllegalStateException("User has no tokens");
        }

        final LearningResource learningResource = learningResourceRepository
            .findById(learningResourceId.learningResourceId())
            .orElseThrow(
                () ->
                    new IllegalStateException(
                        "Learning resource with id " +
                        learningResourceId.learningResourceId() +
                        " not found"
                    )
            );
        final User author = learningResource.getAuthor();

        user.setTokens(user.getTokens() - 1);
        author.setTokens(author.getTokens() + 1);
        learningResource.setNumberOfDownloads(
            learningResource.getNumberOfDownloads() + 1
        );
        user.getLearningResources().add(learningResource);
        User savedUserWithLearningResource = userService.saveUser(user);

        return LearningResourceBoughtDTO
            .builder()
            .id(learningResource.getId())
            .title(learningResource.getTitle())
            .description(learningResource.getDescription())
            .build();
    }
}
