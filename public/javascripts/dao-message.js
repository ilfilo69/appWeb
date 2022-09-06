'use strict';

const sqlite = require('sqlite3');
const News = require('../../Message');
const db = require('../../db');

/**
    * add a new user
    *
    * @param {} Message - object containing all user properties 
    */

exports.getMessageByUsername = function (username) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Message WHERE userId=? AND read=0'
        db.all(sql, [username], (err, rows) => {
            if (err)
                reject(err);
            else if (rows.length == 0)
                resolve({ numRow: 0 })
            else {
                rows.forEach(function (row) {
                    //console.log("LOLLOLALLA",rows.map((row) => ({ act: row.active })));
                    resolve(rows.map((row) => ({ code:row.code,Subj: row.Subject, userId: row.userId, text: row.text, numRow: 1 })));
                });

            }
        });
    });
}
exports.insertMessage = function (message) {
    if (!message.length) {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO Message(code,userId,Subject,text,read) VALUES(?,?,?,?,?);";
            db.run(sql, [message.code,message.userId, message.Subject, message.text, message.read], function (error) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve({ msg: "ok" });
                }
            });

        });
    }
    else {
        let err = ""
        return new Promise((resolve, reject) => {
            for (let a = 0; a < message.length; a++) {
                let sql = "INSERT INTO Message(code,userId,Subject,text,read) VALUES(?,?,?,?,?);";
                db.run(sql, [message[a].code,message[a].userId, message[a].Subject, message[a].text, message[a].read], function (error) {
                    if (err) {
                        err = err + error;
                    }
                });
            }
            if (!err) {
                resolve({ msg: "ok" });
            }
            else {
                console.log(err);
                reject(err);
            }
        })
    }
}
exports.readMess = function (mess) {
    return new Promise((resolve, reject) => {
        let sql = 'UPDATE Message SET read=1 WHERE code=?';
        db.run(sql, [mess], function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve(mess);
            }
        });
    });
}