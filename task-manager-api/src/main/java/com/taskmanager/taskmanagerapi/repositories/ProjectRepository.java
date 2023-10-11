package com.taskmanager.taskmanagerapi.repositories;

import com.taskmanager.taskmanagerapi.entities.Project;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;


@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {

    @Transactional
    @Modifying
    @Query("UPDATE Project project SET project.name =:name, project.description =:desc, project.updated_at=:update, project.deleted_at=:deleted WHERE project.id =:id")
    void updateProjectInfo(String name, String desc, Date update, Date deleted, Integer id);

    @Query("SELECT p FROM Project p JOIN p.created_by_user_id u WHERE u.id = :userId")
    List<Project> findProjectsByUserId(@Param("userId") int userId);
}
