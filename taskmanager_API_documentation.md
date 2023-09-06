## Requirements to run
  

- Java JDK 17+

- Apache Maven 3.8+

- Mysql Server 8+

>  **Note:** If you don't have maven installed in your computer, you can check [this tutorial](https://mkyong.com/maven/how-to-install-maven-in-windows/). If you also don't have the JDK-17, download and install the Amazon Corretto version [here](https://docs.aws.amazon.com/corretto/latest/corretto-17-ug/downloads-list.html).

  

## Database configuration
 
In the first place, look for the file located in the folder where the repository and the corresponding "_dev_" branch are located until you find "_MysqlDBConfigTaskManager.sql_". Copy its contents and open the MySQL 8 command-line client application. After logging in with your administration password, paste the contents of the .sql file.

Add the .sql file to the Command Line Interface (CLI).
>
> If you don't see the MySQL CLI, you may not have MySQL installed. For more information or a tutorial, refer to this
       [documentation](https://dev.mysql.com/downloads/installer/).

After pasting it, you should see "_Query OK, 0 rows affected_" in the console.

Your SQL database is configured with tables, constraints, and at least one user. Make regular backups to properly manage user permissions, ensuring the security of your database.

This procedure is based on SQL Server, and commands and procedures may vary depending on the database platform you are using. Be sure to consult the appropriate documentation for your specific database management system to obtain accurate information on configuration.


## How to run it  

- First of all, check that the requirements are satisfied, to do so. open a terminal and run the following command and check that the Maven version and Java version are the correct ones

  

> mvn --version

- Then, open a terminal and go to the project directory "***task-manager/task-manager-api***", and run the following command:

> mvn spring-boot:run

  

Now the project should be running on port 8090 and with your local address 127.0.0.1

___
# Task-manager: API _REST

This is the API REST built with Spring Boot, for handling the backend of the task management application Task-Manager.



## REST_API Calls

 ### Endpoints ![enter image description here](https://www.appleute.de/wp-content/uploads/2021/05/api-removebg-preview-min.png)
 
  

#### *Authentication*

Before accessing resources protected by this API, make sure to authenticate yourself and obtain a valid access token. You can do this by calling the authentication endpoint:

##### *Log In (POST)*

In git-bash code, we can use:

- `/authenticate` 

> **Description:** Sign in and get a valid access token

**Parámetros de entrada:**

-   `username` (string): "user_username..."
-   `password` (string): "user_password..."
-  `email` (string): "user_email..."


### Currently there's two implemented calls with their expected JSON bodies:

  

	Register: (POST)

*127.0.0.1:8090/auth/login*
> Expected JSON:
> 
> "username":"user",
> 
> "password": "user_password"

	Login (POST)

  

*127.0.0.1:8090/auth/register*


> Expected JSON:
> 
> "username":"user_to_register",
> 
> "email":"user_email@domain",
> 
> "password":"password_to_use"
  ___
##### Successful response (200 OK) json format:

	{
	   "token": "your-access-token"
	}


##### Error response (401 Unauthorized) json format:
	{
	   "message": "Invalid credentials"
	}


### *Tasks*
##### List All Tasks (GET) bash format:

	/tasks

> Description: Gets a list of all available tasks.

##### Headers:

- `Authorization` (string): Valid access token.


##### Successful response (200 OK) json format:
	[
	   {
	     "id": 1,
	     "title": "Task 1",
	     "description": "abc",
	     "due_data": "DD/MM/YYYY",
	     "priority": "Low",
	     "category": "xyz",
	     "status": Active",
	     "created_by_user_id": 1,
	     "assigned_to_user_id": 2
	   },
	   {
	     "id": 2,
	     "title": "Task 2",
	     "description": "abcd",
	     "due_data": "DD/MM/YYYY",
	     "priority": "High",
	     "category": "wxyz",
	     "status": Complete",
	     "created_by_user_id": 2,
	     "assigned_to_user_id": 3
	   }
	]


##### Create New Task (POST) bash format:
	/tasks
> Description: Create a new task.


- **Input parameters:**
> name (string): The name of the task.
>description (string): The description of the task.
Successful response (201 Created) json format:
{
   "id": 3,
   "title": "New Task",
   "description": "New Task Description",
   "status": "Pending"
}

##### **Details of a Task (GET) bash format:**

		/tasks/{id}

> Description: Gets the details of a specific task.

- **Input parameters:**
> id (integer): ID of the task to be obtained.
> Successful response (200 OK) json format:
{
   "id": 1,
   "title": "Task 1",
   "description": "Description of Task 1",
   "status": "pending"
}
Update a Task (PUT) bash format:
/tasks/{id}

> Description: Updates the details of an existing task.

- **Input parameters:**

> id (integer): ID of the task to be updated.
name (string): The new name of the task.
description (string): The new description of the task.
status (string): The new status of the task (pending, completed, in progress, etc.).

##### Successful response (200 OK) json format:
	{
	   "id": 1,
	   "title": "Updated Task",
	   "description": "Updated Task Description",
	   "status": "Complete"
	}


##### Delete a Task (DELETE) bash format:
	/tasks/{id}
> Description: Delete an existing task.



- **Input parameters:**
>id (integer): ID of the task to be deleted.
> Response successful (204 No Content): The task is deleted successfully.

### *Users*
##### Get User Data (GET) bash format:
	/users/{username}
> Description: Gets the details of the current user.

- **Input parameters:**
> username (string): Username of the authenticated user.

##### Successful response (200 OK) json format:
	{
	   "username": "exampleusername",
	   "name": "User Name",
	   "email": "user@example.com"
	}


##### Error response (401 Unauthorized) json format:
	{
	   "message": "Invalid access token"
	}


### *Mistakes*
*The API returns the following status codes on errors:*

> 400 Bad Request: Incorrect request or invalid input data.
401 Unauthorized: Authentication failure or lack of access token.
404 Not Found: Resource not found.
500 Internal Server Error: Internal server error.





### Contributions

Contributions are welcome. If you'd like to contribute, please create a [pull request](https://github.com/sanurb/task-manager/pulls).

#### Contact

For any inquiries or issues, please [contact us](https://github.com/sanurb).
___

*© 2023 Task-Manager*