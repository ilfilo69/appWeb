'use strict';

const sqlite = require('sqlite3');
const User = require('../../User');
const db = require('../../db');
const bcrypt = require('bcrypt');
/**
    * add a new user
    *
    * @param {} User - object containing all user properties 
    */
exports.createUser = function (User) {
  return new Promise((resolve, reject) => {
    if (User.role == "Customer") { User.role = 0; }
    else if (User.role == "Artist") { User.role = 1; }
    let sql = 'INSERT INTO User(name, surname, address,email,birthdayDate,username,password,role,status,image) VALUES (?,?,?,?,DATETIME(?),?,?,?,?,?)';
    db.run(sql, [User.name, User.surname, User.address, User.email, User.birthDaydate, User.username, User.password, User.role, 2, "/images/users/noImage.png"], function (err) {
      if (err) {
        reject(err);
      }
      else {
        resolve(User.username);
      }
    });
  });
};

exports.getUser = function (username, password) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT name, surname, address,email,birthdayDate,username,password,role,status FROM User WHERE username = ?';
    db.get(sql, [username], (err, row) => {
      if (err)
        reject(err);
      else if (row === undefined)
        resolve({ error: 'User not found.' });
      else {
        const user = { name: row.name, surname: row.surname, address: row.address, email: row.email, birthdaydate: row.birthdayDate, username: row.username, password: row.password, role: row.role, status: row.status };
        let check = false;
        if (bcrypt.compareSync(password, row.password))
          check = true;
        resolve({ user, check });
      }
    });
  });
};


exports.getUserByUsername = function (username) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM User WHERE username = ?';
    db.get(sql, [username], (err, row) => {
      if (err)
        reject(err);
      else if (row === undefined)
        resolve({ error: 'User not found.' });
      else {
        const user = { name: row.name, surname: row.surname, address: row.address, email: row.email, birthDaydate: row.birthdayDate, username: row.username, password: row.password, role: row.role, status: row.status, image: row.image };
        resolve({ user });
      }
    });
  });
};

exports.getAllArtists = function () {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM User WHERE role=?';
    db.all(sql, [1], (err, rows) => {
      if (err)
        reject(err);
      else {
        rows.forEach(function (row) {
          resolve(rows.map((row) => ({ name: row.name, surname: row.surname, address: row.address, email: row.email, birthDaydate: row.birthdayDate, username: row.username, password: row.password, role: row.role, status: row.status, image: row.image })));
        });
      }
    });
  });
}

exports.updateUser = function (newUser) {

  return new Promise((resolve, reject) => {
    let sql = 'UPDATE User SET name=?, surname=?, address=?,email=?,birthdayDate=DATETIME(?),password=? WHERE username=?';
    db.run(sql, [newUser.name, newUser.surname, newUser.address, newUser.email, newUser.date, newUser.password, newUser.currentUserName], function (err) {
      if (err) {
        console.log(err);
        reject(err);
      }
      else {
        resolve(newUser.currentUserName);
      }
    });
  });
}

exports.updateUserNoPasss = function (newUser) {
  return new Promise((resolve, reject) => {
    let sql = 'UPDATE User SET name=?, surname=?, address=?,email=?,birthdayDate=DATETIME(?),image=? WHERE username=?';
    db.run(sql, [newUser.name, newUser.surname, newUser.address, newUser.email, newUser.date, newUser.image, newUser.currentUserName], function (err) {
      if (err) {
        console.log(err);
        reject(err);
      }
      else {
        resolve(newUser.currentUserName);
      }
    });
  });
}

exports.usernNoAttivate = function () {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM User';
    db.all(sql, (err, rows) => {
      if (err)
        reject(err);
      else {
        rows.forEach(function (row) {
          resolve(rows.map((row) => ({ name: row.name, surname: row.surname, address: row.address, email: row.email, birthDaydate: row.birthdayDate, username: row.username, password: row.password, role: row.role, status: row.status, image: row.image })));
        });
      }
    });
  })

}

exports.suspanduser = function (usr) {
  return new Promise((resolve, reject) => {
    let sql = 'UPDATE User SET status=1 WHERE username=?';
    db.run(sql, [usr], function (err) {
      if (err) {
        console.log(err);
        reject(err);
      }
      else {
        resolve(usr);
      }
    });
  });
}

exports.activateuser = function (usr) {
  console.log("SERVERSS", usr);
  return new Promise((resolve, reject) => {
    let sql = 'UPDATE User SET status=0 WHERE username=?';
    db.run(sql, [usr], function (err) {
      if (err) {
        console.log(err);
        reject(err);
      }
      else {
        resolve(usr);
      }
    });
  });
}

exports.getAllUser = function () {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM User';
    db.all(sql, (err, rows) => {
      if (err)
        reject(err);
      else {
        rows.forEach(function (row) {
          resolve(rows.map((row) => ({ name: row.name, surname: row.surname, address: row.address, email: row.email, birthDaydate: row.birthdayDate, username: row.username, password: row.password, role: row.role, status: row.status, image: row.image })));
        });
      }
    });
  });
}

exports.search = function (cri) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM User WHERE name LIKE ? OR surname LIKE ? OR address LIKE ? OR email LIKE ? OR username LIKE ?';
    db.all(sql, ['%' + cri + '%', '%' + cri + '%', '%' + cri + '%', '%' + cri + '%', '%' + cri + '%',], (err, rows) => {
      if (err)
        reject(err);
      else if (rows.length == 0)
        resolve({ numrow: 0 });
      else {
        rows.forEach(function (row) {
          resolve(rows.map((row) => ({ name: row.name, surname: row.surname, address: row.address, email: row.email, birthDaydate: row.birthdayDate, username: row.username, password: row.password, role: row.role, status: row.status, image: row.image })));
        });
      }
    });
  });
}

