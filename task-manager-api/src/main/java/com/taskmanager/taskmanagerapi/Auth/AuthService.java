package com.taskmanager.taskmanagerapi.Auth;

import com.taskmanager.taskmanagerapi.Auth.Jwt.JwtService;
import com.taskmanager.taskmanagerapi.dto.User;
import com.taskmanager.taskmanagerapi.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    // todo: check why is a error when giving the correct credentials
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        User userData = userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.getToken(user);

        return AuthResponse.builder()
                .token(token)
                .user_id(userData.getId())
                .username(userData.getUsername())
                .email(userData.getEmail())
                .last_login(userData.getLast_login())
                .build();

    }

    public AuthResponse register(RegisterRequest request) throws ParseException {

        // Date of register
        // todo : clean the code
        LocalDate dateObj = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String date = dateObj.format(formatter);
        String pattern = "yyyy-MM-dd";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        Date now = simpleDateFormat.parse(date);

        // Create the new user from the request and the class RegisterRequest
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .user_password(passwordEncoder.encode(request.getPassword()))
                .created_at(now)
                .last_login(now)
                .build();

        userRepository.save(user);

        return AuthResponse.builder()
                // todo generar token
                .token(jwtService.getToken(user))
                .build();
    }
}
