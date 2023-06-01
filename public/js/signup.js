console.log("signup.js loaded")
//
document.getElementById("signup-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector("input[name=name]").value.trim();
    const email = document.querySelector("input[name=email]").value.trim();
    const password = document.querySelector("input[name=password]").value.trim();

    if(name && email && password) {
    const response = await fetch("/api/users/signup", {
        method: "post",
        body: JSON.stringify({name, email, password}),
        headers: {"Content-Type": "application/json"},
})
    if(response.ok) {
        document.location.replace("/profile")
    } else{
        alert(response.statusText)
    }
};
});



