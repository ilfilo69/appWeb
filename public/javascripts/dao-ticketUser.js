'use strict';

const sqlite = require('sqlite3');
const db = require('../../db');

exports.getUserbyTicket = function (type) {
    let val =[];
    for (let b = 0; b < type.length; b++) {
        val.push(type[b]);
    }
    let condition = "";
    for (let a = 0; a < type.length - 1; a++) {
        condition = condition + "code =? OR ";
    }
    condition = condition + "code =? ";
    return new Promise((resolve, reject) => {
        let sql = "SELECT DISTINCT userId FROM TicketUser WHERE " + condition;
        console.log(sql,val);
        db.all(sql, val , (err, rows) => {
            if (err)
                reject(err);
            else {
                console.log(rows);
                rows.forEach(function (row) {
                    resolve(rows.map((row)=>({userId: row.userId})));
                });
            }
        });
    })
}

exports.getTicketUser = function (user) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM TicketUser WHERE UserId=? AND used=?";
        db.all(sql,[user,0],(err, rows) => {
            //console.log("ROWS RESULT TICK",rows.length);
            if (err)
                reject(err);
            else if (rows === undefined)
                resolve({ error: 'Ticket not found.' });
            else if (rows.length == 0)
                resolve({ numRow: 0 })
            else {
                rows.forEach(function (row) {
                    //console.log("LOLLOLALLA",rows.map((row) => ({ act: row.active })));
                    resolve(rows.map((row) => ({ tikUsIs: row.tikUsId, code: row.code, userId: row.userId,numRow: 1 })));
                });
            }
        });
    });
}

exports.buyticket=function(code,type,user){
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO TicketUser(tikUsId,code,userId) VALUES (?,?,?)';
        db.run(sql, [code,type,user], function (err) {
          if (err) {
            reject(err);
          }
          else {
            resolve(code);
          }
        });
      });

}

exports.useTicket=function(tikUsIs){
    return new Promise((resolve, reject) => {
        let sql = 'UPDATE TicketUser SET used=? WHERE tikUsId=?'
        db.run(sql, [1,tikUsIs], function (err) {
          if (err) {
            reject(err);
          }
          else {
            resolve(tikUsIs);
          }
        });
      });
}