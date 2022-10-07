const loggedOutDisplay = document.querySelector(".logged_out_nav");
const loggedInDisplay = document.querySelector(".logged_in_nav");

if (localStorage.getItem("accessToken")) {
    loggedInDisplay.style.display = "block";
    loggedOutDisplay.style.display = "none";
} else {
    loggedInDisplay.style.display = "none";
    loggedOutDisplay.style.display = "block";
}