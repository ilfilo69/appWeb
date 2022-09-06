
class TicketMan{

    static getTicketUser= async(username)=>{
        console.log("USER TICK",username);
       let response = await fetch('/getTicketUser',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({username}),
        });
        if(response.ok)
        {
            const res = await response.json();
            return res;

        }
    }

    static getAllTicket= async ()=>{
       let response = await fetch('/getallTicket',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
        });
        if(response.ok)
        {
            const res = await response.json();
            return res;

        }

    }

    static createTicket=async(codeTick,numberOfIng,price,tickeSeclection)=>{
        let newRegJson = { codeTick: codeTick, numberOfIng:numberOfIng, price:price, tickeSeclection:tickeSeclection};
        let response = await fetch('/createticket', {
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

    static deleteTicket= async(id)=>
    {
        let response = await fetch('/deleteticket', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({id}),
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

    static byuTicket= async(type,user)=>{
        let response = await fetch('/buyticket', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({type,user}),
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

    static useticket= async(ticket,user)=>{
        let response = await fetch('/useticket', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ticket,user}),
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
export default TicketMan;