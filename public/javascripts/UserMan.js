
class UserMan {

    static isLoggedIn = async () => {
        let response = await fetch(`/test/session`, {
            method: 'PUT',
        });

        if (response.ok) {
            const res = await response.json();
            if (res.msg == "Ok") {
                return 1;
            }
            else {
                return 0;
            }
        }
    }

    static register = async (name, surname, date, email, username, password, address, role) => {
        let newRegJson = { name: name, surname: surname, date: date, email: email, username: username, password: password, address: address, role: role };
        let response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newRegJson),
        });
        if (response.ok) {
            const res = await response.json();
            return res;
        }
        else {
            try {
                const errDetail = await response.json();
                throw errDetail.errors;
            }
            catch (err) {
                if (Array.isArray(err)) {
                    let er = '';
                    err.forEach((e, i) => er += `${e.msg}`);
                    throw `Error: ${er}`
                }
                else {
                    throw 'Error cannot parse server response';
                }
            }

        }
    }

    static login = async (username, password) => {
        console.log(username, password);
        let response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            const res = await response.json();
            return res;
        }
        else {
            try {
                const errDetail = await response.json();
                throw errDetail.errors;
            }
            catch (err) {
                if (Array.isArray(err)) {
                    let er = '';
                    err.forEach((e, i) => er += `${e.msg}`);
                    throw `Error: ${er}`
                }
                else {
                    throw 'Error cannot parse server response';
                }
            }

        }
    }

    static getUserById = async (username) => {
        let response = await fetch('/getUser', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ username }),
        });
        if (response.ok) {
            const res = await response.json();
            return res;
        }
        else {
            try {
                const errDetail = await response.json();
                throw errDetail.errors;
            }
            catch (err) {
                if (Array.isArray(err)) {
                    let er = '';
                    err.forEach((e, i) => er += `${e.msg}`);
                    throw `Error: ${er}`
                }
                else {
                    throw 'Error cannot parse server response';
                }
            }

        }
    }

    static getArtists = async () => {
        let response = await fetch('/getArtists', {
            method: 'POST',
        });

        if (response.ok) {
            const res = await response.json();
            return res;

        }
    }

    static update = async (name, surname, date, email, password, address, image, currentUserName) => {
        let nnewDataUser = { name: name, surname: surname, date: date, email: email, password: password, address: address, image: image, currentUserName: currentUserName };
        let response = await fetch('/update', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(nnewDataUser),
        });
        if (response.ok) {
            const res = this.getUserById(await response.json());
            console.log(res);
            return res;
        }
        else {
            try {
                const errDetail = await response.json();
                throw errDetail.errors;
            }
            catch (err) {
                if (Array.isArray(err)) {
                    let er = '';
                    err.forEach((e, i) => er += `${e.msg}`);
                    throw `Error: ${er}`
                }
                else {
                    throw 'Error cannot parse server response';
                }
            }

        }
    }

    static getUserNoAttivate = async () => {
        let response = await fetch('/getUserNoAttivate', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
        });
        if (response.ok) {
            const res = await response.json();
            return res;
        }
    }

    static suspandUser = async (username) => {
        console.log(username);
        let response = await fetch('/suspanduser', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ "username":username }),
        });
        if (response.ok) {
            const res = await response.json();
            return res;
        }
        else {
            try {
                const errDetail = await response.json();
                throw errDetail.errors;
            }
            catch (err) {
                if (Array.isArray(err)) {
                    let er = '';
                    err.forEach((e, i) => er += `${e.msg}`);
                    throw `Error: ${er}`
                }
                else {
                    throw 'Error cannot parse server response';
                }
            }

        }
    }

    static activateUser = async (username) => {
        console.log(username);
        let response = await fetch('/activateuser', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ "username":username }),
        });
        if (response.ok) {
            const res = await response.json();
            return res;
        }
        else {
            try {
                const errDetail = await response.json();
                throw errDetail.errors;
            }
            catch (err) {
                if (Array.isArray(err)) {
                    let er = '';
                    err.forEach((e, i) => er += `${e.msg}`);
                    throw `Error: ${er}`
                }
                else {
                    throw 'Error cannot parse server response';
                }
            }

        }
    }
}

export default UserMan;