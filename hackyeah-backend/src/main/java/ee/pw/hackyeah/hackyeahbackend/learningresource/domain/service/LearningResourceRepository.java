package ee.pw.hackyeah.hackyeahbackend.learningresource.domain.service;

import ee.pw.hackyeah.hackyeahbackend.learningresource.domain.LearningResource;
import org.springframework.data.jpa.repository.JpaRepository;

interface LearningResourceRepository extends JpaRepository<LearningResource, Long> {
}
