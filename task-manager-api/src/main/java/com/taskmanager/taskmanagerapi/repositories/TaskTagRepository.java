package com.taskmanager.taskmanagerapi.repositories;

import com.taskmanager.taskmanagerapi.dto.TaskTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskTagRepository extends JpaRepository<TaskTag, Integer> {
}
