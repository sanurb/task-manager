package com.taskmanager.taskmanagerapi.Auth.authResponse;

import com.taskmanager.taskmanagerapi.entities.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponseOk extends AuthResponse {
    private String token;
    private User user;
}
