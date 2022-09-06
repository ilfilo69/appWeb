"use strict";

import appEngine from './appEngine.js';
const mainBox=document.getElementById("b0-page");
const navBar=document.getElementById("nav-page");
const about = document.getElementById("b1");
const contact = document.getElementById("b2");
const sections={about,contact};

new appEngine(mainBox,navBar,sections);

