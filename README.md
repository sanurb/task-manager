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
C4Container
    title Container Diagram for Project Management System

    Person(user, User, "User who uses the system to manage projects and tasks")

    Container_Boundary(project_management_system, "Project Management System") {
        Container(web_app, "Web Application", "JavaScript, React", "Allows users to manage projects and tasks from their web browser")
        Container(api, "API", "Java, Spring", "Allows applications to interact with the database")
        ContainerDb(database, "Database", "SQL", "Stores information about projects, tasks, and users")
    }

    Rel(user, web_app, "Uses", "HTTPS")
    Rel(web_app, api, "Makes requests to", "REST/HTTP")
    Rel_Back(database, api, "Reads and writes to", "SQL")

```

## 3. Component Diagram
```mermaid
C4Component
    title Component Diagram for Task Management System API

    Container(web_app, "Web Application", "JavaScript, React", "Allows users to manage and track their tasks from their web browser")
    ContainerDb(database, "Database", "SQL", "Stores information about tasks and users")

    Container_Boundary(api, "API") {
        Component(users_controller, "Users Controller", "Spring MVC Rest Controller", "Handles requests related to users")
        Component(tasks_controller, "Tasks Controller", "Spring MVC Rest Controller", "Handles requests related to tasks")
        Component(auth, "Authentication Component", "Spring Security", "Manages user authentication and authorization")
        Component(reports_controller, "Reports Controller", "Spring MVC Rest Controller", "Allows generating progress and completion reports for tasks")

        Component(user_service, "User Service", "Spring Service", "Encapsulates business logic for users")
        Component(task_service, "Task Service", "Spring Service", "Encapsulates business logic for tasks")
        Component(report_service, "Report Service", "Spring Service", "Encapsulates business logic for generating reports")

        Rel(users_controller, user_service, "Uses")
        Rel(tasks_controller, task_service, "Uses")
        Rel(reports_controller, report_service, "Uses")

        Rel(user_service, auth, "Uses")
        Rel(task_service, auth, "Uses")

        Rel_Back(user_service, database, "Reads and writes", "JPA/Hibernate")
        Rel_Back(task_service, database, "Reads and writes", "JPA/Hibernate")
    }

    Rel_Back(web_app, users_controller, "Makes requests to", "REST/HTTP")
    Rel_Back(web_app, tasks_controller, "Makes requests to", "REST/HTTP")
    Rel_Back(web_app, reports_controller, "Makes requests to", "REST/HTTP")

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
