console.log('profile.js loaded!');
const newPostForm = document.querySelector('#newPostForm')



  //create New Post
  newPostForm.addEventListener('submit', createPost) 
  async function createPost (event) {
    event.preventDefault()
    console.log("CREATING POST!")
    const title = document.querySelector('input[name="post-title"]').value;
    const body = document.querySelector('textarea[name="post-body"]').value;

    if (title && body) {
      const response = await fetch(`/api/posts/`, {
        method: 'POST',
        body: JSON.stringify({ title, body }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create a post');
      }
    }
  };
  


