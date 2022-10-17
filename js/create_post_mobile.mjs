import { urlPosts, userToken, postTitleInputMobile, postBodyInputMobile, postMediaInputMobile, postErrorMobile, postMediaErrorMobile, mobileMenu, postModalMobile, openPostModalBtnMobile, createPostModalMobile, cancelBtnMobile } from './variables.mjs';

async function createPostMobile() {
    try{
        console.log(postTitleInputMobile.value + " " + postBodyInputMobile.value + " " + postMediaInputMobile.value)
        if (postTitleInputMobile.value && postBodyInputMobile.value && postMediaInputMobile.value === "") {
            try {
                console.log("1");
                const sendBody = {
                    title: postTitleInputMobile.value,
                    body: postBodyInputMobile.value
                };
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
                postError.style.display = "none";
                window.location.reload();
            } catch (e) {
                console.log(e);
            }
        } else {
            if (postTitleInputMobile.value && postBodyInputMobile.value && postMediaInputMobile.value) {
                try {
                    console.log("2");
                    const sendBody = {
                        title: postTitleInputMobile.value,
                        body: postBodyInputMobile.value,
                        media: postMediaInputMobile.value
                    };
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
                        postMediaErrorMobile.style.display = "block";
                        console.log("Error " + data.statusCode);
                    } else {
                        postMediaErrorMobile.style.display = "none";
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

openPostModalBtnMobile.addEventListener("click", (e) => {
    e.preventDefault();
    mobileMenu.classList.remove("show");
    postModalMobile.style.display = "block";
});

createPostModalMobile.addEventListener("click", (e) => {
    e.preventDefault();
    createPostMobile();
});

cancelBtnMobile.addEventListener("click", (e) => {
    e.preventDefault();
    postModalMobile.style.display = "none";
});