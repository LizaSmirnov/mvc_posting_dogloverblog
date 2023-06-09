
console.log('comment.js loaded!');


const createCommentBtn = document.getElementById('createBtn')

createCommentBtn.addEventListener('click', async (event) => {
    createComment(event);
});

async function createComment(event) {
    event.preventDefault();
    console.log('createComment fired!')
    const body = document.querySelector('textarea[name="comment-body"]').value.trim();
    const name = document.querySelector('input[name="user-name"]').value;
    console.log(body, name)
    if (name) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ body, name }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.reload();
        } else {
            console.log(response.statusText);
        }
    }
}


