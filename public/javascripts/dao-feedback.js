'use strict';

const sqlite = require('sqlite3');
const News = require('../../Message');
const db = require('../../db');
const e = require('express');

/**
    * add a new user
    *
    * @param {} Message - object containing all user properties 
    */

exports.InsertFeed=function(feed){
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Feedback (feedbackid,stars,operaId,userId) VALUES(?,?,?,?)'
        db.run(sql, [feed.feednackid,feed.stars,feed.operaId,feed.userId], (err, rows) => {
            if (err)
                reject(err);
            else
            {
                resolve({mes:"ok"});
            }
            
        });
    });
}

exports.getAVGopera=function(opera){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT stars FROM Feedback WHERE operaId=?'
        db.all(sql, [opera], (err, rows) => {
            if (err)
                reject(err);
            else if(rows.lengh==0)
            {
                resolve({stars:0,num:rows.length})
            }
            else
            {
                rows.forEach(function (row) {
                    resolve(rows.map((row) => ({ sars: row.stars, num:rows.length})));
                });;
            }
            
        });
    });
}