class PageMan {
    static getImage = async (typePage) => {
        let newQuestionJson = { type: typePage };
        let response = await fetch(`/image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newQuestionJson),
        })
        if(response.ok)
        {
            const res = await response.json();
            return res.Image;
        }
    }

    static search= async(cri)=>{
        let response = await fetch(`/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({cri}),
        })
        if(response.ok)
        {
            const res = await response.json();
            return res
        }
    }
}

export default PageMan;