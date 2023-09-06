package com.taskmanager.taskmanagerapi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Report {

    @Id
    private int id;

    private int generated_by_user_id;

    private Date generated_date;

    // todo: Talk with the group of what datatype is spected, cause the "json" is not Sql standard
    private String report_data;

    private Date created_at;

    private Date updated_at;

    private Date deleted_at;

}
