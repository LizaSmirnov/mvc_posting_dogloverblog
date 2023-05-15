const { doc } = require("prettier");

const name = document.querySelector('#post-title').value.trim();
const description = document.querySelector('#post-body').value.trim();
const newPost = document.querySelector('#newPost')
const buttonNewPost = document.querySelector('#buttonNewPost')
const deletePost = document.querySelector('#deletePost')
const updatePost = document.querySelector('#updatePost')

  function hideCreateNew(){
    newPost.hidden= true;
  }

  //if they want to create new post
  function buttonNewPost(event) {
    event.preventDefault();
    newPost.hidden = false;
    deletePost.hidden = true;
  }
  //create New Post
  async function newPost(event) {
    const title = document.querySelector('input[name="post-title"]').value;
    const body = document.querySelector('input[name="post-body"]').value;

    if (title && body) {
      const response = await fetch(`/api/posts`, {
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
  
  deletePost.addEventListener('submit', event =>{

  const delButtonHandler = async (event) => {
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
  }
});
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', buttonNewPost);
  
  document
    .querySelector('.post-list')
    .addEventListener('click', newPost);
  
    
  document
  .querySelector('.submit-post')
  .addEventListener('click', deletePost);
  