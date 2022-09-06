'use strict';

function noLogIndex()
{
  return `<div class="container-fluid head">
  <a class="navbar-brand" name="1" id="1" href="#bn">GALLERIA PIROLA</a>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <a class="nav-link active" name="2" id="2" href="#bn1">ABOUT</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" name="3" id="3"  href="#bn2">NEWS</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" name="4" id="4" href="#bn3">ARTISTS</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" name="5" id="5" href="#bn4">COLLECTIONS</a>
      </li>
      <li class="nav-item">
      <a href="pagina" role="button" class="nav-link active" data-toggle="modal" id="6" name="6">LOGIN</a>
      </li>
    </ul>
    <span class="navbar-text">
      <form class="d-flex" role="search" id="form-search">
        <input class="form-control me-2" id="criterio" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-light" id="search" type="submit">Search</button>
      </form>
    </span>
  </div>
</div>
`;
}

function LogIndex()
{
  return `<div class="container-fluid head">
  <a class="navbar-brand" name="1" id="1" href="">GALLERIA PIROLA</a>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <a class="nav-link active" name="2" id="2" href="#bn1">ABOUT</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" name="3" id="3"  href="#bn2">NEWS</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" name="4" id="4" href="#bn3">ARTISTS</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" name="5" id="5" href="#bn4">COLLECTIONS</a>
      </li>
      <li class="nav-item">
      <a href="/user#bn1" role="button" class="nav-link active" data-toggle="modal" id="6" name="6"><svg  width="20" height="20" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 20 20">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>ACCOUNT</a>
      </li>
      <li class="nav-item">
      <a href="/logout" role="button" class="nav-link active red" data-toggle="modal" id="6" name="6">EXIT</a>
      </li>
    </ul>
    <span class="navbar-text">
      <form class="d-flex" role="search" id="form-search">
        <input class="form-control me-2" id="criterio" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-light" id="search" type="submit">Search</button>
      </form>
    </span>
  </div>
</div>
`;
}

function NavUser() //CLIENTE
{
  return `<div class="container-fluid head">
  <a class="navbar-brand" name="1" id="1" href="">GALLERIA PIROLA</a>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <a class="nav-link active" name="2" id="2" href="#bn">YOUR DATA</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" name="3" id="3"  href="#bn1">YOUR TICKETS</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" name="4" id="4" href="#bn2">CAN I HELP YOU?</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" name="5" id="5" href="#bn3">MESSAGES&nbsp<span class="badge" id="numbMessages"></span></a>
      </li>
      <li class="nav-item">
      <a href="/logout" role="button" class="nav-link active red" data-toggle="modal" id="6" name="6">EXIT</a>
      </li>
    </ul>
    <span class="navbar-text">
    <form class="d-flex" role="search" id="form-search">
      <input class="form-control me-2" id="criterio" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-light" id="search" type="submit">Search</button>
    </form>
  </span>
  </div>
</div>`;
}

function NavArtist(){
  return `<div class="container-fluid head">
  <a class="navbar-brand" name="1" id="1" href="">GALLERIA PIROLA</a>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <a class="nav-link active" name="2" id="2" href="#bn">YOUR DATA </a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" name="3" id="3"  href="#bn1">YOUR OPERAS</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" name="4" id="4" href="#bn2">YOUR COLLECTIONS</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" name="5" id="5" href="#bn3">CAN I HELP YOU?</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" name="6" id="6" href="#bn4">MESSAGES</a>
      </li>
      <li class="nav-item">
      <a href="/logout" role="button" class="nav-link active red" data-toggle="modal" id="6" name="6">EXIT</a>
      </li>
    </ul>
    <span class="navbar-text">
      <form class="d-flex" role="search" id="form-search">
        <input class="form-control me-2" id="criterio" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-light" id="search" type="submit">Search</button>
      </form>
    </span>
  </div>
</div>`;
}

function NavAdmin() //ADMIN
{
  return `<div class="container-fluid head">
  <a class="navbar-brand" name="1" id="1" href="">GALLERIA PIROLA</a>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <a class="nav-link active" name="2" id="2" href="#bn">USER&nbsp<span class="badge" id="numbUsers"></span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" name="3" id="3"  href="#bn1">TICKET</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" name="4" id="4" href="#bn2">OPERE AND COLLECTIONS</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" name="5" id="5" href="#bn3">NEWSLETTER</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" name="6" id="6" href="#bn4">MESSAGES</a>
      </li>
      <li class="nav-item">
      <a href="/logout" role="button" class="nav-link active red" data-toggle="modal" id="6" name="6">EXIT</a>
      </li>
    </ul>
    <span class="navbar-text">
      <form class="d-flex" role="search" id="form-search">
        <input class="form-control me-2" id="criterio" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-light" id="search" type="submit">Search</button>
      </form>
    </span>
  </div>
</div>`;

}

function navl()
{
  return `<div class="container-fluid head">
  <a class="navbar-brand" name="1" id="1" href="">GALLERIA PIROLA</a>
</div>`;

}

function NavSearch()
{
  return `<div class="container-fluid head">
  <a class="navbar-brand" name="1" id="1" href="#bn">GALLERIA PIROLA</a>
  <br><br>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <h1 style="color:white">RESULTS:</h1>
      </li>
    </ul>
  </div>
</div>
`;

}
export{noLogIndex,LogIndex,NavUser,NavAdmin,NavArtist,navl,NavSearch};



