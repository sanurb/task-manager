package com.taskmanager.taskmanagerapi.Auth;

import com.taskmanager.taskmanagerapi.Auth.authResponse.AuthResponse;
import com.taskmanager.taskmanagerapi.Auth.authResponse.AuthResponseErr;
import com.taskmanager.taskmanagerapi.Auth.authResponse.ErrorData;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    @PostMapping(value = "login")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request){

        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping(value = "register")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) throws ParseException {
        //return ResponseEntity.ok(authService.register(request));

        try {
            return ResponseEntity.ok(authService.register(request));
        }catch (DataIntegrityViolationException ex){

            ErrorData errx;
            errx = new ErrorData(400, "Username or Email already exists", ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(AuthResponseErr.builder().error(errx).build());
            //return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(AuthResponseErr.builder().status(400).title("Username or Email already exists").detail(ex.getMessage()).build());
        }
    }
}
