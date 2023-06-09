console.log('comment.js loaded!');


const createCommentBtn = document.getElementById('createBtn')

createCommentBtn.addEventListener('click', async (event) => {
    createComment(event);
});

async function createComment(event) {
    event.preventDefault();
    console.log('createComment fired!')
    const comment = document.querySelector('textarea[name="comment-body"]').value.trim();
    const postId = document.querySelector('input[name="post-id"]').value;
    console.log(postId);
    console.log(comment);

    if (comment) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                comment_body: comment,
                post_id: postId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    };
} 

