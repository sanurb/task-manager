## 1. Context Diagram
```mermaid
C4Context
    title Context Diagram for Task Management System
    Enterprise_Boundary(b0, "Boundary0") {
        Person(user, "User", "A system user with the ability to create, assign, and track tasks.")
        Person(administrator, "Administrator", "An administrator with the ability to manage users and roles.")
        System(taskManagementSystem, "Task Management System", "Allows users to organize, manage, and track their tasks and projects.")
        Enterprise_Boundary(b1, "Boundary") {
            System_Boundary(b2, "Boundary2") {
                System(authenticationSystem, "Authentication System", "Manages user authentication.")
                System(reportsSystem, "Reports System", "Allows generating progress and completion reports for tasks.")
                System(database, "Database", "Stores user, task, and project information.")
            }
        }
    }
    BiRel(user, taskManagementSystem, "Uses")
    BiRel(administrator, taskManagementSystem, "Administers")
    Rel(taskManagementSystem, authenticationSystem, "Validates users with")
    Rel(taskManagementSystem, reportsSystem, "Generates reports with")
    Rel(taskManagementSystem, database, "Stores and retrieves information from")

```

## 2. Container Diagram
```mermaid
C4Context
    title Authentication System Container Diagram
    Enterprise_Boundary(authBoundary, "Authentication System") {
        Person(user, "End User", "User trying to access the application.")
        System(authSystem, "Authentication System", "Handles user registration, login, and JWT token management.")
        System(externalSystem, "External System", "Other systems that might interact with the authentication system.")
    }
    BiRel(user, authSystem, "Registers/Logs in")
    BiRel(externalSystem, authSystem, "Requests user data or verifies tokens")

```
```mermaid
C4Container
title Authentication System Container Diagram

Enterprise_Boundary(authBoundary, "Authentication System") {
    Person(user, "End User", "User trying to access the application.")
    System(database, "Database", "Stores user data and hashed passwords.")
    
    Container(frontendApp, "Frontend Application", "React-based web application for registration and login.")
    Container(backendApp, "Backend API", "Spring Boot backend for authentication, user management, and JWT token generation.")

    Rel(user, frontendApp, "Uses", "HTTP/HTTPS")
    Rel(backendApp, database, "Reads/Writes user data", "SQL")
    Rel(frontendApp, backendApp, "Sends authentication requests", "HTTP/HTTPS")
    
}

```

## 3. Component Diagram
```mermaid
C4Component
    title Backend API Component Diagram
    Enterprise_Boundary(backendBoundary, "Backend API (Spring Boot)") {
        
        Component(authController, "Auth Controller", "Exposes endpoints for user registration and login.")
        Component(authService, "Auth Service", "Handles main authentication logic.")
        Component(jwtService, "JWT Service", "Manages JWT token operations.")
        Component(userRepository, "User Repository", "CRUD operations for users.")
        Component(loginRequest, "Login Request DTO", "Data structure for login.")
        Component(registerRequest, "Register Request DTO", "Data structure for registration.")
        
        System(database, "Database", "Stores user data and hashed passwords.")
        
        Rel(authController, authService, "Delegates authentication tasks")
        Rel(authService, jwtService, "Requests JWT operations")
        Rel(authService, userRepository, "CRUD operations")
        Rel(authController, loginRequest, "Uses for login")
        Rel(authController, registerRequest, "Uses for registration")
        Rel(userRepository, database, "Reads/Writes user data")
    }

```

```mermaid
C4Component
    title Frontend Application Component Diagram
    Enterprise_Boundary(frontendBoundary, "Frontend Application (React)") {
        
        Component(signInPage, "SignIn Page", "User interface for logging in.")
        Component(signUpPage, "SignUp Page", "User interface for registration.")
        Component(authContext, "Auth Context", "Manages user authentication state in the frontend and provides functions for login and registration.")
        Component(jwtService, "JWT Service", "Handles JWT token management, API calls, and Axios configurations.")
        Component(jwtServiceConfig, "JWT Service Config", "Configurations for JWT service, including endpoint routes.")
        Component(authRoles, "Auth Roles", "Defines authorization roles like admin, staff, user, etc.")
        
        Rel(signInPage, authContext, "Uses for authentication")
        Rel(signUpPage, authContext, "Uses for registration")
        Rel(authContext, jwtService, "Makes API calls for authentication")
        Rel(jwtService, jwtServiceConfig, "Utilizes for API configurations")
        Rel(signInPage, authRoles, "May use to determine access")
        Rel(signUpPage, authRoles, "May use to determine access")
    }

```

# Database

```mermaid
erDiagram
    Users ||--o{ User_Roles : has
    Users ||--o{ Tasks : "creates/updates"
    Users ||--o{ Tasks : "assigns to"
    Users ||--o{ Projects : creates
    Users ||--o{ Reports : generates
    Roles ||--o{ User_Roles : has
    Tasks ||--o{ Project_Tasks : belongs_to
    Projects ||--o{ Project_Tasks : has

```

The tables related to authentication and roles are in shades of blue, tasks and projects in green, and reports in shades of orange:

![ER](./dbmodel.svg)
