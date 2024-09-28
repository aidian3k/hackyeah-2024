package ee.pw.hackyeah.hackyeahbackend.infrastructure.security;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true, proxyTargetClass = true)
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain configureSecurityFilterChain(
            HttpSecurity httpSecurity,
            @Qualifier("corsConfigurationSource") CorsConfigurationSource configurationSource
    ) throws Exception {
        httpSecurity.httpBasic(AbstractHttpConfigurer::disable);
        httpSecurity.cors(cors -> {
            cors.configurationSource(configurationSource);
        });

        httpSecurity.csrf(AbstractHttpConfigurer::disable);

        httpSecurity.formLogin(httpSecurityFormLoginConfigurer -> {
            httpSecurityFormLoginConfigurer.loginProcessingUrl(
                "/api/auth/login"
            );
            httpSecurityFormLoginConfigurer.authenticationDetailsSource(
                new WebAuthenticationDetailsSource()
            );
            httpSecurityFormLoginConfigurer.successHandler(
                (
                    (request, response, authentication) -> {
                        response.setStatus(HttpStatus.OK.value());
                    }
                )
            );
            httpSecurityFormLoginConfigurer.usernameParameter("email");
            httpSecurityFormLoginConfigurer.passwordParameter("password");
            httpSecurityFormLoginConfigurer.failureHandler(
                    (request, response, exception) ->
                response.setStatus(HttpStatus.UNAUTHORIZED.value())
            );
        });

        httpSecurity.logout(httpSecurityLogoutConfigurer -> {
            httpSecurityLogoutConfigurer.clearAuthentication(true);
            httpSecurityLogoutConfigurer
                .logoutUrl("/api/auth/logout")
                .permitAll();
            httpSecurityLogoutConfigurer.deleteCookies("JSESSIONID");
            httpSecurityLogoutConfigurer.logoutSuccessHandler(
                (
                    (request, response, authentication) -> {
                        response.setStatus(HttpStatus.OK.value());
                        SecurityContextHolder.clearContext();
                    }
                )
            );
        });

        httpSecurity.authorizeHttpRequests(requestMatcherRegistry -> {
            requestMatcherRegistry
                .requestMatchers("/api/auth/login")
                .permitAll();
            requestMatcherRegistry
                .requestMatchers("/api/auth/register")
                .permitAll();
        });

        httpSecurity.exceptionHandling(httpSecurityExceptionHandlingConfigurer ->
            httpSecurityExceptionHandlingConfigurer
                .accessDeniedHandler(
                    (request, response, accessDeniedException) -> {
                        response.setStatus(HttpStatus.FORBIDDEN.value());
                    }
                )
                .authenticationEntryPoint((request, response, authException) ->
                    response.setStatus(HttpStatus.UNAUTHORIZED.value())
                )
        );

        httpSecurity.sessionManagement(httpSecuritySessionManagementConfigurer ->
            httpSecuritySessionManagementConfigurer.sessionCreationPolicy(
                SessionCreationPolicy.ALWAYS
            )
        );

        httpSecurity.authorizeHttpRequests(requestMatcherRegistry ->
            requestMatcherRegistry.anyRequest().permitAll()
        );

        return httpSecurity.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
