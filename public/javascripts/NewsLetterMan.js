class NewsLetterMan {

    static subscribe = async (email) => {
        let response = await fetch(`/subscribeNewsLetter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
        })
        if(response.ok)
        {
            const res = await response.json();
            console.log(res);
            return res;
        }
        else {
            try{
           const errDetail =await response.json();
           throw errDetail.errors;
            }
            catch(err)
            {
                if(Array.isArray(err))
                {
                    let er='';
                    err.forEach((e,i)=>er+=`${e.msg}`);
                    throw `Error: ${er}`
                }
                else
                {
                    throw 'Error cannot parse server response';
                }
            }

        }
    }
}

export default NewsLetterMan;