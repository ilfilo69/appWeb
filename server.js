"use strict";
const express = require('express');
const morgan = require('morgan');
const passport = require('passport'); //auth middleware
const moment = require('moment');
const LocalStrategy = require('passport-local').Strategy; //username and password for login
const daoUser = require('./public/javascripts/dao-users');
const daoOpera = require('./public/javascripts/dao-opera');
const daoCollection = require('./public/javascripts/dao-collection');
const daoTicket = require('./public/javascripts/dao-ticket');
const daoNews = require('./public/javascripts/dao-news');
const daoNewsLetter = require('./public/javascripts/dao-newsletter');
const daoMessage = require('./public/javascripts/dao-message');
const daoTicketUser = require('./public/javascripts/dao-ticketUser');
const daoFeedback = require('./public/javascripts/dao-feedback');
const { check, validationResult } = require('express-validator');
const user = require('./User');
const ticket = require('./Ticket');
const News = require('./News');
const mess = require('./Message');
const opp = require('./Opera');
const coll = require('./Collection');
const feed = require('./Feedback');
const session = require('express-session');
const bcrypt = require('bcrypt');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const doc = new PDFDocument;
const { createCanvas, loadImage } = require("canvas");
const path = require('path');
var app = express();
const saltRounds = 10;


// use res.render to load up an ejs view file
// index page

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));  //mi prendo i file publici
app.use(express.json({ limit: '50mb' })); //ERA TROPPO PICCOLO HO AUMENTATO LA DIMENSIONE DELLE REUQEST 
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));



passport.use(new LocalStrategy(
  function (username, password, done) {
    daoUser.getUser(username, password).then(({ user, check }) => {
      if (!user) {
        return done(null, false, { 'errors': [{ 'param': 'Server', 'msg': 'INCORRET USERNAME' }], });
      }
      if (!check) {
        return done(null, false, { 'errors': [{ 'param': 'Server', 'msg': 'INCORRET PASSWORD' }], });
      }
      return done(null, user);
    })
  }
));

// serialize and de-serialize the user (user object <-> session)
passport.serializeUser(function (user, done) {
  return done(null, user.username);
});

passport.deserializeUser(function (username, done) {
  daoUser.getUserByUsername(username).then(user => {
    return done(null, user);
  });
});


//SESSIONE
// set up the session
app.use(session({
  secret: 'SeFosseUnSegretoLoScrivereiQui?',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60000
  }
}));

// init passport
app.use(passport.initialize());
app.use(passport.session());



app.use(express.static('public'));  //mi prendo i file publici

app.get('/', (req, res) => {  //accedo all'homepage  
  res.redirect('index.html');
});


app.get('/pagina', (req, res) => {  //accedo all'homepage  
  res.redirect('login.html');
});

app.get('/register', (req, res) => {  //accedo all'homepage  
  res.redirect('register.html');
});

//Check if session is valid
app.put('/test/session', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ 'msg': 'Ok' });
  }
  else {
    return res.json({ 'msg': 'Nope' });
  }
});
// FINE SESSIONE
//-----PREDI IMAGE-----
app.post('/image', (req, res) => {
  daoOpera.getOperaPage(req.body.type).then((result) => {
    if (result.error) {
      res.status(404).json(result);
    } else {
      return res.json(result);
    }
  }).catch((err) => {
    res.status(500).json({
      'errors': [{ 'param': 'server', 'mgs': err }],
    });
  })
});
//----FINE IMMAGINI----

//------USER PART-----

//post register
app.post('/register',
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    else {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          const usr = new user(req.body.name, req.body.surname, req.body.address, req.body.email, req.body.date, req.body.username, hash, req.body.role, 2);
          daoUser.createUser(usr).then((username) => {
            // 201 -> Created 
            // Location Header redirects to the newly reported response
            console.log("SERVER RESPONSE REGISTER", username);
            return res.json(username);

          }).catch((err) => {
            res.status(500).json({
              'errors': [{ 'param': 'Server', 'msg': "USERNAME NOT AVAILABLE" }],
            });
            return res.json();
          });
        });
      });
    }
  });

app.post('/login', (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      // display wrong login messages
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, function (err) {
      if (err) { return next(err); }
      console.log(res);
      return res.json({ name: req.user.name, surname: req.user.surname, address: req.user.address, email: req.user.email, birthdaydate: req.user.birthdaydate, username: req.user.username, password: req.user.password, role: req.user.role, status: req.user.status, image: req.user.image });
    });
    //
  })(req, res, next);
});

app.post('/getUser', (req, res) => {
  daoUser.getUserByUsername(req.body.username).then((result) => {
    if (result.error) {
      res.status(404).json(result);
    } else {
      let dateformate = moment(result.user.birthDaydate).format("DD-MM-YYYY");
      return res.json({ name: result.user.name, surname: result.user.surname, address: result.user.address, email: result.user.email, date: dateformate, username: result.user.username, password: result.user.password, role: result.user.role, status: result.user.status, image: result.user.image });
    }
  }).catch((err) => {
    res.status(500).json({
      'errors': [{ 'param': 'server', 'mgs': err }],
    });
  });
});

app.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

app.post('/getArtists', (req, res) => {
  daoUser.getAllArtists().then((results) => {
    return res.json(results);
    //console.log(results)
  });
});

app.post('/getCollections', (req, res) => {
  daoCollection.getCollections().then((results) => {
    console.log("SERVER RESULT", results);
    return res.json(results);
  });
});

app.post('/getTicketUser', (req, res) => {
  daoTicketUser.getTicketUser(req.body.username).then((result) => {
    let cod = [];
    for (let a = 0; a < result.length; a++) {
      cod.push(result[a].code);
    }

    daoTicket.getTicketType(cod).then((result) => {
      return res.json({ numt: cod, tick: result });
    })
    //return res.json(result);
  });

});

app.post('/getAllNews', (req, res) => {
  daoNews.getAllNews().then((results) => {
    for (let i = 0; i < results.length; i++) {
      switch (results[i].month) {
        case "January":
          results[i].month = 0;
          break;
        case "February":
          results[i].month = 1;
          break;
        case "March":
          results[i].month = 2;
          break;
        case "April":
          results[i].month = 3;
          break;
        case "May":
          results[i].month = 4;
          break;
        case "June":
          results[i].month = 5;
          break;
        case "July":
          results[i].month = 6;
          break;
        case "August":
          results[i].month = 7;
          break;
        case "September":
          results[i].month = 8;
          break;
        case "October":
          results[i].month = 9;
          break;
        case "November":
          results[i].month = 10;
          break;
        case "December":
          results[i].month = 11;
          break;
      }
    }
    return res.json(results);
  });
});

app.post('/subscribeNewsLetter', (req, res) => {
  daoNewsLetter.subscribe(req.body.email).then((result) => {
    return res.json(result);
  }).catch((err) => {
    res.status(500).json({
      'errors': [{ 'param': 'Server', 'msg': "ERRORE" }],
    });
    return res.json();
  });
})

app.post('/getMessageByUsername', (req, res) => {
  daoMessage.getMessageByUsername(req.body.username).then((result) => {
    return res.json(result);
  }).catch((err) => {
    res.status(500).json({
      'errors': [{ 'param': 'Server', 'msg': "ERRORE" }],
    });
    return res.json();
  });
});

app.post('/update', (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  else {
    console.log(req.body);
    if (req.body.password.length == 0) {
      const usr = { name: req.body.name, surname: req.body.surname, address: req.body.address, email: req.body.email, date: req.body.date, image: req.body.image, currentUserName: req.body.currentUserName };
      daoUser.updateUserNoPasss(usr).then((risp) => {
        // 201 -> Created 
        // Location Header redirects to the newly reported response
        console.log("SERVER RESPONSE", risp);
        return res.json(risp);

      }).catch((err) => {
        res.status(500).json({
          'errors': [{ 'param': 'Server', 'msg': "USERNAME NON DISPONIBILE" }],
        });
        return res.json();
      });


    }
    else {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          const usr = { name: req.body.name, surname: req.body.surname, address: req.body.address, email: req.body.email, date: req.body.date, password: hash, image: row.body.image, currentUserName: req.body.currentUserName };
          daoUser.updateUser(usr).then((username) => {
            // 201 -> Created 
            // Location Header redirects to the newly reported response
            console.log("SERVER RESPONSE REGISTER", username);
            return res.json(username);

          }).catch((err) => {
            res.status(500).json({
              'errors': [{ 'param': 'Server', 'msg': "ERRORE NEL FORM /USERNAME NON DISPONIBILE" }],
            });
            return res.json();
          });
        });
      });
    }
  }



})

app.post('/saveImage', async function (req, res) {
  try {
    let title = path.resolve(__dirname, "./public/images/users/" + req.body.username + ".png");
    const WIDTH = 200;
    const HEIGHT = 200;
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");
    const imgage = await loadImage(req.body.newImage);
    ctx.drawImage(imgage, 0, 0, WIDTH, HEIGHT);
    //console.log("grjghfgosho",imgage);
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(title, buffer);
  }
  catch (e) {
    res.end(e.message || e.toString());
  }
});

app.post('/getUserNoAttivate', (req, res) => {
  daoUser.usernNoAttivate().then((result) => {
    return res.json(result);
  }).catch((err) => {
    res.status(500).json({
      'errors': [{ 'param': 'Server', 'msg': "ERRORE" }],
    });
    return res.json();
  });

});

app.post('/suspanduser', (req, res) => {
  console.log(req.body);
  daoUser.suspanduser(req.body.username).then((result) => {
    return res.json(result);
  }).catch((err) => {
    res.status(500).json({
      'errors': [{ 'param': 'Server', 'msg': "ERRORE" }],
    });
    return res.json();
  });
});

app.post('/activateuser', (req, res) => {
  console.log(req.body);
  daoUser.activateuser(req.body.username).then((result) => {
    return res.json(result);
  }).catch((err) => {
    res.status(500).json({
      'errors': [{ 'param': 'Server', 'msg': "ERRORE" }],
    });
    return res.json();
  });
});

app.post('/getallTicket', (req, res) => {
  daoTicket.getAllTicket().then((result) => {
    return res.json(result);
  }).catch((err) => {
    res.status(500).json({
      'errors': [{ 'param': 'Server', 'msg': "ERRORE" }],
    });
    return res.json();
  });

});

app.post('/createticket', (req, res) => {
  const tick = new ticket(req.body.codeTick, req.body.numberOfIng, req.body.price, req.body.tickeSeclection);
  daoTicket.createTicket(tick).then((ticket) => {
    console.log("SERVER RESPONSE REGISTER", ticket);
    return res.json(ticket);

  }).catch((err) => {
    res.status(500).json({
      'errors': [{ 'param': 'Server', 'msg': "ERRORE" }],
    });
    return res.json();
  });
});

app.delete('/deleteticket', (req, res) => {
  daoTicket.deleteticket(req.body.id).then((ticket) => {
    console.log("SERVER RESPONSE REGISTER", ticket);
    return res.json(ticket);

  }).catch((err) => {
    res.status(500).json({
      'errors': [{ 'param': 'Server', 'msg': "ERRORE" }],
    });
    return res.json();
  });
});

app.post('/getOpera', (req, res) => {
  daoOpera.getoperas().then((results) => {
    return res.json(results);
  });
})

app.delete('/deleteopera', (req, res) => {
  daoOpera.delteOpera(req.body.idOpera).then((results) => {
    return res.json(results);
  });
})

app.delete('/deletecollection', (req, res) => {
  daoCollection.delteCollection(req.body.id).then((results) => {
    return res.json(results);
  });
})

app.post('/savefile', (req, res) => {
  const d = new Date();
  let anno = 0;
  if (d.getMonth() + 1 == 12) {
    anno = d.getFullYear() + 1;
    let p = path.resolve(__dirname, "./public/news/");
    console.log(typeof anno);
    let h = path.join(p, anno.toString());
    console.log(typeof h);
    fs.mkdir(h, (err) => {
      if (err)
        console.log(err);
    });
  }
  else {
    anno = d.getFullYear();
  }

  let t = path.resolve(__dirname, "./public/news/" + "/" + anno + "/" + req.body.month + ".pdf");
  console.log(t);
  let per = '/news/' + anno + '/' + req.body.month + '.pdf';
  doc.pipe(fs.createWriteStream(t));
  doc.fontSize(20).text(`THE NEWS OF ` + req.body.month);
  doc.moveDown();
  doc.fontSize(17).text(req.body.text);
  doc.end();

  const nes = new News(req.body.month, req.body.desc, per, anno);
  daoNews.createNews(nes).then((result) => {
    return res.json(result);
  }).catch((err) => {
    res.status(500).json({
      'errors': [{ 'param': 'Server', 'msg': "ERRORE" }],
    });
    return res.json();
  });
});

app.post('/sendfilter', (req, res) => {
  var code = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 5; i++) {
    code += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  let usr = [];
  let mex = "";
  daoUser.getAllUser().then((result) => {
    for (let a = 0; a < result.length; a++) {
      mex = new mess(code, result[a].username, req.body.subj, req.body.mess, 0);
      usr.push(mex);
      mex = '';
    }

    daoTicket.getTicketType(req.body.type).then((result) => {
      let codes = [];
      for (let a = 0; a < result.length; a++) {
        codes.push(result[a].code);
      }
      daoTicketUser.getUserbyTicket(codes).then((result) => {
        let dest = [];
        for (let c = 0; c < result.length; c++) {
          for (let d = 0; d < usr.length; d++) {
            if (usr[d].userId == result[c].userId) {
              dest.push(usr[d]);
            }
          }
        }
        daoMessage.insertMessage(dest).then((results) => {
          return res.json(results);
        });
      });
    });
  })
});

app.post('/readmess', (req, res) => {
  daoMessage.readMess(req.body.mes).then((results) => {
    return res.json(results);
  });
})

app.post('/getopuser', (req, res) => {
  daoOpera.getOperabyUser(req.body.user).then((results) => {
    return res.json(results);
  })
})

app.post('/getopbyid', (req, res) => {
  daoOpera.getOperaById(req.body.title).then((results) => {
    daoFeedback.getAVGopera(results.title).then((avg) => {
      //console.log(avg);
      let t = [results, avg];
      console.log(t);
      return res.json(t)
    });
  });
});

app.post('/saveImageOpera', async function (req, res) {
  try {
    let title = path.resolve(__dirname, "./public/images/opere/" + req.body.title + ".png");
    const WIDTH = 700;
    const HEIGHT = 500;
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");
    const imgage = await loadImage(req.body.newImage);
    ctx.drawImage(imgage, 0, 0, WIDTH, HEIGHT);
    //console.log("grjghfgosho",imgage);
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(title, buffer);
  }
  catch (e) {
    res.end(e.message || e.toString());
  }
})

app.post('/createopera', function (req, res) {
  const opera = new opp(req.body.title, req.body.desc, req.body.username, req.body.year, req.body.price, req.body.imagePath);
  daoOpera.createOpera(opera).then((title) => {
    return res.json(title);

  }).catch((err) => {
    res.status(500).json({
      'errors': [{ 'param': 'Server', 'msg': "ERRORE NEL FORM" }],
    });
    return res.json();
  });
});

app.post('/getCollectionArt', function (req, res) {
  daoCollection.getCollectionsById(req.body.id).then((results) => {
    return res.json(results);
  })
})

app.post('/createcollection', function (req, res) {
  const newcoll = new coll(req.body.title, req.body.id, req.body.desc, "true")
  daoCollection.createcollection(newcoll).then((results) => {
    return res.json(results);
  })
});

app.post('/getCollectionbyname', function (req, res) {
  daoCollection.getCollextionByName(req.body.collname).then((results) => {
    return res.json(results);
  })
})

app.post('/remaddop', function (req, res) {
  daoOpera.remaddop(req.body.opera, req.body.coll).then((result) => {
    return res.json(result);
  })
});

app.post('/susattcoll', function (req, res) {
  daoOpera.removeCollection(req.body.collname).then(() => {
    daoCollection.susattop(req.body.collname, req.body.status).then((result) => {
      return res.json(result);
    });
  });

})

app.post('/buyticket', function (req, res) {
  var code = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 5; i++) {
    code += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  daoTicketUser.buyticket(code, req.body.type, req.body.user).then((result) => {
    let m = new mess(code, req.body.user, "YOU HAVE A NEW TICKET", "Thanks for buying a new ticket. Go to the tickets section and you will find it ready to be used.Enjoy!", 0);
    daoMessage.insertMessage(m).then((resr) => {
      return res.json(resr);
    });
  })
})

app.post('/useticket', function (req, res) {
  let r = "";
  daoTicketUser.getTicketUser(req.body.user).then((resu) => {
    for (let a = 0; a < resu.length; a++) {
      if (resu[a].code == req.body.ticket && resu[a].userId == req.body.user)
        r = resu[a].tikUsIs
    }
    //console.log(r);
    daoTicketUser.useTicket(r).then((result) => {
      return res.json(r);
    })

  });

})


app.post('/getObByColl', function (req, res) {
  daoOpera.getOperaByCollection(req.body.collname).then((result) => {
    return res.json(result);
  })
}
)

app.post('/inserfeed', function (req, res) {
  var code = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 5; i++) {
    code += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  let fd = new feed(code, req.body.stars, req.body.opera, req.body.user);
  daoFeedback.InsertFeed(fd).then((result) => {
    return res.json(result);
  })
})

app.post('/search', function (req, res) {
  let r = [];
  daoUser.search(req.body.cri).then((us) => {
    r.push(us),
      daoOpera.search(req.body.cri).then((op) => {
        r.push(op)
        daoCollection.search(req.body.cri).then((co) => {
          r.push(co)
          return res.json(r);
        });
      });
  })
})

app.get('*', function (req, res) {
  res.redirect('/');
});

app.listen(3000);
console.log('Server is listening on port 3000');
