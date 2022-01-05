'use strict';

import './style.css';
import {parse, stringify} from 'flatted';
import {clearPage, navBar, generateModal, renderContent} from './domControls'

/////////////////////////////////////////
//  
//   OBJECTS
//
////////////////////////////////////////

import user from './user';
import project from './project';
import task from './task';


//////////////////////////////////////////
//
//   Callback Functions
//
//////////////////////////////////////////

function createNewProject()  {
    let tempProject = new project('New Project',user1);
    generateModal(tempProject.getFillableFields(), tempProject, updateElement);
}

function createNewTask(parentProject)  {
    let tempTask = new task('New Task',parentProject);
    generateModal(tempTask.getFillableFields(), tempTask, updateElement);
}

function updateElement(element,userInput)
{
    element.update(userInput);
    renderPage();
}

function removeElement(element)
{
    element.delete();
    renderPage();
}

function getUpdateInfo(element) {
    generateModal(element.getFillableFields(), element, updateElement);
}

function renderPage()
{
    save(user1);
    clearPage();
    navBar(createNewProject);  //generate nav bar and call back to createNewProject when plus is clicked
    
    const projectElements = user1.getSubElements();
    
    for(const pElement of projectElements) {
        renderContent(
            pElement.getData(),
            removeElement,
            getUpdateInfo,
            pElement,
            true,
            createNewTask);

        let taskElements = pElement.getSubElements();               
        for(const tElement of taskElements){
            renderContent(
                tElement.getData(),
                removeElement,
                getUpdateInfo,
                tElement);
        }
    }
}
///////////////////////////////////////
//
// Local Storage
//
//////////////////////////////////////

function save(data){
    localStorage.setItem('todoListData', stringify(data));
}

function open(){
    if (localStorage.getItem('todoListData')){
        const data = parse(localStorage.getItem('todoListData'));
        console.log(data);
        const tempUser = Object.assign(new user, data);

        tempUser.getSubElements().forEach((subElement, index, array) => {

            const tempProject = Object.assign(new project, subElement);
            array[index] = tempProject
            tempProject.setParent(tempUser);
            //console.log(tempProject);
            tempProject.getSubElements().forEach((subElement, index, array) => {
                const tempTask = Object.assign(new task, subElement);
                array[index] = tempTask;
                tempTask.setParent(tempProject);
            });
        });
        console.log(tempUser); 
        return tempUser;
    } else {
        return null;
    }
}


/////////////////////////////////////////
//Main program starts here

let user1 = new user("myuser");

/*
let bonus = new project('bonus',user1);
let task25 = new task("make modal more user friendly",bonus);
let task26 = new task("move details to another sub element",bonus);
let task3 = new task("drag and drop priority",bonus);
let task4 = new task("connect to database",bonus);
*/
const loadedUser = open();

if (loadedUser) {
    user1 = loadedUser;
}
renderPage();
//create nav bar for user 1



