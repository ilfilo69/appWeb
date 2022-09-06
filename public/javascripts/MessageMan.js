class MessageMan {

    static getMessages = async (username) => {
        let response = await fetch(`/getMessageByUsername`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        })
        if (response.ok) {
            const res = await response.json();
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
    static insertNews = async (type, subj, mess) => {
        let response = await fetch(`/sendfilter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type, subj, mess }),
        });
        if (response.ok) {
            const res = await response.json();
            return res;
        }
    }
    static readMess = async (mes) => {
        let response = await fetch(`/readmess`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({mes}),
        });
        if (response.ok) {
            const res = await response.json();
            return res;
        }
    }

}
export default MessageMan;