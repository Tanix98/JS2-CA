const srcBar = document.querySelector("#search-input");
const srcBtn = document.querySelector("#search-button");

srcBtn.addEventListener("click", (e) => {
    e.preventDefault();
    location.href = `../pages/search.html?q=${srcBar.value}`;
    console.log("results: " + srcBar.value.toLowerCase());
    search();
});

srcBar.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      srcBtn.click();
    }
});