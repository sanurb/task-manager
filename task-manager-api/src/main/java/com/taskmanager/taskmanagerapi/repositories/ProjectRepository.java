package com.taskmanager.taskmanagerapi.repositories;

import com.taskmanager.taskmanagerapi.dto.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
}
