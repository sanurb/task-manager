## 1. Diagrama de Contexto
```mermaid
C4Context
    title Diagrama de Contexto para Sistema de Gestión de Tareas
    Enterprise_Boundary(b0, "Boundary0") {
        Person(usuario, "Usuario", "Un usuario del sistema con la capacidad de crear, asignar y seguir tareas.")
        Person(administrador, "Administrador", "Un administrador con la capacidad de gestionar usuarios y roles.")
        System(systemaGestion, "Sistema de Gestión de Tareas", "Permite a los usuarios organizar, administrar y hacer seguimiento de sus tareas y proyectos.")
        Enterprise_Boundary(b1, "Boundary") {
            System_Boundary(b2, "Boundary2") {
                System(sistemaAutenticacion, "Sistema de Autenticación", "Gestiona la autenticación de los usuarios.")
                System(sistemaInformes, "Sistema de Informes", "Permite generar informes de progreso y completitud de las tareas.")
                System(sistemaBaseDatos, "Base de Datos", "Almacena información de usuarios, tareas y proyectos.")
            }
        }
    }
    BiRel(usuario, systemaGestion, "Usa")
    BiRel(administrador, systemaGestion, "Administra")
    Rel(systemaGestion, sistemaAutenticacion, "Valida usuarios con")
    Rel(systemaGestion, sistemaInformes, "Genera informes con")
    Rel(systemaGestion, sistemaBaseDatos, "Guarda y recupera información de")

```

## 2. Diagrama de Contenedores
```mermaid
C4Container
    title Diagrama de Contenedores para Sistema de Gestión de Proyectos

    Person(usuario, Usuario, "Usuario que utiliza el sistema para gestionar proyectos y tareas")

    Container_Boundary(sistema_gestion_proyectos, "Sistema de Gestión de Proyectos") {
        Container(app_web, "Aplicación Web", "JavaScript, React", "Permite a los usuarios gestionar proyectos y tareas desde su navegador web")
        Container(api, "API", "Java, Spring", "Permite a las aplicaciones interactuar con la base de datos")
        ContainerDb(base_datos, "Base de Datos", "SQL", "Almacena información de proyectos, tareas y usuarios")
    }

    Rel(usuario, app_web, "Usa", "HTTPS")
    Rel(app_web, api, "Realiza peticiones a", "REST/HTTP")
    Rel_Back(base_datos, api, "Lee y escribe", "SQL")

```

## 3. Diagrama de Componentes
```mermaid
C4Component
    title Diagrama de Componentes para API del Sistema de Gestión de Tareas

    Container(app_web, "Aplicación Web", "JavaScript, React", "Permite a los usuarios gestionar y realizar seguimiento de sus tareas desde su navegador web")
    ContainerDb(base_datos, "Base de Datos", "SQL", "Almacena información de tareas y usuarios")

    Container_Boundary(api, "API") {
        Component(usuarios_controller, "Usuarios Controller", "Spring MVC Rest Controller", "Permite manejar las peticiones relacionadas con usuarios")
        Component(tareas_controller, "Tareas Controller", "Spring MVC Rest Controller", "Permite manejar las peticiones relacionadas con tareas")
        Component(auth, "Authentication Component", "Spring Security", "Maneja la autenticación y autorización de usuarios")
        Component(informes_controller, "Informes Controller", "Spring MVC Rest Controller", "Permite generar informes de avance y completitud de las tareas")

        Component(usuario_service, "Usuario Service", "Spring Service", "Encapsula la lógica de negocio para los usuarios")
        Component(tarea_service, "Tarea Service", "Spring Service", "Encapsula la lógica de negocio para las tareas")
        Component(informe_service, "Informe Service", "Spring Service", "Encapsula la lógica de negocio para generar informes")

        Rel(usuarios_controller, usuario_service, "Utiliza")
        Rel(tareas_controller, tarea_service, "Utiliza")
        Rel(informes_controller, informe_service, "Utiliza")

        Rel(usuario_service, auth, "Utiliza")
        Rel(tarea_service, auth, "Utiliza")

        Rel_Back(usuario_service, base_datos, "Lee y escribe", "JPA/Hibernate")
        Rel_Back(tarea_service, base_datos, "Lee y escribe", "JPA/Hibernate")
    }

    Rel_Back(app_web, usuarios_controller, "Realiza peticiones a", "REST/HTTP")
    Rel_Back(app_web, tareas_controller, "Realiza peticiones a", "REST/HTTP")
    Rel_Back(app_web, informes_controller, "Realiza peticiones a", "REST/HTTP")

```

# Base de datos

```mermaid
erDiagram
    Usuarios ||--o{ Usuarios_Roles : tiene
    Usuarios ||--o{ Tareas : "crea/actualiza"
    Usuarios ||--o{ Tareas : "asigna a"
    Usuarios ||--o{ Proyectos : crea
    Usuarios ||--o{ Informes : genera
    Roles ||--o{ Usuarios_Roles : tiene
    Tareas ||--o{ Proyectos_Tareas : pertenece_a
    Proyectos ||--o{ Proyectos_Tareas : tiene
```

Las tablas relacionadas con la autenticación y roles están en tonos azules, las tareas y los proyectos en verdes y los informes en tonos anaranjados:

![ER](./dbmodel.svg)