package com.taskmanager.taskmanagerapi.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="Reports")
public class Report {

    @Id
    private int id;

    @OneToMany
    private Set<User> generated_by_user_id;

    private Date generated_date;

    private String report_data;

    private Date created_at;

    private Date updated_at;

    private Date deleted_at;

}
