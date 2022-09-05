'use strict';

const db = require('./db');

const init = function () {
  const sql_create_usr = 'CREATE TABLE IF NOT EXISTS User('
    + 'name TEXT NOT NULL,'
    + 'surname TEXT NOT NULL,'
    + 'address TEXT NOT NULL,'
    + 'email TEXT NOT NULL,'
    + 'birthdayDate DATE NOT NULL,'
    + 'username TEXT NOT NULL PRIMARY KEY,'
    + 'password TEXT NOT NULL,'
    + 'role INTEGER NOT NULL,'
    + 'status INTEGER NOT NULL DEFAULT 2,'
    + 'image BLOB NOT NULL DEFAULT /images/noImages.png)';

  const sql_create_opr = 'CREATE TABLE IF NOT EXISTS Opera('
    + 'title TEXT NOT NULL PRIMARY KEY,'
    + 'description TEXT NOT NULL,'
    + 'userId INTEGER NOT NULL,'
    + 'year TEXT NOT NULL,'
    + 'price INTEGER NOT NULL,'
    + 'image TEXT NOT NULL,'
    + 'FOREIGN KEY (userId) REFERENCES User (userId))';

  const sql_create_tick = 'CREATE TABLE IF NOT EXISTS Ticket('
    + 'code TEXT NOT NULL PRIMARY KEY,'
    + 'numIngress INTEGER NOT NULL,'
    + 'price INTEGER NOT NULL,'
    + 'type TEXT NOT NULL)'

    const sql_create_feed = 'CREATE TABLE IF NOT EXISTS Feedback('
    + 'feedbackId int  PRIMARY KEY,'
    + 'stars INTEGER NOT NULL,'
    + 'operaId INTEGER NOT NULL,'
    + 'userId INTEGER NOT NULL,'
    + 'FOREIGN KEY (operaId) REFERENCES Opera (operaId),'
    + 'FOREIGN KEY (userId) REFERENCES User (userId))';


  const sql_create_coll = 'CREATE TABLE IF NOT EXISTS Collection('
    + 'name TEXT NOT NULL PRIMARY KEY,'
    + 'userId TEXT NOT NULL,'
    + 'FOREIGN KEY (userId) REFERENCES User (userId))';
  const sql_create_newslet = 'CREATE TABLE IF NOT EXISTS Newsletter('
    + 'email TEXT NOT NULL PRIMARY KEY)';
  const sql_create_news = 'CREATE TABLE IF NOT EXISTS News('
    + 'month TEXT NOT NULL ,'
    + 'description TEXT NOT NULL,'
    + 'file TEXT NOT NULL,'
    + 'year TEXT NOT NULL,'
    + 'PRIMARY KEY (month, description,year))';
  const sql_create_tick_user = 'CREATE TABLE IF NOT EXISTS TicketUser('
    + 'tikUsId TEXT NOT NULL PRIMARY KEY,'
    + 'code TEXT NOT NULL,'
    + 'userId TEXT NOT NULL,'
    + 'used INTEGER NOT NULL DEFAULT 0,'
    + 'FOREIGN KEY (userId) REFERENCES User (userId),'
    + 'FOREIGN KEY (code) REFERENCES Ticket (code))';
  const sql_create_message = 'CREATE TABLE IF NOT EXISTS Message('
    + 'code TEXT NOT NULL ,'
    + 'userId TEXT NOT NULL ,'
    + 'Subject  TEXT NOT NULL,'
    + 'text TEXT NOT NULL,'
    + 'read TEXT NOT NULL,'
    + 'FOREIGN KEY (userId) REFERENCES User (userId),'
    + 'PRIMARY KEY (code))';

  db.run(sql_create_message);
  db.run(sql_create_tick_user);
  db.run(sql_create_news);
  db.run(sql_create_usr);
  db.run(sql_create_opr);
  db.run(sql_create_tick);
  db.run(sql_create_feed);
  db.run(sql_create_coll);
  db.run(sql_create_newslet);
}

/*
const sql = 'INSERT INTO Opera (title,description,userId,year,price,image,collection) VALUES(?,?,?,?,?,?,?);';
db.run(sql, ["Venere e marte","69x173","sandro","1482",100000000,"/images/opere/sandro3.jpg","Beta"], function(err) {
    if (err) {
      console.log(err);
    } 
  });
  */


const sql='DELETE FROM Message WHERE 1';
db.run(sql,  function(err) {
  if (err) {
    console.log(err);
  } 
});

