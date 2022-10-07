// Inputs
const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login-password");
const regName = document.querySelector("#reg-name");
const regEmail = document.querySelector("#reg-email");
const regPassword = document.querySelector("#reg-password");

// Error messages
const loginError = document.querySelector("#login-error");
const nameError = document.querySelector("#name-error")
const emailError = document.querySelector("#email-error")
const regPasswordError = document.querySelector("#password-error");
const regError = document.querySelector("#reg-error");

// Rewrite login and register function into one using if else?
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
        if (data.statusCode === 400 || data.message === "Invalid email or password" ) {
            loginError.style.display = "block";
        } else {
            loginError.style.display = "none";
        }
    } catch (e) {
        console.log(e);
    }
}

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
        if ( data.message === 'body/name must match pattern "^[\\w]+$"') {
            nameError.style.display = "block";
            emailError.style.display = "block";
        } else {
            nameError.style.display = "none";
            emailError.style.display = "none";
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
    console.log(regPassword.value);
});

// Error checks
function checkPassword() {
    if (checkLength(regPassword.value, 8)) {
        regPasswordError.style.display = "none";
    } else {
        regPasswordError.style.display = "block";
    }
}
function checkLength(value, len) {
    try{
        if(value.trim().length > len) {
            return true;
        }
        else{
            return false;
        }
    }
    catch(e) {
        console.log(e)
    }
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