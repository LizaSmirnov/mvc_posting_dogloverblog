console.log("login.js loaded")
//goes to login page when button is clicked
document.querySelector('button').addEventListener('click', async (event)=>{
    event.preventDefault();
    const userObj = {
    name: document.querySelector("input[name=name]").value.trim(),
    email: document.querySelector("input[name=email]").value.trim(),
    password: document.querySelector("input[name=password]").value.trim(),
    }
    console.log(userObj)
    try {
    const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {"Content-Type": "application/json"}
        
})
    if (response.ok) {
        document.location.replace("/profile");
    }
}
catch(err) {
    console.log(err);
}   
});
