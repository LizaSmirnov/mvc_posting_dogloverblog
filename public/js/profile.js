
const name = document.querySelector('#post-title').value.trim();
const description = document.querySelector('#post-body').value.trim();
const newPostForm = document.querySelector('#newPostForm')
const deletePost = document.querySelector('#deletePost')
const updatePost = document.querySelector('#updatePost')
const $loginPageBtn = document.querySelector('.login-page-btn');
const $signupPageBtn = document.querySelector('.signup-page-btn');
const $loginForm = document.querySelector('.login-form');  
const $signupForm = document.querySelector('.signup-form');

const $profileBtn = document.querySelector('.profile-btn');
const $homeBtn = document.querySelector('.home-btn');




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
  
//   deletePost.addEventListener('submit', event =>{

//   const delButtonHandler = async (event) => {
//     if (event.target.hasAttribute('data-id')) {
//       const id = event.target.getAttribute('data-id');
  
//       const response = await fetch(`/api/posts/${id}`, {
//         method: 'DELETE',
//       });
  
//       if (response.ok) {
//         document.location.replace('/profile');
//       } else {
//         alert('Failed to delete post');
//       }
//     }
//   }
// });


// $homeBtn.addEventListener('click', function() {
//   window.location.replace('/');
//   }
// );

// $profileBtn.addEventListener('click', function() {
//   window.location.replace('/profile');
//   }   
// );

// $loginPageBtn.addEventListener('click', function() {
//   $loginForm.classList.remove('hidden');
//   $signupForm.classList.add('hidden');
//   }  
// ); 

// $signupPageBtn.addEventListener('click', function() {
//   $signupForm.classList.remove('hidden');
//   $loginForm.classList.add('hidden');
//   }
// );

// $logoutBtn.addEventListener('click', async function() {
//   const response = await fetch('/api/users/logout', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//     });
  
//     if (response.ok) {
//       document.location.replace('/');
//     } else {
//       alert(response.statusText);
//     }
//   }
// );



  