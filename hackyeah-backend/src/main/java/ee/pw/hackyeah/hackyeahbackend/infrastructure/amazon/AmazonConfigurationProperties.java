package ee.pw.hackyeah.hackyeahbackend.infrastructure.amazon;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "amazon.s3")
@RequiredArgsConstructor
@Getter
@Setter
class AmazonConfigurationProperties {

    private String accessKey;
    private String secretKey;
    private String endpoint;
    private String uploadBucketName;
}
