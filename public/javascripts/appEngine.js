"use strict";

import { noLogIndex, LogIndex, NavUser, NavAdmin, NavArtist, navl,NavSearch } from "./parts/navBars.js";
import { main, about, news, collection, registerForm, loginForm, alert, userPageData, notAttivateUserPageData, message, artists, notAttivateUserTicket, UserTicket, helpDesk, notAttivateUserNotification, editUserData, notification, userManAdmin, ticketManAdmin, createTicket, orperaCollection, NewsLetterAdmin, MessageAdmin, getOpere, createOpera, InfoOpera, collectionsArt, createCollection, InfoCollection, buyTicket, carouselShowArt, ChoseTick, viewImage,resultresUser,resultresOperas,resultresCollections } from "./parts/sections.js"
import UserMan from './UserMan.js';
import PageMan from './PageMan.js';
import TicketMan from "./TicketMan.js";
import NewsMan from "./NewsMan.js";
import NewsLetterMan from './NewsLetterMan.js';
import MessageMan from './MessageMan.js';
import FeedbackMan from "./FeedbackMan.js";
import page from '//unpkg.com/page/page.mjs';
import CollectionMan from "./CollectionMan.js";
import FileSystemMan from "./FileSistem.js";
import OperaMan from "./OperaMan.js";
class appEngine {
    constructor(mainBox, navBar, sections, mainBoxLogin, navlogin, mainBoxReg, navReg, mainBoxOp) {
        page('/', async () => {
            if (localStorage.getItem('usernameID')) {
                navBar.innerHTML = '';
                navBar.insertAdjacentHTML('beforeend', LogIndex());
                document.getElementById("1").addEventListener("mouseup", function () { window.location.href = "/#bn"; });
            }
            else {
                navBar.innerHTML = '';
                navBar.insertAdjacentHTML('beforeend', noLogIndex());
                document.getElementById("1").addEventListener("mouseup", function () { window.location.href = "/#bn"; });
            }
            mainBox.innerHTML = ''
            mainBox.insertAdjacentHTML('beforeend', main());
            mainBox.style.backgroundImage = "url(" + await PageMan.getImage('index') + ")";
            sections.about.innerHTML = '';
            sections.about.insertAdjacentHTML('beforeend', about(await PageMan.getImage('about')));
            sections.contact.innerHTML = '';
            sections.contact.insertAdjacentHTML('beforeend', news(await PageMan.getImage('contact'), await NewsMan.getAllNews()));
            sections.artists.innerHTML = '';
            sections.artists.insertAdjacentHTML('beforeend', artists(await UserMan.getArtists()));
            let btns = document.querySelectorAll('button');
            let i = 0;
            for (i of btns) {
                i.addEventListener('click', function () {
                    switch (this.id) {
                        case "btArtistCar":
                            OperaMan.getAllOpereByUser(this.name).then((opere) => {
                                CollectionMan.getCollectionsbyUser(this.name).then((collection) => {
                                    UserMan.getUserById(this.name).then((user) => {
                                        sections.artists.insertAdjacentHTML('beforeend', carouselShowArt(user, opere, collection));
                                        document.getElementById("simpleModalCarousel").style.display = "block";
                                        document.getElementById("closeModalCarousel").addEventListener('mouseup', function () {
                                            document.getElementById("simpleModalCarousel").style.display = "none";
                                        })
                                    })
                                })
                            })
                            break;
                    }
                });
            }
            sections.collections.innerHTML = '';
            sections.collections.insertAdjacentHTML('beforeend', collection(await CollectionMan.getCollections()));
            sections.collections.insertAdjacentHTML('beforeend', buyTicket(await TicketMan.getAllTicket()))
            let bs = document.querySelectorAll('button');
            let u = 0;
            for (u of bs) {
                u.addEventListener('click', function () {
                    if (this.id == "downloadFile") {
                        window.open(this.name, '_blank');
                    }
                })
            }



            let btnNewsLetter = document.getElementById("btnNewsLetter");
            let formNws = document.getElementById("form-newsLetter");
            let email = "";
            if (btnNewsLetter != null && formNws != null) {
                formNws.addEventListener('submit', function (event) {
                    event.preventDefault()
                    email = document.getElementById("news").value;
                    if (email) {
                        let response = NewsLetterMan.subscribe(email).then((res) => {
                            if (res == 1) {
                                document.getElementById("btnNewsLetter").style.display = "none";
                                document.getElementById("news").style.display = "none";
                                document.getElementById("thks").innerHTML = "THANK YOU!";
                            }
                        });
                    }
                });
            }
            let buytickHome = document.getElementById("buytickHome");
            if (buytickHome) {
                buytickHome.addEventListener('mouseup', function () {
                    if (localStorage.getItem("usernameID")) {
                        document.getElementById("simpleModalBuyTicket").style.display = "block";
                        document.getElementById("closeModalBuyTicket").addEventListener('mouseup', function () {
                            document.getElementById("simpleModalBuyTicket").style.display = "none";
                        });
                        let bs = document.querySelectorAll('button');
                        let u = 0;
                        for (u of bs) {
                            u.addEventListener('click', function () {
                                if (this.id == "btnBuy") {
                                    TicketMan.byuTicket(this.name, localStorage.getItem("usernameID")).then((res) => {
                                    });
                                }
                            })
                        }

                    }
                    else {
                        window.location.href = "/pagina";
                    }
                })
            }
            let serch=document.getElementById("search");
            let fom=document.getElementById("form-search");
            if(serch!=null && fom!=null)
            {
                serch.addEventListener('mouseup',function(){
                    fom.addEventListener('submit',function(event){
                        event.preventDefault();
                        let cri=document.getElementById("criterio").value
                        if(!cri)
                        {
                            event.stopPropagation();
                        }
                        else
                        {
                            PageMan.search(cri).then((res)=>{
                                navBar.innerHTML = '';
                                mainBox.innerHTML='';
                                sections.about.innerHTML='';
                                sections.contact.innerHTML='';
                                navBar.insertAdjacentHTML('beforeend', NavSearch());
                                document.getElementById("1").addEventListener("mouseup", function () { window.location.href = "/#bn"; });
                                mainBox.insertAdjacentHTML('beforeend',resultresUser(res[0],cri));
                                sections.about.insertAdjacentHTML('beforeend',resultresOperas(res[1],cri));
                                sections.contact.insertAdjacentHTML('beforeend',resultresCollections(res[2],cri));
                                sections.artists.style.display="none";
                                sections.collections.style.display="none";
                            })
                        }
                    })
                })
            } 
        });

        page('/login.html', async () => {
            navlogin.insertAdjacentHTML('beforeend', navl());
            document.getElementById("1").addEventListener("mouseup", function () { window.location.href = "/#bn"; });
            mainBoxLogin.insertAdjacentHTML('beforeend', loginForm(await PageMan.getImage('login')));
            (function () {
                var forms = document.querySelectorAll('.needs-validation')
                Array.prototype.slice.call(forms)
                    .forEach(function (form) {
                        form.addEventListener('submit', function (event) {
                            if (!form.checkValidity()) {
                                event.preventDefault()
                                event.stopPropagation()
                            }
                            form.classList.add('was-validated')
                        }, false)
                    })
            })();



            document.addEventListener('keypress', (event) => {
                if (event.key === "Enter") {
                    let formLogin = document.getElementById("form-log");
                    if (btnLogin != null) {

                        formLogin.addEventListener('submit', function (event) {
                            event.preventDefault();
                            let username = document.getElementById("usr").value;
                            let password = document.getElementById("password").value;
                            if (!username || !password) {
                                event.stopPropagation();
                            }
                            else {
                                UserMan.login(username, password).then((user) => {
                                    localStorage.setItem("usernameID", user.username);
                                    window.location.href = "/#bn";
                                }).catch((errors) => {
                                    mainBoxLogin.insertAdjacentHTML('beforeend', message(errors));
                                    document.getElementById("simpleModal").style.display = "block";
                                    if (document.getElementById("closeModal")) {
                                        document.getElementById("simpleModal").addEventListener('mouseup', function () {
                                            document.getElementById("simpleModal").style.display = "none";
                                        })

                                    }
                                });
                            }
                        });
                    }
                }
            })

            let formLogin = document.getElementById("form-log");
            let btnLogin = document.getElementById("btnLog");
            if (formLogin != null && btnLogin != null) {
                btnLogin.addEventListener('mouseup', function () {
                    formLogin.addEventListener('submit', function (event) {
                        event.preventDefault();
                        let username = document.getElementById("usr").value;
                        let password = document.getElementById("password").value;
                        if (!username || !password) {
                            event.stopPropagation();
                        }
                        else {
                            UserMan.login(username, password).then((user) => {
                                localStorage.setItem("usernameID", user.username);
                                window.location.href = "/#bn";
                            }).catch((errors) => {
                                mainBoxLogin.insertAdjacentHTML('beforeend', message(errors));
                                document.getElementById("simpleModal").style.display = "block";
                                if (document.getElementById("closeModal")) {
                                    document.getElementById("simpleModal").addEventListener('mouseup', function () {
                                        document.getElementById("simpleModal").style.display = "none";
                                    })

                                }
                            });
                        }
                    });
                });
            }
        });

        page('/register.html', async () => {
            navReg.innerHTML = '';
            navReg.insertAdjacentHTML('beforeend', navl());
            mainBoxReg.style.backgroundImage = "url(" + await PageMan.getImage('login') + ")";
            mainBoxReg.insertAdjacentHTML('beforeend', registerForm(await PageMan.getImage('login')));
            (function () {
                var forms = document.querySelectorAll('.needs-validation')
                Array.prototype.slice.call(forms)
                    .forEach(function (form) {
                        form.addEventListener('submit', function (event) {
                            if (!form.checkValidity()) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                            form.classList.add('was-validated')
                        }, false)
                    })
            })();

            document.addEventListener('keypress', (event) => {
                if (event.key === "Enter") {
                    let formRegister2 = document.getElementById("form-reg");
                    if (formRegister2 != null) {
                        formRegister2.addEventListener('submit', function (event) {
                            event.preventDefault();
                            let name = document.getElementById("name").value;
                            let surname = document.getElementById("surname").value;
                            let date = document.getElementById("born").value;
                            let email = document.getElementById("email").value;
                            let username = document.getElementById("usr").value;
                            let password = document.getElementById("password").value;
                            let address = document.getElementById("address").value;
                            let role = document.getElementById("role").value;
                            if (!name || !surname || !date || !email || !username || !password || !address || !role) {
                                event.stopPropagation();
                            }
                            else {
                                UserMan.register(name, surname, date, email, username, password, address, role).then((returnUsername) => {
                                    localStorage.setItem("usernameID", returnUsername);
                                    setTimeout(() => {
                                        window.location.href = "/";
                                    }, 1000)
                                }).catch((error) => {
                                    mainBoxReg.insertAdjacentHTML('beforeend', message(error));
                                    document.getElementById("simpleModal").style.display = "block";
                                    if (document.getElementById("closeModal")) {
                                        document.getElementById("simpleModal").addEventListener('mouseup', function () {
                                            document.getElementById("simpleModal").style.display = "none";
                                        })

                                    }
                                    //mainBoxLogin.insertAdjacentHTML('afterbegin', alert(error));
                                });
                            }
                        });
                    };
                }
            });

            let formRegister = document.getElementById("form-reg");
            let btnReg = document.getElementById("btnReg");
            if (btnReg != null && formRegister != null) {
                btnReg.addEventListener('mouseup', function () {
                    formRegister.addEventListener('submit', function (event) {
                        event.preventDefault();
                        let name = document.getElementById("name").value;
                        let surname = document.getElementById("surname").value;
                        let date = document.getElementById("born").value;
                        let email = document.getElementById("email").value;
                        let username = document.getElementById("usr").value;
                        let password = document.getElementById("password").value;
                        let address = document.getElementById("address").value;
                        let role = document.getElementById("role").value;
                        if (!name || !surname || !date || !email || !username || !password || !address || !role) {
                            event.stopPropagation();
                        }
                        else {
                            UserMan.register(name, surname, date, email, username, password, address, role).then((returnUsername) => {
                                localStorage.setItem("usernameID", returnUsername);
                                setTimeout(() => {
                                    window.location.href = "/";
                                }, 1000)
                            }).catch((error) => {
                                mainBoxReg.insertAdjacentHTML('beforeend', message(error));
                                document.getElementById("simpleModal").style.display = "block";
                                if (document.getElementById("closeModal")) {
                                    document.getElementById("simpleModal").addEventListener('mouseup', function () {
                                        document.getElementById("simpleModal").style.display = "none";
                                    })

                                }
                            });
                        }
                    });
                });
            }


        });

        page('/opere.html', async () => {
            if (!localStorage.getItem("idTicket")) {
                window.location.href = "/#bn";
            }
            else {
                mainBoxOp.insertAdjacentHTML('beforeend', ChoseTick(await OperaMan.getOpera(), await CollectionMan.getCollections()));
                setTimeout(() => {
                    let e = document.getElementById("exampleModalOpSh");
                    if (e !== null) {
                        e.style.display = "block";
                    }
                }, 100);
                if (document.getElementById("close")) {
                    document.getElementById("close").addEventListener('mouseup', function () {
                        document.getElementById("exampleModalOpSh").style.display = "none";
                    })
                }
                let by = document.querySelectorAll('button');
                let w = 0;
                for (w of by) {
                    w.addEventListener('click', function () {
                        let p = [];
                        if (this.id == "op") {
                            OperaMan.gerOperabyId(this.name).then((res) => {
                                p.push(res);
                                if (document.documentElement.requestFullScreen) {
                                    document.documentElement.requestFullScreen();
                                } else if (document.documentElement.mozRequestFullScreen) {
                                    document.documentElement.mozRequestFullScreen();
                                } else if (document.documentElement.webkitRequestFullScreen) {
                                    document.documentElement.webkitRequestFullScreen();
                                }
                                mainBoxOp.innerHTML = '';
                                mainBoxOp.insertAdjacentHTML('beforeend', viewImage(p));
                                localStorage.removeItem("idTicket");
                                let stars = document.querySelectorAll('input');
                                let e = 0;
                                for (e of stars) {
                                    e.addEventListener('click', function () {
                                        switch (this.id) {
                                            case "star1":
                                                FeedbackMan.insertFeedback(1, localStorage.getItem("usernameID"), this.name);
                                                break;
                                            case "star2":
                                                FeedbackMan.insertFeedback(2, localStorage.getItem("usernameID"), this.name)
                                                break;
                                            case "star3":
                                                FeedbackMan.insertFeedback(3, localStorage.getItem("usernameID"), this.name)
                                                break;
                                            case "star4":
                                                FeedbackMan.insertFeedback(4, localStorage.getItem("usernameID"), this.name)
                                                break;
                                            case "star5":
                                                FeedbackMan.insertFeedback(5, localStorage.getItem("usernameID"), this.name)
                                                break;
                                            case "exit":
                                                window.location.href = "/#bn";
                                                break;
                                        }
                                    })
                                }
                            })
                        }
                        else if (this.id == "cl") {
                            OperaMan.getOpereByCollection(this.name).then((result) => {
                                if (result.numrow == 0) {
                                    page('/opere.html');
                                }
                                else {
                                    if (document.documentElement.requestFullScreen) {
                                        document.documentElement.requestFullScreen();
                                    } else if (document.documentElement.mozRequestFullScreen) {
                                        document.documentElement.mozRequestFullScreen();
                                    } else if (document.documentElement.webkitRequestFullScreen) {
                                        document.documentElement.webkitRequestFullScreen();
                                    }
                                    mainBoxOp.innerHTML = '';
                                    //document.getElementById("exampleModalOpSh").style.display="none";
                                    mainBoxOp.insertAdjacentHTML('beforeend', viewImage(result));
                                    localStorage.removeItem("idTicket");
                                    let stars = document.querySelectorAll('button');
                                    let e = 0;
                                    for (e of stars) {
                                        e.addEventListener('click', function () {
                                            switch (this.id) {
                                                case "star1":
                                                    FeedbackMan.insertFeedback(1, localStorage.getItem("usernameID"), this.name);
                                                    break;
                                                case "star2":
                                                    FeedbackMan.insertFeedback(2, localStorage.getItem("usernameID"), this.name)
                                                    break;
                                                case "star3":
                                                    FeedbackMan.insertFeedback(3, localStorage.getItem("usernameID"), this.name)
                                                    break;
                                                case "star4":
                                                    FeedbackMan.insertFeedback(4, localStorage.getItem("usernameID"), this.name)
                                                    break;
                                                case "star5":
                                                    FeedbackMan.insertFeedback(5, localStorage.getItem("usernameID"), this.name)
                                                    break;
                                                case "exit":
                                                    window.location.href = "/#bn";
                                                    break;
                                            }
                                        })
                                    }

                                }

                            })
                        }
                    })
                }

            }
        });

        page('/user', async () => {
            let person = await UserMan.getUserById(localStorage.getItem('usernameID'));
            sections.about.innerHTML = '';
            sections.contact.innerHTML = ''
            sections.artists.innerHTML = '';
            sections.collections.innerHTML = '';
            navBar.innerHTML = '';
            mainBox.innerHTML = ''
            if (person.status == 2) {
                person.status = "In attesa di attivazione";
                setTimeout(() => {
                    let e = document.getElementById("simpleModal");
                    if (e !== null) {
                        e.style.display = "block";
                    }
                }, 1000);
            }
            else if (person.status == 0) {
                person.status = "Attivo"
            }
            else if (person.status == 1) {
                person.status = "Sospeso";
            };
            if (person.status == "In attesa di attivazione") {
                {
                    navBar.insertAdjacentHTML('beforeend', NavUser());
                    document.getElementById("1").addEventListener("mouseup", function () { window.location.href = "/#bn"; });
                    mainBox.insertAdjacentHTML('beforeend', notAttivateUserPageData(person));
                    mainBox.insertAdjacentHTML('beforeend', message("Your account is not yet active, if you need contact us"));
                    let btnModal = document.getElementById("closeModal");
                    if (btnModal != null) {
                        btnModal.addEventListener('mouseup', function () {
                            document.getElementById("simpleModal").style.display = "none";
                            mainBox.removeChild(document.getElementById("simpleModal"));
                            // visto=true;
                        });
                    }
                    sections.about.insertAdjacentHTML('beforeend', notAttivateUserTicket());
                    sections.artists.insertAdjacentHTML('beforeend', notAttivateUserNotification());
                    sections.contact.insertAdjacentHTML('beforeend', helpDesk(person));
                    sections.collections.style.display = 'none';
                }
            }
            else if (person.status == "Attivo") {
                if (person.role == 0) //CLIENTE
                {
                    navBar.insertAdjacentHTML('beforeend', NavUser());
                    document.getElementById("1").addEventListener("mouseup", function () { window.location.href = "/#bn"; });
                    mainBox.insertAdjacentHTML('beforeend', userPageData(person));
                    sections.about.insertAdjacentHTML('beforeend', UserTicket(await TicketMan.getTicketUser(person.username)));
                    sections.about.insertAdjacentHTML('beforeend', buyTicket(await TicketMan.getAllTicket()));

                    let bst = document.querySelectorAll('button');
                    let e = 0;
                    for (e of bst) {
                        e.addEventListener('click', function () {
                            if (this.id == "btnUseTick") {
                                TicketMan.useticket(this.name, person.username).then((res) => {
                                    //window.location.href = "/opere.html"+res;
                                    localStorage.setItem("idTicket", res)
                                    //window.open("/opere.html", "_blank", "toolbar=no, scrollbars=no, resizable=no, ,titlebar=no,top=500, left=500, width=400, height=400");
                                    window.location.href = '/opere.html';
                                })
                            }
                        })
                    }
                    if (document.getElementById("userbuyticket")) {
                        document.getElementById("userbuyticket").addEventListener('mouseup', function () {
                            document.getElementById("simpleModalBuyTicket").style.display = "block";
                            document.getElementById("closeModalBuyTicket").addEventListener('mouseup', function () {
                                document.getElementById("simpleModalBuyTicket").style.display = "none";
                            });
                            let bs = document.querySelectorAll('button');
                            let u = 0;
                            for (u of bs) {
                                u.addEventListener('click', function () {
                                    if (this.id == "btnBuy") {
                                        TicketMan.byuTicket(this.name, localStorage.getItem("usernameID")).then((res) => {
                                            page('/user#bn1');
                                        })
                                    }
                                })
                            }
                        });
                    }

                    //notification
                    let messages = await MessageMan.getMessages(person.username)
                    if (messages.numRow != 0) //IN FUTURO METTERE IL NUMERO MESSAGGI DA LEGERE
                        document.getElementById("numbMessages").innerHTML = messages.length;
                    sections.artists.insertAdjacentHTML('beforeend', notification(messages));
                    sections.contact.insertAdjacentHTML('beforeend', helpDesk(person));
                    sections.collections.style.display = 'none';
                    let btns = document.querySelectorAll('button');
                    let i = 0;
                    let found = "";
                    for (i of btns) {
                        i.addEventListener('click', function () {
                            switch (this.id) {
                                case "readMex":
                                    for (let b = 0; b < messages.length; b++) {
                                        if (messages[b].code == this.name) {
                                            document.getElementById("mesSubj").innerHTML = messages[b].Subj + ":";
                                            document.getElementById("hr").style.display = "block";
                                            document.getElementById("btnReadMex").style.display = "block";
                                            document.getElementById("Ttext").innerHTML = messages[b].text;
                                            MessageMan.readMess(messages[b].code);
                                        }
                                    }
                                    break;
                                case "btnReadMex":
                                    document.getElementById("mesSubj").innerHTML = "";
                                    document.getElementById("hr").style.display = "none";
                                    document.getElementById("btnReadMex").style.display = "none";
                                    document.getElementById("Ttext").innerHTML = "";
                                    page('/user#bn1');
                                    break;
                            }
                        })
                    }

                }
                else if (person.role == 1) //ARTISTA
                {
                    sections.about.innerHTML = '';
                    sections.contact.innerHTML = ''
                    sections.artists.innerHTML = '';
                    sections.collections.innerHTML = '';
                    navBar.innerHTML = '';
                    mainBox.innerHTML = ''

                    navBar.insertAdjacentHTML('beforeend', NavArtist());
                    document.getElementById("1").addEventListener("mouseup", function () { window.location.href = "/#bn"; });
                    mainBox.insertAdjacentHTML('beforeend', userPageData(person));
                    sections.about.insertAdjacentHTML('beforeend', getOpere(await OperaMan.getAllOpereByUser(person.username))); //OPERE
                    sections.about.insertAdjacentHTML('beforeend', createOpera()); //OPERE
                    //notification
                    let messages = await MessageMan.getMessages(person.username)
                    if (messages.numRow != 0) //IN FUTURO METTERE IL NUMERO MESSAGGI DA LEGERE
                        document.getElementById("numbMessages").innerHTML = messages.length;
                    sections.contact.insertAdjacentHTML('beforeend', collectionsArt(await CollectionMan.getCollectionsbyUser(person.username))); //COLLECTION
                    sections.contact.insertAdjacentHTML('beforeend', createCollection()); //COLLECTION

                    sections.artists.insertAdjacentHTML('beforeend', helpDesk(person));
                    sections.collections.insertAdjacentHTML('beforeend', notification(messages));
                    (function () {
                        var forms = document.querySelectorAll('.needs-validation')
                        Array.prototype.slice.call(forms)
                            .forEach(function (form) {
                                form.addEventListener('submit', function (event) {
                                    if (!form.checkValidity()) {
                                        event.preventDefault();
                                        event.stopPropagation();
                                    }
                                    form.classList.add('was-validated')
                                }, false)
                            })
                    })();

                    //BUTTON MANAGER
                    let btns = document.querySelectorAll('button');
                    let i = 0;
                    for (i of btns) {
                        i.addEventListener('click', function () {
                            switch (this.id) {
                                case "btnNewOp":
                                    document.getElementById("simpleModal").style.display = "block";
                                    break;
                                case "closeModal":
                                    document.getElementById("simpleModal").style.display = "none";
                                    break;
                                case "infOp":
                                    OperaMan.gerOperabyId(this.name).then((result) => {
                                        sections.about.insertAdjacentHTML('beforeend', InfoOpera(result));
                                        document.getElementById("simpleModalinfoOP").style.display = "block";
                                        let btnclosModOp = document.getElementById("closeModaloP");
                                        if (btnclosModOp) {
                                            btnclosModOp.addEventListener('mouseup', function () {
                                                document.getElementById("simpleModalinfoOP").style.display = "none";
                                            })
                                        }

                                        let btnDelOp = document.getElementById("btnDeleteOp");
                                        if (btnDelOp) {
                                            btnDelOp.addEventListener('mouseup', function () {
                                                OperaMan.deleteOpera(this.name).then((res) => {
                                                    page('/user#bn1');
                                                });
                                            })
                                        }
                                    });

                                    break;
                                case "brnCreateOP":

                                    let frm = document.getElementById("form-opera")
                                    frm.addEventListener('submit', function (event) {
                                        event.preventDefault();
                                        let title = document.getElementById("titleOp").value;
                                        let desc = document.getElementById("descOp").value;
                                        let year = document.getElementById("yearOp").value;
                                        let price = document.getElementById("price").value;
                                        let image = document.getElementById("newImageOp");
                                        let imagOPVal = "";
                                        let imagePath = "";
                                        if (!title || !desc || !year || !price || !image.value) {
                                            event.stopPropagation();
                                        }
                                        else {
                                            imagePath = "/images/opere/" + title + ".png";
                                            var fReader = new FileReader();
                                            fReader.readAsDataURL(image.files[0]);
                                            fReader.onloadend = function (event) {
                                                //let newI=document.getElementById("displayImage")
                                                imagOPVal = event.target.result;
                                                FileSystemMan.SaveImageOpera(person.username, image.value, imagOPVal, title);
                                            }
                                            OperaMan.CreateOpera(person.username, title, desc, year, price, imagePath).then((title) => {
                                                page('/user#bn1');
                                            });

                                        }
                                    });
                                    break;
                                case "btnNewCol":
                                    document.getElementById("simpleModalCol").style.display = "block";
                                    break;
                                case "closeModalCol":
                                    document.getElementById("simpleModalCol").style.display = "none";
                                case "brnCreateCol":
                                    let frmcol = document.getElementById("form-collection")
                                    frmcol.addEventListener('submit', function (event) {
                                        event.preventDefault();
                                        let title = document.getElementById("nameCol").value;
                                        let desc = document.getElementById("descCol").value;
                                        if (!title || !desc) {
                                            event.stopPropagation();
                                        }
                                        else {
                                            CollectionMan.createCollection(person.username, title, desc).then(() => {
                                                page('/user#bn2');
                                            });

                                        }
                                    });
                                    break;
                                case "infCol":
                                    OperaMan.getAllOpereByUser(person.username).then((opere) => {
                                        CollectionMan.getCollectionByname(this.name).then((collection) => {
                                            sections.contact.insertAdjacentHTML('beforeend', InfoCollection(collection, opere));
                                            document.getElementById("simpleModalinfoCol").style.display = "block";
                                            let btnclosModCol = document.getElementById("simpleModalinfoCol");
                                            if (btnclosModCol) {
                                                btnclosModCol.addEventListener('mouseup', function () {
                                                    document.getElementById("simpleModalinfoCol").style.display = "none";
                                                })
                                            }
                                            let a = document.getElementsByClassName("btn btn-outline-warning table coll");
                                            let j = 0;
                                            for (j of a) {
                                                j.addEventListener('click', function () {
                                                    OperaMan.colNocol(this.name, " ").then((result) => {
                                                        page('/user#bn1');
                                                    });
                                                })
                                            }

                                            let b = document.getElementsByClassName("btn btn-outline-success table coll");
                                            let k = 0;
                                            for (k of b) {
                                                k.addEventListener('click', function () {
                                                    OperaMan.colNocol(this.name, collection.name).then((result) => {
                                                        page('/user#bn1');
                                                    });
                                                })
                                            }

                                            let c = document.getElementsByClassName("btn btn-outline-danger coll");
                                            let h = 0;
                                            for (h of c) {
                                                h.addEventListener('click', function () {
                                                    CollectionMan.susattcoll(this.name, "false").then((result) => {
                                                    });
                                                })
                                            }

                                            let d = document.getElementsByClassName("btn btn-outline-success coll");
                                            let y = 0;
                                            for (y of d) {
                                                y.addEventListener('click', function () {
                                                    CollectionMan.susattcoll(this.name, "true").then((result) => {
                                                    });
                                                })
                                            }

                                        });
                                    });
                                    break;
                            }
                        });
                    }

                }
                else //ADMIN
                {
                    sections.about.innerHTML = '';
                    sections.contact.innerHTML = ''
                    sections.artists.innerHTML = '';
                    sections.collections.innerHTML = '';
                    navBar.innerHTML = '';
                    mainBox.innerHTML = '';
                    navBar.insertAdjacentHTML('beforeend', NavAdmin());
                    document.getElementById("1").addEventListener("mouseup", function () { window.location.href = "/#bn"; });
                    mainBox.insertAdjacentHTML('beforeend', userManAdmin(await UserMan.getUserNoAttivate()));
                    if (document.getElementById("numUser").innerHTML != 0)
                        document.getElementById("numbUsers").innerHTML = document.getElementById("numUser").innerHTML;
                    (function () {
                        var forms = document.querySelectorAll('.needs-validation')
                        Array.prototype.slice.call(forms)
                            .forEach(function (form) {
                                form.addEventListener('submit', function (event) {
                                    if (!form.checkValidity()) {
                                        event.preventDefault();
                                        event.stopPropagation();
                                    }
                                    form.classList.add('was-validated')
                                }, false)
                            })
                    })();
                    sections.about.insertAdjacentHTML('beforeend', ticketManAdmin(await TicketMan.getAllTicket()));
                    sections.about.insertAdjacentHTML('beforeend', createTicket());


                    let forTick = document.getElementById("form-tick");
                    let btnTick = document.getElementById("brnCreateTick");
                    if (btnTick != null && forTick != null) {
                        btnTick.addEventListener('mouseup', function () {
                            forTick.addEventListener('submit', function (event) {
                                event.preventDefault();
                                let codeTick = document.getElementById("codeTick").value;
                                let numberOfIng = document.getElementById("numberOfIng").value;
                                let price = document.getElementById("price").value;
                                let tickeSeclection = document.getElementById("tickeSeclection").value;
                                if (!codeTick || !numberOfIng || !price || !tickeSeclection) {
                                    event.stopPropagation();
                                    page('/user#bn1')
                                }
                                else {
                                    TicketMan.createTicket(codeTick, numberOfIng, price, tickeSeclection).then(() => {
                                        page('/user#bn1')
                                    }).catch((error) => {
                                        mainBox.insertAdjacentHTML('afterbegin', alert(error));
                                        setTimeout(() => {
                                            let e = document.getElementById("errorAlert");
                                            if (e !== null) {
                                                e.remove();
                                            }
                                        }, 3000);
                                    });


                                }
                            });
                        });
                    }

                    sections.contact.insertAdjacentHTML('beforeend', orperaCollection(await OperaMan.getOpera(), await CollectionMan.getCollections()));
                    sections.artists.insertAdjacentHTML('beforeend', NewsLetterAdmin());

                    var text_max = 26;
                    document.getElementById('count_message').innerHTML = ('<p>0' + '/ ' + text_max + '</p>');
                    document.getElementById('descNews').addEventListener('keyup', function () {
                        var text_length = document.getElementById('descNews').value.length;
                        document.getElementById('count_message').innerHTML = (text_length + ' / ' + text_max);
                    })

                    btnNewsLetter = document.getElementById("btnNewsLetter").addEventListener('mouseup', function () {
                        let month = document.getElementById("monthSeclection").value;
                        let desc = document.getElementById('descNews').value;
                        let cont = document.getElementById("contentNewsLetter").value;
                        if (!cont || !month || !desc) {
                        }
                        else {

                            FileSystemMan.SaveNews(month, desc, cont).then(() => {
                                document.getElementById("monthSeclection").value = '';
                                document.getElementById('descNews').value = '';
                                document.getElementById("contentNewsLetter").value = '';
                                setTimeout(() => {
                                    let e = document.getElementById("simpleModalNewsLetter");
                                    if (e !== null) {
                                        e.style.display = "block";
                                    }
                                }, 100);


                            });
                        }
                    });

                    sections.collections.insertAdjacentHTML('beforeend', MessageAdmin())

                    //BUTTON MANAGER
                    let btns = document.querySelectorAll('button');
                    let i = 0;
                    for (i of btns) {
                        i.addEventListener('click', function () {
                            switch (this.id) {
                                case "btnSus":
                                    UserMan.suspandUser(this.name);
                                    page('/user');
                                    break;
                                case "btnAct":
                                    UserMan.activateUser(this.name);
                                    page('/user');
                                    break;

                                case "deleteTicket":
                                    TicketMan.deleteTicket(this.name);
                                    page('/user#bn1');
                                    break;
                                case "btnDelOp":
                                    OperaMan.deleteOpera(this.name);
                                    page('/user#bn2');
                                    break;
                                case "btnDelCo":
                                    CollectionMan.deleteCollection(this.name);
                                    page('/user#bn2');
                                    break;
                                case "modalTicket":
                                    document.getElementById("simpleModal").style.display = "block";
                                    break;
                                case "closeModal":
                                    document.getElementById("simpleModal").style.display = "none";
                                    document.getElementById("simpleModalNewsLetter").style.display = "none";
                                    document.getElementById("simpleModalMess").style.display = "none";
                                    document.getElementById("simpleModalMessOk").style.display = "none";
                                    break;
                                case "btnMessageCustomers":
                                    let typTick = document.getElementById("filterSelectCustomers").value;
                                    let subjCustMes = document.getElementById("subjMessageCustomere").value;
                                    let txtCustMes = document.getElementById("textMessageCustomere").value;
                                    if (!typTick || !txtCustMes || !subjCustMes) {
                                        document.getElementById("simpleModalMess").style.display = "block";
                                    }
                                    else {
                                        MessageMan.insertNews(typTick, subjCustMes, txtCustMes).then(() => {
                                            document.getElementById("simpleModalMessOk").style.display = "block";
                                        }).catch((err) => {

                                        });
                                    }
                                    break;
                            }
                        });
                    }
                }

            }
            else if (person.status == "Sospeso") {
                navBar.insertAdjacentHTML('beforeend', NavUser());
                document.getElementById("1").addEventListener("mouseup", function () { window.location.href = "/#bn"; });
                mainBox.insertAdjacentHTML('beforeend', notAttivateUserPageData(person));
                mainBox.insertAdjacentHTML('beforeend', message("Your account has been suspended"));
                let btnModal = document.getElementById("closeModal");
                if (btnModal != null) {
                    btnModal.addEventListener('mouseup', function () {
                        document.getElementById("simpleModal").style.display = "none";
                        mainBox.removeChild(document.getElementById("simpleModal"));
                       page('/');
                    });
                }


            }

            let serch=document.getElementById("search");
            let fom=document.getElementById("form-search");
            if(serch!=null && fom!=null)
            {
                serch.addEventListener('mouseup',function(){
                    fom.addEventListener('submit',function(event){
                        event.preventDefault();
                        let cri=document.getElementById("criterio").value
                        if(!cri)
                        {
                            event.stopPropagation();
                        }
                        else
                        {
                            PageMan.search(cri).then((res)=>{
                                navBar.innerHTML = '';
                                mainBox.innerHTML='';
                                sections.about.innerHTML='';
                                sections.contact.innerHTML='';
                                navBar.insertAdjacentHTML('beforeend', NavSearch());
                                document.getElementById("1").addEventListener("mouseup", function () { window.location.href = "/#bn"; });
                                mainBox.insertAdjacentHTML('beforeend',resultresUser(res[0],cri));
                                sections.about.insertAdjacentHTML('beforeend',resultresOperas(res[1],cri));
                                sections.contact.insertAdjacentHTML('beforeend',resultresCollections(res[2],cri));
                                sections.artists.style.display="none";
                                sections.collections.style.display="none";
                            })
                        }
                    })
                })
            } 
            


        });

        page('/logout', async () => {
            localStorage.clear();
            window.location.href = "/";
        });

        page('/edit', async () => {
            let editUsr = await UserMan.getUserById(localStorage.getItem('usernameID'));
            mainBox.innerHTML = '';
            mainBox.insertAdjacentHTML('beforeend', editUserData(editUsr));
            document.getElementById("Newname").value = editUsr.name;
            document.getElementById("Newsurname").value = editUsr.surname;
            const [day, month, year] = editUsr.date.split('-');
            document.getElementById("Newborn").value = `${year}-${month}-${day}`;
            document.getElementById("Newemail").value = editUsr.email;
            document.getElementById("Newusr").value = editUsr.username;
            document.getElementById("Newaddress").value = editUsr.address;

            (function () {
                var forms = document.querySelectorAll('.needs-validation')
                Array.prototype.slice.call(forms)
                    .forEach(function (form) {
                        form.addEventListener('submit', function (event) {
                            if (!form.checkValidity()) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                            form.classList.add('was-validated')
                        }, false)
                    })
            })();

            let formEdit = document.getElementById("form-edit");
            let betnEdit = document.getElementById("btnChange");
            if (betnEdit != null && formEdit != null) {

                betnEdit.addEventListener('mouseup', function () {
                    formEdit.addEventListener('submit', function (event) {
                        event.preventDefault();
                        let name = document.getElementById("Newname").value;
                        let surname = document.getElementById("Newsurname").value;
                        let date = document.getElementById("Newborn").value;
                        let email = document.getElementById("Newemail").value;
                        let password = document.getElementById("Newpassword").value;
                        let address = document.getElementById("Newaddress").value;
                        let image = document.getElementById("newImage");
                        let insertImage = "";
                        let newimagedb = "";
                        if (!name || !surname || !date || !email || !address) {
                            event.stopPropagation();
                        }
                        else {
                            if (!image.value) {
                                newimagedb = editUsr.image;
                            }
                            else {
                                newimagedb = "/images/users/" + editUsr.username + ".png";
                                var fReader = new FileReader();
                                fReader.readAsDataURL(image.files[0]);
                                fReader.onloadend = function (event) {
                                    //let newI=document.getElementById("displayImage")
                                    insertImage = event.target.result;
                                    FileSystemMan.SaveImage(editUsr.username, image.value, insertImage);
                                }

                            }
                            //FileSystemMan.SaveImage(image,insertImage); 
                            UserMan.update(name, surname, date, email, password, address, newimagedb, localStorage.getItem('usernameID')).then((userNew) => {

                                mainBox.innerHTML = '';
                                if (userNew.status == 2) {
                                    userNew.status = "In attesa di attivazione";
                                }
                                else if (userNew.status == 0) {
                                    userNew.status = "Attivo"
                                }
                                else if (userNew.status == 1) {
                                    userNew.status = "Sospeso";
                                }
                                mainBox.innerHTML = '';
                                mainBox.insertAdjacentHTML('beforeend', userPageData(userNew));
                                mainBox.insertAdjacentHTML('beforeend', message("DATA WILL BE AVAILABLE SOON"));
                                document.getElementById("simpleModal").style.display = "block"
                                document.getElementById("closeModal").addEventListener('mouseup', function () {
                                    document.getElementById("closeModal").style.display = "none";
                                    page('/user#bn');
                                })

                            }).catch((error) => {
                                mainBox.insertAdjacentHTML('afterbegin', alert(error));
                                setTimeout(() => {
                                    let e = document.getElementById("errorAlert");
                                    if (e !== null) {
                                        e.remove();
                                    }
                                }, 3000);
                            });
                        }
                    });
                });
            }
            document.getElementById("exit").addEventListener("mouseup", function () {
                mainBox.innerHTML = '';
                if (editUsr.status == 2) {
                    editUsr.status = "In attesa di attivazione";
                }
                else if (editUsr.status == 0) {
                    editUsr.status = "Attivo"
                }
                else if (editUsr.status == 1) {
                    editUsr.status = "Sospeso";
                }
                mainBox.insertAdjacentHTML('beforeend', userPageData(editUsr));
            });
            let serch=document.getElementById("search");
            let fom=document.getElementById("form-search");
            if(serch!=null && fom!=null)
            {
                serch.addEventListener('mouseup',function(){
                    fom.addEventListener('submit',function(event){
                        event.preventDefault();
                        let cri=document.getElementById("criterio").value
                        if(!cri)
                        {
                            event.stopPropagation();
                        }
                        else
                        {
                            PageMan.search(cri).then((res)=>{
                                navBar.innerHTML = '';
                                mainBox.innerHTML='';
                                sections.about.innerHTML='';
                                sections.contact.innerHTML='';
                                navBar.insertAdjacentHTML('beforeend', NavSearch());
                                document.getElementById("1").addEventListener("mouseup", function () { window.location.href = "/#bn"; });
                                mainBox.insertAdjacentHTML('beforeend',resultresUser(res[0],cri));
                                sections.about.insertAdjacentHTML('beforeend',resultresOperas(res[1],cri));
                                sections.contact.insertAdjacentHTML('beforeend',resultresCollections(res[2],cri));
                                sections.artists.style.display="none";
                                sections.collections.style.display="none";
                            })
                        }
                    })
                })
            } 
        });
        page();
    }
}

export default appEngine;