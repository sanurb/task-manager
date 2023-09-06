package com.taskmanager.taskmanagerapi.Auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String token;
    private int user_id;
    private String username;
    private String email;
    private Date last_login;
}
