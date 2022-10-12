const queryString2 = document.location.search;
const params2 = new URLSearchParams(queryString2);
const postId2 = params2.get("id");

const apiUrl1 = "https://nf-api.onrender.com/api/v1/social/posts/" + postId2;
const userToken3 = "Bearer " + localStorage.getItem("accessToken");

const postTitleInput1 = document.querySelector("#edit-post-title");
const postBodyInput1 = document.querySelector("#edit-post-body");
const postMediaInput1 = document.querySelector("#edit-post-media");
const editPostError = document.querySelector("#title-body-error");
const editMediaError = document.querySelector("#media-error");
const fieldsEmpty = document.querySelector("#fields-empty");

async function editPost() {
    try {
        if (postTitleInput1.value && postBodyInput1.value && postMediaInput1.value) {
            const sendBody = {
                title: postTitleInput1.value,
                body: postBodyInput1.value,
                media: postMediaInput1.value
            };
            const response = await fetch(apiUrl1, {
                method: "PUT",
                body: JSON.stringify(sendBody),
                headers: {
                    "Authorization": userToken3,
                    "Content-Type": "application/json"
                },
            });

            const data = await response.json();
            console.log("1" + JSON.stringify(data));

            if (data.statusCode === 400) {
                console.log("Media url error" + JSON.stringify(data));
                editMediaError.style.display = "block";
            } else {
                editMediaError.style.display = "none";
                document.location.reload();
            }
            
            /*if (postBodyInput1.value === "") {
                postBodyInput1.value = `${data.body}`
            }

            if (postBodyInput1.value === "") {
                postBodyInput1.value = `${data.body}`
            }*/
        }

        if (postTitleInput1.value && postBodyInput1.value) {
            const sendBody = {
                title: postTitleInput1.value,
                body: postBodyInput1.value
            };
            const response = await fetch(apiUrl1, {
                method: "PUT",
                body: JSON.stringify(sendBody),
                headers: {
                    "Authorization": userToken3,
                    "Content-Type": "application/json"
                },
            });
            const data = await response.json();
            console.log("2" + JSON.stringify(data));
            document. location. reload()
        }

        if (postTitleInput1.value === "" && postBodyInput1.value === "" || postTitleInput1.value === "" || postBodyInput1.value === "") {
            editPostError.style.display = "block";
        } else {
            editPostError.style.display = "none";
        }

        if (postTitleInput1.value === "" && postBodyInput1.value === "" && postMediaInput1.value === "") {
            fieldsEmpty.style.display = "block";
        } else {
            fieldsEmpty.style.display = "none";
        }
    }
    catch(e) {
        console.log(e);
    }
}

const editPostModal = document.querySelector("#edit-post-modal");

setTimeout(function(){
    const openEditPostModalBtn = document.querySelector("#open-edit-post-modal-btn");
    if (openEditPostModalBtn === null) {
    } else {
        openEditPostModalBtn.addEventListener("click", (e) => {
            e.preventDefault();
            editPostModal.style.display = "block";
        });
    }
}, 1000);

setTimeout(function(){
    const cancelBtn = document.querySelector("#cancel-btn");
    cancelBtn.addEventListener("click", (e) => {
        e.preventDefault();
        editPostModal.style.display = "none";
    });
}, 1000);

setTimeout(function(){
    const editPostBtn = document.querySelector("#edit-post-btn");
    editPostBtn.addEventListener("click", (e) => {
        e.preventDefault();
        editPost();
    });
}, 1000);