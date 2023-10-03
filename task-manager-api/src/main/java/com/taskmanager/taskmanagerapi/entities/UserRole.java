package com.taskmanager.taskmanagerapi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "User_roles")
public class UserRole {

    @Id
    @GeneratedValue
    private int id;

    @OneToMany
    private Set<User> user_id;

    @OneToMany
    private Set<Role> role_id;

    private Date created_at;

    private Date updated_at;

    private Date deleted_at;

}
