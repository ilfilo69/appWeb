'use strict'
class Feedback{
    constructor(feednackid,stars,operaId,userId)
    {
        this.feednackid=feednackid;
        this.stars=stars;
        this.operaId=operaId;
        this.userId=userId;
    }
}

module.exports=Feedback;