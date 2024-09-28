package ee.pw.hackyeah.hackyeahbackend.media.domain.service;

import com.amazonaws.services.s3.AmazonS3;
import ee.pw.hackyeah.hackyeahbackend.media.domain.Media;
import ee.pw.hackyeah.hackyeahbackend.media.domain.repository.MediaRepository;
import ee.pw.hackyeah.hackyeahbackend.user.domain.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class MediaService {
    private final MediaRepository mediaRepository;
    private final UserService userService;
    private final AmazonS3 amazonS3;

    @Value("${amazon.s3.upload-bucket-name}")
    private String uploadBucketName;

    @Transactional
    public Media attachMedia(MultipartFile file, String uploadBucketName) {
        return null;
    }


}
