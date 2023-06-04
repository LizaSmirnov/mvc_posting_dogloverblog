console.log("singlePost.js loaded");
let canEdit = true;
const deletePost = document.getElementById('deleteBtn');
const editPost = document.getElementById('editBtn');

editPost.addEventListener('click', async event =>{
  console.log("edit button clicked")
        event.preventDefault();
        const title = document.querySelector(('input[name="post-title"]')).value;
        const body = document.querySelector('textarea[name="content"]').textContent;
        const id = event.target.getAttribute('data-id');
        console.log(title, body, id)
        if (title && body) {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ title, body }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                document.location.replace('/profile');
            } else {
                alert('Failed to update post');
            }
        }
    }
);



  deletePost.addEventListener('click', async event =>{
    console.log("delete button clicked")
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete post');
      }
    }
  });

