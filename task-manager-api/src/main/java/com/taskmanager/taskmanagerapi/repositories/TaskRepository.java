package com.taskmanager.taskmanagerapi.repositories;

import com.taskmanager.taskmanagerapi.entities.Project;
import com.taskmanager.taskmanagerapi.entities.Task;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

    List<Task> findAllByProjectId(Project id);

    @Transactional
    @Modifying
    @Query("UPDATE Task task SET task.title=:title, task.description=:desc, task.due_date=:due, task.priority=:prior, task.category=:category, task.status=:status, task.updated_at=:updated, task.deleted_at=:deleted WHERE task.id=:id")
    void updateTaskInfo(String title, String desc, Date due, String prior, String category, String status, Date updated, Date deleted, Integer id);
}
