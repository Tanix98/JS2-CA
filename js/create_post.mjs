import { urlPosts, userToken, postTitle, postBody, postMedia, postBtn, postError } from './variables.mjs';

async function createPost() {
    try{
        let sendBody = {
            title: postTitle.value,
            body: postBody.value,
            media: postMedia.value
        };
        if (postTitle.value && postBody.value && postMedia.value === "") {
            sendBody = {
                title: postTitle.value,
                body: postBody.value
            };
        }
        const response = await fetch(urlPosts, {
            method: "POST",
            body: JSON.stringify(sendBody),
            headers: {
                "Authorization": userToken,
                "Content-Type": "application/json"
            },
        });
        const data = await response.json();
        console.log("data: " + data);
        console.log("sendBody: " + sendBody);
        if (data.statusCode === 400) {
            postError.style.display = "block";
            console.log("Error " + data.statusCode);
        } else {
            postError.style.display = "none";
            window.location.reload();
        }
    }
    catch(e) {
        console.log(e);
    }
}

postBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createPost();
    console.log("postTitle.value: " + postTitle.value)
    console.log("postBody.value: " + postBody.value)
    console.log("postMedia.value: " + postMedia.value)
});