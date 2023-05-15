console.log("login.js loaded")

    function loginFormHandler (event){
    event.preventDefault();
    var email = document.querySelector("input[name=email]").value.trim();
    var password = document.querySelector("input[name=password]").value.trim();

    if( !email || !password ) {
        alert("Wrong email or password!")
        return;
    }

    const response = fetch("/api/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
})
    console.log(response)
    if(response.ok) {
    document.location.replace("/profile")
    } else{
        alert(response.statusText)
    }
}

document.getElementById("signin-form").addEventListener("submit", loginFormHandler);
