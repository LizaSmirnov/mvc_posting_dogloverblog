const loginPageBtn = document.querySelector('.login-page-btn');
const signupPageBtn = document.querySelector('.signup-page-btn');
const logoutBtn = document.getElementById('logout');
const profileBtn = document.querySelector('.profile-btn');
// const homeBtn = document.querySelector('.home-btn');


// homeBtn.addEventListener('click', function() {
//     window.location.replace('/home');
//     }
// );

// profileBtn.addEventListener('click', function() {
//     window.location.replace('/profile');
//     }   
// );

// loginPageBtn.addEventListener('click', function() {
//     loginForm.classList.remove('hidden');
//     signupForm.classList.add('hidden');
//     }  
// ); 

// signupPageBtn.addEventListener('click', function() {
//     signupForm.classList.remove('hidden');
//     loginForm.classList.add('hidden');
//     }
// );

logoutBtn.addEventListener('click', async function() {
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
);


// loginPageBtn.addEventListener('click', function() {
//     loginForm.classList.remove('hidden');
//     signupForm.classList.add('hidden');
//     }
// );

