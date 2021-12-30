'use strict';
import './style.css';
/*
*  create a user
*  create a project
*  create a task
*/
////////////////////////////////////////
class user {
    constructor (
        userName = 'Default User',
    ) {
        this.userName = userName;
        this.projects = new Array();
    }
}

user.prototype.AddProjectToUser = function(project) {
    this.projects.push(project);
}

user.prototype.RemoveProjectFromUser = function(project) {
    // todo check if this works
    console.log(indexOf(this.projects[project]));
}

/////////////////////////////////////////
class project {
    constructor (
        title = '',
    ) {
        this.title = title;
        this.tasks = new Array();
    }
}



//////////////////////////////////////////
class task {
    constructor (
        title = '',
        description = '',
        priority = 0,
        dueDate = '2021-01-01',
        complete = false
    ) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.complete = complete;
    }
}


let user1 = new user("user1");
let project1 = new project("project1");

user1.AddProjectToUser(project1);

console.log(user1);