package com.taskmanager.taskmanagerapi.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// Todo: Delete after finished the springsecurity implementation

@RestController
@RequestMapping("/TaskManager/API/V1/")
@RequiredArgsConstructor
public class TESTController {

    @GetMapping( value = "TestLogged")
    public String imLogged(){
        return "Welcome logged user";
    }
}
