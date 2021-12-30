'use strict';

import './style.css';
import plusIconSrc from './img/add_circle_black_24dp.svg';



/////////////////////////////////////////
//  
//   OBJECTS
//
////////////////////////////////////////

class user {
    constructor (
        userName = 'Default User',
    ) {
        this.userName = userName;
        this.subElements = new Array();
    }
}

user.prototype.Add = function(subElement) {
    this.subElements.push(subElement);
}

user.prototype.Remove = function(subElement) {
    this.subElements.splice(this.subElements.indexOf(subElement),1);
}

/////////////////////////////////////////
class project {
    constructor (
        title = '',
    ) {
        this.title = title;
        this.subElements = new Array();
    }
}

project.prototype.Add = function(subElement) {
    this.subElements.push(subElement);
}

project.prototype.Remove = function(subElement) {
    this.subElements.splice(this.subElements.indexOf(subElement),1);
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


//////////////////////////////////////////
//
//  DOM ELEMENTS
//
/////////////////////////////////////////


function navBar(callback) {

    const nav = document.createElement("div");
    nav.classList.add('nav');


    const plusIcon = new Image();
    plusIcon.src = plusIconSrc;
    nav.appendChild(plusIcon);

    let body = document.querySelector("body");
    body.appendChild(nav);

    plusIcon.addEventListener("click", e =>{
        callback();
    });

}


//////////////////////////////////////////

function callbackTest() {
    console.log("clicked plus Icon from callback");
}


let user1 = new user("user1");
/*add function to call back to when clicked*/
navBar(callbackTest);
//create nav bar for user 1

let project1 = new project("project1");

user1.Add(project1);
user1.Remove(project1);
console.log(user1);