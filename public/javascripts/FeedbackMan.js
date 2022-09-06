class FeedbackMan {

    static insertFeedback = async (stars, user, opera) => {
        let response = await fetch(`/inserfeed`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stars, user, opera }),
        });
        if (response.ok) {
            const res = await response.json();
            return res;
        }
    }

}
export default FeedbackMan;