package com.taskmanager.taskmanagerapi.Auth.authResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
public class AuthResponseErr extends AuthResponse {
    int status;
    String title;
    String detail;


}
