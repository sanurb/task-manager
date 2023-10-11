package com.taskmanager.taskmanagerapi.entities.requests;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskRequest {

    private String title;

    private String description;

    private Date due_date;

    private String priority;

    private String category;

    private String status;

    private int project_id;

    private int create_by_user_id;

    private int asigned_to_user_id;

    private Date created_at;

    private Date updated_at;

    private Date deleted_at;

}
