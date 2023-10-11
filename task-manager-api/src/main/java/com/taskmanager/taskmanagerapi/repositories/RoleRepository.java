package com.taskmanager.taskmanagerapi.repositories;

import com.taskmanager.taskmanagerapi.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
}
