import { userToken, apiUrlPostId, editPostTitleInput, editPostBodyInput, editPostMediaInput, editPostError, editMediaError, fieldsEmpty, editPostModal } from './variables.mjs';

async function editPost() {
    try {
        let sendBody = {
            title: editPostTitleInput.value,
            body: editPostBodyInput.value,
            media: editPostMediaInput.value
        };

        if (editPostTitleInput.value && editPostBodyInput.value && editPostBodyInput.value === null) {
            sendBody = {
                title: editPostTitleInput.value,
                body: editPostBodyInput.value
            };
        }

        const response = await fetch(apiUrlPostId, {
            method: "PUT",
            body: JSON.stringify(sendBody),
            headers: {
                "Authorization": userToken,
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

        if (editPostTitleInput.value === "" && editPostBodyInput.value === "" || editPostTitleInput.value === "" || editPostBodyInput.value === "") {
            editPostError.style.display = "block";
        } else {
            editPostError.style.display = "none";
        }

        if (editPostTitleInput.value === "" && editPostBodyInput.value === "" && editPostMediaInput.value === "") {
            fieldsEmpty.style.display = "block";
        } else {
            fieldsEmpty.style.display = "none";
        }
    } catch(e) {
        console.log(e);
    }
}

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