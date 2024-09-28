package ee.pw.hackyeah.hackyeahbackend.media.domain.repository;

import ee.pw.hackyeah.hackyeahbackend.media.domain.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MediaRepository extends JpaRepository<Media, Long> {}
