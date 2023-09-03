package com.taskmanager.taskmanagerapi.Auth;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;

// Class to config the restricted calls for the endpoint

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                // CrossSite request disabled
                .csrf(csrf ->
                        csrf
                                .disable())
                // Ask for login for any resource of the endpoint that's not in the /auth/ mapping
                .authorizeHttpRequests(authRequest ->
                        authRequest
                                .requestMatchers("/auth/**").permitAll()
                                .anyRequest().authenticated()
                ).formLogin(withDefaults())
                .build();
    }


}
