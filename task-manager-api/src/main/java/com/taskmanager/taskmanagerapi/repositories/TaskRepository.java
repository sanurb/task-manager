package com.taskmanager.taskmanagerapi.repositories;

import com.taskmanager.taskmanagerapi.dto.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
}
