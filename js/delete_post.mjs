import { urlPosts, postId, userToken } from './variables.mjs';

async function deletePost() {
    try{
        const response = await fetch(urlPosts + postId, {
            method: "DELETE",
            headers: {
                "Authorization": userToken,
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
    try {
        const deletePostBtn = document.querySelector("#delete-post-btn");
        if (deletePostBtn === null) {
        } else {
            //console.log(deletePostBtn);
            deletePostBtn.addEventListener("click", (e) => {
                e.preventDefault();
                deletePost();
            });
        }
    } catch (e) {
        console.log(e);
    }
}, 1000);