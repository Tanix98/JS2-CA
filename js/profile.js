const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const userName = params.get("user");

const userToken = "Bearer " + localStorage.getItem("accessToken");
const postUrl = "https://nf-api.onrender.com/api/v1/social/profiles/" + userName + "?_posts=true&_following=true&_followers=true";
const profile = document.querySelector("#profile-main");

async function fetchProfile() {
    try {
        const response = await fetch(postUrl, {
            method: "GET",
            headers: {
                "Authorization": userToken
            },
        })
        const data = await response.json();
        if (`${data.avatar}` === "") {
            profile.innerHTML += `
            <div style=";background-image: url('${data.banner}'); box-shadow: inset 0 0 0 1000px rgba(0,0,0,.1); background-size: cover;" class="rounded p-2">
                <div class="d-block d-sm-flex">
                    <img src="/wireframes_design/icons/selfmade-icons/default_profile_img.svg" class="d-block rounded-circle profile-img-main shadow m-auto m-sm-0">
                    <h3 class="text-center text-light mb-2 mb-sm-3 mt-2 mt-sm-auto ms-0 ms-sm-3" style="text-shadow: 2px 2px 6px #000">${data.name}</h3>
                </div>
            </div>
            `;
        } else {
            profile.innerHTML += `
            <div style=";background-image: url('${data.banner}'); box-shadow: inset 0 0 0 1000px rgba(0,0,0,.1); background-size: cover;" class="rounded p-2">
                <div class="d-block d-sm-flex">
                    <img src="${data.avatar}" class="d-block rounded-circle profile-img-main shadow m-auto m-sm-0">
                    <h3 class="text-center text-light mb-2 mb-sm-3 mt-2 mt-sm-auto ms-0 ms-sm-3" style="text-shadow: 2px 2px 6px #000">${data.name}</h3>
                </div>
            </div>
            `;
        }
    }
    catch(e) {
        console.log(e);
    }
}

fetchProfile();

async function fetchUserPostFeed() {
    try {
        const userPostFeed = document.querySelector("#user-post-feed");
        const apiPosts = "https://nf-api.onrender.com/api/v1/social/posts/?_author=true&_comments=true&_reactions=true&limit=10000000";
        const response = await fetch(apiPosts, {
            method: "GET",
            headers: {
                "Authorization": userToken
            },
        });
        const data = await response.json();
        for (let i = 0; i < data.length; i++) {
            if (`${data[i].author.name}` === userName) {
                try {
                    if (`${data[i].author.avatar}` === "") {
                        if (`${data[i].media}` === "") {
                            userPostFeed.innerHTML += 
                            `<div class="m-auto">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="media mb-3 d-inline-flex">
                                            <a href="/pages/profile.html?user=${data[i].author.name}" class="d-inline-flex">
                                                <img src="/wireframes_design/icons/selfmade-icons/default_profile_img.svg" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-2">
                                                <a href="/pages/profile.html?user=${data[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data[i].author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${data[i].created.substring(11,16)}">Posted ${data[i].created.substring(0,10)}</div>
                                            </div>
                                        </div>
                                        <hr/ class="mt-1 mb-1">
                                        <a href="/pages/post.html?id=${data[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${data[i].title}</p><div>${data[i].body.substring(0,300)}</div></a>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between flex-column flex-sm-row">
                                        <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${data[i].reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${data[i].comments.length}</strong> Comment(s)</small> </a>
                                    </div>
                                </div>
                            </div>`;
                        } else {
                            userPostFeed.innerHTML += 
                            `<div class="m-auto">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="media mb-3 d-inline-flex">
                                            <a href="/pages/profile.html?user=${data[i].author.name}" class="d-inline-flex">
                                                <img src="/wireframes_design/icons/selfmade-icons/default_profile_img.svg" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-2">
                                                <a href="/pages/profile.html?user=${data[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data[i].author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${data[i].created.substring(11,16)}">Posted ${data[i].created.substring(0,10)}</div>
                                            </div>
                                        </div>
                                        <hr/ class="mt-1 mb-1">
                                        <a href="/pages/post.html?id=${data[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${data[i].title}</p><div>${data[i].body.substring(0,300)}</div><img src="${data[i].media}" class="mw-100 mt-2 shadow rounded d-block m-auto" style="max-height:400px;"></a>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between flex-column flex-sm-row">
                                        <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${data[i].reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${data[i].comments.length}</strong> Comment(s)</small> </a>
                                    </div>
                                </div>
                            </div>`;
                        }
                    } else {
                        if (`${data[i].media}` === "") {
                            userPostFeed.innerHTML += 
                            `<div class="m-auto">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="media mb-3 d-inline-flex">
                                            <a href="#" class="d-inline-flex">
                                                <img src="${data[i].author.avatar}" class="d-block ui-w-40 rounded-circle" alt="profile picture" style="width:50px; height:50px; object-fit:cover; object-position:center;">
                                            </a>
                                            <div class="d-flex flex-column ps-2">
                                                <a href="/pages/profile.html?user=${data[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data[i].author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${data[i].created.substring(11,16)}">Posted ${data[i].created.substring(0,10)}</div>
                                            </div>
                                        </div>
                                        <hr/ class="mt-1 mb-1">
                                        <a href="/pages/post.html?id=${data[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${data[i].title}</p><div>${data[i].body.substring(0,300)}</div></a>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between flex-column flex-sm-row">
                                        <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${data[i].reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${data[i].comments.length}</strong> Comment(s)</small> </a>
                                    </div>
                                </div>
                            </div>`;
                        } else {
                            userPostFeed.innerHTML += 
                            `<div class="m-auto">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="media mb-3 d-inline-flex">
                                            <a href="#" class="d-inline-flex">
                                                <img src="${data[i].author.avatar}" class="d-block ui-w-40 rounded-circle" alt="profile picture" style="width:50px; height:50px; object-fit:cover; object-position:center;">
                                            </a>
                                            <div class="d-flex flex-column ps-2">
                                                <a href="/pages/profile.html?user=${data[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data[i].author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${data[i].created.substring(11,16)}">Posted ${data[i].created.substring(0,10)}</div>
                                            </div>
                                        </div>
                                        <hr/ class="mt-1 mb-1">
                                        <a href="/pages/post.html?id=${data[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${data[i].title}</p><div>${data[i].body.substring(0,300)}</div><img src="${data[i].media}" class="mw-100 mt-2 shadow rounded d-block m-auto" style="max-height:400px;"></a>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between flex-column flex-sm-row">
                                        <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${data[i].reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${data[i].comments.length}</strong> Comment(s)</small> </a>
                                    </div>
                                </div>
                            </div>`;
                        }
                    }
                } catch (e) {
                    console.log(e);
                } 
            }
        }
    } catch(e) {
        console.log(e);
    }
}

fetchUserPostFeed()