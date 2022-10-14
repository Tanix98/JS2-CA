const postFeed = document.querySelector("#post-feed");

//const queryString = document.location.search;
const queryString = window.location.pathname
const params = new URLSearchParams(queryString);
const postId = params.get("");

const userToken = "Bearer " + localStorage.getItem("accessToken");

async function fetchPostFeed(url) {
    postFeed.innerHTML = "";
    try {
        const response = await fetch(`${url}`, {
            method: "GET",
            headers: {
                "Authorization": userToken
            },
        })
        const data = await response.json();
        for (let i = 0; i < data.length; i++) {
            if (`${data[i].author.avatar}` === "") {
                try {
                    if (`${data[i].media}` === "") {
                        postFeed.innerHTML += 
                        `<div class="m-auto">
                            <div class="card mb-4">
                                <div class="card-body">
                                    <div class="media d-inline-flex">
                                        <a href="/pages/profile.html?user=${data[i].author.name}" class="d-inline-flex">
                                            <img src="/wireframes_design/icons/selfmade-icons/default_profile_img.svg" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                        </a>
                                        <div class="d-flex flex-column ps-2">
                                            <a href="/pages/profile.html?user=${data[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data[i].author.name}</div></a>
                                            <div class="text-muted small" role="button" title="${data[i].created.substring(11,16)}">Posted ${data[i].created.substring(0,10)}</div>
                                        </div>
                                    </div>
                                    <hr/ class="mt-2 mb-2">
                                    <a href="/pages/post.html?id=${data[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${data[i].title}</p><div>${data[i].body.substring(0,300)}</div></a>
                                </div>
                                <div class="card-footer d-flex justify-content-between gap-1 flex-wrap">
                                    <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${data[i].reactions.length}</strong> Reaction(s)</small> </a>
                                    <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${data[i].comments.length}</strong> Comment(s)</small> </a>
                                </div>
                            </div>
                        </div>`;
                    } else {
                        postFeed.innerHTML += 
                        `<div class="m-auto">
                            <div class="card mb-4">
                                <div class="card-body">
                                    <div class="media d-inline-flex">
                                        <a href="/pages/profile.html?user=${data[i].author.name}" class="d-inline-flex">
                                            <img src="/wireframes_design/icons/selfmade-icons/default_profile_img.svg" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                        </a>
                                        <div class="d-flex flex-column ps-2">
                                            <a href="/pages/profile.html?user=${data[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data[i].author.name}</div></a>
                                            <div class="text-muted small" role="button" title="${data[i].created.substring(11,16)}">Posted ${data[i].created.substring(0,10)}</div>
                                        </div>
                                    </div>
                                    <hr/ class="mt-2 mb-2">
                                    <a href="/pages/post.html?id=${data[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${data[i].title}</p><div>${data[i].body.substring(0,300)}</div><img src="${data[i].media}" class="mw-100 mt-2 shadow rounded d-block m-auto" style="max-height:400px;"></a>
                                </div>
                                <div class="card-footer d-flex justify-content-between gap-1 flex-wrap">
                                    <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${data[i].reactions.length}</strong> Reaction(s)</small> </a>
                                    <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${data[i].comments.length}</strong> Comment(s)</small> </a>
                                </div>
                            </div>
                        </div>`;
                    }
                } catch (e) {
                    console.log(e);
                }
            } else {
                try {
                    if (`${data[i].media}` === "") {
                        postFeed.innerHTML += 
                        `<div class="m-auto">
                            <div class="card mb-4">
                                <div class="card-body">
                                    <div class="media d-inline-flex">
                                        <a href="/pages/profile.html?user=${data[i].author.name}" class="d-inline-flex">
                                            <img src="${data[i].author.avatar}" class="d-block ui-w-40 rounded-circle" alt="profile picture" style="width:50px; height:50px; object-fit:cover; object-position:center;">
                                        </a>
                                        <div class="d-flex flex-column ps-2">
                                            <a href="/pages/profile.html?user=${data[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data[i].author.name}</div></a>
                                            <div class="text-muted small" role="button" title="${data[i].created.substring(11,16)}">Posted ${data[i].created.substring(0,10)}</div>
                                        </div>
                                    </div>
                                    <hr/ class="mt-2 mb-2">
                                    <a href="/pages/post.html?id=${data[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${data[i].title}</p><div>${data[i].body.substring(0,300)}</div></a>
                                </div>
                                <div class="card-footer d-flex justify-content-between gap-1 flex-wrap">
                                    <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${data[i].reactions.length}</strong> Reaction(s)</small> </a>
                                    <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${data[i].comments.length}</strong> Comment(s)</small> </a>
                                </div>
                            </div>
                        </div>`;
                    }  else {
                        postFeed.innerHTML += 
                        `<div class="m-auto">
                            <div class="card mb-4">
                                <div class="card-body">
                                    <div class="media d-inline-flex">
                                        <a href="/pages/profile.html?user=${data[i].author.name}" class="d-inline-flex">
                                            <img src="${data[i].author.avatar}" class="d-block ui-w-40 rounded-circle" alt="profile picture" style="width:50px; height:50px; object-fit:cover; object-position:center;">
                                        </a>
                                        <div class="d-flex flex-column ps-2">
                                            <a href="/pages/profile.html?user=${data[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data[i].author.name}</div></a>
                                            <div class="text-muted small" role="button" title="${data[i].created.substring(11,16)}">Posted ${data[i].created.substring(0,10)}</div>
                                        </div>
                                    </div>
                                    <hr/ class="mt-2 mb-2">
                                    <a href="/pages/post.html?id=${data[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${data[i].title}</p><div>${data[i].body.substring(0,300)}</div><img src="${data[i].media}" class="mw-100 mt-2 shadow rounded d-block m-auto" style="max-height:400px;"></a>
                                </div>
                                <div class="card-footer d-flex justify-content-between gap-1 flex-wrap">
                                    <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${data[i].reactions.length}</strong> Reaction(s)</small> </a>
                                    <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${data[i].comments.length}</strong> Comment(s)</small> </a>
                                </div>
                            </div>
                        </div>`;
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

fetchPostFeed("https://nf-api.onrender.com/api/v1/social/posts?_author=true&_comments=true&_reactions=true");

const sortByOldest = document.querySelector("#sort-oldest");
const sortByRecent = document.querySelector("#sort-recent");
sortByOldest.addEventListener("click", () => {
    console.log("Sort button 1 clicked!")
    sortByRecent.checked = false;
    if (filterByText.checked) {
        fetchPostFeedOnlyText("https://nf-api.onrender.com/api/v1/social/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=asc");
    }
    if (filterByMedia.checked) {
        fetchPostFeedNoTextOnly("https://nf-api.onrender.com/api/v1/social/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=asc");
    }
    if (filterByText.checked === false && filterByMedia.checked === false) {
        fetchPostFeed("https://nf-api.onrender.com/api/v1/social/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=asc");
    }
});
sortByRecent.addEventListener("click", () => {
    console.log("Sort button 1 clicked!")
    sortByOldest.checked = false;
    if (filterByText.checked) {
        fetchPostFeedOnlyText("https://nf-api.onrender.com/api/v1/social/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=desc");
    }
    if (filterByMedia.checked) {
        fetchPostFeedNoTextOnly("https://nf-api.onrender.com/api/v1/social/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=desc");
    }
    if (filterByText.checked === false && filterByMedia.checked === false) {
        fetchPostFeed("https://nf-api.onrender.com/api/v1/social/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=desc");
    }
});

async function fetchPostFeedOnlyText(url) {
    try {
        postFeed.innerHTML = "";
        const response = await fetch(`${url}`, {
          method: "GET",
          headers: {
            "Authorization": userToken
          },
        })
        const data = await response.json();
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            if (`${data[i].media}` === "") {
                try {
                    if (`${data[i].media}` === "") {
                        if (`${data[i].author.avatar}` === "") {
                            postFeed.innerHTML += 
                            `<div class="m-auto">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="media d-inline-flex">
                                            <a href="/pages/profile.html?user=${data[i].author.name}" class="d-inline-flex">
                                                <img src="/wireframes_design/icons/selfmade-icons/default_profile_img.svg" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-2">
                                                <a href="/pages/profile.html?user=${data[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data[i].author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${data[i].created.substring(11,16)}">Posted ${data[i].created.substring(0,10)}</div>
                                            </div>
                                        </div>
                                        <hr/ class="mt-2 mb-2">
                                        <a href="/pages/post.html?id=${data[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${data[i].title}</p><div>${data[i].body.substring(0,300)}</div></a>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between gap-1 flex-wrap">
                                        <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${data[i].reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${data[i].comments.length}</strong> Comment(s)</small> </a>
                                    </div>
                                </div>
                            </div>`;
                        } else {
                            postFeed.innerHTML += 
                            `<div class="m-auto">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="media d-inline-flex">
                                            <a href="/pages/profile.html?user=${data[i].author.name}" class="d-inline-flex">
                                                <img src="${data[i].author.avatar}" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-2">
                                                <a href="/pages/profile.html?user=${data[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data[i].author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${data[i].created.substring(11,16)}">Posted ${data[i].created.substring(0,10)}</div>
                                            </div>
                                        </div>
                                        <hr/ class="mt-2 mb-2">
                                        <a href="/pages/post.html?id=${data[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${data[i].title}</p><div>${data[i].body.substring(0,300)}</div></a>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between gap-1 flex-wrap">
                                        <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${data[i].reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${data[i].comments.length}</strong> Comment(s)</small> </a>
                                    </div>
                                </div>
                            </div>`;
                        }
                    } else {
                        if (`${data[i].author.avatar}` === "") {
                            postFeed.innerHTML += 
                            `<div class="m-auto">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="media d-inline-flex">
                                            <a href="/pages/profile.html?user=${data[i].author.name}" class="d-inline-flex">
                                                <img src="/wireframes_design/icons/selfmade-icons/default_profile_img.svg" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-2">
                                                <a href="/pages/profile.html?user=${data[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data[i].author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${data[i].created.substring(11,16)}">Posted ${data[i].created.substring(0,10)}</div>
                                            </div>
                                        </div>
                                        <hr/ class="mt-2 mb-2">
                                        <a href="/pages/post.html?id=${data[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${data[i].title}</p><div>${data[i].body.substring(0,300)}</div><img src="${data[i].media}" class="mw-100 mt-2 shadow rounded d-block m-auto" style="max-height:400px;"></a>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between gap-1 flex-wrap">
                                        <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${data[i].reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${data[i].comments.length}</strong> Comment(s)</small> </a>
                                    </div>
                                </div>
                            </div>`;
                        } else {
                            postFeed.innerHTML += 
                            `<div class="m-auto">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="media d-inline-flex">
                                            <a href="/pages/profile.html?user=${data[i].author.name}" class="d-inline-flex">
                                                <img src="${data[i].author.avatar}" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-2">
                                                <a href="/pages/profile.html?user=${data[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data[i].author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${data[i].created.substring(11,16)}">Posted ${data[i].created.substring(0,10)}</div>
                                            </div>
                                        </div>
                                        <hr/ class="mt-2 mb-2">
                                        <a href="/pages/post.html?id=${data[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${data[i].title}</p><div>${data[i].body.substring(0,300)}</div><img src="${data[i].media}" class="mw-100 mt-2 shadow rounded d-block m-auto" style="max-height:400px;"></a>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between gap-1 flex-wrap">
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

async function fetchPostFeedNoTextOnly(url) {
    try {
        postFeed.innerHTML = "";
        const response = await fetch(`${url}`, {
          method: "GET",
          headers: {
            "Authorization": userToken
          },
        })
        const data = await response.json();
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            if (`${data[i].media}`) {
                try {
                    if (`${data[i].media}` === "") {
                        if (`${data[i].author.avatar}` === "") {
                            postFeed.innerHTML += 
                            `<div class="m-auto">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="media d-inline-flex">
                                            <a href="/pages/profile.html?user=${data[i].author.name}" class="d-inline-flex">
                                                <img src="/wireframes_design/icons/selfmade-icons/default_profile_img.svg" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-2">
                                                <a href="/pages/profile.html?user=${data[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data[i].author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${data[i].created.substring(11,16)}">Posted ${data[i].created.substring(0,10)}</div>
                                            </div>
                                        </div>
                                        <hr/ class="mt-2 mb-2">
                                        <a href="/pages/post.html?id=${data[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${data[i].title}</p><div>${data[i].body.substring(0,300)}</div></a>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between gap-1 flex-wrap">
                                        <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${data[i].reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${data[i].comments.length}</strong> Comment(s)</small> </a>
                                    </div>
                                </div>
                            </div>`;
                        } else {
                            postFeed.innerHTML += 
                            `<div class="m-auto">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="media d-inline-flex">
                                            <a href="/pages/profile.html?user=${data[i].author.name}" class="d-inline-flex">
                                                <img src="${data[i].author.avatar}" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-2">
                                                <a href="/pages/profile.html?user=${data[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data[i].author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${data[i].created.substring(11,16)}">Posted ${data[i].created.substring(0,10)}</div>
                                            </div>
                                        </div>
                                        <hr/ class="mt-2 mb-2">
                                        <a href="/pages/post.html?id=${data[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${data[i].title}</p><div>${data[i].body.substring(0,300)}</div></a>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between gap-1 flex-wrap">
                                        <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${data[i].reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${data[i].comments.length}</strong> Comment(s)</small> </a>
                                    </div>
                                </div>
                            </div>`;
                        }
                    } else {
                        if (`${data[i].author.avatar}` === "") {
                            postFeed.innerHTML += 
                            `<div class="m-auto">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="media d-inline-flex">
                                            <a href="/pages/profile.html?user=${data[i].author.name}" class="d-inline-flex">
                                                <img src="/wireframes_design/icons/selfmade-icons/default_profile_img.svg" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-2">
                                                <a href="/pages/profile.html?user=${data[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data[i].author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${data[i].created.substring(11,16)}">Posted ${data[i].created.substring(0,10)}</div>
                                            </div>
                                        </div>
                                        <hr/ class="mt-2 mb-2">
                                        <a href="/pages/post.html?id=${data[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${data[i].title}</p><div>${data[i].body.substring(0,300)}</div><img src="${data[i].media}" class="mw-100 mt-2 shadow rounded d-block m-auto" style="max-height:400px;"></a>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between gap-1 flex-wrap">
                                        <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${data[i].reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="/pages/post.html?id=${data[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${data[i].comments.length}</strong> Comment(s)</small> </a>
                                    </div>
                                </div>
                            </div>`;
                        } else {
                            postFeed.innerHTML += 
                            `<div class="m-auto">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="media d-inline-flex">
                                            <a href="/pages/profile.html?user=${data[i].author.name}" class="d-inline-flex">
                                                <img src="${data[i].author.avatar}" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-2">
                                                <a href="/pages/profile.html?user=${data[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${data[i].author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${data[i].created.substring(11,16)}">Posted ${data[i].created.substring(0,10)}</div>
                                            </div>
                                        </div>
                                        <hr/ class="mt-2 mb-2">
                                        <a href="/pages/post.html?id=${data[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${data[i].title}</p><div>${data[i].body.substring(0,300)}</div><img src="${data[i].media}" class="mw-100 mt-2 shadow rounded d-block m-auto" style="max-height:400px;"></a>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between gap-1 flex-wrap">
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

const filterByMedia = document.querySelector("#filter-media");
const filterByText = document.querySelector("#filter-text");
filterByMedia.addEventListener("click", () => {
    console.log("Sort button 1 clicked!")
    filterByText.checked = false;
    if (sortByRecent.checked) {
        fetchPostFeedNoTextOnly("https://nf-api.onrender.com/api/v1/social/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=desc");
    } else {
        fetchPostFeedNoTextOnly("https://nf-api.onrender.com/api/v1/social/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=asc");
    }
});
filterByText.addEventListener("click", () => {
    console.log("Sort button 1 clicked!")
    filterByMedia.checked = false;
    if (sortByRecent.checked) {
        fetchPostFeedOnlyText("https://nf-api.onrender.com/api/v1/social/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=desc");
    } else {
        fetchPostFeedOnlyText("https://nf-api.onrender.com/api/v1/social/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=asc");
    }
});