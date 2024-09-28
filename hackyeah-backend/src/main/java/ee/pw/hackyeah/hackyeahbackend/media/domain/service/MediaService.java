package ee.pw.hackyeah.hackyeahbackend.media.domain.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import ee.pw.hackyeah.hackyeahbackend.media.domain.Media;
import ee.pw.hackyeah.hackyeahbackend.media.domain.MediaType;
import ee.pw.hackyeah.hackyeahbackend.media.domain.repository.MediaRepository;
import ee.pw.hackyeah.hackyeahbackend.user.domain.User;
import ee.pw.hackyeah.hackyeahbackend.user.domain.UserService;
import jakarta.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
public class MediaService {

    private final MediaRepository mediaRepository;
    private final UserService userService;
    private final AmazonS3 amazonS3;

    @Value("${amazon.s3.upload-bucket-name}")
    private String uploadBucketName;

    private static final List<String> VIDEO_MIME_TYPES = List.of(
        "video/mp4",
        "video/mpeg",
        "video/x-msvideo",
        "video/quicktime"
    );
    private static final List<String> IMAGE_MIME_TYPES = List.of(
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp"
    );
    private static final List<String> PDF_MIME_TYPES = List.of(
        "application/pdf"
    );

    @Transactional
    public Media attachMedia(MultipartFile file, String uploadBucketName) {
        User currentUser = userService.getCurrentUser();
        String objectKey = generateUniqueFileName(
            currentUser.getId(),
            file.getOriginalFilename()
        );
        uploadFileToS3(file, objectKey);
        Media media = Media
            .builder()
            .mediaType(determineFileType(file.getContentType()))
            .objectKey(objectKey)
            .build();

        return mediaRepository.save(media);
    }

    @Transactional
    public List<Media> saveAllMedia(Collection<Media> media) {
        return mediaRepository.saveAll(media);
    }

    @Transactional
    public Media uploadMediaToUploadBucket(MultipartFile file) {
        return attachMedia(file, uploadBucketName);
    }

    @SneakyThrows
    private void uploadFileToS3(MultipartFile file, String objectKey) {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());

        log.debug("Uploading file to S3: {} to path", objectKey);
        amazonS3.putObject(
            uploadBucketName,
            objectKey,
            file.getInputStream(),
            metadata
        );
    }

    private String generateUniqueFileName(
        Long userId,
        String originalFileName
    ) {
        return String.format(
            "%s-%s",
            System.currentTimeMillis(),
            originalFileName
        );
    }

    private MediaType determineFileType(String contentType) {
        if (VIDEO_MIME_TYPES.contains(contentType)) {
            return MediaType.VIDEO;
        } else if (IMAGE_MIME_TYPES.contains(contentType)) {
            return MediaType.PHOTO;
        } else if (PDF_MIME_TYPES.contains(contentType)) {
            return MediaType.PDF;
        }

        return MediaType.OTHER;
    }
}
