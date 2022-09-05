'use strict'
class Message{
    constructor(code,userId,Subject,text,read=0)
    {
        this.code=code;
        this.userId=userId;
        this.Subject=Subject;
        this.text=text;
        this.read=read;
    }
}

module.exports=Message;