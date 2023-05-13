console.log("signup.js loaded")

const signupFormHandler = async (event) => {
    event.preventDefault();
    var name = document.querySelector("input[name=name]").value.trim();
    var email = document.querySelector("input[name=email]").value.trim();
    var password = document.querySelector("input[name=password]").value.trim();

    if(!name || !email || !password) {
        alert("You must fill out all fields to sign up!")
        return;
    }

    const response = await fetch("/api/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, email, password})
})
    console.log(response)
    if(response.ok) {
    document.location.replace("/")
    } else{
        alert(response.statusText)
    }
}

document.getElementById("signup-form").addEventListener("submit", signupFormHandler);


const name = "Alex"
const email = "Alex@email.com"
var person = {name, email}
console.log(person)