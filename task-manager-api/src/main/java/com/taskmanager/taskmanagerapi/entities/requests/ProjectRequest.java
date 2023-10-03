package com.taskmanager.taskmanagerapi.entities.requests;

import com.taskmanager.taskmanagerapi.entities.User;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
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
public class ProjectRequest {

    private String name;

    private String description;

    private int created_by_user_id;

    private Date created_at;

    private Date updated_at;

    private Date deleted_at;
}
