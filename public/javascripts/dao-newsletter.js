'use strict';

const sqlite = require('sqlite3');
const News = require('../../NewsLetter');
const db = require('../../db');

/**
    * add a new user
    *
    * @param {} NewsLetter - object containing all user properties 
    */

exports.subscribe =function(email) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Newsletter(email) VALUES (?)';
        db.all(sql,[email],(err, rows) => {
          if (err)
            reject(err);
          else
          {
           resolve(1);
          }
        });
    });
}