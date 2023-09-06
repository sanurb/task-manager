package com.taskmanager.taskmanagerapi.dto;


import jakarta.persistence.OneToOne;
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

public class Task {

    @Id
    private int id;

    private String title;

    private String description;

    private Date due_date;

    private String priority;

    private String category;

    private String status;

    // Todo : Verify if is required to use @PK notation
    private int created_by_user_id;

    private int assigned_to_user_id;

    private Date created_at;

    private Date updated_at;

    private Date deleted_at;





}
