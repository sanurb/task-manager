package com.taskmanager.taskmanagerapi.controllers;

import com.taskmanager.taskmanagerapi.entities.Project;
import com.taskmanager.taskmanagerapi.entities.Task;
import com.taskmanager.taskmanagerapi.entities.User;
import com.taskmanager.taskmanagerapi.entities.requests.TaskRequest;
import com.taskmanager.taskmanagerapi.repositories.ProjectRepository;
import com.taskmanager.taskmanagerapi.repositories.TaskRepository;
import com.taskmanager.taskmanagerapi.repositories.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/TaskManager/API/V1/Task/")
@RequiredArgsConstructor
@CrossOrigin(origins = "${cors.origin.url}")
public class TasksController {
    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Value("${cors.origin.url}")
    private String originUrl;

    // GETs

    //Todo : delete, endpoint for dev purposes
    @GetMapping("getAllTasks")
    @Operation(summary = "Returns all tasks", security = @SecurityRequirement(name = "bearerAuth"))
    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    @GetMapping("getAllTaksOfProject")
    @Operation(summary = "Returns a list of tasks of the specified project id", security = @SecurityRequirement(name = "bearerAuth"))
    @RequestMapping("{ProjectId}")
    public List<Task> getAllTaksByProject(@PathVariable(value = "ProjectId") int id){
        //Todo : check if the query works fine
        Optional<Project> tmpProject = projectRepository.findById(id);
        List<Task> returnList = taskRepository.findAllByProjectId(tmpProject.get());
        return  returnList;
    }


    // POSTs

    @PostMapping("addTask")
    @Operation(summary = "Adds a task of the specified project id", security = @SecurityRequirement(name = "bearerAuth"))
    public Task addTaksByProjectId( @RequestBody TaskRequest request){
        Optional<Project> tmpProject = projectRepository.findById(request.getProject_id());
        Optional<User> tmpAsignedUser = userRepository.findById(request.getAsigned_to_user_id());
        Optional<User> tmpOwnerUser = userRepository.findById(request.getCreate_by_user_id());


        if(tmpProject.isPresent() && tmpAsignedUser.isPresent()){
            Task newTask = Task.builder()
                    .title(request.getTitle())
                    .description(request.getDescription())
                    .due_date(request.getDue_date())
                    .priority(request.getPriority())
                    .category(request.getCategory())
                    .status(request.getStatus())
                    .created_at(request.getCreated_at())
                    .updated_at(request.getUpdated_at())
                    .deleted_at(request.getDeleted_at())
                    .projectId(Collections.singleton(tmpProject.get()))
                    .assigned_to_user_id(Collections.singleton(tmpAsignedUser.get()))
                    .created_by_user_id(Collections.singleton(tmpOwnerUser.get()))
                    .build();


            return taskRepository.save(newTask);

        }

        // Todo : Handle errors of possible no existent project, could be handled also in the frontend
        return null;


    }


    // UPDATEs

    @PutMapping("update/{TaskId}")
    @Operation(summary = "Update a task info by ID and provided schema", security = @SecurityRequirement(name = "bearerAuth"))
    public Task updateTaskById(@PathVariable(value = "TaskId") int taskId, @RequestBody TaskRequest request){
        Optional<Task> tmpTask = taskRepository.findById(taskId);

        if(tmpTask.isPresent()){
            taskRepository.updateTaskInfo(request.getTitle(), request.getDescription(), request.getDue_date(), request.getPriority(), request.getCategory(), request.getStatus(), request.getUpdated_at(), request.getDeleted_at(), taskId);
            tmpTask = taskRepository.findById(taskId);
            return tmpTask.get();
        }

        // Todo : Handle errors of possible no existent project, could be handled also in the frontend
        return null;

    }


}
