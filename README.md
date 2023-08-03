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
graph LR
    A[Controlador de Autenticación] -->|Utiliza| B[Servicio de Autenticación]
    C[Controlador de Usuarios] -->|Utiliza| D[Servicio de Usuarios]
    E[Controlador de Tareas] -->|Utiliza| F[Servicio de Tareas]
    G[Controlador de Proyectos] -->|Utiliza| H[Servicio de Proyectos]
    I[Controlador de Informes] -->|Utiliza| J[Servicio de Informes]

    B -->|Accede a| K[Base de Datos]
    D -->|Accede a| K
    F -->|Accede a| K
    H -->|Accede a| K
    J -->|Accede a| K
```
