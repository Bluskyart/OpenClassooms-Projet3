document
    .getElementById("nav-connexion")
    .addEventListener("click", function (event) {
    let navConnection = event.target;
    if (isLoggedIn()) {
        window.localStorage.removeItem("token");
        window.location.replace("index.html");
    } else {
        window.location.replace("login.html");
    }
    });


function isLoggedIn() {
    let loggedIn;
    const token = window.localStorage.getItem("token");
    if (token != null) {
    const arrayToken = token.split(".");
    const tokenPayload = JSON.parse(atob(arrayToken[1]));

    const expiration = new Date(tokenPayload.exp * 1000);

    loggedIn = expiration > Date.now();
    } 
    else {
    loggedIn = false;
    }
    document.getElementById("nav-connexion").innerText = loggedIn
    ? "logout"
    : "login";
    return loggedIn;
}