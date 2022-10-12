const apiUrl4 = "https://nf-api.onrender.com/api/v1/social/posts/";
const userToken4 = "Bearer " + localStorage.getItem("accessToken");

const postTitleInputMobile = document.querySelector("#post-title-mobile");
const postBodyInputMobile = document.querySelector("#post-body-mobile");
const postMediaInputMobile = document.querySelector("#post-media-mobile");
const postErrorMobile = document.querySelector("#title-body-error-mobile");
const postMediaErrorMobile = document.querySelector("#media-error-mobile");

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
                const response = await fetch(apiUrl4, {
                    method: "POST",
                    body: JSON.stringify(sendBody),
                    headers: {
                        "Authorization": userToken4,
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
                    const response = await fetch(apiUrl4, {
                        method: "POST",
                        body: JSON.stringify(sendBody),
                        headers: {
                            "Authorization": userToken4,
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

const mobileMenu = document.querySelector("#mobilemenu");
const PostModalMobile = document.querySelector("#create-post-modal-mobile");
const openPostModalBtnMobile = document.querySelector("#open-create-post-modal-btn-mobile");
openPostModalBtnMobile.addEventListener("click", (e) => {
    e.preventDefault();
    mobileMenu.classList.remove("show");
    PostModalMobile.style.display = "block";
});

const createPostModalMobile = document.querySelector("#create-post-btn-mobile");
createPostModalMobile.addEventListener("click", (e) => {
    e.preventDefault();
    createPostMobile();
});

const cancelBtnMobile = document.querySelector("#cancel-btn-mobile");
cancelBtnMobile.addEventListener("click", (e) => {
    e.preventDefault();
    PostModalMobile.style.display = "none";
});