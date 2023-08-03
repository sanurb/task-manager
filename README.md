## 1. Diagrama de Contexto
```mermaid
graph LR
    A[Plataforma de Gestión de Tareas] -->|Interactúa| B[Usuario Administrador]
    A -->|Interactúa| C[Usuario Regular]
```

## 2. Diagrama de Contenedores
```mermaid
graph LR
    A[Cliente Web] -->|Realiza Solicitudes a| B[Servidor de Aplicaciones: API REST]
    B -->|Consulta y Almacena Datos en| C[Base de Datos]
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
