import { loggedOutDisplay, loggedInDisplay } from './variables.mjs';

if (localStorage.getItem("accessToken")) {
    loggedInDisplay.style.display = "block";
    loggedOutDisplay.style.display = "none";
} else {
    loggedInDisplay.style.display = "none";
    loggedOutDisplay.style.display = "block";
}