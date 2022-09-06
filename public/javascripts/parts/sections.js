function main() {
  return `
    <div class="row">
      <div class="col name-website">
        <div class="cite">
          <p class="intestazione">GALLERIA PIROLA</h1>
          <figcaption class="blockquote-footer">
            <cite title="Source Title" style="color: white;">LASCIA CHE GLI OCCHI TI MOSTRINO LA POTENZA DELL'ARTE</cite>
          </figcaption>
        </div>
      </div>
    </div>`
}

function about(image) {
  return ` <div class="row">
  <div class="col">
    <img class="image" src="${image}" alt="About_image">
  </div>
  <div class="col">
    <div class="description-box">
      <h1>ABOUT</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, nemo quaerat quidem minima quasi tenetur inventore excepturi consequuntur maxime pariatur, fuga eveniet harum consequatur rerum ullam nesciunt. Dolorum, nobis excepturi?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem a, neque dolorem voluptas eos expedita quidem commodi hic, asperiores odit ducimus eum quo minima cum qui ea! Unde, rerum ab.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci asperiores totam saepe aut, veritatis, nulla tempore impedit sint voluptatum quis placeat quisquam possimus quidem similique aliquid. Iure asperiores provident natus.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel a vero doloribus eligendi, consequuntur beatae temporibus modi, iusto quibusdam numquam odit quisquam! Provident saepe eos tempora, quisquam vero sint distinctio.</p>
    </div>
  </div>
</div>
  `
}

function news(image, news) {
  const d = new Date();
  let NewsOut = [];
  let j = 0;
  for(let a=0; a<news.length;a++)
  {
    NewsOut.push(news[a]);
  }
  NewsOut.reverse();
  let before =
    `<div class="row">
    <div class="col">
      <div class="description-box">
        <h1>NEWS:</h1>
        <div class="row tableCollection">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">MONTH</th>
                <th scope="col">TITLE</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody id="bodyTable">
`
  let middle = "";
  for (let i = 0; i < NewsOut.length; i++) {
    middle = middle +
      `
    <tr>
      <th scope="row">${i + 1}</th>
      <td class="td">${NewsOut[i].month}</td>
      <td class="td">${NewsOut[i].description}</td>
      <td class="td"><button name="${NewsOut[i].downf}" type="button" id="downloadFile" class="btn btn-outline-light table">Read the news</button>  </td>
    </tr> `
  }
  let end = ` 
        </tbody>
      </table>
    </div>
  </div>
  <form  class="row g-3 needs-validation" novalidate id="form-newsLetter">
    <div class="input-group mb-3">
      <input id="news" name="news" class="form-control" placeholder="Subscribe at news letter! insert an email addres">
      <p class="white" id="thks"></p>
      <div class="input-group-append">
        <button id="btnNewsLetter" class="btn btn-outline-light" type="submit">Subscribe!</button>
      </div>
    </div>
  </form>
 </div>
 <div class="col">
  <img class="image" src="${image}" alt="About_image">
  </div>
</div>
  `;
  let page = before + middle + end;
  return page;
}

function artists(artists) {
  let before = `
  <h1>ARTISTS</h1>
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">`
  let middle = "";
  let page;
  for (let i = 0; i < artists.length; i++) {
    middle = middle +
      `
      <div class="carousel-item active">
        <div class="carouselCard">
          <img src="${artists[i].image}" class="card-img-top" alt="...">
          <br><br>
            <div class="card-body">
              <button class="btn btn-outline-light" id="btArtistCar" name="${artists[i].username}">
              <h5 class="card-title">${artists[i].name + artists[i].surname}</h5>
              </button>
            </div>
        </div>
      </div>
    `;
  }
  let end = `</div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
  </div>`
  page = before + middle + end;
  return page;
}

function collection(collections) {
  let before = `
  <h1>COLLECTIONS</h1>
  <br>
  <div class="boxPageColl">
    <div class="row">
        <div class="col-md-1">
          <button type="button" onclick="All()" id="all" name"all" class="btn btn-outline-light">ALL </button>
        </div>
        <div class="col-md-2">
          <button type="button" onclick="inProgress()" id="inProgress" name="inProgress" class="btn btn-outline-light">IN PROGRESS </button>
        </div>
        <div class="col-md-1">
          <button type="button" onclick="finished()" id="finished" name="finished" class="btn btn-outline-light">FINISHED</button>
        </div>
    </div>
    <br>
    <div class="row tableCollection">
      <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">NAME</th>
          <th scope="col">ARTIST</th>
          <th scope="col">DESCRIPTION</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody id="bodyTableCollections">  
  `
  let middle = "";
  for (let i = 0; i < collections.length; i++) {
    if (collections[i].act == "true") {
      middle = middle +
        ` 
        <tr class="filterDiv ${collections[i].act}">
          <th scope="row">${i + 1}</th>
          <td class="td">${collections[i].name}</td>
          <td class="td">${collections[i].prop}</td>
          <td class="td">${collections[i].desc}</td>
          <td class="td"><button type="button" id="buytickHome" class="btn btn-outline-light table">buy a ticket</button> </td>
        </tr>
    `
    }
    else {
      middle = middle +
        ` 
        <tr class="filterDiv ${collections[i].act}">
          <th scope="row">${i + 1}</th>
          <td class="td">${collections[i].name}</td>
          <td class="td">${collections[i].prop}</td>
          <td class="td">${collections[i].desc}</td>
          <td class="td"></td>
        </tr>
    `
    }

  }
  ;
  let end = ` 
          </tbody>
        </table>
      </div>
    </div>
  `;
  let page = before + middle + end;
  return page;
}

function registerForm(image) {
  return ` <div class="row">
  <div class="col-md-6 regis">
    <img class="image" src="${image}" alt="About_image">
  </div>
  <div class="col col-md-6">
    <div class="description-box-reg">
      <h1>SIGN UP:</h1>
      <form  class="row g-3 needs-validation" id="form-reg" novalidate>
      <!-- Nome -->
      <div class="col-md-12 reg">
        <input type="text" class="form-control" placeholder="Name" id="name" name="name" minlength="3" required>
        <div class="valid-feedback">
          Perfect!
        </div>
        <div class="invalid-feedback">
        You must provide a valid name, at least three characters.
        </div>
      </div>
      <!-- Cognome -->
      <div class="col-md-12 reg">
        <input type="text" class="form-control" placeholder="Surname" id="surname" name="surname" minlength="3" required>
        <div class="valid-feedback">
          Perfect!
        </div>
        <div class="invalid-feedback">
        You must provide a valid name, at least three characters.
        </div>
      </div>
      <!-- Data di nascita -->
      <div class="col-md-12 reg">
        <input type="date" id="born" placeholder="Date of birth" name="born" class="form-control" required>
        <div class="valid-feedback">
          Perfect!
        </div>
        <div class="invalid-feedback">
        You must provide a date of birth (minimum 18 years).
        </div>
      </div>
      <!-- E-mail -->
      <div class="col-md-12 reg">
        <input type="email" id="email" placeholder="email-email@example.it" name="email" class="form-control" required>
        <div class="valid-feedback">
          Perfetto!
        </div>
        <div class="invalid-feedback">
        You must provide a valid email address
        </div>
      </div>
      <!-- Username -->
      <div class="col-md-12 reg">
        <input type="text" id="usr" name="usr" placeholder="Username" class="form-control" minlength="5" required>
        <div class="valid-feedback">
          Perfect!
        </div>
        <div class="invalid-feedback">
        You must provide a valid username, at least 5 characters.
        </div>
      </div>
      <!-- Password -->
      <div class="col-md-12">
        <input type="password" id="password" placeholder="Password" name="password" class="form-control" minlength="5" required>
        <div class="valid-feedback">
          Perfect!
        </div>
        <div class="invalid-feedback">
        You must provide a password of at least 5 characters.
        </div>
      </div>
      <!-- Indirizzo -->
      <div class="col-md-12 reg">
        <input type="text" id="address" placeholder="Address" name="address" class="form-control" required>
        <div class="valid-feedback">
          Perfect!
        </div>
        <div class="invalid-feedback">
          You have to provide an address.
        </div>
      </div>
      <!-- Ruolo -->
      <div class="col-md-12 reg">
        <select class="form-control" id="role" name="role" required>
          <option selected disabled value>Choose your own role...</option>
          <option>Artist</option>
          <option>Customer</option>
        </select>
        <div class="invalid-feedback">
          Choosing a viable alternative
        </div>
      </div>
      <!-- Termini e condizioni + submit del form -->
      <div class="col-12 reg">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
          <label class="form-check-label" for="invalidCheck">
            Accept the terms and conditions of the service
          </label>
          <div class="invalid-feedback">
            You have to accept before you can proceed.
          </div>
        </div>
      </div>
      <div class="col-12 reg">
        <button id="btnReg"class="btn btn-outline-light" style="border:1px solid;" type="submit">Registrati</button>
      </div>
    </form>
  </div>
  </div>
</div>
<div class="col">
</div>`
}

function loginForm(image) {
  return ` <div class="row">
  <div class="col-md-6 login">
    <img class="image" src="${image}" alt="About_image">
  </div>
  <div class="col col-md-6">
    <div class="description-box-login">
      <h1>SIGN IN:</h1>
      <div class="card-body-login">
      <form  class="row g-3 needs-validation" novalidate id="form-log">
      <!-- Username -->
      <div class="col-md-12 login">
        <input type="text" id="usr" name="usr" class="form-control" placeholder="Username" required>
        <div class="valid-feedback">
          Perfetto!
        </div>
        <div class="invalid-feedback">
          Questo campo non può rimanere vuoto.
        </div>
      </div>
      <!-- Password -->
      <div class="col-md-12">
        <input type="password" id="password" name="password" placeholder="Password" class="form-control" minlength="5" required>
        <div class="valid-feedback">
          Perfetto!
        </div>
        <div class="invalid-feedback">
          Questo campo non può rimanere vuoto.
        </div>
      </div>
      <div class="col-12">
        <a  href="/register" class="btn btn-link" type="button" id="btnRegistati">Don’t have an account yet? Register!</a>
      </div>
    <div class="col-12">
        <button id="btnLog" class="btn btn-outline-light" style="border:1px solid;" type="submit">Sign in!</button>
      </div>
    </form>
  </div>
  </div>
</div>
<div class="col">
</div>
    </div>
  </div>
</div>`
}

function alert(message) {
  return `<div class="alert alert-danger alert-dismissible fade show" role="danger" id="errorAlert">
  <strong>ATTENZIONE!</strong>
  <span aria-hidden="true">"${message}"</span>
</div>`
}

function notAttivateUserPageData(user) {
  return `
  <div class="boxUserPage">
  <div class="row">
      <div class="col-md-6 sx">
        <div class="row objUser">
        <h1>DATI:</h1>
        </div>
        <div class="row objUser">
          <div class="col">
            <h5>NOME : </h5>
          </div>
          <div class="col user">
            <h5 id="nameUser">${user.name}</h5>
          </div>
        </div>
        <div class="row objUser">
          <div class="col">
            <h5>COGNOME : </h5>
          </div>
          <div class="col user">
            <h5>${user.surname}</h5>
          </div>
        </div>
        <div class="row objUser">
          <div class="col">
            <h5>INDIRIZZO : </h5>
          </div>
          <div class="col user">
            <h5>${user.address}</h5>
          </div>
        </div>
        <div class="row objUser">
          <div class="col">
            <h5>INDIRIZZO EMAIL : </h5>
          </div>
          <div class="col user">
           <h5>${user.email}</h5>
          </div>
        </div>
        <div class="row objUser">
          <div class="col">
            <h5>USERNAME : </h5>
          </div>
          <div class="col user">
            <h5>${user.username}</h5>
          </div>
        </div>
        <div class="row objUser">
          <div class="col">
            <h5>DATA DI NASCITA : </h5>
          </div>
          <div class="col user">
            <h5>${user.birthdaydate}</h5>
          </div>
        </div>
        <div class="row objUser" id="statusUser">
          <div class="col">
            <h5>STATO ACCOUNT : </h5>
          </div>
          <div class="col user">
            <h5>${user.status}</h5>
          </div>
      </div>
      <br><br>
    </div>
    <div class="col-md-3">
    </div>
    <div class="col-md-3 dx">
      <div class="row image">
      <img src="${user.image}" alt="No image" class="img-thumbnail">
    </div>
    </div>
    <div class="row">
        <div class="col-md-4">
        </div>
        <div class="col-md-4">
        </div>
        <div col-md-4>
        </div>
      </div>
  </div>
</div>
`;

}

function userPageData(user) {
  return `
  <div class="boxUserPage">
  <div class="row">
      <div class="col-md-6 sx">
        <div class="row objUser">
        <h1>YOUR DATA:</h1>
        </div>
        <div class="row objUser">
          <div class="col">
            <h5>NAME : </h5>
          </div>
          <div class="col user">
            <h5 id="nameUser">${user.name}</h5>
          </div>
        </div>
        <div class="row objUser">
          <div class="col">
            <h5>SURNAME : </h5>
          </div>
          <div class="col user">
            <h5>${user.surname}</h5>
          </div>
        </div>
        <div class="row objUser">
          <div class="col">
            <h5>ADDRESS : </h5>
          </div>
          <div class="col user">
            <h5>${user.address}</h5>
          </div>
        </div>
        <div class="row objUser">
          <div class="col">
            <h5>EMAIL ADDRESS: </h5>
          </div>
          <div class="col user">
           <h5>${user.email}</h5>
          </div>
        </div>
        <div class="row objUser">
          <div class="col">
            <h5>USERNAME : </h5>
          </div>
          <div class="col user">
            <h5>${user.username}</h5>
          </div>
        </div>
        <div class="row objUser">
          <div class="col">
            <h5>DATE OF BIRTH : </h5>
          </div>
          <div class="col user">
            <h5>${user.date}</h5>
          </div>
        </div>
        <div class="row objUser" id="statusUser">
          <div class="col">
            <h5>STATUS  ACCOUNT : </h5>
          </div>
          <div class="col user">
            <h5>${user.status}</h5>
          </div>
      </div>
      <br><br>
    </div>
    <div class="col-md-3">
    </div>
    <div class="col-md-3 dx">
      <div class="row image">
      <img src="${user.image}" alt="No image" class="img-thumbnail">
    </div>
    </div>
    <div class="row">
        <div class="col-md-4">
        </div>
        <div class="col-md-4">
          <a type="button" href="edit"class="btn btn-outline-light">EDIT YOUR DATA</a> 
        </div>
        <div col-md-4>
        </div>
      </div>
  </div>
</div>
`;
}

function message(message) {
  if (document.getElementById("message")) {
    document.getElementById("message").innerHTML = message;
  }
  return `
  <div class="modal" tabindex="-1" role="dialog" id="simpleModal">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">! ATTENTION !</h5>
    </div>
    <div class="modal-body">
      <p id="message">${message}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeModal">Close</button>
    </div>
  </div>
</div>
</div>`


};

function notAttivateUserTicket() {
  return `
  <h1>TICKETS:</H1>
  <div class="mesageBox">
    <div class="row">
      <div class="col">
        <h1 class="allert">NOT AVAILABLE</h1>
      </div>
    </div>
  </div>
  `;
};

function helpDesk(user) {
  return `
  <h1>HELP DESK:</h1>
  <div class="helpdesk">
      <div class="col-md-12">
        <label for="exampleInputEmail1">Chose a category for your problem:</label>
        <select class="form-control" id="categoryHelp" name="categoryHelp" required>
          <option selected disabled value>Category...</option>
          <option>Account</option>
          <option>Artists</option>
          <option>Ticket</option>
          <option>Sales</option>
        </select>
        <br>
        <label for="exampleInputEmail1">Message:</label>
        <textarea class="form-control" rows="10" id="messageHelp"></textarea>
        <br>
        <button type="button" onclick="helpdesk('${user.username}')" class="btn btn-light">Send</button>
      </div>
  </div>
  `
}

function UserTicket(tiket) {
  if (tiket.tick.length == 0) {
    return `
  <h1>TICKETS:</H1>
  <div class="mesageBox">
    <div class="row">
      <div class="col">
        <h2> NON HO TROVATO NESSUN TICKET</h2>
      </div>
      <div class="row">
      <div class="col">
        <br><br>
        <button type="button" id="userbuyticket" class="btn btn-light">BUY A TICKET</button>
      </div>
    </div>
  </div>
  `;
  }
  else {
    var count = {};
    tiket.numt.forEach(function (i) { count[i] = (count[i] || 0) + 1; });
    let before =
      `
        <h1>TICKET:</h1>
        <div class="boxUserPage">
        <div class="row">
          <div class="col-md-4">
          </div>
          <div class="col-md-4 center">
            <button type="button" id="userbuyticket" class="btn btn-btn btn-outline-light">BUY A TICKET!</button>
          </div>
          <div class="col-md-4">
          </div>
        </div>
        <div class="row">
        <div class="col">
          <div class="description-box-userAdmin">
            <div class="row tableCollection">
              <table class="table" id="userTable">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">NAME</th>
                    <th scope="col">NUMBER OF ENTRANCE</th>
                    <th scope="col">N.</th>
                    <th scope="col">TYPE</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody id="bodyTable">
  `
    let middle = "";
    for (let i = 0; i < tiket.tick.length; i++) {
      if (tiket.tick[i].code == "MultiEntry") {
        middle = middle +
          `
        <tr class="tr">
          <th scope="row">${i + 1}</th>
          <td class="td">${tiket.tick[i].code}</td>
          <td class="td">${tiket.tick[i].numIngress}</td>
          <td class="td">${count.MultiEntry}</td>
          <td class="td">${tiket.tick[i].type}</td>
          <td class="td"><button  id="btnUseTick" name="${tiket.tick[i].code}" type="button" class="btn btn-outline-info table">USE</button> </td>
        </tr> `
      }
      else if (tiket.tick[i].code == "SingleEntry") {
        middle = middle +
          `
        <tr class="tr">
          <th scope="row">${i + 1}</th>
          <td class="td">${tiket.tick[i].code}</td>
          <td class="td">${tiket.tick[i].numIngress}</td>
          <td class="td">${count.SingleEntry}</td>
          <td class="td">${tiket.tick[i].type}</td>
          <td class="td"><button  id="btnUseTick" name="${tiket.tick[i].code}"type="button" class="btn btn-outline-info table">USE</button> </td>
        </tr> `

      }
    }
    let end = ` 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
    let page = before + middle + end;
    return page;
  }
}

function notAttivateUserNotification() {
  return `
  <h1>MESSAGE:</H1>
  <div class="mesageBox">
    <div class="row">
      <div class="col">
        <h1 class="allert">NOT AVAILABLE</h1>
      </div>
    </div>
  </div>
  `;

}

function editUserData(user) {
  return `
  <div class="boxUserPage">
    <form  class="row g-3 needs-validation" id="form-edit" novalidate>
      <div class="row">
          <div class="col-md-6 sx">
            <div class="row objUser">
            <h1>YOUR DATA:</h1>
            </div>
              <div class="row objUser">
                <div class="col">
                  <h5>NAME : </h5>
                </div>
                <div class="col">
                  <!-- Nome -->
                  <div class="col-md-12 reg">
                    <input type="text" class="form-control" placeholder="${user.name}" id="Newname" name="name" minlength="3" required>
                    <div class="valid-feedback">
                    </div>
                    <div class="invalid-feedback">
                    </div>
                  </div>
                </div>
              </div>
              <div class="row objUser">
                <div class="col">
                  <h5>SURNAME : </h5>
                </div>
                <div class="col">
                  <div class="col-md-12 reg">
                    <input type="text" class="form-control" placeholder="${user.surname}" id="Newsurname" name="surname" minlength="3" required>
                    <div class="valid-feedback">
                    </div>
                    <div class="invalid-feedback">
                    </div>
                  </div>
                </div>
              </div>
              <div class="row objUser">
                <div class="col">
                  <h5>ADDRESS : </h5>
                </div>
                <div class="col">
                  <div class="col-md-12 reg">
                    <input type="text" id="Newaddress" placeholder="${user.address}" name="Newaddress" class="form-control" required>
                    <div class="valid-feedback">
                    </div>
                    <div class="invalid-feedback">
                    </div>
                  </div>
                </div>
              </div>
              <div class="row objUser">
                <div class="col">
                  <h5>EMAIL ADDRESS : </h5>
                </div>
                <div class="col">
                <!-- E-mail -->
                  <div class="col-md-12 reg">
                      <input type="email" id="Newemail" placeholder="${user.email}" name="Newemail" class="form-control" required>
                    <div class="valid-feedback">
                    </div>
                    <div class="invalid-feedback">
                    </div>
                  </div>
                </div>
              </div>
              <div class="row objUser">
                <div class="col">
                  <h5>DATE OF BITRH : </h5>
                </div>
                <div class="col">
                <!-- Data di nascita -->
                  <div class="col-md-12 reg">
                    <input type="date" id="Newborn" name="Newborn" class="form-control" placeholder="${user.date}" required>
                    <div class="valid-feedback">
                    </div>
                    <div class="invalid-feedback">
                    </div>
                  </div>
                </div>
              </div>
              <div class="row objUser">
                <div class="col">
                  <h5>USERNAME : </h5>
                </div>
                <div class="col">
                  <!-- Username -->
                  <div class="col-md-12 reg">
                    <input type="text" id="Newusr" name="usr" placeholder="${user.username}" class="form-control" minlength="5" required readonly>
                    <div class="valid-feedback">
                    </div>
                    <div class="invalid-feedback">
                    </div>
                  </div>
                </div>
              </div>
              <div class="row objUser" id="statusUser">
                <div class="col">
                  <h5>PASSWORD : </h5>
                </div>
                <div class="col">
                  <div class="col-md-12">
                    <input type="password" id="Newpassword" placeholder="Password" name="password" class="form-control">
                    <div class="valid-feedback">
                    </div>
                    <div class="invalid-feedback">
                    </div>
                  </div>
                </div>
              </div>
              <br><br>
              </div>
              <div class="col-md-3">
              </div>
              <div class="col-md-3 dx">
                <div class="row image edit image">
                  <img src="${user.image}" alt="No image" id="displayImage" class="img-thumbnail">
                  <input type="file" class="form-control" id="newImage" name="myImage" accept="image/png, image/gif, image/jpeg" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                </div>
                <div class="col-md-4">
                  <button type="submit" id="btnChange" href="edit"class="btn btn-outline-light">CHANGE!</button>  &nbsp  &nbsp 
                  <a type="button" href="" id="exit" name="exit" class="btn btn-outline-light">EXIT WITHOUT SAVING</a>
                </div>
                <div col-md-4> 
                </div>
              </div>
      </div>
  </form>
</div>
`;
}

function notification(message) //MESSAGGI CHE ARRIVANO ALL'UTENTE
{
  if (message.numRow == 0) {
    return `
  <h1>MESSAGES:</H1>
  <div class="mesageBox">
    <div class="row">
      <div class="col">
        <h1>NO MESSAGE AVAILABLE</h1>
      </div>
    </div>
  </div>
  `;
  }
  else {
    let before = `
    <h1>MESSAGES:</H1>
    <br><br>
    <div class="mesageBox">
      <div class="row">
        <div class="col">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Subject</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
    `;
    let middle = "";
    for (let i = 0; i < message.length; i++) {
      middle = middle + `
          <tr>
          <th scope="row">${i + 1}</th>
          <td>${message[i].Subj}</td>
          <td><button type="button" id="readMex"  name="${message[i].code}" class="btn btn-outline-light">READ</button></td>
          </tr>

      `
    }
    let end = `
          </tbody>
        </table>
      </div>
      <div class="col">
        <h5 id="mesSubj"></h5>
        <hr id="hr">
        <p id="Ttext"></p>
        <button type="button" id="btnReadMex" class="btn btn-outline-light">CLOSE</button>
      </div>
    </div>
  </div>
    `
    let page = before + middle + end;
    return page;
  }
}

function userManAdmin(userstoActivate) {
  let userAtt = [];
  let userSos = [];
  let userInAtt = [];
  for (let a = 0; a < userstoActivate.length; a++) {
    if (userstoActivate[a].status == 2 && userstoActivate[a].role != 2) {
      userInAtt.push(userstoActivate[a]);
    }
    else if (userstoActivate[a].status == 0 && userstoActivate[a].role != 2) {
      userAtt.push(userstoActivate[a]);
    }
    else if (userstoActivate[a].status == 1 && userstoActivate[a].role != 2) {
      userSos.push(userstoActivate[a])
    }
  }
  Array.prototype.push.apply(userInAtt, userAtt);
  Array.prototype.push.apply(userInAtt, userSos);
  let numberUsrActivate = 0;
  let before =
    `
  <div class="boxUserPage">
    <div class="row">
    <h1>USERS:</h1>
      <div class="col">
        <div class="description-box-userAdmin">
          <div class="row tableCollection">
            <input type="text" id="myInput" onkeyup="users()" class="form-control search" placeholder="Search for username..">
            <br>
            <table class="table" id="userTable">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">NAME</th>
                  <th scope="col">SURNAME</th>
                  <th scope="col">ADDRESS</th>
                  <th scope="col">EMAIL</th>
                  <th scope="col">BIRTHDAY</th>
                  <th scope="col">USERNAME</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody id="bodyTable">
`
  let middle = "";
  for (let i = 0; i < userInAtt.length; i++) {
    let result = userInAtt[i].birthDaydate.substring(0, 10);
    const [day, month, year] = result.split('-');
    let d = year + "/" + month + "/" + day;;
    if (userInAtt[i].status == 2) //IN ATTESA DI ATTIVAZIONE
    {
      numberUsrActivate++;
      middle = middle +
        `
    <tr class="tr">
      <th scope="row">${i + 1}</th>
      <td class="td">${userInAtt[i].name}</td>
      <td class="td">${userInAtt[i].surname}</td>
      <td class="td">${userInAtt[i].address}</td>
      <td class="td">${userInAtt[i].email}</td>
      <td class="td">${d}</td>
      <td class="td" id="userSus">${userInAtt[i].username}</td>
      <td class="td"><button id="btnSus" name="${userInAtt[i].username}"  type="button" class="btn btn-outline-warning table">SUSPEND</button> </td>
      <td class="td"><button id="btnAct" name="${userInAtt[i].username}" type="button" class="btn btn-outline-success table">ACTIVE</button> </td>
    </tr> `
    }
    else if (userInAtt[i].status == 0) //ATTIVO
    {
      middle = middle +
        `
    <tr class="tr">
      <th scope="row">${i + 1}</th>
      <td class="td">${userInAtt[i].name}</td>
      <td class="td">${userInAtt[i].surname}</td>
      <td class="td">${userInAtt[i].address}</td>
      <td class="td">${userInAtt[i].email}</td>
      <td class="td">${d}</td>
      <td class="td">${userInAtt[i].username}</td>
      <td class="td"><button  id="btnSus" name="${userInAtt[i].username}" type="button" class="btn btn-outline-warning table">SUSPEND</button> </td>
      <td class="td"></td>
    </tr> `

    }
    else {
      middle = middle +
        `
    <tr class="tr">
      <th scope="row">${i + 1}</th>
      <td class="td">${userInAtt[i].name}</td>
      <td class="td">${userInAtt[i].surname}</td>
      <td class="td">${userInAtt[i].address}</td>
      <td class="td">${userInAtt[i].email}</td>
      <td class="td">${d}</td>
      <td class="td">${userInAtt[i].username}</td>
      <td class="td"><button type="button"  class="btn btn-outline-danger table">SUSPENDED</button></td>
      <td class="td"></td>
    </tr> `
    }
  }
  let end = ` 
              </tbody>
            </table>
            <p hidden id="username"></p> 
            <p hidden id="numUser">${numberUsrActivate}</p> 
          </div>
        </div>
      </div>
    </div>
  </div>
`;
  let page = before + middle + end;
  return page;
}

function ticketManAdmin(tickets) {
  let before =
    `
  <div class="boxPage">
    <div class="row">
      <div class="col-md-4">
        <h1>TICKETS:</h1>
      </div>
      <div class="col-md-4 center">
        <button type="button" class="btn btn-outline-light open-modal" data-open="simpleModal" id="modalTicket">CREATE A NEW TICKET</button>
      </div>
      <div class="col-md-4">
      </div>
    </div>
    <div class="row">
      <div class="col ticket">
  `;
  let middle = "";
  if (tickets.length == 0) {
    middle = `
      <br><br>
      <div class="mesageBox">
        <h1>NO DATA AVAIABLE</h1>
      </div>
    `
  }
  else {
    for (let i = 0; i < tickets.length; i++) {
      middle = middle + `
        <br><br>
        <div class="card">
          <div class="card-header">
            ${tickets[i].code}
          </div>
          <div class="card-body-ticket">
            <p class="card-text">Numbers of entries: ${tickets[i].numIngress}</p>
            <p class="card-text">Price : ${tickets[i].price} <span>&#8364;</span> </p>
            <p class="card-text"> Type : ${tickets[i].type} </p>
            <button type="button" id="deleteTicket" name="${tickets[i].code}" class="btn btn-outline-danger">DELETE TICKET</button>
          </div>
        </div>
      `
    }
  }
  let end =
    `
      </div>
    </div>
  </div>
  `;
  let page = before + middle + end;
  return page;
}

function createTicket() {
  return `
  <div class="modal" tabindex="-1" role="dialog" id="simpleModal">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">CREATE A TICKET</h5>
    </div>
    <div class="modal-body" id="modalBodyTick">
      <form  class="row g-3 needs-validation" novalidate id="form-tick">
        <input type="text" class="form-control" id="codeTick" placeholder="code" required>
        <div class="valid-feedback">
        </div>
        <div class="invalid-feedback">
        </div>
        <input type="text" class="form-control" id="numberOfIng" placeholder="Number of entries" required>
        <div class="valid-feedback">
        </div>
        <div class="invalid-feedback">
        </div>
        <input type="text" class="form-control" id="price" placeholder="Price" required>
        <div class="valid-feedback">
        </div>
        <div class="invalid-feedback">
        </div>
        <select class="form-control" id="tickeSeclection" required">
          <option selected disabled value>Category</option>
          <option>Opera</option>
          <option>Collection</option>
        </select>
        <div class="valid-feedback">
        </div>
        <div class="invalid-feedback">
        </div>
        <button type="submit" class="btn btn-secondary mb-2" id="brnCreateTick">CREATE</button>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeModal">Close</button>
    </div>
  </div>
</div>
</div>`
}

function orperaCollection(operas, collections) {
  let before =
    `
  <div class="row">
    <h1>OPERE AND COLLECTIONS:</h1>
    <br><br>
  `;
  let left = `
    <div class="col-md-5 tableopCol">
      <div class="boxPage">
        <h5>OPERE</h5>
          <div class="row opera-table">
            <input type="text" id="myInputOp" onkeyup="opere()" class="form-control search" placeholder="Search for title...">
            <br>
            <table class="table" id="opTable">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">TITLE</th>
                  <th scope="col">OWNER</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody id="bodyTable">
              </tbody>
  `;
  let middleLeft = "";
  for (let i = 0; i < operas.length; i++) {
    middleLeft = middleLeft +
      `
                <tr>
                <th scope="row">${i + 1}</th>
                <td class="td">${operas[i].title}</td>
                <td class="td">${operas[i].userId}</td>
                <td class="td"><button id="btnDelOp" name="${operas[i].title}"  type="button" class="btn btn-outline-danger table">DELETE</button> </td>
                </tr>
    `
  }
  let endLeft =
    `
            </table>
          </div>
      </div>
    </div>
  `
  let leftTot = left + middleLeft + endLeft;

  let right = `
  <div class="col-md-1">
  </div>
  <div class="col-md-5">
    <div class="boxPage">
      <h5>COLLECTIONS</h5>
        <div class="row opera-table">
          <input type="text" id="myInputCo" onkeyup="colections()" class="form-control search" placeholder="Search for title...">
          <br>
          <table class="table" id="coTable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">TITLE</th>
                <th scope="col">OWNER</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody id="bodyTable">
            </tbody>
`;

  let middleRight = "";
  for (let j = 0; j < collections.length; j++) {
    middleRight = middleRight +
      `
              <tr>
              <th scope="row">${j + 1}</th>
              <td class="td">${collections[j].name}</td>
              <td class="td">${collections[j].prop}</td>
              <td class="td"><button id="btnDelCo" name="${collections[j].name}"  type="button" class="btn btn-outline-danger table">DELETE</button> </td>
              </tr>
  `
  }

  let endRight =
    `
          </table>
        </div>
    </div>
  </div>
`
  let end =
    `
  </div>
`
  let RightTot = right + middleRight + endRight;

  let page = before + leftTot + RightTot + end;

  return page;
}

function NewsLetterAdmin() {
  return `
  <div class="modal" tabindex="-1" role="dialog" id="simpleModalNewsLetter">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">OK!</h5>
        </div>
        <div class="modal-body">
          <h1>FILE CREATE !</h1>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <h1>NEWSLETTER:</h1>
  <div class="middle-newsletter">
    <div class="row">
      <div class="col-md-12"> 
        <h4>RELEASE MONTH</h4> 
        <select class="form-control" id="monthSeclection" required">
          <option selected disabled value>Month</option>
          <option>January</option>
          <option>February</option>
          <option>March</option>
          <option>April</option>
          <option>May</option>
          <option>June</option>
          <option>July</option>
          <option>August</option>
          <option>September</option>
          <option>October</option>
          <option>November</option>
          <option>December</option>
        </select>
      </div>
      <div class="col-md-12">
        <br>
        <h4>DESCRIPTION</h4> 
          <textarea class="form-control" id="descNews"  rows="1" maxlength="26"></textarea>
          <span class="pull-right label label-default" id="count_message"></span>
      </div>
      <div class="col-md-12">
        <h4>CONTENT</h4> 
          <textarea class="form-control" id="contentNewsLetter"  rows="5"></textarea>
      </div>
      <br>
      <div class="col-md-4">
      </div>
      <div class="col-md-4 center">
        <button type="button" id="btnNewsLetter" href="" class="btn btn-outline-light">RELEASE !</button>
      </div>
      <div class="col-md-4">
      </div>
    </div>
  </div>
  `

}

function MessageAdmin(users) {
  return `

  <div class="modal" tabindex="-1" role="dialog" id="simpleModalMess">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">!ERROR!</h5>
        </div>
        <div class="modal-body">
          <h3>A PART OF THI FORM THIS EMPTY !</h3>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" tabindex="-1" role="dialog" id="simpleModalMessOk">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">OK !</h5>
      </div>
      <div class="modal-body">
        <h1>MESSAGE SEND!</h1>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeModal">Close</button>
      </div>
    </div>
  </div>
</div>


  <h1>MESSAGE:</h1>
  <div class="middle-newsletter">
  <div class="accordion" id="accordionExample"> 
  <div class="accordion-item"> 
   <h2 class="accordion-header" id="headingOne"> <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne"> MESSAGE TO CUSTOMERS </button> </h2> 
   <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample" style=""> 
    <div class="accordion-body"> 
      <select class="form-control" id="filterSelectCustomers" required">
        <option selected disabled value>Ticket...</option>
        <option>Opera</option>
        <option>Collection</option>
      </select>
      <br>
      <div class="col-md-12">
        <h6>SUBJECT:</h6> 
        <textarea class="form-control" id="subjMessageCustomere"  rows="1"></textarea>
      </div>

      <br>
      <div class="col-md-12">
        <h6>TEXT:</h6> 
        <textarea class="form-control" id="textMessageCustomere"  rows="5"></textarea>
      </div>
      <br>
      <div class="col-md-4">
      </div>
      <div class="col-md-4 center">
        <button type="button" id="btnMessageCustomers" href="" class="btn btn-outline-dark">SEND !</button>
      </div>
      <div class="col-md-4">
      </div>
    </div> 
   </div> 
  </div> 
  <div class="accordion-item"> 
   <h2 class="accordion-header" id="headingTwo"> <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"> MESSAGE TO ALL USERS </button> </h2> 
   <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample" style=""> 
    <div class="accordion-body"> 
      <div class="col-md-12">
        <h6>TEXT:</h6> 
        <textarea class="form-control" id="textMessageAllUsers"  rows="5"></textarea>
      </div>
      <br>
      <div class="col-md-4">
      </div>
      <div class="col-md-4 center">
        <button type="button" id="btnMessageAllUsers" href="" class="btn btn-outline-dark">SEND !</button>
      </div>
      <div class="col-md-4">
      </div>
    </div> 
   </div> 
  </div>  
  </div> 
 </div> 


  </div>
  `

}

function getOpere(opere) {
  if (opere.numrow == 0) {
    return `
    <h1>YOUR OPERAS:</h1>
    <br><br>  
    <div class="row">
      <div class="col-md-4">
      </div>
      <div class="col-md-4 center">
        <button type="button" id="btnNewOp" class="btn btn-outline-light">INSERT A NEW OPERA</button>
      </div>
      <div class="col-md-4">
      </div>
    </div>
    `;

  }
  else {
    opere.sort((a, b) => (a.year > b.year) ? -1 : ((b.year > a.year) ? 1 : 0))
    let before = `
    <h1>YOUR OPERAS:</h1>
    <br> 
    <div class="boxPage">
      <div class="row">
        <div class="col-md-4">
        </div>
        <div class="col-md-4 center">
          <button type="button" id="btnNewOp" class="btn btn-outline-light">INSERT A NEW OPERA</button>
        </div>
        <div class="col-md-4">
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-12">
          <table class="table">
          <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">TITLE</th>
            <th scope="col">YEAR</th>
            <th scope="col">PRICE</th>
            <th scope="col">COLLECTION</th>
            <th scope="col"></th>
            </tr>
          </thead>
          <tbody>

    `
    let middle = "";

    for (let a = 0; a < opere.length; a++) {
      if (!opere[a].collection)
        opere[a].collection = ""
      middle = middle + `
          <tr>
            <th scope="row">${a + 1}</th>
            <td>${opere[a].title}</td>
            <td>${opere[a].year}</td>
            <td>${opere[a].price}&euro;</td>
            <td name=${opere[a].collection}>${opere[a].collection}</td>
            <td><button type="button" id="infOp" name="${opere[a].title}" class="btn btn-outline-info">Info</button></td>
          </tr>
      `
    }

    let end = `
            </tbody>
          </table>
        </div>
      </div>
    </div>
    `
    let page = before + middle + end;
    return page;
  }
}

function createOpera() {
  return `
  <div class="modal" tabindex="-1" role="dialog" id="simpleModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">INSERT AN OPERA</h5>
        </div>
        <div class="modal-body" id="modalBodyOp">
          <form  class="row g-3 needs-validation" novalidate id="form-opera">
            <input type="text" class="form-control" id="titleOp" placeholder="Title" required>
            <div class="valid-feedback">
            </div>
            <div class="invalid-feedback">
            </div>
            <input type="text" class="form-control" id="descOp" placeholder="Description" required>
            <div class="valid-feedback">
            </div>
            <div class="invalid-feedback">
            </div>
            <input type="text" class="form-control" id="yearOp" placeholder="Year" required>
            <div class="valid-feedback">
            </div>
            <div class="invalid-feedback">
            </div>
            <input type="text" class="form-control" id="price" placeholder="Price" required>
            <div class="valid-feedback">
            </div>
            <div class="invalid-feedback">
            </div>
            <input type="file" style="margin-top=2%"class="form-control" id="newImageOp" name="myImage" accept="image/png, image/gif, image/jpeg" />
            <div class="valid-feedback">
            </div>
            <div class="invalid-feedback">
            </div>
            <button type="submit" class="btn btn-secondary mb-2" id="brnCreateOP">INSERT</button>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeModal">Close</button>
        </div>
    </div>
  </div>
</div>
`
}

function InfoOpera(operaTot) {
  let opera = operaTot[0];
  let numb = operaTot[1];
  let a = 0;
  let avg = 0;
  for (let i = 0; i < numb.length; i++) {
    a = a + numb[i].sars;
  }
  avg = a / numb.length;
  let w = 100 - (5 - avg);
  let titS = document.getElementById("titS");
  if (titS) {
    document.getElementById("titS").innerHTML = opera.title;
    document.getElementById("immm").setAttribute('src', opera.image);
    document.getElementById("tit").innerHTML = opera.title;
    document.getElementById("desc").innerHTML = opera.description;
    document.getElementById("yea").innerHTML = opera.year;
    document.getElementById("pri").innerHTML = opera.price;
    document.getElementById("col").innerHTML = opera.collection;
    document.getElementById("numut").innerHTML = "NUM.VOTE:" + numb.length;
    document.getElementById("avg").innerHTML = avg;
    document.getElementById("avg").style.width = w + "%";


  }
  return `
  <div class="modal" tabindex="-1" role="dialog" id="simpleModalinfoOP">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="titS">${opera.title}</h5>
          <button type="button" class="btn btn-outline-secondary" id="closeModaloP">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="modalBodyOp">
          <img src="${opera.image}" class="img-fluid" id="immm" alt="Responsive image">
          <h6 class="card-subtitle mb-2 text-muted">Name:</h6>
          <p class="card-text" id="tit">${opera.title}</p>
          <h6 class="card-subtitle mb-2 text-muted">Description:</h6>
          <p class="card-text" id="desc">${opera.description}</p>
          <h6 class="card-subtitle mb-2 text-muted">Year:</h6>
          <p class="card-text" id="yea">${opera.year}</p>
          <h6 class="card-subtitle mb-2 text-muted">Price:</h6>
          <p class="card-text" id="pri">${opera.price}&euro;</p>
          <h6 class="card-subtitle mb-2 text-muted">AVG:</h6>
          <p class="card-text" id="numut">NUM.VOTE: ${numb.length}</p>
          <div class="progress">
            <div class="progress-bar bg-success" id="avg" role="progressbar" style="width: ${w}%"  aria-valuemax="5">${avg}</div>
          </div>
          <h6 class="card-subtitle mb-2 text-muted">Collection:</h6>
          <p class="card-text" id="col">${opera.collection}</p>
        </div>
        <div class="modal-footer">
          <div class="col-md-12">
            <button type="button" class="btn btn-outline-danger" name="${opera.title}" id="btnDeleteOp">DELETE</button>
          </div>
        </div>
    </div>
  </div>
</div>
`
}

function collectionsArt(collections) {
  if (collections.numrow == 0) {
    return `
    <h1>YOUR COLLECTIONS:</h1>
    <br><br>  
    <div class="row">
      <div class="col-md-4">
      </div>
      <div class="col-md-4 center">
        <button type="button" id="btnNewCol" class="btn btn-outline-light">INSERT A NEW COLLECTION</button>
      </div>
      <div class="col-md-4">
      </div>
    </div>
    `;

  }
  else {
    collections.sort((a, b) => (a.year > b.year) ? -1 : ((b.year > a.year) ? 1 : 0))
    let before = `
    <h1>YOUR COLLECTIONS:</h1>
    <br> 
    <div class="boxPage">
      <div class="row">
        <div class="col-md-4">
        </div>
        <div class="col-md-4 center">
          <button type="button" id="btnNewCol" class="btn btn-outline-light">INSERT A NEW COLLECTION</button>
        </div>
        <div class="col-md-4">
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-12">
          <table class="table">
          <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">NAME</th>
            <th scope="col">DESCRIPTION</th>
            <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
    `
    let middle = "";
    for (let a = 0; a < collections.length; a++) {
      middle = middle + `
          <tr>
            <th scope="row">${a + 1}</th>
            <td>${collections[a].name}</td>
            <td>${collections[a].description}</td>
            <td><button type="button" id="infCol" name="${collections[a].name}" class="btn btn-outline-info">Info</button></td>
          </tr>
      `
    }
    let end = `
            </tbody>
          </table>
        </div>
      </div>
    </div>
    `
    let page = before + middle + end;
    return page;
  }
}

function createCollection() {
  return `
  <div class="modal" tabindex="-1" role="dialog" id="simpleModalCol">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">INSERT A NEW COLLECTION</h5>
        </div>
        <div class="modal-body" id="modalBodyOp">
          <form  class="row g-3 needs-validation" novalidate id="form-collection">
            <input type="text" class="form-control" id="nameCol" placeholder="Name" required>
            <div class="valid-feedback">
            </div>
            <div class="invalid-feedback">
            </div>
            <input type="text" class="form-control" id="descCol" placeholder="Description" required>
            <div class="valid-feedback">
            </div>
            <div class="invalid-feedback">
            </div>
            <button type="submit" class="btn btn-secondary mb-2" id="brnCreateCol">INSERT</button>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeModalCol">Close</button>
        </div>
    </div>
  </div>
</div>
`
}

function InfoCollection(coll, opere) {
  let middle = "";
  let titC = document.getElementById("titlecollection");
  if (titC) {
    if (coll.active == "true") {
      document.getElementById("header").innerHTML = '';
      document.getElementById("header").innerHTML = `
      <h5 class="modal-title" id="titc">${coll.name}</h5>
      <button type="button" id="suspColl" name="${coll.name}" class="btn btn-outline-danger coll">SUSPAND</button>
      <button type="button" class="btn btn-outline-secondary" id="closeModalCol">
        <span aria-hidden="true">&times;</span>
      </button>`
    }
    else {
      document.getElementById("header").innerHTML = '';
      document.getElementById("header").innerHTML = `
      <h5 class="modal-title" id="titC">${coll.name}</h5>
      <button type="button" id="suspColl" name="${coll.name}" class="btn btn-outline-success coll">ACTIVATE</button>
      <button type="button" class="btn btn-outline-secondary" id="closeModalCol">
        <span aria-hidden="true">&times;</span>
      </button>`
    }
    document.getElementById("bodyTableColl").innerHTML = '';
    for (let a = 0; a < opere.length; a++) {
      if (opere[a].collection == coll.name && coll.active != "false") {
        middle = middle +
          `
                      <tr class="tr">
                        <th scope="row" class="tableCollModal" id="index">${a + 1}</th>
                        <td  class="tableCollModal" id="tit">${opere[a].title}</td>
                        <td  class="tableCollModal"><button type="button" id="btnRem" name="${opere[a].title}"  class="btn btn-outline-warning table coll">REMOVE</button></td>
                      </tr> 
        `
      }
      else if (coll.active != "false") {
        middle = middle +
          `
                      <tr class="tr">
                        <th scope="row" class="tableCollModal" id="indexNo">${a + 1}</th>
                        <td class="tableCollModal" id="titleNo">${opere[a].title}</td>
                        <td class="tableCollModal"><button type="button" id="btnAdd" name="${opere[a].title}"  class="btn btn-outline-success table coll">ADD</button></td>
                      </tr> 
        `

      }
      else if (coll.active == "false") {
        middle = middle +
          `
                    <tr class="tr">
                      <th scope="row" class="tableCollModal" id="indexNo">${a + 1}</th>
                      <td class="tableCollModal" id="titleNo">${opere[a].title}</td>
                    </tr> 
      `
      }

    }
    document.getElementById("bodyTableColl").innerHTML = middle;
  }
  let before = ""
  let b = "";
  let a = `

  <div class="modal bd-example-modal-lg" tabindex="-1" role="dialog" id="simpleModalinfoCol">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header" id="header"> `;
  if (coll.active == "true") {
    b = `
          <h5 class="modal-title" id="titlecollection">${coll.name}</h5>
          <button type="button" id="suspColl" name="${coll.name}" class="btn btn-outline-danger coll">SUSPAND</button>
          <button type="button" class="btn btn-outline-secondary" id="closeModalCol">
            <span aria-hidden="true">&times;</span>
          </button>`
  }
  else {
    b = `
          <h5 class="modal-title" id="titc">${coll.name}</h5>
          <button type="button" id="suspColl" name="${coll.name}" class="btn btn-outline-success coll">ACTIVATE</button>
          <button type="button" class="btn btn-outline-secondary" id="closeModalCol">
            <span aria-hidden="true">&times;</span>
          </button>`;
  }
  let c = `</div>
        <div class="modal-body" id="modalBodyOp">
          <div class="row">
            <h5>OPERE:</h5>
            <div class="col">
              <div class="description-box-userAdmin">
                <div class="row tableCollection">
                  <br>
                  <table class="table" id="userTable">
                    <thead>
                      <tr class="tableCollModal">
                        <th scope="col" class="tableCollModal">#</th>
                        <th scope="col" class="tableCollModal">TITLE</th>
                        <th scope="col" class="tableCollModal"></th>
                      </tr>
                    </thead>
                    <tbody id="bodyTableColl">        
  `
  before = a + b + c;
  for (let a = 0; a < opere.length; a++) {
    if (opere[a].collection == coll.name && coll.active != "false") {
      middle = middle +
        `
                    <tr class="tr">
                      <th scope="row" class="tableCollModal" id="index">${a + 1}</th>
                      <td  class="tableCollModal">${opere[a].title}</td>
                      <td  class="tableCollModal"><button type="button" id="btnRem" name="${opere[a].title}"  class="btn btn-outline-warning table coll">REMOVE</button></td>
                    </tr> 
      `
    }
    else if (coll.active != "false") {
      middle = middle +
        `
                    <tr class="tr">
                      <th scope="row" class="tableCollModal" id="indexNo">${a + 1}</th>
                      <td class="tableCollModal">${opere[a].title}</td>
                      <td class="tableCollModal"><button type="button" id="btnAdd" name="${opere[a].title}"  class="btn btn-outline-success table coll">ADD</button></td>
                    </tr> 
      `

    }
    else if (coll.active == "false") {
      middle = middle +
        `
                  <tr class="tr">
                    <th scope="row" class="tableCollModal" id="indexNo">${a + 1}</th>
                    <td class="tableCollModal">${opere[a].title}</td>
                  </tr> 
    `
    }
  }

  let end = `
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
`
  let page = before + middle + end;
  return page;
}

function buyTicket(alltickets) {
  let before = `
  <div class="modal bd-example-modal-lg" tabindex="-1" role="dialog" id="simpleModalBuyTicket">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header" id="header">
        <h5 class="modal-title" id="tit">BUY A TICKET</h5>
        <button type="button" class="btn btn-outline-secondary" id="closeModalBuyTicket">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="modalBodBuyTicket">
        <div class="row">
          <div class="col">
            <div class="description-box-userAdmin">
              <div class="row tableCollection">
                <table class="table" id="userTable">
                  <thead>
                    <tr class="tableBuyTicketModal">
                      <th scope="col" class="tableCollModal">#</th>
                      <th scope="col" class="tableCollModal">NAME</th>
                      <th scope="col" class="tableCollModal">PRICE</th>
                      <th scope="col" class="tableCollModal">INGRESS</th>
                      <th scope="col" class="tableCollModal">TYPE</th>
                      <th scope="col" class="tableCollModal"></th>
                    </tr>
                  </thead>
                  <tbody id="bodyTableColl">        
`
  let middle = "";

  for (let a = 0; a < alltickets.length; a++) {
    middle = middle +
      `
                      <tr class="tr">
                        <th scope="row" class="tableCollModal" id="index">${a + 1}</th>
                        <td  class="tableCollModal">${alltickets[a].code}</td>
                        <td  class="tableCollModal">${alltickets[a].price}&euro;</td>
                        <td  class="tableCollModal">${alltickets[a].numIngress}</td>
                        <td  class="tableCollModal">${alltickets[a].type}</td>
                        <td  class="tableCollModal"><button type="button" id="btnBuy" name="${alltickets[a].code}"  class="btn btn-outline-success">BUY!</button></td>
                      </tr> 
        `
  }
  let end = `
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
`
  let page = before + middle + end;
  return page;
}

function carouselShowArt(user, opere, collection) {
  let middleOPere = "";
  let middleCollection = "";
  let beforeOpere = "";
  let endOPeraArt = "";
  let beginCollection = "";
  let endCollection = "";
  if (document.getElementById("titCarousel")) {
    document.getElementById("titCarousel").innerHTML = user.name + " " + user.surname;
    document.getElementById("imCarousel").setAttribute('src', user.image);;
    document.getElementById("nameCarousel").innerHTML = user.name;
    document.getElementById("surnameCarousel").innerHTML = user.surname;
    document.getElementById("addressCarousel").innerHTML = user.address;
    document.getElementById("dateCarousel").innerHTML = user.date;
    if (opere.numrow == 0) {
      document.getElementById("bodyTableCarouselOpera").innerHTML = '';
      document.getElementById("bodyTableCarouselOpera").innerHTML = `<p>NO OPERE AVAILABLE</p>`;
    }
    else {
      let v = "";
      for (let g = 0; g < opere.length; g++) {
        v = v +
          `
                  <tr class="tr">
                    <th scope="row" class="tableCollModal">${g + 1}</th>
                    <td class="tableCollModal">${opere[g].title}</td>
                    <td class="tableCollModal">${opere[g].description}</td>
                    <td class="tableCollModal">${opere[g].year}</td>
                  </tr> 
          `
      }
      document.getElementById("bodyTableCarouselOpera").innerHTML = '';
      document.getElementById("bodyTableCarouselOpera").innerHTML = v;
    }
    if (collection.numrow == 0) {
      document.getElementById("bodyTableCarouselCollection").innerHTML = '';
      document.getElementById("bodyTableCarouselCollection").innerHTML = `<p>NO COLLECTIONS AVAILABLE</p>`;


    }
    else {
      let k = "";
      for (let n = 0; n < collection.length; n++) {
        k = k +
          `
                  <tr class="tr">
                    <th scope="row" class="tableCollModal">${n + 1}</th>
                    <td class="tableCollModal">${collection[n].name}</td>
                    <td class="tableCollModal">${collection[n].description}</td>
                  </tr> 
          `
      }
      document.getElementById("bodyTableCarouselCollection").innerHTML = '';
      document.getElementById("bodyTableCarouselCollection").innerHTML = k;

    }

  }
  let before = `
  <div class="modal" tabindex="-1" role="dialog" id="simpleModalCarousel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="titCarousel">${user.name + " " + user.surname}</h5>
          <button type="button" class="btn btn-outline-secondary" id="closeModalCarousel">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="modalBodyCarousel">
          <img src="${user.image}" class="img-fluid" id="imCarousel" alt="Responsive image">
          <div class="row">
            <div class="col">
              <h6 class="card-subtitle text-muted">Name:</h6>
              <p class="card-text" id="nameCarousel">${user.name}</p>
            </div>
            <div class="col">
              <h6 class="card-subtitle text-muted">Surname:</h6>
              <p class="card-text" id="surnameCarousel">${user.surname}</p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <h6 class="card-subtitle text-muted">Address:</h6>
              <p class="card-text" id="addressCarousel">${user.address}</p>
            </div>
            <div class="col">
              <h6 class="card-subtitle text-muted">Born date:</h6>
              <p class="card-text" id="dateCarousel">${user.date}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <h6 class="card-subtitle text-muted">Email:</h6>
              <p class="card-text" id="emalCarousel">${user.email}</p>
            </div>
          </div>
          <hr>`
  if (opere.numrow == 0) {
    beforeOpere = `
    <div class="boxCarouselArt">
      <h4>OPERE:</h4>
      <p>NO OPERE AVAILABLE</p>
    </div>
      `
  }
  else {
    beforeOpere = `
          <div class="boxCarouselArt" id="boxCarouselArt">
            <h4>OPERE:</h4>
            <table class="table carousel" id="tableOpereCarousel">
              <thead>
                  <tr class="tableCollModal">
                  <th scope="col" class="tableCollModal">#</th>
                  <th scope="col" class="tableCollModal">TITLE</th>
                  <th scope="col" class="tableCollModal">DESCRIPTION</th>
                  <th scope="col" class="tableCollModal">YEAR</th>
                </tr>
              </thead>
              <tbody id="bodyTableCarouselOpera">
`
    for (let a = 0; a < opere.length; a++) {
      middleOPere = middleOPere +
        `
                <tr class="tr">
                  <th scope="row" class="tableCollModal">${a + 1}</th>
                  <td class="tableCollModal">${opere[a].title}</td>
                  <td class="tableCollModal">${opere[a].description}</td>
                  <td class="tableCollModal">${opere[a].year}</td>
                </tr> 
`
    }
    endOPeraArt = ` 
              </tbody>
            </table>
          </div>
        `

  }
  if (collection.numrow == 0) {
    beginCollection = `
    <br>
    <hr>
    <br>
    <div class="boxCarouselArt">
      <h4>COLLECTIONS:</h4>
      <p> NO COLLECTIONS AVAIABLE</p>
    </div>
      `
  }
  else {
    beginCollection = `
    <br>
    <hr>
    <br>
    <div class="boxCarouselArt">
      <h4>COLLECTIONS:</h4>
      <table class="table carousel" id="tableOpereCarousel">
        <thead>
            <tr class="tableCollModal">
            <th scope="col" class="tableCollModal">#</th>
            <th scope="col" class="tableCollModal">TITLE</th>
            <th scope="col" class="tableCollModal">DESCRIPTION</th>
          </tr>
        </thead>
        <tbody id="bodyTableCarouselCollection">
`
    for (let b = 0; b < collection.length; b++) {
      middleCollection = middleCollection +
        `
          <tr class="tr">
            <th scope="row" class="tableCollModal">${b + 1}</th>
            <td class="tableCollModal">${collection[b].name}</td>
            <td class="tableCollModal">${collection[b].description}</td>
          </tr> 
`
    }

    endCollection =
      `
        </tbody>
      </table>
    </div>
  </div>
</div>
<div class="modal-footer">
</div>
</div>
</div>    
`

  }
  let page = before + beforeOpere + middleOPere + endOPeraArt + beginCollection + middleCollection + endCollection;
  return page;
}

function ChoseTick(opere, collections) {
  let before = `
<div class="modal" id="exampleModalOpSh">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" id="close" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                OPERE
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample"> 
              <div class="accordion-body">
               <div class="boxUserPageNord"> 
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col" class="tableCollModal">#</th>
                        <th scope="col" class="tableCollModal">TITLE</th>
                        <th scope="col" class="tableCollModal">DESCRIPTION</th>
                        <th scope="col" class="tableCollModal">YEAR</th>
                        <th scope="col" class="tableCollModal"></th>
                      </tr>
                    </thead>
                    <tbody>
                `
  let middle1 = "";
  for (let a = 0; a < opere.length; a++) {
    middle1 = middle1 + `
                    <tr>
                      <th scope="row">${a + 1}</th>
                      <td class="tableCollModal">${opere[a].title}</td>
                      <td class="tableCollModal">${opere[a].description}</td>
                      <td class="tableCollModal">${opere[a].year}</td>
                      <td><button type="button"id="op" name="${opere[a].title}" class="btn btn-outline-success">VIEW</button></td>
                    </tr>
  `
  }
  let end =
    `
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
`
  let begin1 =
    `
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                COLLECTIONS
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div class="accordion-body">
              <div class="boxUserPageNord"> 
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" class="tableCollModal">#</th>
                      <th scope="col" class="tableCollModal">NAME</th>
                      <th scope="col" class="tableCollModal">DESCRIPTION</th>
                      <th scope="col" class="tableCollModal"></th>
                    </tr>
                  </thead>
                  <tbody>

`
  let middle = "";
  for (let t = 0; t < collections.length; t++) {
    middle = middle + `
                    <tr>
                      <th scope="row" class="tableCollModal">${t + 1}</th>
                      <td class="tableCollModal">${collections[t].name}</td>
                      <td class="tableCollModal">${collections[t].desc}</td>
                      <td><button type="button"id="cl" name="${collections[t].name}" class="btn btn-outline-success">VIEW</button></td>
                    </tr>
                    `

  }
  let end1 =
    `
</tbody>
</table>
</div>
</div>
            </div>
          </div>
        </div>
        </div>
        </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>
</div>

`
  let page = before + middle1 + end + begin1 + middle + end1;
  return page;
}

function viewImage(images) {
  let middle = "";
  for (let a = 0; a < images.length; a++) {
    middle = middle +
      `    
      <div style="height:${screen.height}px; width:${screen.width}px" id="cont">
        <div class="pieno" id="${a}">
            <button type="button" class="btn btn-outline-light" onclick="up(${a})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
              </svg>
            </button>
            &nbsp;&nbsp;
            <button type="button" class="btn btn-outline-light"onclick="down(${a},${images.length})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
            </svg>
            </button>&nbsp;&nbsp;
            <button type="button" id="exit" class="btn btn-outline-danger">EXIT</button>
            <div class="rate" id="rate">
              <button type="button" class="btn btn-outline-warning" id="star1" name="${images[a].title}"/>1★</button>
              <button type="button" class="btn btn-outline-warning" id="star2" name="${images[a].title}"/>2★</button>
              <button type="button" class="btn btn-outline-warning" id="star3" name="${images[a].title}"/>3★</button>
              <button type="button" class="btn btn-outline-warning" id="star4" name="${images[a].title}"/>4★</button>
              <button type="button" class="btn btn-outline-warning" id="star5" name="${images[a].title}"/>5★</button>
            </div>  
            <br>
            <img src="./${images[a].image}" class="images" alt="Responsive image">
        </div>
      </div>
`;
  }
  return middle;
  /*
  return `
  <table class="table">
    <tr class="tr">
      <button type="button" class="btn btn-outline-light" onclick="up()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
    </svg></button>&nbsp;&nbsp;
      <button type="button" class="btn btn-outline-light"onclick="down()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
    </svg></button>
      <img src="./${images[0].image}" class="images" alt="Responsive image">
    </tr>
  </table>*/

}
function resultresUser(par, rif) {
  if (par.numrow == 0) {
    return `
    <div class="boxUserPage">
      <div class="row">
        <h1>USERS:</h1>
        <div class="col-md-4">
        </div>
        <div class="col-md-4 center">
        <h1 class="allert">NO DATA MATCH </h1>
        </div>
        <div class="col-md-4">
        </div>
        </div>
      </div>
            `
  }
  let before =
    `
  <div class="boxUserPage">
    <div class="row">
    <h1>USERS:</h1>
      <div class="col">
        <div class="description-box-userAdmin">
          <div class="row tableCollection">
            <br>
            <table class="table" id="userTable">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">NAME</th>
                  <th scope="col">SURNAME</th>
                  <th scope="col">ADDRESS</th>
                  <th scope="col">EMAIL</th>
                  <th scope="col">BIRTHDAY</th>
                  <th scope="col">USERNAME</th>
                </tr>
              </thead>
              <tbody id="bodyTable">
`
  let middle = "";
  for (let i = 0; i < par.length; i++) {
    let result = par[i].birthDaydate.substring(0, 10);
    const [day, month, year] = result.split('-');
    let d = year + "/" + month + "/" + day;
    let n = [];
    let c = [];
    let a = [];
    let u = [];
    let e = [];
    for (let index = 0; index < par[i].name.length; index += rif.length) {
      n.push(par[i].name.slice(index, index + rif.length));
    }

    for (let index = 0; index < par[i].email.length; index += rif.length) {
      e.push(par[i].email.slice(index, index + rif.length));
    }

    for (let index = 0; index < par[i].surname.length; index += rif.length) {
      c.push(par[i].surname.slice(index, index + rif.length));
    }

    for (let index = 0; index < par[i].address.length; index += rif.length) {
      a.push(par[i].address.slice(index, index + rif.length));
    }

    for (let index = 0; index < par[i].username.length; index += rif.length) {
      u.push(par[i].username.slice(index, index + rif.length));
    }

    for (let index = 0; index < e.length; index += rif.length) {
      if (e[index].toUpperCase() == rif || e[index].toLowerCase() == rif) {
        e[index] = ' <font color="yellow">' + e[index] + '</font> '
      }
    }


    for (let index = 0; index < n.length; index += rif.length) {
      if (n[index].toUpperCase() == rif || n[index].toLowerCase() == rif) {
        n[index] = ' <font color="yellow">' + n[index] + '</font> '
      }
    }

    for (let index = 0; index < c.length; index += rif.length) {
      if (c[index].toUpperCase() == rif || c[index].toLowerCase() == rif) {
        c[index] = ' <font color="yellow">' + c[index] + '</font> '
      }
    }

    for (let index = 0; index < a.length; index += rif.length) {
      if (a[index].toUpperCase() == rif || a[index].toLowerCase() == rif) {
        a[index] = ' <font color="yellow">' + a[index] + '</font> '
      }
    }

    for (let index = 0; index < u.length; index += rif.length) {
      if (u[index].toUpperCase() == rif || u[index].toLowerCase() == rif) {
        u[index] = ' <font color="yellow">' + u[index] + '</font> '
      }
    }
    let name = n.join("");
    let surname = c.join("");
    let address = a.join("");
    let username = u.join("");
    let email = e.join("");
    middle = middle +
      `
    <tr class="tr">
      <th scope="row">${i + 1}</th>
      <td class="td">${name}</td>
      <td class="td">${surname}</td>
      <td class="td">${address}</td>
      <td class="td">${email}</td>
      <td class="td">${d}</td>
      <td class="td">${username}</td>
    </tr> `
  }
  let end = ` 
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
  let page = before + middle + end;
  return page;
}

function resultresOperas(par,rif) {
  if (par.numrow == 0) {
    return `
     <div class="boxUserPage">
       <div class="row">
         <h1>OPERAS:</h1>
         <div class="col-md-4">
         </div>
         <div class="col-md-4 center">
         <h1 class="allert">NO DATA MATCH </h1>
         </div>
         <div class="col-md-4">
         </div>
         </div>
       </div>
             `
  }

  let before =
    `
 <div class="boxUserPage">
   <div class="row">
   <h1>OPERAS:</h1>
     <div class="col">
       <div class="description-box-userAdmin">
         <div class="row tableCollection">
           <br>
           <table class="table" id="userTable">
             <thead>
               <tr>
                 <th scope="col">#</th>
                 <th scope="col">TITLE</th>
                 <th scope="col">DESCRIPTION</th>
                 <th scope="col">USER ID</th>
                 <th scope="col">YEAR</th>
                 <th scope="col">PRICE</th>
                 <th scope="col">COLLECTION</th>
               </tr>
             </thead>
             <tbody id="bodyTable">
`

  let middle = "";
  for (let i = 0; i < par.length; i++) {
    let t = [];
    let d = [];
    let u = [];
    let y = [];
    let p = [];
    let c = [];

    for (let index = 0; index < par[i].title.length; index += rif.length) {
      t.push(par[i].title.slice(index, index + rif.length));
    }
    for (let index = 0; index < par[i].description.length; index += rif.length) {
      d.push(par[i].description.slice(index, index + rif.length));
    }
    for (let index = 0; index < par[i].userId.length; index += rif.length) {
      u.push(par[i].userId.slice(index, index + rif.length));
    }
    for (let index = 0; index < par[i].year.length; index += rif.length) {
      y.push(par[i].year.slice(index, index + rif.length));
    }
    for (let index = 0; index < par[i].price.length; index += rif.length) {
      p.push(par[i].price.slice(index, index + rif.length));
    }
    for (let index = 0; index < par[i].collection.length; index += rif.length) {
      c.push(par[i].collection.slice(index, index + rif.length));
    }

    for (let index = 0; index < t.length; index += rif.length) {
      if (t[index].toUpperCase() == rif || t[index].toLowerCase() == rif) {
        t[index] = ' <font color="yellow">' + t[index] + '</font> '
      }
    }
    for (let index = 0; index < d.length; index += rif.length) {
      if (d[index].toUpperCase() == rif || d[index].toLowerCase() == rif) {
        d[index] = ' <font color="yellow">' + d[index] + '</font> '
      }
    }
    for (let index = 0; index < u.length; index += rif.length) {
      if (u[index].toUpperCase() == rif || u[index].toLowerCase() == rif) {
        u[index] = ' <font color="yellow">' + u[index] + '</font> '
      }
    }
    for (let index = 0; index < y.length; index += rif.length) {
      if (y[index]== rif) {
        y[index] = ' <font color="yellow">' + y[index] + '</font> '
      }
    }
    for (let index = 0; index < p.length; index += rif.length) {
      if (p==rif) {
        p[index] = ' <font color="yellow">' + p[index] + '</font> '
      }
    }
    for (let index = 0; index < c.length; index += rif.length) {
      if (c[index].toUpperCase() == rif || c[index].toLowerCase() == rif) {
        c[index] = ' <font color="yellow">' + c[index] + '</font> '
      }
    }
    let tit=t.join("");
    let des=d.join("");
    let us=u.join("");
    let ye=y.join("");
    let pr=p.join("");
    let col=c.join("");

    middle = middle +
      `
   <tr class="tr">
     <th scope="row">${i + 1}</th>
     <td class="td">${tit}</td>
     <td class="td">${des}</td>
     <td class="td">${us}</td>
     <td class="td">${ye}</td>
     <td class="td">${pr}</td>
     <td class="td">${col}</td>
   </tr> `
  }
  let end = ` 
             </tbody>
           </table>
         </div>
       </div>
     </div>
   </div>
 </div>
`;
  let page = before + middle + end;
  return page;
}

function resultresCollections(par,rif) {
  if (par.numrow == 0) {
    return `
     <div class="boxUserPage">
       <div class="row">
         <h1>COLLECTIONS:</h1>
         <div class="col-md-4">
         </div>
         <div class="col-md-4 center">
         <h1 class="allert">NO DATA MATCH </h1>
         </div>
         <div class="col-md-4">
         </div>
         </div>
       </div>
             `
  }

  let before =
    `
 <div class="boxUserPage">
   <div class="row">
   <h1>COLLECTIONS:</h1>
     <div class="col">
       <div class="description-box-userAdmin">
         <div class="row tableCollection">
           <br>
           <table class="table" id="userTable">
             <thead>
               <tr>
                 <th scope="col">#</th>
                 <th scope="col">NAME</th>
                 <th scope="col">USER ID</th>
                 <th scope="col">DESCRIPTION</th>
               </tr>
             </thead>
             <tbody id="bodyTable">
`
  let middle = "";
  for (let i = 0; i < par.length; i++) {
    let n=[];
    let u=[];
    let d=[];

    for (let index = 0; index < par[i].name.length; index += rif.length) {
      n.push(par[i].name.slice(index, index + rif.length));
    }
    for (let index = 0; index < par[i].userId.length; index += rif.length) {
      u.push(par[i].userId.slice(index, index + rif.length));
    }
    for (let index = 0; index < par[i].description.length; index += rif.length) {
      d.push(par[i].description.slice(index, index + rif.length));
    }

    for (let index = 0; index < n.length; index += rif.length) {
      if (n[index].toUpperCase() == rif || n[index].toLowerCase() == rif) {
        n[index] = ' <font color="yellow">' + n[index] + '</font> '
      }
    }
    for (let index = 0; index <u.length; index += rif.length) {
      if (u[index].toUpperCase() == rif || u[index].toLowerCase() == rif) {
        u[index] = ' <font color="yellow">' + u[index] + '</font> '
      }
    }
    for (let index = 0; index <d.length; index += rif.length) {
      if (d[index].toUpperCase() == rif || d[index].toLowerCase() == rif) {
        d[index] = ' <font color="yellow">' + d[index] + '</font> '
      }
    }
    let nam=n.join("");
    let us=u.join("");
    let des=d.join("");
    middle = middle +
      `
   <tr class="tr">
     <th scope="row">${i + 1}</th>
     <td class="td">${nam}</td>
     <td class="td">${us}</td>
     <td class="td">${des}</td>
   </tr> `
  }
  let end = ` 
             </tbody>
           </table>
         </div>
       </div>
     </div>
   </div>
 </div>
`;
  let page = before + middle + end;
  return page;

}
export { main, about, news, collection, registerForm, loginForm, alert, userPageData, message, artists, notAttivateUserTicket, UserTicket, helpDesk, notAttivateUserNotification, editUserData, notAttivateUserPageData, notification, userManAdmin, ticketManAdmin, createTicket, orperaCollection, NewsLetterAdmin, MessageAdmin, getOpere, createOpera, InfoOpera, collectionsArt, createCollection, InfoCollection, buyTicket, carouselShowArt, ChoseTick, viewImage, resultresUser, resultresOperas, resultresCollections };