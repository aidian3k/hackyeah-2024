package ee.pw.hackyeah.hackyeahbackend.infrastructure.security;

import lombok.RequiredArgsConstructor;
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
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true, proxyTargetClass = true)
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain configureSecurityFilterChain(
        HttpSecurity httpSecurity
    ) throws Exception {
        httpSecurity.httpBasic(AbstractHttpConfigurer::disable);
        httpSecurity.cors(AbstractHttpConfigurer::disable);

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
                        new HttpStatusEntryPoint(HttpStatus.FORBIDDEN);
                    }
                )
                .authenticationEntryPoint(
                    (request, response, authException) -> {
                        response.setStatus(HttpStatus.UNAUTHORIZED.value());
                        new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED);
                    }
                )
        );

        httpSecurity.sessionManagement(httpSecuritySessionManagementConfigurer ->
            httpSecuritySessionManagementConfigurer.sessionCreationPolicy(
                SessionCreationPolicy.ALWAYS
            )
        );

        httpSecurity.authorizeHttpRequests(requestMatcherRegistry ->
            requestMatcherRegistry.anyRequest().authenticated()
        );

        return httpSecurity.build();
    }
}
