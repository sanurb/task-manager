DROP DATABASE TaskmanagerG3;
DROP USER 'taskManagerDBAdmin';

CREATE DATABASE TaskmanagerG3DB;

use TaskmanagerG3DB;

CREATE USER 'taskManagerDBAdmin' IDENTIFIED BY 'task#$#@#Admin';

GRANT ALL PRIVILEGES ON TaskmanagerG3DB.* to 'taskManagerDBAdmin';
