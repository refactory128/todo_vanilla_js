export default class task {
    constructor (
        title = '',
        parent = null,
        description = '',
        dueDate = '2021-01-01',
        complete = false,
        priority = 0,

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
    this.dueDate = userInput.dueDate;
    this.complete = userInput.complete;
    this.priority = userInput.priority;
}

task.prototype.getSubElements = function() {
    return [];
}

task.prototype.getData = function() {
    return {title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            complete: this.complete,
            priority: this.priority, };
}

task.prototype.getParent = function(){
    return this.parent;
}

task.prototype.delete = function (){
    this.getParent().removeSubElement(this);
}

task.prototype.setParent = function(parent){
    return this.parent = parent;
}
