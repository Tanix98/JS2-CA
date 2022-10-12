const apiUrl = "https://nf-api.onrender.com/api/v1/social/posts";
const userToken1 = "Bearer " + localStorage.getItem("accessToken");

const postTitle = document.querySelector("#post-title");
const postBody = document.querySelector("#post-body");
const postMedia = document.querySelector("#post-media");
const postBtn = document.querySelector("#post-btn");
const postError = document.querySelector("#post-error");


async function createPost() {
    try{
        if (postTitle.value && postBody.value && postMedia.value === "") {
            try {
                console.log("1");
                const sendBody = {
                    title: postTitle.value,
                    body: postBody.value
                };
                const response = await fetch(apiUrl, {
                    method: "POST",
                    body: JSON.stringify(sendBody),
                    headers: {
                        "Authorization": userToken1,
                        "Content-Type": "application/json"
                    },
                });
                const data = await response.json();
                console.log("data: " + data);
                console.log("sendBody: " + sendBody);
                postError.style.display = "none";
                window.location.reload();
            } catch (e) {
                console.log(e);
            }
        } else {
            if (postTitle.value && postBody.value && postMedia.value) {
                try {
                    console.log("2");
                    const sendBody = {
                        title: postTitle.value,
                        body: postBody.value,
                        media: postMedia.value
                    };
                    const response = await fetch(apiUrl, {
                        method: "POST",
                        body: JSON.stringify(sendBody),
                        headers: {
                            "Authorization": userToken1,
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
                } catch (e) {
                    console.log(e);
                }
            }
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