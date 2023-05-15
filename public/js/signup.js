console.log("signup.js loaded")

document.getElementById("signup-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("input[name=name]").value.trim();
    const email = document.querySelector("input[name=email]").value.trim();
    const password = document.querySelector("input[name=password]").value.trim();

    if(!name || !email || !password) {
        alert("You must fill out all fields to sign up!")
        return;
    }

    const response = fetch("/api/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, email, password})
}).then((response) => {
    console.log(response)
    if(response.ok) {
        window.location.href("/profile");
    } else{
        alert(response.statusText)
    }
});
});



