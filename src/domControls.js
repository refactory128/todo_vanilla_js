//////////////////////////////////////////
//
//  DOM ELEMENTS
//
/////////////////////////////////////////
import plusIconSrc from './img/add_circle_black_24dp.svg';

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
        //console.log(field);
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
        //console.log(userInput);
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


function renderContent(fields, deleteCallback, editCallback, element, highlight = false, addCallback = null) {  
    const div = document.createElement("div");
    div.classList.add('element');
    if (highlight) {  div.classList.add('highlight')};

    let divHtml =""
    let i = 0;
    for (const field in fields){
        if (i<=0){
            divHtml = divHtml + `<h1>${fields[field]}</h1> </br>`;

        } else {
            //console.log(field);
            divHtml = divHtml + `<p>${fields[field]}<p>`;
        }
        i++;
    }
    div.innerHTML = divHtml 

    const controls = document.createElement("div");
    controls.classList.add('element-controls');
    
    const button = document.createElement("button");
    button.innerText = "Delete"
    button.addEventListener("click", e =>{
        //todo add remove element callback
        deleteCallback(element);
    });
    controls.appendChild(button);

    const button2 = document.createElement("button");
    button2.innerText = "Edit"
    button2.addEventListener("click", e =>{
        //todo add remove element callback
        editCallback(element);
    });
    controls.appendChild(button2);

    if (addCallback !== null){
        const button3 = document.createElement("button");
        button3.innerText = "Add"
        button3.addEventListener("click", e =>{
            //todo add remove element callback
            addCallback(element);
        });
        controls.appendChild(button3);
    }

    let body = document.querySelector("body");
    body.appendChild(div);
    div.appendChild(controls);
}

export {clearPage, navBar, generateModal, renderContent};