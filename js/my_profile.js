const myName = localStorage.getItem("userName");

window.location.href = `/pages/profile.html?user=${myName}`;