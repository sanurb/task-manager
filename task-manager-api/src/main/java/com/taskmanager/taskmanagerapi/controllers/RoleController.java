package com.taskmanager.taskmanagerapi.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/TaskManager/API/V1/Role/")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4201")
public class RoleController {
}
