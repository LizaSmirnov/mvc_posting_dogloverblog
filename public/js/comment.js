document.querySelector('#newComment').addEventListener('submit', event => {
    event.preventDefault();
    const comment = document.querySelector('#comment').value;
    const postId = document.querySelector('#postId').value;
    fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ comment, postId }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => {
            if (response.ok) {
                document.querySelector('#comment').value = '';
                return response.json();
            }
            throw new Error('Request failed.');
        })
});
