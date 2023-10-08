# Task-manager: API _REST

This is the API REST built with Spring Boot, for handling the backend of the task management application Task-Manager.


## Requirements to run
  

- Java JDK 17+

- Apache Maven 3.8+

- Mysql Server 8+

>  **Note:** If you don't have maven installed in your computer, you can check [this tutorial](https://mkyong.com/maven/how-to-install-maven-in-windows/). If you also don't have the JDK-17, download and install the Amazon Corretto version [here](https://docs.aws.amazon.com/corretto/latest/corretto-17-ug/downloads-list.html).

  

## Database configuration
 
In the first place, look for the file located in the folder where the repository and the corresponding "_dev_" branch are located until you find "_Mysql Database Creation.sql_". Copy its contents and open the MySQL 8 command-line client application. After logging in with your administration password, paste the contents of the .sql file.

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









### Contributions

Contributions are welcome. If you'd like to contribute, please create a [pull request](https://github.com/sanurb/task-manager/pulls).

#### Contact

For any inquiries or issues, please [contact us](https://github.com/sanurb).
___

*© 2023 Task-Manager*
