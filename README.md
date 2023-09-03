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


# Requisitos para la Pantalla de Inicio de Sesión

## Introducción
Este documento tiene como objetivo detallar los requisitos funcionales y no funcionales para el diseño e implementación de una pantalla de inicio de sesión robusta y escalable. La autenticación se realizará mediante una base de datos y una API.

---

## Requisitos Funcionales

### 1. Campos de entrada
- **Usuario**: El usuario debe poder ingresar un nombre de usuario o una dirección de correo electrónico.
- **Contraseña**: Debe haber un campo para la contraseña.

### 2. Botones
- **Iniciar sesión**: Al hacer clic, inicia el proceso de autenticación.
- **Olvidé mi contraseña**: Enlace para recuperar la contraseña.
- **Crear una cuenta**: Enlace para ir a la página de registro.

### 3. Validaciones
- Validar el formato del correo electrónico (si se usa).
- Validar la longitud mínima de la contraseña.

### 4. Autenticación mediante Base de Datos
- Consultar la base de datos para verificar si el usuario y la contraseña son válidos.
- Protección contra ataques de SQL Injection.

### 5. Autenticación mediante API
- Enviar los datos ingresados a una API segura para la autenticación.
- Recibir una respuesta de la API para determinar si el acceso es válido.
  
### 6. Feedback al Usuario
- Mostrar mensajes de error cuando la autenticación falle.
- Mostrar una notificación de "Cargando" durante la verificación.

---

## Requisitos No Funcionales

### 1. Rendimiento
- La autenticación debe completarse en menos de 2 segundos en condiciones normales de red.

### 2. Escalabilidad
- Debe soportar al menos 1000 usuarios concurrentes.

### 3. Seguridad
- Las contraseñas deben almacenarse de forma segura (hash y sal).
- Todas las transacciones de datos deben ser encriptadas mediante HTTPS.
  
### 4. Usabilidad
- Diseño intuitivo y fácil de usar.
- Compatible con navegadores web modernos.

### 5. Disponibilidad
- El servicio de autenticación debe estar disponible el 99.9% del tiempo.

### 6. Mantenibilidad
- El código debe estar bien documentado.
- Facilidad para añadir nuevos métodos de autenticación en el futuro.

---

Para cualquier cambio o aclaración de estos requisitos, se deberá notificar y actualizar este documento.