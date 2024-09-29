package ee.pw.hackyeah.hackyeahbackend.infrastructure.security;

import java.util.Arrays;

import ee.pw.hackyeah.hackyeahbackend.user.domain.User;
import ee.pw.hackyeah.hackyeahbackend.user.domain.UserRepository;
import ee.pw.hackyeah.hackyeahbackend.user.domain.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {
    @Bean
    public SecurityFilterChain configureSecurityFilterChain(
            HttpSecurity httpSecurity,
            @Qualifier("corsConfigurationSource") CorsConfigurationSource configurationSource
    ) throws Exception {

        // Enable HTTP Basic authentication
        httpSecurity.httpBasic(httpSecurityHttpBasicConfigurer -> {
            httpSecurityHttpBasicConfigurer.realmName("YourAppRealm"); // Optional, set realm name
        });

        // CORS Configuration
        httpSecurity.cors(cors -> cors.configurationSource(configurationSource));

        // Disable CSRF (typically for APIs)
        httpSecurity.csrf(AbstractHttpConfigurer::disable);

        // Configure form login
        httpSecurity.formLogin(httpSecurityFormLoginConfigurer -> {
            httpSecurityFormLoginConfigurer
                    .loginProcessingUrl("/api/auth/login")
                    .authenticationDetailsSource(new WebAuthenticationDetailsSource())
                    .successHandler((request, response, authentication) -> response.setStatus(HttpStatus.OK.value()))
                    .failureHandler((request, response, exception) -> response.setStatus(HttpStatus.UNAUTHORIZED.value()))
                    .usernameParameter("email")
                    .passwordParameter("password");
        });

        // Configure logout
        httpSecurity.logout(httpSecurityLogoutConfigurer -> {
            httpSecurityLogoutConfigurer
                    .clearAuthentication(true)
                    .logoutUrl("/api/auth/logout")
                    .permitAll()
                    .deleteCookies("JSESSIONID")
                    .logoutSuccessHandler((request, response, authentication) -> {
                        response.setStatus(HttpStatus.OK.value());
                        SecurityContextHolder.clearContext();
                    });
        });

        // Permit access to specific endpoints
        httpSecurity.authorizeHttpRequests(requestMatcherRegistry -> {
            requestMatcherRegistry
                    .requestMatchers("/api/auth/login", "/api/auth/register", "/api/institution",
                            "/api/course/all", "/api/unit/all", "/api/learning-resources/free")
                    .permitAll();
            requestMatcherRegistry.anyRequest().authenticated();
        });

        // Handle exceptions (access denied or authentication failure)
        httpSecurity.exceptionHandling(httpSecurityExceptionHandlingConfigurer -> {
            httpSecurityExceptionHandlingConfigurer
                    .accessDeniedHandler((request, response, accessDeniedException) -> response.setStatus(HttpStatus.FORBIDDEN.value()))
                    .authenticationEntryPoint((request, response, authException) -> response.setStatus(HttpStatus.UNAUTHORIZED.value()));
        });

        // Session management (if needed)
        httpSecurity.sessionManagement(httpSecuritySessionManagementConfigurer ->
                httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
        );

        return httpSecurity.build();
    }

    // CORS configuration
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    // CommandLineRunner to create a test user at startup
    @Bean
    public CommandLineRunner commandLineRunner(UserService userService, PasswordEncoder passwordEncoder) {
        return args -> {
            userService.saveUser(User.builder()
                    .email("chuj@wp.pl")
                    .tokens(1L)
                    .firstName("adrian")
                    .lastName("nowosielski")
                    .nickName("aidian3k")
                    .phoneNumber("12345")
                    .password(passwordEncoder.encode("chuj"))
                    .build());
        };
    }
}
