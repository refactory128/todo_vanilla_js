export default class project {
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
    //console.log("parent = " );
    //console.log(parent);
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

project.prototype.setParent = function(parent){
    return this.parent = parent;
}
