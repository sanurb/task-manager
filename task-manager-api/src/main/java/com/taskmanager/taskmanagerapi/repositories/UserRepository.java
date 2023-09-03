package com.taskmanager.taskmanagerapi.repositories;

import com.taskmanager.taskmanagerapi.dto.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
