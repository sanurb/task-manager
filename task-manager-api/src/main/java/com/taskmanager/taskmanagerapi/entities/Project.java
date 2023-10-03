package com.taskmanager.taskmanagerapi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="Projects")
public class Project {

    @Id
    @GeneratedValue
    private int id;

    private String name;

    private String description;


    /*@ManyToOne(fetch = FetchType.LAZY)
    private User created_by_user_id;*/

    @ManyToMany(fetch = FetchType.LAZY)
    private Set<User> created_by_user_id;

    private Date created_at;

    private Date updated_at;

    private Date deleted_at;
}
