package com.taskmanager.taskmanagerapi.entities.requests;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskTagRequest {

    private String tag_Name;

    private int user_id;

    private int task_id;

}
