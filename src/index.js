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

user.prototype.add = function(subElement) {
    this.subElements.push(subElement);
}

user.prototype.remove = function(subElement) {
    this.subElements.splice(this.subElements.indexOf(subElement),1);
}

user.prototype.getSubElements = function() {
    return this.subElements;
}

user.prototype.getData = function() {
    return {userName: this.userName};
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

project.prototype.add = function(subElement) {
    this.subElements.push(subElement);
}

project.prototype.remove = function(subElement) {
    this.subElements.splice(this.subElements.indexOf(subElement),1);
}

project.prototype.getFillableFields = function() {
    return {title: "Title"};
}

project.prototype.update = function (userInput){
    this.title = userInput.title;
}

project.prototype.getSubElements = function() {
    return this.subElements;
}

project.prototype.getData = function() {
    return {title: this.title};
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

task.prototype.getFillableFields = function() {
    // return fields and descriptions for use in generating modals
    return {title:"Title",
            description: "Description",
            priority: "Priority greater numbes are lower priority",
            dueDate: "Optional Due Date (YYYY-MM-DD)",
            complete: "Complete" };
}

task.prototype.update = function (userInput){
    this.title = userInput.title;
    this.description = userInput.description;
    this.priority = userInput.priority;
    this.dueDate = userInput.dueDate;
    this.complete = userInput.complete;
}

task.prototype.getSubElements = function() {
    return [];
}

task.prototype.getData = function() {
    return {title: this.title,
            description: this.description,
            priority: this.priority,
            dueDate: this.dueDate,
            complete: this.complete };
}

//////////////////////////////////////////
//
//  DOM ELEMENTS
//
/////////////////////////////////////////


// remove all elements from page
function clearPage() {
    const body = document.querySelector("body");
    while (body.hasChildNodes()){
        body.removeChild(body.lastChild);
    }

}




// Generate navigation bar
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

//Create New Sub Element modal
// fields === the fields you want displayed on the modal
// element === The element to send to the callback
// calback == the callback function to call when the enter button is pushed

function generateModal(fields, element, callback) {  
    const modal = document.createElement("div");
    modal.classList.add('modal');

    let modalHtml =""
    for (const field in fields){
        console.log(field);
        modalHtml = modalHtml + `<label>${fields[field]}: <input id="${field}" type="text"></label> </br>`;
    }
    modal.innerHTML = modalHtml 
    
    const button = document.createElement("button");
    button.innerText = "Enter"
    button.addEventListener("click", e =>{
        let userInput = {};
        for (const field in fields){
            userInput[field] = document.getElementById(field).value;
        }
        console.log(userInput);
        callback(element, userInput);
        modal.remove();
    });
    modal.appendChild(button);
    let body = document.querySelector("body");
    body.appendChild(modal);
}

//fields data for render
//Remove content button callback
//Edit content button callback
//renderAs -- render as project or task (optional task default)

function renderContent(fields) {  
    const div = document.createElement("div");
    div.classList.add('element');

    let divHtml =""
    for (const field in fields){
        console.log(field);
        divHtml = divHtml + `<p>${fields[field]}<p> </br>`;
    }
    div.innerHTML = divHtml 
    
    const button = document.createElement("button");
    button.innerText = "Delete"
    button.addEventListener("click", e =>{
        //todo add remove element callback
    });
    div.appendChild(button);
    let body = document.querySelector("body");
    body.appendChild(div);
}


//////////////////////////////////////////
//
//   Callback Functions
//
//////////////////////////////////////////

function createNewProject()  {
    let tempProject = new project();
    user1.add(tempProject);
    generateModal(tempProject.getFillableFields(), tempProject, updateElement);

}

function updateElement(element,userInput)
{

    element.update(userInput);
    console.log(element);
    renderPage();
    //user1.Add(tempProject);

}

function renderPage()
{
    clearPage();
    navBar(createNewProject);  //generate nav bar and call back to createNewProject when plus is clicked
    
    let elements = user1.getSubElements();
    console.log(elements);
    
    for(const element of elements) {
        renderContent(element.getData());

    }
    
}

/////////////////////////////////////////
//Main program starts here

let user1 = new user("user1");

renderPage();
//create nav bar for user 1



