"use strict";

import appEngine from './appEngine.js';
const mainBox=document.getElementById("b0");
const navBar=document.getElementById("nav");
const about = document.getElementById("b1");
const contact = document.getElementById("b2");
const artists = document.getElementById("b3");
const collections = document.getElementById("b4");
const mainBoxLog=document.getElementById("b0login");
const navlogin=document.getElementById("navlogin");
const mainBoxReg=document.getElementById("b0registger");
const navReg=document.getElementById("navregister");
const mainBoxOp=document.getElementById("mainBoxOp");
const sections={about,contact,artists,collections};

new appEngine(mainBox,navBar,sections,mainBoxLog,navlogin,mainBoxReg,navReg,mainBoxOp);

