package com.taskmanager.taskmanagerapi.repositories;

import com.taskmanager.taskmanagerapi.entities.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {
}
