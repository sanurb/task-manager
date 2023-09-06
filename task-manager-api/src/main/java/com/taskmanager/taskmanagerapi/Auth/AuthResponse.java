package com.taskmanager.taskmanagerapi.Auth;

import com.taskmanager.taskmanagerapi.dto.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private User user;
    private String access_token;
}
