package com.taskmanager.taskmanagerapi.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "Task")
public class Task {

    @Id
    @GeneratedValue
    private int id;

    private String title;

    private String description;

    private Date due_date;

    private String priority;

    private String category;

    private String status;

    // Todo : Verify if is required to use @PK notation

    @OneToOne
    private User created_by_user_id;

    @OneToOne
    private User assigned_to_user_id;

    private Date created_at;

    private Date updated_at;

    private Date deleted_at;






}
