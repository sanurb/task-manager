DROP DATABASE TaskmanagerG3DB;
DROP USER 'taskManagerDBAdmin';

CREATE DATABASE TaskmanagerG3DB;

use TaskmanagerG3DB;

/*Creacion de usuario para uso de la bd*/

CREATE USER 'taskManagerDBAdmin' IDENTIFIED BY 'task#$#@#Admin';

GRANT ALL PRIVILEGES ON TaskmanagerG3DB.* to 'taskManagerDBAdmin';