'use strict';

const sqlite = require('sqlite3');;
const db = require('../../db');
const bcrypt = require('bcrypt');
const daoCollection = require('./dao-collection');

exports.getOperaPage = function (type) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT image FROM Opera WHERE description LIKE ?';
        db.get(sql, ['%' + type + '%'], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({ error: 'Image not found.' });
            else {
                const img = { Image: row.image };
                resolve(img);
            }
        });

    });
};


exports.getoperas = function () {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM Opera WHERE userID !=?";
        db.all(sql, ["pirp8"], (err, rows) => {
            if (err)
                reject(err);
            else if (rows === undefined)
                resolve({ error: 'Opera not found.' });
            else {
                rows.forEach(function (row) {
                    resolve(rows.map((row) => ({ title: row.title, description: row.description, userId: row.userId, year: row.year, price: row.price, image: row.image, collection: row.collection, numrow: 1 })));
                });
            }
        });
    });
}

exports.delteOpera = function (idOpera) {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM Opera WHERE title =?";
        db.run(sql, [idOpera], function (err) {
            if (err) {
                reject(err);
            }
            else
                resolve(idOpera);
        });
    });
}

exports.getOperabyUser = function (user) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM Opera WHERE userId =?";
        db.all(sql, [user], (err, rows) => {
            if (err)
                reject(err);
            else if (rows === undefined)
                resolve({ error: 'Opera not found.' });
            else if (rows.length == 0)
                resolve({ numrow: 0 });
            else {
                rows.forEach(function (row) {
                    resolve(rows.map((row) => ({ title: row.title, description: row.description, userId: row.userId, year: row.year, price: row.price, image: row.image, collection: row.collection, numrow: 1 })));
                });
            }
        });
    });
}

exports.getOperaById = function (title) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM Opera WHERE title =?";
        db.all(sql, [title], (err, rows) => {
            if (err)
                reject(err);
            else if (rows === undefined)
                resolve({ error: 'Opera not found.' });
            else {
                rows.forEach(function (row) {
                    const op = { title: row.title, description: row.description, userId: row.userId, year: row.year, price: row.price, image: row.image, collection: row.collection };
                    resolve(op);
                });
            }
        });
    });
}

exports.createOpera = function (op) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Opera (title,description,userId,year,price,image,collection) VALUES(?,?,?,?,?,?,?)';
        db.run(sql, [op.title, op.description, op.artist, op.year, op.price, op.image, ""], function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve(op.title);
            }
        });
    });
}

exports.remaddop = function (opera, collection) {
    return new Promise((resolve, reject) => {
        let sql = 'UPDATE Opera SET collection=? WHERE title=?';
        db.run(sql, [collection, opera], function (err) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve({ col: collection, op: opera });
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

exports.removeCollection = function (coll) {
    return new Promise((resolve, reject) => {
        let sql = 'UPDATE Opera SET collection=? WHERE collection=?';
        db.run(sql, ["", coll], function (err) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve({ coll });
            }
        });
    });

}

exports.getOperaByCollection = function (collaname) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM Opera WHERE collection =?";
        db.all(sql, [collaname], (err, rows) => {
            if (err)
                reject(err);
            else if (rows === undefined)
                resolve({ error: 'Opera not found.' });
            else if (rows.length == 0)
                resolve({ numrow: 0 });
            else {
                rows.forEach(function (row) {
                    resolve(rows.map((row) => ({ title: row.title, description: row.description, userId: row.userId, year: row.year, price: row.price, image: row.image, collection: row.collection, numrow: 1 })));
                });
            }
        });
    });
}

exports.search = function (cri) {
    console.log(cri);
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Opera WHERE title LIKE ? OR description LIKE ? OR userId LIKE ?  OR collection LIKE ?';
        db.all(sql, ['%' + cri + '%', '%' + cri + '%', '%' + cri + '%', '%' + cri + '%',], (err, rows) => {
            console.log(rows);
            if (err) {
                console.log(err)
                reject(err);
            }
            else if (rows.length == 0)
                resolve({ numrow: 0 });
            else if (rows === undefined)
                resolve({ error: 'Image not found.' });
            else {
                rows.forEach(function (row) {
                    resolve(rows.map((row) => ({ title: row.title, description: row.description, userId: row.userId, year: row.year, price: row.price, image: row.image, collection: row.collection, numrow: 1 })));
                });
            }
        });

    });

}