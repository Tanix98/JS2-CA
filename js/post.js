const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const postId = params.get("id");

const postContainer = document.querySelector("#post-container");
const postUrl = "https://nf-api.onrender.com/api/v1/social/posts/" + postId + "?_author=true&_comments=true&_reactions=true";
const userToken = "Bearer " + localStorage.getItem("accessToken");
const userName = localStorage.getItem("userName");

// Fetch post
async function fetchPost() {
    try {
        const response = await fetch(postUrl, {
            method: "GET",
            headers: {
                "Authorization": userToken
            },
        })
        const data = await response.json();
        console.log("Post reactions: " + JSON.stringify(data.reactions));
        if (`${data.author.name}` === userName) {
            try {
                if (`${data.author.avatar}` === "") {
                    try {
                        if (`${data.media}` === "") {
                            postContainer.innerHTML = 
                            `<div class="m-auto">
                                <div class="card mb-3">
                                    <div class="card-body">
                                        <div class="media mb-3 d-block d-sm-inline-flex w-100">
                                            <a href="/pages/profile.html?user=${data.author.name}" class="d-inline-flex">
                                            <img src="/wireframes_design/icons/selfmade-icons/default_profile_img.svg" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-0 ps-md-2 me-2">
                                                <a href="/pages/profile.html?user=${data.author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data.author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${data.created.substring(11,16)}">Posted ${data.created.substring(0,10)}</div>
                                            </div>
                                            <div class="row me-0 gap-2 d-sm-flex align-items-center ms-auto mt-2 mt-md-0">
                                                <button class="btn btn-warning" style="width:107px" id="open-edit-post-modal-btn">Edit post</button>
                                                <button class="btn btn-danger mt-2 mt-md-0 mt-auto" style="width:107px" id="delete-post-btn">Delete post</button>
                                            </div>
                                        </div>
                                        <hr/ class="mt-1 mb-1">
                                        <div>
                                            <p class="fs-5 text m-0">${data.title}</p>
                                            <p>${data.body}</p>
                                        </div>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between flex-column flex-sm-row">
                                        <a href="#" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${data.reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="#" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${data.comments.length}</strong> Comments</small> </a>
                                    </div>
                                </div>
                            </div>`;
                        } else {
                            postContainer.innerHTML = 
                            `<div class="m-auto">
                                <div class="card mb-3">
                                    <div class="card-body">
                                        <div class="media mb-3 d-block d-sm-inline-flex w-100">
                                            <a href="/pages/profile.html?user=${data.author.name}" class="d-inline-flex">
                                            <img src="/wireframes_design/icons/selfmade-icons/default_profile_img.svg" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-0 ps-md-2 me-2">
                                                <a href="/pages/profile.html?user=${data.author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data.author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${data.created.substring(11,16)}">Posted ${data.created.substring(0,10)}</div>
                                            </div>
                                            <div class="row me-0 gap-2 d-sm-flex align-items-center ms-auto mt-2 mt-md-0">
                                                <button class="btn btn-warning" style="width:107px" id="open-edit-post-modal-btn">Edit post</button>
                                                <button class="btn btn-danger mt-2 mt-md-0 mt-auto" style="width:107px" id="delete-post-btn">Delete post</button>
                                            </div>
                                        </div>
                                        <hr/ class="mt-1 mb-1">
                                        <div>
                                            <p class="fs-5 text m-0">${data.title}</p>
                                            <p>${data.body}</p>
                                            <img src="${data.media}" class="mw-100 mt-2 shadow rounded d-block m-auto" style="max-height:600px;">
                                        </div>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between flex-column flex-sm-row">
                                        <a href="#" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${data.reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="#" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${data.comments.length}</strong> Comments</small> </a>
                                    </div>
                                </div>
                            </div>`;
                        }
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    try {
                        if (`${data.media}` === "") {
                            postContainer.innerHTML = 
                            `<div class="m-auto">
                            <div class="card mb-3">
                                <div class="card-body">
                                    <div class="media mb-3 d-block d-sm-inline-flex w-100">
                                        <a href="/pages/profile.html?user=${data.author.name}" class="d-inline-flex">
                                        <img src="${data.author.avatar}" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                        </a>
                                        <div class="d-flex flex-column ps-0 ps-md-2 me-2">
                                            <a href="/pages/profile.html?user=${data.author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data.author.name}</div></a>
                                            <div class="text-muted small" role="button" title="${data.created.substring(11,16)}">Posted ${data.created.substring(0,10)}</div>
                                        </div>
                                        <div class="row me-0 gap-2 d-sm-flex align-items-center ms-auto mt-2 mt-md-0">
                                            <button class="btn btn-warning" style="width:107px" id="open-edit-post-modal-btn">Edit post</button>
                                            <button class="btn btn-danger mt-2 mt-md-0 mt-auto" style="width:107px" id="delete-post-btn">Delete post</button>
                                        </div>
                                    </div>
                                    <hr/ class="mt-1 mb-1">
                                    <div>
                                        <p class="fs-5 text m-0">${data.title}</p>
                                        <p>${data.body}</p>
                                    </div>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between flex-column flex-sm-row">
                                        <a href="#" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${data.reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="#" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${data.comments.length}</strong> Comments</small> </a>
                                    </div>
                                </div>
                            </div>`;
                        } else {
                            postContainer.innerHTML = 
                            `<div class="m-auto">
                                <div class="card mb-3">
                                    <div class="card-body">
                                        <div class="media mb-3 d-block d-md-inline-flex w-100">
                                            <a href="/pages/profile.html?user=${data.author.name}" class="d-inline-flex">
                                                <img src="${data.author.avatar}" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-0 ps-md-2 me-2">
                                                <a href="/pages/profile.html?user=${data.author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data.author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${data.created.substring(11,16)}">Posted ${data.created.substring(0,10)}</div>
                                            </div>
                                            <div class="row me-0 gap-2 d-sm-flex align-items-center ms-auto mt-2 mt-md-0">
                                                <button class="btn btn-warning" style="width:107px" id="open-edit-post-modal-btn">Edit post</button>
                                                <button class="btn btn-danger mt-2 mt-md-0 mt-auto" style="width:107px" id="delete-post-btn">Delete post</button>
                                            </div>
                                        </div>
                                        <hr/ class="mt-1 mb-1">
                                        <div>
                                            <p class="fs-5 text m-0">${data.title}</p>
                                            <p>${data.body}</p>
                                            <img src="${data.media}" class="mw-100 mt-2 shadow rounded d-block m-auto" style="max-height:600px;">
                                        </div>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between flex-column flex-sm-row">
                                        <a href="#" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${data.reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="#" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${data.comments.length}</strong> Comment(s)</small> </a>
                                    </div>
                                </div>
                            </div>`;
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                if (`${data.author.avatar}` === "") {
                    try {
                        if (`${data.media}` === "") {
                            postContainer.innerHTML = 
                            `<div class="m-auto">
                                <div class="card mb-3">
                                    <div class="card-body">
                                        <div class="media mb-3 d-block d-sm-inline-flex w-100">
                                            <a href="/pages/profile.html?user=${data.author.name}" class="d-inline-flex">
                                            <img src="/wireframes_design/icons/selfmade-icons/default_profile_img.svg" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-0 ps-md-2">
                                                <a href="/pages/profile.html?user=${data.author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data.author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${data.created.substring(11,16)}">Posted ${data.created.substring(0,10)}</div>
                                            </div>
                                        </div>
                                        <hr/ class="mt-1 mb-1">
                                        <div>
                                            <p class="fs-5 text m-0">${data.title}</p>
                                            <p>${data.body}</p>
                                        </div>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between flex-column flex-sm-row">
                                        <a href="#" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${data.reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="#" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${data.comments.length}</strong> Comments</small> </a>
                                    </div>
                                </div>
                            </div>`;
                        } else {
                            postContainer.innerHTML = 
                            `<div class="m-auto">
                                <div class="card mb-3">
                                    <div class="card-body">
                                        <div class="media mb-3 d-block d-sm-inline-flex w-100">
                                            <a href="/pages/profile.html?user=${data.author.name}" class="d-inline-flex">
                                            <img src="/wireframes_design/icons/selfmade-icons/default_profile_img.svg" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-0 ps-md-2">
                                                <a href="/pages/profile.html?user=${data.author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data.author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${data.created.substring(11,16)}">Posted ${data.created.substring(0,10)}</div>
                                            </div>
                                        </div>
                                        <hr/ class="mt-1 mb-1">
                                        <div>
                                            <p class="fs-5 text m-0">${data.title}</p>
                                            <p>${data.body}</p>
                                            <img src="${data.media}" class="mw-100 mt-2 shadow rounded d-block m-auto" style="max-height:600px;">
                                        </div>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between flex-column flex-sm-row">
                                        <a href="#" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${data.reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="#" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${data.comments.length}</strong> Comments</small> </a>
                                    </div>
                                </div>
                            </div>`;
                        }
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    try {
                        if (`${data.media}` === "") {
                            postContainer.innerHTML = 
                            `<div class="m-auto">
                                <div class="card mb-3">
                                    <div class="card-body">
                                        <div class="media mb-3 d-block d-sm-inline-flex w-100">
                                            <a href="/pages/profile.html?user=${data.author.name}" class="d-inline-flex">
                                                <img src="${data.author.avatar}" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-0 ps-md-2">
                                                <a href="/pages/profile.html?user=${data.author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data.author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${data.created.substring(11,16)}">Posted ${data.created.substring(0,10)}</div>
                                            </div>
                                        </div>
                                        <hr/ class="mt-1 mb-1">
                                        <div>
                                            <p class="fs-5 text m-0">${data.title}</p>
                                            <p>${data.body}</p>
                                        </div>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between flex-column flex-sm-row">
                                        <a href="#" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${data.reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="#" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${data.comments.length}</strong> Comment(s)</small> </a>
                                    </div>
                                </div>
                            </div>`;
                        } else {
                            postContainer.innerHTML = 
                            `<div class="m-auto">
                                <div class="card mb-3">
                                    <div class="card-body">
                                        <div class="media mb-3 d-block d-sm-inline-flex w-100">
                                            <a href="/pages/profile.html?user=${data.author.name}" class="d-inline-flex">
                                                <img src="${data.author.avatar}" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-0 ps-md-2">
                                                <a href="/pages/profile.html?user=${data.author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data.author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${data.created.substring(11,16)}">Posted ${data.created.substring(0,10)}</div>
                                            </div>
                                        </div>
                                        <hr/ class="mt-1 mb-1">
                                        <div>
                                            <p class="fs-5 text m-0">${data.title}</p>
                                            <p>${data.body}</p>
                                            <img src="${data.media}" class="mw-100 mt-2 shadow rounded d-block m-auto" style="max-height:600px;">
                                        </div>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between flex-column flex-sm-row">
                                        <a href="#" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${data.reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="#" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${data.comments.length}</strong> Comment(s)</small> </a>
                                    </div>
                                </div>
                            </div>`;
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }
    } catch(e) {
        console.log(e);
    }
}

fetchPost();

// Post comment
function postComment() {
    const commentInput = document.querySelector("#comment-input");
    const postUrl5 = "https://nf-api.onrender.com/api/v1/social/posts/" + postId + "/comment";
    const userToken5 = "Bearer " + localStorage.getItem("accessToken");

    (async () => {
        const sendBody = {
            body: commentInput.value,
        };
        const response = await fetch(postUrl5, {
            method: "POST",
            body: JSON.stringify(sendBody),
            headers: {
                "Authorization": userToken5,
                "Content-Type": "application/json"
            },
        })
        const data = await response.json();
        console.log("commentInput.value " + commentInput.value)
        console.log(data);
        window.location.reload();
    })().catch(e => {
        console.error(e);
    });

    /*async function postComment() {
        try {
            const sendBody = {
                body: commentInput.value,
            };
            const response = await fetch(postUrl5, {
                method: "POST",
                body: JSON.stringify(sendBody),
                headers: {
                    "Authorization": userToken5,
                    "Content-Type": "application/json"
                },
            })
            const data = await response.json();
            console.log("Post reactions: " + JSON.stringify(data.reactions));
        } catch (e) {
            console.log(e);
        }
    }*/
}
const postCommentBtn = document.querySelector("#post-comment-btn");
postCommentBtn.addEventListener("click", (e) => {
    e.preventDefault();
    postComment();
});

// Fetch comments
const commentsContainer = document.querySelector("#comments-container");

async function fetchComments() {
    try {
        const response = await fetch(postUrl, {
            method: "GET",
            headers: {
                "Authorization": userToken
            },
        })
        const data = await response.json();
        const dataComments = data.comments;

        // PROBLEM: None of the scripts run if there are no comments

        /*try {
            for (let i = 0; i < data.length; i++) {
                if (`${dataComments.length > 0}`) {
                    commentsContainer.innerHTML += 
                    `<div class="m-auto">
                        <div class="card mb-1">
                            <div class="card-body">
                                <div class="media mb-2 d-inline-flex">
                                    <div class="d-flex">
                                        <a href="/pages/profile.html?user=${dataComments[i].owner}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${dataComments[i].owner}</div></a>
                                        <div class="text-muted small ps-2 mt-auto" role="button" title="${dataComments[i].created.substring(11,16)}">Posted ${dataComments[i].created.substring(0,10)}</div>
                                    </div>
                                </div>
                                <div>${dataComments[i].body}</div>
                            </div>
                        </div>
                    </div>`;
                } else {
                    console.log(dataComments.length);
                    commentsContainer.innerHTML = `<p class="text-center fw-bold">No comments yet :(</p>`;
                }
            }
        } catch(e) {
            console.log(e);  
        }*/
        const reversedComments = dataComments.map(comments => comments).reverse()
        reversedComments.map((comments) => {
            try {
                if (dataComments.length > 0) {
                    console.log(dataComments.length);
                    commentsContainer.innerHTML += 
                    `<div class="m-auto">
                        <div class="card mb-1">
                            <div class="card-body">
                                <div class="media mb-2 d-inline-flex">
                                    <div class="d-flex flex-column flex-sm-row">
                                        <a href="/pages/profile.html?user=${comments.owner}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${comments.owner}</div></a>
                                        <div class="text-muted small ms-0 ms-sm-2 mt-auto" role="button" title="${comments.created.substring(11,16)}">Posted ${comments.created.substring(0,10)}</div>
                                    </div>
                                </div>
                                <div>${comments.body}</div>
                            </div>
                        </div>
                    </div>`;
                } else {
                    console.log(dataComments.length);
                    commentsContainer.innerHTML = `<p class="text-center fw-bold">No comments yet :(</p>`;
                }
            } catch(e) {
                console.log(e);  
            }
        });
        /*
        dataComments.forEach(function(comments) {
            try {
                if (dataComments.length > 0) {
                    commentsContainer.innerHTML += 
                    `<div class="m-auto">
                        <div class="card mb-1">
                            <div class="card-body">
                                <div class="media mb-2 d-inline-flex">
                                    <div class="d-flex">
                                        <a href="/pages/profile.html?user=${comments.owner}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${comments.owner}</div></a>
                                        <div class="text-muted small ps-2 mt-auto" role="button" title="${comments.created.substring(11,16)}">Posted ${comments.created.substring(0,10)}</div>
                                    </div>
                                </div>
                                <div>${comments.body}</div>
                            </div>
                        </div>
                    </div>`;
                } else {
                    commentsContainer.innerHTML = `<p class="text-center fw-bold">No comments yet :(</p>`;
                }
            } catch(e) {
                console.log(e);  
            }
        });*/
    } catch (e) {
        console.log(e);
    }
}

fetchComments();

/*async function fetchComments() {
    try {
        const response = await fetch(postUrl, {
            method: "GET",
            headers: {
                "Authorization": userToken
            },
        })
        const data = await response.json();
        for (let i = 0; i < data.length; i++) {
            if (`${data.comments[i].length}` > 0) {
                console.log(data.comments[i]);
                commentsContainer.innerHTML += 
                `<div class="m-auto">
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="media mb-3 d-inline-flex">
                                <a href="/pages/profile.html?user=${data.comments[i].owner}" class="d-inline-flex">
                                    <img src="/wireframes_design/icons/selfmade-icons/default_profile_img.svg" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                </a>
                                <div class="d-flex flex-column ps-2">
                                    <a href="/pages/profile.html?user=${data[i].comments[i].owner}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data.comments[i].owner}</div></a>
                                    <div class="text-muted small" role="button" title="${data[i].comments[i].created.substring(11,16)}">${data[i].comments[i].created.substring(0,10)}</div>
                                </div>
                            </div>
                            <div>${data.comments[i].body}</div>
                        </div>
                    </div>
                </div>`;
            } else {
                console.log(data.comments[i]);
                commentsContainer.innerHTML = "No comments";
            }
        }
    } catch(e) {
        console.log(e);
    }
}*/

/*async function fetchComments() {
    try {
        const response = await fetch(postUrl, {
            method: "GET",
            headers: {
                "Authorization": userToken
            },
        })
        const data = await response.json();
        console.log(data.comments);
        commentsContainer.innerHTML = 
        `<div class="m-auto">
            <div class="card mb-4">
                <div class="card-body">
                    <div class="media mb-3 d-inline-flex">
                        <a href="/pages/profile.html?user=${data.comments.owner}" class="d-inline-flex">
                            <img src="/wireframes_design/icons/selfmade-icons/default_profile_img.svg" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                        </a>
                        <div class="d-flex flex-column ps-2">
                            <a href="/pages/profile.html?user=${data.comments.owner}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data.comments.owner}</div></a>
                            <div class="text-muted small" role="button" title="${data.comments.created}">${data.comments.created}</div>
                        </div>
                    </div>
                    <div>${data.comments.body}</div>
                </div>
            </div>
        </div>`;
        console.log(data.comments[].body)
    } catch(e) {
        console.log(e);
    }
}*/