console.log("logout.js loaded");
const logoutBtn = document.querySelector(".no-button");

logoutBtn.addEventListener("click", async (event) => {
  logout(event);
});

async function logout(event) {
  event.preventDefault();
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/home");
  } else {
    alert(response.statusText);
  }
}
