'use strict';

const sqlite = require('sqlite3');
const Ticket = require('../../Ticket');
const db = require('../../db');

/**
    * add a new user
    *
    * @param {} Ticket - object containing all user properties 
    */


exports.getAllTicket = function () {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM Ticket";
        db.all(sql, (err, rows) => {
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
                    resolve(rows.map((row) => ({ code: row.code, numIngress: row.numIngress, price: row.price, type: row.type, numRow: 1 })));
                });
            }
        });
    });
}

exports.createTicket = function (ticket) {
    return new Promise((resolve, reject) => {
        console.log(ticket);
        let sql = "INSERT INTO Ticket(code,numIngress,price,type) VALUES (?,?,?,?)"
        db.run(sql, [ticket.code, ticket.numIngress, ticket.price, ticket.type], function (err) {
            if (err) {
                reject(err);
            }
            else
                resolve(ticket);
        });
    });
}

exports.deleteticket = function (id) {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM Ticket WHERE code =?";
        db.run(sql, [id], function (err) {
            if (err) {
                reject(err);
            }
            else
                resolve(id);
        });
    });
}

exports.getTicketType = function (type) {
    let cond="";
    let values="";
    for(let b=0; b<type.length-1; b++)
    {
        cond=cond+"code=? OR ";

    }
    cond=cond+"code=?";
    for(let b=0; b<type.length-1; b++)
    {
        values=values+"'"+type[b]+"'"+",";

    }
    values=values+"'"+type[type.length-1]+"'";
    let sql= "SELECT * FROM Ticket WHERE code IN ("+values +")";
    return new Promise((resolve, reject) => {
        db.all(sql,(err, rows) => {
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
                    resolve(rows.map((row) => ({ code: row.code, numIngress: row.numIngress, price: row.price, type: row.type, numRow: 1 })));
                });
            }
        });
    });
}