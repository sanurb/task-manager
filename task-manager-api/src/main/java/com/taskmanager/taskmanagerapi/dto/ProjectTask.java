package com.taskmanager.taskmanagerapi.dto;

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
@Table(name="project_tasks")
public class ProjectTask {

    @Id
    @GeneratedValue
    private int project_task_id;

    @ManyToMany(fetch = FetchType.LAZY)
    private Set<Task> task_id;

    @OneToMany(fetch = FetchType.LAZY)
    private Set<Project> project_id;

    private Date created_at;

    private Date updated_at;

    private Date deleted_at;




}
