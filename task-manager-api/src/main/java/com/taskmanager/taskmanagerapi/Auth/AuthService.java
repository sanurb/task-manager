package com.taskmanager.taskmanagerapi.Auth;

import com.taskmanager.taskmanagerapi.Auth.Jwt.JwtService;
import com.taskmanager.taskmanagerapi.Auth.authResponse.AuthResponse;
import com.taskmanager.taskmanagerapi.Auth.authResponse.AuthResponseErr;
import com.taskmanager.taskmanagerapi.Auth.authResponse.AuthResponseOk;
import com.taskmanager.taskmanagerapi.Auth.authResponse.ErrorData;
import com.taskmanager.taskmanagerapi.entities.User;
import com.taskmanager.taskmanagerapi.entities.UserResponse;
import com.taskmanager.taskmanagerapi.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    // todo: check why is a error when giving the correct credentials
    public AuthResponse login(LoginRequest request) {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            UserDetails user = userRepository.findByUsername(request.getUsername()).orElseThrow();
            User userData = userRepository.findByUsername(request.getUsername()).orElseThrow();
            String token = jwtService.getToken(user);

            // Tmp user to send
            User tmpUser = new User();
            tmpUser.setId(userData.getId());
            tmpUser.setUsername(userData.getUsername());
            tmpUser.setEmail(userData.getEmail());
            tmpUser.setLast_login(userData.getLast_login());


            return AuthResponseOk.builder()
                    .token(token)
                    .user(tmpUser)
                    .build();
        }catch (BadCredentialsException ex){

            ErrorData errx;
            errx = new ErrorData(400, "Username or Email already exists", ex.getMessage());

            return AuthResponseErr.builder()
                    .error(errx)
                    .build();
        }



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

        return AuthResponseOk.builder()
                // todo generar token
                .token(jwtService.getToken(user))
                .build();
    }

    public UserResponse getUserByToken(String token) {
        String username = jwtService.getUsernameFromToken(token);

        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setUsername(user.getUsername());
        userResponse.setEmail(user.getEmail());
        userResponse.setLastLogin(user.getLast_login());
        userResponse.setEnabled(user.isEnabled());
        userResponse.setAuthorities(user.getAuthorities().stream().collect(Collectors.toList()));
        userResponse.setAccountNonLocked(user.isAccountNonLocked());
        userResponse.setCredentialsNonExpired(user.isCredentialsNonExpired());
        userResponse.setAccountNonExpired(user.isAccountNonExpired());

        return userResponse;
    }
}
