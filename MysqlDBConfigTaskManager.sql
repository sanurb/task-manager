DROP DATABASE TaskmanagerG3;
DROP USER 'taskManagerDBAdmin';

CREATE DATABASE TaskmanagerG3DB;

use TaskmanagerG3DB;

/*Creacion de tablas*/

CREATE TABLE TaskmanagerG3DB.USERS(id int AUTO_INCREMENT, username varchar(64),
    email varchar(64), user_password varchar(64), last_login date, created_at date,
    updated_at date, deleted_at date,
    PRIMARY KEY(id), CONSTRAINT UNQ_username UNIQUE(username, email));

/*Creacion de usuario para uso de la bd*/

CREATE USER 'taskManagerDBAdmin' IDENTIFIED BY 'task#$#@#Admin';

GRANT ALL PRIVILEGES ON TaskmanagerG3DB.* to 'taskManagerDBAdmin';

/*De aca hacia abajo no se ha probado el codigo del cris*/


/**/
/**/
/**/
/**/
/**/

CREATE TABLE TaskmanagerG3DB.ROLES(id int AUTO_INCREMENT, user_role varchar(64),
    created_at date(), updated_at date(), deleted_at date(),
    PRIMARY KEY(id), CONSTRAINT UNQ_user_role UNIQUE(user_role));

CREATE TABLE TaskmanagerG3DB.USER_ROLES(user_id int AUTO_INCREMENT, role_id int(),
    created_at date(), updated_at date(), deleted_at date(),
    PRIMARY KEY(user_id), CONSTRAINT UNQ_role_id UNIQUE(role_id));

CREATE TABLE TaskmanagerG3DB.TASKS(id int AUTO_INCREMENT, title varchar(64),
    task_description varchar(64), due_date date(), task_priority varchar(64), category varchar (64),
    task_status varchar(64), created_by_user_id int(), assigned_to_user_id int(), created_at date(),
    updated_at date(), deleted_at date(),
    PRIMARY KEY(id), CONSTRAINT UNQ_title UNIQUE(title));

CREATE TABLE TaskmanagerG3DB.PROJECTS(id int AUTO_INCREMENT, project_name varchar(64),
    project_description varchar(64), created_by_user_id int(), created_at date(), updated_at date(),
    deleted_at date(),
    PRIMARY KEY(id), CONSTRAINT UNQ_project_name UNIQUE(project_name));

CREATE TABLE TaskmanagerG3DB.PROJECT_TASKS(project_id int AUTO_INCREMENT, task_id int(),
    created_at date(), updated_at date(), deleted_at date(),
    PRIMARY KEY(project_id), CONSTRAINT UNQ_task_id UNIQUE(task_id));

CREATE TABLE TaskmanagerG3DB.REPORTS(id int AUTO_INCREMENT, generated_by_user_id int(),
    generated_date date(), report_data json(), created_at date(), updated_at date(), deleted_at date(),
    PRIMARY KEY(id), CONSTRAINT UNQ_generated_by_user_id UNIQUE(generated_by_user_id));







/*Creacion de preferencia default  

INSERT INTO TaskmanagerG3DB.PREFERENCIA(orden_pro, tema, fuente) VALUES (1, 1, 1);

*/




/* Creacion datos de prueba 





/*Servicio usuario*/
INSERT INTO TaskmanagerG3DB.USUARIO(cod_ins, nombre, apellido, username, correo, rol, hashed_pass, habilitado) VALUES (2201000,
    'Juan', 'Gallego', 'juan.gallego', 'juan.gallego@uao.edu.com', "ROLE_JefeUnidad", 'juan123', 1 );


/*Admin*/
INSERT INTO TaskmanagerG3DB.USUARIO(cod_ins, nombre, apellido, username, correo, rol, hashed_pass, habilitado) VALUES (2201003,
    'Admin', 'Admin', 'Admin.opdata', 'admin.opdata@uao.edu.com', "ROLE_Administrador", 'toor', 1 );
    
 */