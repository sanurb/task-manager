package com.taskmanager.taskmanagerapi.repositories;

import com.taskmanager.taskmanagerapi.dto.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {
}
