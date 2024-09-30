package ee.pw.hackyeah.hackyeahbackend.infrastructure.amazon;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@RequiredArgsConstructor
@Slf4j
class AmazonConfiguration {

    private final AmazonConfigurationProperties amazonConfigurationProperties;

    @Bean
    @Profile({ "prod" })
    public AmazonS3 productionAmazonConfig() {
        AWSCredentials credentialsProvider = new BasicAWSCredentials(
            amazonConfigurationProperties.getAccessKey(),
            amazonConfigurationProperties.getSecretKey()
        );

        return AmazonS3ClientBuilder
            .standard()
            .withRegion(Regions.getCurrentRegion().getName())
            .withCredentials(
                new AWSStaticCredentialsProvider(credentialsProvider)
            )
            .build();
    }

    @Bean
    @Profile({ "local" })
    public AmazonS3 amazonS3LocalService() {
        log.debug("Running amazonS3 mock from docker-image");

        return AmazonS3ClientBuilder
            .standard()
            .withCredentials(
                new AWSCredentialsProvider() {
                    @Override
                    public AWSCredentials getCredentials() {
                        return new BasicAWSCredentials("root", "root");
                    }

                    @Override
                    public void refresh() {
                        // empty
                    }
                }
            )
            .withEndpointConfiguration(
                new AwsClientBuilder.EndpointConfiguration(
                    amazonConfigurationProperties.getEndpoint(),
                    Regions.EU_CENTRAL_1.getName()
                )
            )
            .withPathStyleAccessEnabled(true)
            .build();
    }
}
