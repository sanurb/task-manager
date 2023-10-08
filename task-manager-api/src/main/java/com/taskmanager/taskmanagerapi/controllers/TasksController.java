package com.taskmanager.taskmanagerapi.controllers;

import com.taskmanager.taskmanagerapi.entities.Project;
import com.taskmanager.taskmanagerapi.entities.Task;
import com.taskmanager.taskmanagerapi.entities.TaskTag;
import com.taskmanager.taskmanagerapi.entities.User;
import com.taskmanager.taskmanagerapi.entities.requests.TaskRequest;
import com.taskmanager.taskmanagerapi.entities.requests.TaskTagRequest;
import com.taskmanager.taskmanagerapi.repositories.ProjectRepository;
import com.taskmanager.taskmanagerapi.repositories.TaskRepository;
import com.taskmanager.taskmanagerapi.repositories.TaskTagRepository;
import com.taskmanager.taskmanagerapi.repositories.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/TaskManager/API/V1/Task/")
@RequiredArgsConstructor
@CrossOrigin(origins = "${cors.origin.url}")
public class TasksController {
    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final TaskTagRepository taskTagRepository;



    // GETs

    @GetMapping("getAllTasks")
    @Operation(summary = "Returns all tasks", security = @SecurityRequirement(name = "bearerAuth"))
    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    @GetMapping("getAllTaksOfProject/{ProjectId}")
    @Operation(summary = "Returns a list of tasks of the specified project id", security = @SecurityRequirement(name = "bearerAuth"))
    public List<Task> getAllTaksByProject(@PathVariable(value = "ProjectId") int id){
        Optional<Project> tmpProject = projectRepository.findById(id);
        List<Task> returnList = taskRepository.findAllByProjectId(tmpProject.get());
        return  returnList;
    }

    @GetMapping("getTaskTagsByTaskId/{TaskId}")
    @Operation(summary = "Returns a list of tags asigned to the specified task id", security = @SecurityRequirement(name = "bearerAuth"))
    public List<TaskTag> getAllTagsByTaskId(@PathVariable(value = "TaskId") int id){

        Optional<Task> tmpTask = taskRepository.findById(id);
        if(tmpTask.isEmpty()){
            return null;
        }

        return taskTagRepository.findAllByTaskId(tmpTask.get());
    }

    @GetMapping("getAllTasksByUser/{UserId}")
    @Operation(summary = "Returns a list of tags created by user id", security = @SecurityRequirement(name = "bearerAuth"))
    public List<TaskTag> getAllTasksByUser(@PathVariable(value = "UserId") int id){

        Optional<User> tmpUser = userRepository.findById(id);
        if(tmpUser.isEmpty()){
            return null;
        }

        return taskTagRepository.findAllByUserId(tmpUser.get());
    }



    // POSTs

    @PostMapping("addTaskTagToTaskId/{tagId}/{taskId}")
    @Operation(summary = "Adds a taskTag for the specified task id", security = @SecurityRequirement(name = "bearerAuth"))
    public TaskTag addTaskTagByTaskId(@PathVariable Map<Integer, Integer> pathVariables){
        int tagId = pathVariables.get("tagId");
        int taskId = pathVariables.get("taskId");

        Optional<TaskTag> tmpTag = taskTagRepository.findById(tagId);
        Optional<Task> tmpTask = taskRepository.findById(taskId);

        if(tmpTask.isEmpty() || tmpTag.isEmpty()){
            return null;
        }

        Set<Task> setOfTasks = tmpTag.get().getTaskId();
        setOfTasks.add(tmpTask.get());

        tmpTag.get().setTaskId(setOfTasks);

        taskTagRepository.delete(tmpTag.get());
        
        taskTagRepository.save(tmpTag.get());



        return null;
    }

    @PostMapping("addTaskTag")
    @Operation(summary = "Creates a new taskTag, if task id  '-1' is specified, it creates a empty set", security = @SecurityRequirement(name = "bearerAuth"))
    public TaskTag addTaskTag(@RequestBody TaskTagRequest taskTagRequest){
        TaskTag taskTag = new TaskTag();

        if(taskTagRequest.getTask_id() != -1){
            Optional<Task> tmpTask = taskRepository.findById(taskTagRequest.getTask_id());
            if(tmpTask.isPresent()){
                taskTag.setTaskId(Collections.singleton(tmpTask.get()));
            }
        }
        taskTag.setTag_name(taskTagRequest.getTag_Name());
        taskTag.setUserId(taskTag.getUserId());

        return taskTagRepository.save(taskTag);
    }

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

        return null;

    }

    // DELETE

    @DeleteMapping("deleteTag/{TagId}")
    @Operation(summary = "Deletes specified tag id, returns true if successful", security = @SecurityRequirement(name = "bearerAuth"))
    public boolean deleteTagById(@PathVariable(value = "TagId") int tagId){
        Optional<TaskTag> tmp = taskTagRepository.findById(tagId);
        if(tmp.isPresent()){
            taskTagRepository.delete(tmp.get());
        }
        return false;
    }
}
