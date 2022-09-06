class CollectionMan {

    static getCollections = async () => {
        let response = await fetch('/getCollections', {
            method: 'POST',
        });
        const res = await response.json();
        console.log("AWAIT JSON", res);
        if (response.ok) {

            return res;

        }
    }

    static deleteCollection = async (id) => {
        let response = await fetch('/deletecollection', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ id }),
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

    static getCollectionsbyUser = async (id) => {
        let response = await fetch('/getCollectionArt', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        if (response.ok) {
            const res = await response.json();
            return res;
        }
    }

    static createCollection = async (id, title, desc) => {
        let response = await fetch('/createcollection', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ id, title, desc }),
        });
        if (response.ok) {
            const res = await response.json();
            return res;
        }
    }

    static getCollectionByname= async(collname)=>
    {
        let response = await fetch('/getCollectionbyname', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ collname }),
        });
        if (response.ok) {
            const res = await response.json();
            return res;
        }
    }

    static susattcoll = async (collname,status)=>{
        let response = await fetch('/susattcoll', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ collname,status }),
        });
        if (response.ok) {
            const res = await response.json();
            return res;
        }
    }
}
export default CollectionMan;