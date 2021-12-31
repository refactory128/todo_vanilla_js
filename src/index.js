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
        this.parent = null;
        this.subElements = new Array();
    }
}

user.prototype.addSubElement = function(subElement) {
    this.subElements.push(subElement);
}

user.prototype.removeSubElement = function(subElement) {
    console.log(this.subElements);
    this.subElements.splice(this.subElements.indexOf(subElement),1);
}

user.prototype.getSubElements = function() {
    return this.subElements;
}

user.prototype.getData = function() {
    return {userName: this.userName};
}

user.prototype.getParent = function(){
    return this.parent;
}

/////////////////////////////////////////
class project {
    constructor (
        title = '',
        parent = null,
    ) {
        this.title = title;
        this.subElements = new Array();
        this.parent = parent;
        if (parent !== null){
            parent.addSubElement(this);
        }
    }
}

project.prototype.addSubElement = function(subElement) {
    this.subElements.push(subElement);
}

project.prototype.removeSubElement = function(subElement) {
    this.subElements.splice(this.subElements.indexOf(subElement),1);
}

project.prototype.getFillableFields = function() {
    return {title: "Title"};
}

project.prototype.update = function (userInput){
    this.title = userInput.title;
}

project.prototype.delete = function (){
    const parent = this.getParent();
    console.log("parent = " );
    console.log(parent);
    parent.removeSubElement(this);
}

project.prototype.getSubElements = function() {
    return this.subElements;
}

project.prototype.getData = function() {
    return {title: this.title};
}

project.prototype.getParent = function(){
    return this.parent;
}

//////////////////////////////////////////
class task {
    constructor (
        title = '',
        description = '',
        priority = 0,
        dueDate = '2021-01-01',
        complete = false,
        parent = null,
    ) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.complete = complete;
        this.parent = parent;
        if (parent !== null){
            parent.addSubElement(this);
        }
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

task.prototype.getParent = function(){
    return this.parent;
}

task.prototype.delete = function (){
    this.getParent().removeSubElement(this);
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
//element to edit or delete for callback
//highlight -- render in primary color or secondary color

function renderContent(fields, deleteCallback, editCallback, element, highlight = false) {  
    const div = document.createElement("div");
    div.classList.add('element');
    if (highlight) {  div.classList.add('highlight')};

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
        deleteCallback(element);
    });
    div.appendChild(button);

    const button2 = document.createElement("button");
    button2.innerText = "Edit"
    button2.addEventListener("click", e =>{
        //todo add remove element callback
        editCallback();
    });
    div.appendChild(button2);

    let body = document.querySelector("body");
    body.appendChild(div);
}


//////////////////////////////////////////
//
//   Callback Functions
//
//////////////////////////////////////////

function createNewProject()  {
    let tempProject = new project('New Project',user1);
    generateModal(tempProject.getFillableFields(), tempProject, updateElement);

}

function updateElement(element,userInput)
{

    element.update(userInput);
    console.log(element);
    renderPage();
    //user1.Add(tempProject);

}



function removeElement(element)
{
    console.log("remove element");
    console.log(element);


    
    element.delete();
    renderPage();
}


function renderPage()
{
    clearPage();
    navBar(createNewProject);  //generate nav bar and call back to createNewProject when plus is clicked
    
    //let user = user1;
    let elements = user1.getSubElements();
    
    //console.log(user);
    
    for(const element of elements) {
        renderContent(element.getData(),
                        removeElement,
                        element.update,
                        element,
                      true);
        //user1.removeSubElement(element);
        console.log(user1);
    }
    
}

/////////////////////////////////////////
//Main program starts here

const user1 = new user("user1");
let project1 = new project('project1',user1);

renderPage();
//create nav bar for user 1



