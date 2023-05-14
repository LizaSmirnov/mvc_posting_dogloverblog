console.log("login.js loaded")

const signupFormHandler = async (event) => {
    event.preventDefault();
    var email = document.querySelector("input[name=email]").value.trim();
    var password = document.querySelector("input[name=password]").value.trim();

    if( !email || !password ) {
        alert("Wrong email or password!")
        return;
    }

    const response = await fetch("/api/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
})
    console.log(response)
    if(response.ok) {
    document.location.replace("/")
    } else{
        alert(response.statusText)
    }
}

document.getElementById("login-form").addEventListener("submit", loginFormHandler);


const name = "Alex"
const email = "Alex@email.com"

console.log(person)