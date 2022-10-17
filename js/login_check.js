(function () {
    if (localStorage.getItem("accessToken") === "") {
        window.location.href = "/pages/log_in.html";
    }
})();

const logOutBtn = document.querySelector("#log_out_btn");

function logOut() {
    localStorage.removeItem("accessToken")
};

logOutBtn.addEventListener("click", (e) => {
    logOut();
    location.reload();
});