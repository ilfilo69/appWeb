'use strict'
class Ticket{
    constructor(code,numIngress,price,type)
    {
        this.code=code;
        this.numIngress=numIngress;
        this.price=price;
        this.type=type;
    }
}

module.exports=Ticket;