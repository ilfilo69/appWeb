class NewsMan {

    static getAllNews = async () => {
        let response = await fetch(`/getAllNews`, {
            method: 'POST',

        })
        if (response.ok) {
            const res = await response.json();
            return res;
        }
    }

}

export default NewsMan;