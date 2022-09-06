'use strict';

const sqlite = require('sqlite3');
const User = require('../../Collection');
const db = require('../../db');
/**
    * add a new user
    *
    * @param {} Collection - object containing all user properties 
    */
exports.getCollections = function () {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Collection WHERE active=?';
        db.all(sql, ["true"], (err, rows) => {
            if (err)
                reject(err);
            else if (rows === undefined)
                resolve({ error: 'Collection not found.' });
            else {
                rows.forEach(function (row) {

                    // console.log("LOLLOLALLA",rows.map((row) => ({ act: row.active })));
                    resolve(rows.map((row) => ({ name: row.name, prop: row.userId, desc: row.description, act: row.active })));
                });
            }
        });

    });

};

exports.delteCollection = function (id) {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM Collection WHERE name =?";
        db.run(sql, [id], function (err) {
            if (err) {
                reject(err);
            }
            else
                resolve(id);
        });
    });

}

exports.getCollectionsById = function (id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM Collection WHERE userId =?";
        db.all(sql, [id], (err, rows) => {
            if (err)
                reject(err);
            else if (rows === undefined)
                resolve({ error: 'Collection not found.' });
            else if (rows.length == 0) {
                resolve({ numrow: 0 });
            }
            else {
                rows.forEach(function (row) {
                    resolve(rows.map((row) => ({ name: row.name, userId: row.userId, description: row.description, numrow: 1 })));
                });
            }
        });
    });
}

exports.createcollection = function (collection) {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO Collection (name,userId,description,active) VALUES(?,?,?,?)";
        db.run(sql, [collection.name, collection.userId, collection.description, collection.active], (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(collection.name);
            }
        });
    });
}

exports.getCollextionByName = function (collnamw) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM Collection WHERE name=?";
        db.get(sql, [collnamw], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({ error: 'Collection not found.' });
            else {
                resolve({ name: row.name, userId: row.userId, description: row.description, active: row.active });
            }
        });
    });
}

exports.susattop = function (nameOp, status) {
    return new Promise((resolve, reject) => {
        let sql = 'UPDATE Collection SET active=? WHERE name=?';
        db.run(sql, [status, nameOp], function (err) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve({ nameOp });
            }
        });
    });
}

exports.search = function (cri) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Collection WHERE name LIKE ? OR userId LIKE ? OR description LIKE ?';
        db.all(sql, ['%' + cri + '%', '%' + cri + '%', '%' + cri + '%',], (err, rows) => {
            if (err)
                reject(err);
            else if (rows.length == 0) {
                resolve({ numrow: 0 });
            }
            else if (rows === undefined)
                resolve({ error: 'Image not found.' });
            else {
                rows.forEach(function (row) {
                    resolve(rows.map((row) => ({ name: row.name, userId: row.userId, description: row.description })));
                });
            }
        });

    });
}