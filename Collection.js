'use strict'
class Collection{
    constructor(name,userId,description,active="true")
    {
        this.name=name;
        this.userId=userId;
        this.description=description;
        this.active=active;
    }
}

module.exports=Collection;