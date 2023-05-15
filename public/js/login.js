console.log("login.js loaded")

    document.querySelector('button').addEventListener('click',async (event)=>{
    event.preventDefault();
    var name = document.querySelector("input[name=name]").value.trim();
    var email = document.querySelector("input[name=email]").value.trim();
    var password = document.querySelector("input[name=password]").value.trim();

    if( !name || !email || !password ) {
        alert("Wrong email or password!")
        return;
    }
    try {
    const response = await fetch("/api/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, email, password})
})
    console.log(response)
    if(response.ok) {
    document.location.replace("/profile")
    } else{
        alert(response.statusText)
    }
} catch (err) {
    console.log(err);   
};
});


