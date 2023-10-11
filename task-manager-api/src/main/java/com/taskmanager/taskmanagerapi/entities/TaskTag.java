package com.taskmanager.taskmanagerapi.entities;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Task_tags")
public class TaskTag {

    @Id
    @GeneratedValue
    private int tag_id;

    @Column(nullable = false)
    private String tag_name;

    @Column(nullable = false)
    private int userId;

    @ManyToMany(fetch = FetchType.LAZY)
    private Set<Task> taskId;


}
