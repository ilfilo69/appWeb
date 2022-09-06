'use strict';

const sqlite = require('sqlite3');
const News = require('../../News');
const db = require('../../db');

/**
    * add a new user
    *
    * @param {} News - object containing all user properties 
    */

exports.getAllNews = function () {
  const d = new Date();
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM News WHERE year=? ';
    db.all(sql,[d.getFullYear()], (err, rows) => {
      if (err)
        reject(err);
      else {
        rows.forEach(function (row) {
          resolve(rows.map((row) => ({ month: row.month, description: row.description, downf: row.file })));
        });
      }
    });
  });
}

exports.createNews = function (nes) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO News (month,description,file,year)   VALUES(?,?,?,?);';
    db.run(sql, [nes.month,nes.description,nes.file,nes.year], function (err) {
      if (err) {
        reject(err);
      }
      else {
        resolve(nes.month);
      }
    });
  });

}
