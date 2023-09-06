# Task-manager: API _REST
> ~~project info here~~ ToDo
## Requirements to run

- Java JDK 17+ 
-  Apache Maven 3.8+
- Mysql Server 8+
> **Note:** If you don't have maven installed in your computer, you can check [this tutorial](https://mkyong.com/maven/how-to-install-maven-in-windows/). If you also don't have the JDK-17, download and install the Amazon Corretto version [here](https://docs.aws.amazon.com/corretto/latest/corretto-17-ug/downloads-list.html).

## Database configuration
~~Here place the instructions on how to config the DB using the provided .sql file and the Mysql CLI~~ ToDo


## How to run it

- First of all, check that the requirements are satisfied, to do so. open a terminal and run the following command and check that the Maven version and Java version are the correct ones

> mvn --version
- Then, open a terminal and go to the project directory "***task-manager/task-manager-api***",  and run the following command:
> mvn spring-boot:run

Now the project should be running on port 8090 and with your local address 127.0.0.1


## REST_API Calls

Currently there's two implemented calls with their expected JSON bodies:

- Register: (POST)

    *127.0.0.1:8090/auth/login*

> Expected JSON:
> "username":"user",
> "password":"user_password"





- Login (POST)
  

     *127.0.0.1:8090/auth/register*

> Expected JSON:
> "username":"user_to_register",
> "email":"user_email@domain",
> "password":"password_to_use"





