class OperaMan {

    static getOpera = async () => {
        let response = await fetch('/getOpera', {
            method: 'POST',
        });

        if (response.ok) {
            const res = await response.json();
            return res;
        }

    }
    static deleteOpera = async (idOpera) => {
        let response = await fetch('/deleteopera', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ idOpera }),
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
    static getAllOpereByUser = async (user) => {
        let response = await fetch('/getopuser', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ user }),
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

    static gerOperabyId = async (title) => {
        let response = await fetch('/getopbyid', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ title }),
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

    static CreateOpera = async (username, title, desc, year, price, imagePath) => {
        let response = await fetch(`/createopera`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, title, desc, year, price, imagePath }),
        });
        if (response.ok) {
            const res = await response.json();
            return res;
        }

    }

    static colNocol = async (opera, coll) => {
        let response = await fetch(`/remaddop`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ opera, coll }),
        });
        if (response.ok) {
            const res = await response.json();
            return res;
        }
    }

    static getOpereByCollection = async (collname) => {
        let response = await fetch(`/getObByColl`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ collname }),
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
export default OperaMan;