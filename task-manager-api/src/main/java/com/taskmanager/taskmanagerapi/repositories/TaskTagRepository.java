package com.taskmanager.taskmanagerapi.repositories;

import com.taskmanager.taskmanagerapi.entities.Task;
import com.taskmanager.taskmanagerapi.entities.TaskTag;
import com.taskmanager.taskmanagerapi.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskTagRepository extends JpaRepository<TaskTag, Integer> {
    List<TaskTag> findAllByTaskId(Task id);

    List<TaskTag> findAllByUserId(User id);
}
