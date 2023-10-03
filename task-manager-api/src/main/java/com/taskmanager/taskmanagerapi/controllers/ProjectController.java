package com.taskmanager.taskmanagerapi.controllers;

import com.taskmanager.taskmanagerapi.entities.Project;
import com.taskmanager.taskmanagerapi.entities.User;
import com.taskmanager.taskmanagerapi.entities.requests.ProjectRequest;
import com.taskmanager.taskmanagerapi.repositories.ProjectRepository;
import com.taskmanager.taskmanagerapi.repositories.TaskRepository;
import com.taskmanager.taskmanagerapi.repositories.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/TaskManager/API/V1/Project/")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4201")

public class ProjectController {
    // Repositories needed
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;



    // GETs

    @GetMapping( value = "getAllProjects")
    @Operation(summary = "Get lists with all projects", security = @SecurityRequirement(name = "bearerAuth"))
    public List<Project> getAllProjects(){
        return projectRepository.findAll();
    }

    @GetMapping()
    @Operation(summary = "Get project by id", security = @SecurityRequirement(name = "bearerAuth"))
    @RequestMapping("{ProjectId}")
    public Project getProjectById(@PathVariable(value = "ProjectId") int id){

        Optional<Project> tmp = projectRepository.findById(id);

        if(tmp.isPresent()){
            return tmp.get();
        }

        return null;


    }


    // UPDATEs / PUT

    // Todo: Create endpoints for update the projects

    @PutMapping("update/{ProjectId}")
    @Operation(summary = "Update a project by ID", security = @SecurityRequirement(name = "bearerAuth"))
    public Project updateProjectById(@PathVariable(value = "ProjectId") int id, @RequestBody ProjectRequest project){

        Optional<Project> tmp = projectRepository.findById(id);

        if(tmp.isPresent()){
            /*
            tmp.get().setUpdated_at(project.getUpdated_at());
            tmp.get().setName(project.getName());
            tmp.get().setDeleted_at(project.getDeleted_at());
            tmp.get().setDescription(project.getDescription());
            */
            // Todo : call repository and update the current project: has to make a query for that in repo

            projectRepository.updateProjectInfo(project.getName(), project.getDescription(), project.getUpdated_at(), project.getDeleted_at() ,id);
            tmp = projectRepository.findById(id);
            return tmp.get();
        }

        return null;


    }


    // POSTs

    @PostMapping(value = "addProject")
    @Operation(summary = "Add project", security = @SecurityRequirement(name = "bearerAuth"))
    public Project addProject(@RequestBody ProjectRequest project){
        Project tmp;
        Optional<User> tmpUser = userRepository.findById(project.getCreated_by_user_id());

        if(tmpUser.isEmpty()){
            //Todo: throw error
        }

        // Todo: Check for errors in the creation of the collection

        tmp = Project.builder()
                .name(project.getName())
                .description(project.getDescription())
                .created_by_user_id(Collections.singleton(tmpUser.get()))
                //.created_by_user_id(tmpUser.get())
                .created_at(project.getCreated_at())
                .updated_at(project.getUpdated_at())
                .deleted_at(project.getDeleted_at())
                .build();
        // Todo : Solve the error that prevents that the same user create two projects
        return projectRepository.save(tmp);


    }


}
