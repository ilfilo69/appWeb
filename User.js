'use strict'
class User{
    constructor(name,surname,address,email,birthDaydate,username,password,role,status=2)
    {
        this.name=name;
        this.surname=surname;
        this.address=address;
        this.email=email;
        this.birthDaydate=birthDaydate;
        this.username=username;
        this.password=password;
        this.role=role;
        this.status=status;
    }
}

module.exports=User;