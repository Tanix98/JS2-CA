// Inputs
const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login-password");
const regName = document.querySelector("#reg-name");
const regEmail = document.querySelector("#reg-email");
const regPassword = document.querySelector("#reg-password");

// Error messages
const loginError = document.querySelector("#login-error");
const nameError = document.querySelector("#name-error")
const emailError1 = document.querySelector("#email-error1")
const emailError2 = document.querySelector("#email-error2")
const regPasswordError = document.querySelector("#password-error");
const regError = document.querySelector("#reg-error");

const regSuccess = document.querySelector("#reg-success");

// Rewrite login and register function into one using if else btn id?

/** Sends a login request to the API. 
 * sendBody object contains the values typed into the email and password input fields, which are sent as a post request to the API's login endpoint, and will return the user's accesstoken and store it in localStorage if valid. 
*/
async function loginUser() {
    try {
        const sendBody = {
            email: loginEmail.value,
            password: loginPassword.value
        };
        const response = await fetch("https://nf-api.onrender.com/api/v1/social/auth/login", {
            method: "POST",
            body: JSON.stringify(sendBody),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        console.log(loginEmail.value, loginPassword.value, sendBody);
        console.log(data);
        localStorage.setItem("accessToken", data.accessToken)
        // Error messages
        if (data.statusCode === 400 || data.message === "Invalid email or password" ) {
            loginError.style.display = "block";
        } else {
            loginError.style.display = "none";
            location.reload();
        }
    } catch (e) {
        console.log(e);
    }
}

/** Sends a register request to the API. 
 * sendBody object contains the values typed into the name, email and password input fields, which are sent as a post request to the API's register endpoint, and will return the email and password of the registered user if valid. 
*/
async function registerUser() {
    try {
        const sendBody = {
            name: regName.value,
            email: regEmail.value,
            password: regPassword.value
        };
        const response = await fetch("https://nf-api.onrender.com/api/v1/social/auth/register", {
            method: "POST",
            body: JSON.stringify(sendBody),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        console.log(regName.value, regEmail.value, regPassword.value, sendBody);
        console.log(data);
        // Account registered message
        if (data.statusCode === 500 || data.statusCode === 400) {
            regSuccess.style.display = "none";
        } else {
            regSuccess.style.display = "block";
            location.reload();
        }
        // Error messages
        if ( data.message === 'body/name must match pattern "^[\\w]+$"') {
            nameError.style.display = "block";
            emailError1.style.display = "block";
        } else {
            nameError.style.display = "none";
            emailError1.style.display = "none";
        }
        if (data.statusCode === 500) {
            emailError2.style.display = "block";
        } else {
            emailError2.style.display = "none";
        }
        if (data.message === "Profile already exists") {
            regError.style.display = "block";
        } else {
            regError.style.display = "none";
        }
    } catch (e) {
        console.log(e);
    }
}

// Login & register buttons
const registerBtn = document.querySelector("#register-btn");
const loginBtn = document.querySelector("#login-btn");

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    loginUser();
});

registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    registerUser();
    checkPassword();
});

/**
 * Removes empty space from the password input with trim, then checks if the length is equal to or greater than 8, and displays error message if less than 8
*/
function checkPassword() {
    try {
        if (regPassword.value.trim().length >= 8) {
            regPasswordError.style.display = "none";
        } else {
            regPasswordError.style.display = "block";
        }
    } catch(e) {
        console.log(e)
    }
}

// Redirect user to home page if there's an accesstoken in localStorage
if (localStorage.getItem("accessToken")) {
    window.location.href = "/index.html";
}

/*registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    registerUser();
    if (passwordInput.value.length >= 8) {
        document.querySelector("#password-error").className = document.querySelector("#password-error").className.replace( /(?:^|\s)d-none(?!\S)/g , '' )
    } else {
        document.querySelector("#password-error").className += " d-none";
    }
});*/


/* OLD SCRIPT BEFORE THE LOGIN AND REGISTER FORMS WERE SEPARATED

const url = "https://nf-api.onrender.com/api/v1";
let endpoint = null;

const nameInput = document.querySelector("#input-name");
const emailInput = document.querySelector(".input-email");
const passwordInput = document.querySelector(".input-password");

async function postEmailPassword() {
    const sendBody = {
        email: emailInput.value,
        password: passwordInput.value
    };
    const response = await fetch(url+endpoint, {
        method: "POST",
        body: JSON.stringify(sendBody),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    console.log(emailInput.value, passwordInput.value, sendBody);
    console.log(data);
    localStorage.setItem["key", "value"];
}

const registerBtn = document.querySelector("#register-btn");
const loginBtn = document.querySelector("#login-btn");

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    endpoint = "/social/auth/login"
    postEmailPassword();
});

registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    endpoint = "/social/auth/register"
    postEmailPassword();
});
*/