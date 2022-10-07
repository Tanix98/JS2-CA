const srcBar = document.querySelector("#search-input");
const srcBtn = document.querySelector("#search-button");

srcBtn.addEventListener("click", (e) => {
    e.preventDefault();
    location.href = `https://www.google.com/search?q=${srcBar.value}`;
    console.log(srcBar.value);
});

srcBar.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      srcBtn.click();
    }
});