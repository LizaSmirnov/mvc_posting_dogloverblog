console.log('comment.js loaded!');

const postId = document.querySelector('input[name="post-id"]').value;

const commentFormHandler = async (event) => {
    event.preventDefault();
    console.log("comment button clicked")
    const comment = document.querySelector('textarea[name="comment-body"]').value.trim();
    console.log(comment);

    if (comment) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                comment: comment,
                postId: postId,
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

