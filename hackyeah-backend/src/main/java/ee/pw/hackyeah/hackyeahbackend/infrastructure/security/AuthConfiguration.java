package ee.pw.hackyeah.hackyeahbackend.infrastructure.security;

import ee.pw.hackyeah.hackyeahbackend.user.domain.UserRepository;
import ee.pw.hackyeah.hackyeahbackend.user.domain.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
class AuthConfiguration {

    private final UserRepository userRepository;

    @Bean
    public PasswordEncoder configurePasswordEncoder() {
        final int strength = 16;

        return new BCryptPasswordEncoder(strength);
    }

    @Bean
    public AuthenticationProvider configureDaoAuthenticationProvider(
        UserDetailsService userDetailsService
    ) {
        DaoAuthenticationProvider tokenAuthenticationProvider =
            new DaoAuthenticationProvider();
        tokenAuthenticationProvider.setUserDetailsService(userDetailsService);
        tokenAuthenticationProvider.setHideUserNotFoundExceptions(true);
        tokenAuthenticationProvider.setPasswordEncoder(
            configurePasswordEncoder()
        );

        return tokenAuthenticationProvider;
    }

    @Bean
    public AuthenticationManager configureAuthManager(
        AuthenticationConfiguration authenticationConfiguration
    ) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SessionRegistry configureSessionRegistry() {
        return new SessionRegistryImpl();
    }

    @Bean
    public UserDetailsService configureUserDetailsService(
        UserService userService
    ) {
        return userService::getUserByEmail;
    }
}
