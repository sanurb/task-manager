package com.taskmanager.taskmanagerapi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {

    @Id
    private int id;

    private String name;

    private String email;

    private String password;

    private Date last_login;

    private Date created_at;

    private Date updated_at;

    private Date deleted_at;
}
