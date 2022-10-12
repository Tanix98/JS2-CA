const queryString1 = document.location.search;
const params1 = new URLSearchParams(queryString1);
const postId1 = params1.get("id");

const apiUrl = "https://nf-api.onrender.com/api/v1/social/posts/";
const userToken2 = "Bearer " + localStorage.getItem("accessToken");

async function deletePost() {
    try{
        const response = await fetch(apiUrl + postId1, {
            method: "DELETE",
            headers: {
                "Authorization": userToken2,
            },
        });
        const data = await response.json();
        console.log(data);
        window.location.href = "/index.html";
    }
    catch(e) {
        console.log(e);
    }
}

setTimeout(function(){
    const deletePostBtn = document.querySelector("#delete-post-btn");
    if (deletePostBtn === null) {
    } else {
        //console.log(deletePostBtn);
        deletePostBtn.addEventListener("click", (e) => {
            e.preventDefault();
            deletePost();
        });
    }
}, 1000);