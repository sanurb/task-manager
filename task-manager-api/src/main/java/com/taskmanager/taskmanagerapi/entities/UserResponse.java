package com.taskmanager.taskmanagerapi.entities;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.Date;
import java.util.List;

@Data
public class UserResponse {
    private int id;
    private String username;
    private String email;
    private Date lastLogin;
    private boolean enabled;
    private List<GrantedAuthority> authorities;
    private boolean accountNonLocked;
    private boolean credentialsNonExpired;
    private boolean accountNonExpired;
    private String pic;
    private String fullname;
    private String firstname;
    private String lastname;
}
