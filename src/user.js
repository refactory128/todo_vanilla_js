
export default class user {
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
    //console.log(this.subElements);
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

