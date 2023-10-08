<div align = "center">

<h1><a href="https://github.com/sanurb/task-manager">Task Manager</a></h1>

<a href="https://github.com/sanurb/task-manager/blob/main/LICENSE">
<img alt="License" src="https://img.shields.io/github/license/sanurb/task-manager?style=flat&color=eee&label="> </a>

<a href="https://github.com/sanurb/task-manager/graphs/contributors">
<img alt="People" src="https://img.shields.io/github/contributors/sanurb/task-manager?style=flat&color=ffaaf2&label=People"> </a>

<a href="https://github.com/sanurb/task-manager/stargazers">
<img alt="Stars" src="https://img.shields.io/github/stars/sanurb/task-manager?style=flat&color=98c379&label=Stars"></a>

<a href="https://github.com/sanurb/task-manager/network/members">
<img alt="Forks" src="https://img.shields.io/github/forks/sanurb/task-manager?style=flat&color=66a8e0&label=Forks"> </a>

<a href="https://github.com/sanurb/task-manager/watchers">
<img alt="Watches" src="https://img.shields.io/github/watchers/sanurb/task-manager?style=flat&color=f5d08b&label=Watches"> </a>

<a href="https://github.com/sanurb/task-manager/pulse">
<img alt="Last Updated" src="https://img.shields.io/github/last-commit/sanurb/task-manager?style=flat&color=e06c75&label="> </a>

<h3>A Simple and Efficient Task Management System</h3>

<!-- <figure>
  <img src="images/screenshot.png" alt="bare-minimum in action">
  <br/>
  <figcaption>bare-minimum in action</figcaption>
</figure> -->

</div>

Task Manager is a web-based application that allows individuals and teams to manage, track, and collaborate on their tasks and projects.

## ✨ Features

- User-friendly interface for task management.
- Prioritization of tasks with categories and tags.

## Reading material

To get more technical information about the project please make sure to read this [overview](https://proyecto-informatico.gitbook.io/task-manager/technical-overview/overview).

## Setup

### ⚡ Requirements

Frontend:
- NodeJS >= 14.x
- Angular CLI
- Nx CLI (optional but recommended)

Backend:
- Java JDK 17+
- Apache Maven 3.8+
- Mysql Server 8+

### 🚀 Installation

Fronted:
```bash
git clone https://github.com/sanurb/task-manager
cd task-manager
npm install
```
Backend:
> **Note:** If you don't have maven installed in your computer, you can check [this tutorial](https://mkyong.com/maven/how-to-install-maven-in-windows/). If you also don't have the JDK-17, download and install the Amazon Corretto version [here](https://docs.aws.amazon.com/corretto/latest/corretto-17-ug/downloads-list.html).


### 💻 Usage

Frontend:
```bash
ng serve
```
Visit http://localhost:4200 on your browser to access the Task Manager.

Backend:
- First of all, check that the requirements are satisfied, to do so. open a terminal and run the following command and check that the Maven version and Java version are the correct ones

> mvn --version
- Then, open a terminal and go to the project directory "***task-manager/task-manager-api***",  and run the following command:
> mvn spring-boot:run

Now the project should be running on port 8090 and with your local address 127.0.0.1

### ✅ To-Do

- [x] Setup repo
- [x] Implement user authentication.
- [ ] Add notifications.
- [ ] Add calendar integrations.

##  Behind The Code

### 🌈 Inspiration

Task Manager was inspired by the need for a simple, yet powerful, task management tool that caters to both individuals and teams.

### 💡 Challenges/Learnings

- The main challenges were handling real-time collaboration.
- learned about optimizing Angular applications for performance and scalability.

<hr>

<div align="center">

<strong>⭐ hit the star button if you found this useful ⭐</strong><br>

<!-- <a href="https://github.com/sanurb/task-manager">Source</a> -->

</div>
