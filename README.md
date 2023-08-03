## 1. Diagrama de Contexto
```mermaid
[Usuario] -- Solicitudes de la Aplicación --> [Plataforma de Gestión de Proyectos]
```

## 2. Diagrama de Contenedores
```mermaid
subgraph Plataforma de Gestión de Proyectos
  [Base de Datos]
  [Aplicación Web Angular]
  [Servidor de API]
end
[Usuario] -- Solicitudes HTTP --> [Aplicación Web Angular]
[Aplicación Web Angular] -- Solicitudes API --> [Servidor de API]
[Servidor de API] -- Operaciones de BD --> [Base de Datos]
```

## 3. Diagrama de Componentes
```mermaid
subgraph Aplicación Web Angular
  [Módulo de Autenticación]
  [Módulo de Usuarios]
  [Módulo de Tareas]
  [Módulo de Informes]
end
subgraph Servidor de API
  [Servicio de Autenticación]
  [Servicio de Usuarios]
  [Servicio de Tareas]
  [Servicio de Informes]
end
[Módulo de Autenticación] -- Solicitudes API --> [Servicio de Autenticación]
[Módulo de Usuarios] -- Solicitudes API --> [Servicio de Usuarios]
[Módulo de Tareas] -- Solicitudes API --> [Servicio de Tareas]
[Módulo de Informes] -- Solicitudes API --> [Servicio de Informes]```
