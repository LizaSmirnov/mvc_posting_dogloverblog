console.log('comment.js loaded!');

document.querySelector('#createBtn').addEventListener('submit', async (event) => {
    event.preventDefault();
    const comment = document.querySelector(textarea[name ='comment-body']).value.trim();

    const post_id = document.querySelector('#new -comment-form').getAttribute('data-id');

    console.log(comment, post_id);
    if (comment) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment, post_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create comment');
        }
    }
});