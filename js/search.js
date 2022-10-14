const noResultsMessage = document.querySelector("#no-results-message");
const searchFooter = document.querySelector("#search-footer");

const apiPosts = "https://nf-api.onrender.com/api/v1/social/posts?_author=true&_comments=true&_reactions=true&limit=1200";
const userToken = "Bearer " + localStorage.getItem("accessToken");
const postFeed = document.querySelector("#post-feed");

function search(){
  async function fetchPostFeedFiltered(url) {
    const srcBarInput = document.location.search.substring(3);
    localStorage.setItem("searchWord", srcBarInput);
    srcBar.value = localStorage.getItem("searchWord");
    try {
        postFeed.innerHTML = "";
        const response = await fetch(`${url}`, {
          method: "GET",
          headers: {
            "Authorization": userToken
          },
        })
        const data = await response.json();
        //const regex = new RegExp(`\\b${srcBar.value.toLowerCase()}\\b`);
        //console.log("regex: " + regex);
        /*const filteredData = data.filter(function (item) {
          return item.title.match(/\bcat\b/) || item.body.match(/\bcat\b/) || item.author.name.match(/\bcat\b/);
        });*/
        /*const filteredData = data.filter((item) =>
          item.title.match(/\bcat\b/) || item.body.match(/\bcat\b/) || item.author.name.match(/\bcat\b/)
        );*/
        if (`${srcBar.value}`) {
          const filteredData = data.filter((item) =>
            item.title.match(`${srcBar.value}`) || item.body.match(`${srcBar.value}`) || item.author.name.match(`${srcBar.value}`)
          );
          console.log(filteredData);
          // regex works when hardcoded in, but if I try the version that uses template literal, it crashes the page somehow and doesn't work at all, even though it looks exactly the same when I console log it
          /*const filteredData2 = data.filter(function (item) {
            return item.title.match(regex) || item.body.match(regex) || item.author.name.match(regex);
          });*/
          if (filteredData.length === 0) {
            searchFooter.classList.add("fixed-bottom");
            noResultsMessage.style.display = "block";
          } else {
            searchFooter.classList.remove("fixed-bottom");
            noResultsMessage.style.display = "none";
          }
          for (let i = 0; i < filteredData.length; i++) {
            if (`${filteredData[i].author.avatar}` === "") {
              if (`${filteredData[i].media}` === "") {
                postFeed.innerHTML += 
                  `<div class="m-auto">
                    <div class="card mb-4">
                      <div class="card-body">
                        <div class="media d-inline-flex">
                          <a href="/pages/profile.html?user=${filteredData[i].author.name}" class="d-inline-flex">
                              <img src="/wireframes_design/icons/selfmade-icons/default_profile_img.svg" class="d-block ui-w-40 rounded-circle" alt="profile picture" style="width:50px; height:50px; object-fit:cover; object-position:center;">
                            </a>
                          <div class="d-flex flex-column ps-2">
                          <a href="/pages/profile.html?user=${filteredData[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${filteredData[i].author.name}</div></a>
                          <div class="text-muted small" role="button" title="${filteredData[i].created.substring(11,16)}">Posted ${filteredData[i].created.substring(0,10)}</div>
                        </div>
                      </div>
                      <hr/ class="mt-2 mb-2">
                      <a href="/pages/post.html?id=${filteredData[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${filteredData[i].title}</p><div>${filteredData[i].body.substring(0,300)}</div></a>
                    </div>
                    <div class="card-footer d-flex justify-content-between gap-1 flex-wrap">
                      <a href="/pages/post.html?id=${filteredData[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${filteredData[i].reactions.length}</strong> Reaction(s)</small> </a>
                      <a href="/pages/post.html?id=${filteredData[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${filteredData[i].comments.length}</strong> Comment(s)</small> </a>
                    </div>
                  </div>
                </div>`
              } else {
                postFeed.innerHTML += 
                  `<div class="m-auto">
                    <div class="card mb-4">
                      <div class="card-body">
                        <div class="media d-inline-flex">
                          <a href="/pages/profile.html?user=${filteredData[i].author.name}" class="d-inline-flex">
                              <img src="/wireframes_design/icons/selfmade-icons/default_profile_img.svg" class="d-block ui-w-40 rounded-circle" alt="profile picture" style="width:50px; height:50px; object-fit:cover; object-position:center;">
                            </a>
                          <div class="d-flex flex-column ps-2">
                          <a href="/pages/profile.html?user=${filteredData[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${filteredData[i].author.name}</div></a>
                          <div class="text-muted small" role="button" title="${filteredData[i].created.substring(11,16)}">Posted ${filteredData[i].created.substring(0,10)}</div>
                        </div>
                      </div>
                      <hr/ class="mt-2 mb-2">
                      <a href="/pages/post.html?id=${filteredData[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${filteredData[i].title}</p><div>${filteredData[i].body.substring(0,300)}</div><img src="${filteredData[i].media}" class="mw-100 mt-2 shadow rounded d-block m-auto" style="max-height:400px;"></a>
                    </div>
                    <div class="card-footer d-flex justify-content-between gap-1 flex-wrap">
                      <a href="/pages/post.html?id=${filteredData[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${filteredData[i].reactions.length}</strong> Reaction(s)</small> </a>
                      <a href="/pages/post.html?id=${filteredData[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${filteredData[i].comments.length}</strong> Comment(s)</small> </a>
                    </div>
                  </div>
                </div>`
              }
            } else {
              if (`${filteredData[i].media}` === "") {
                postFeed.innerHTML += 
                `<div class="m-auto">
                  <div class="card mb-4">
                    <div class="card-body">
                      <div class="media d-inline-flex">
                          <a href="/pages/profile.html?user=${filteredData[i].author.name}" class="d-inline-flex">
                              <img src="${filteredData[i].author.avatar}" class="d-block ui-w-40 rounded-circle" alt="profile picture" style="width:50px; height:50px; object-fit:cover; object-position:center;">
                            </a>
                          <div class="d-flex flex-column ps-2">
                          <a href="/pages/profile.html?user=${filteredData[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${filteredData[i].author.name}</div></a>
                          <div class="text-muted small" role="button" title="${filteredData[i].created.substring(11,16)}">Posted ${filteredData[i].created.substring(0,10)}</div>
                        </div>
                      </div>
                      <hr/ class="mt-2 mb-2">
                      <a href="/pages/post.html?id=${filteredData[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${filteredData[i].title}</p><div>${filteredData[i].body.substring(0,300)}</div></a>
                    </div>
                    <div class="card-footer d-flex justify-content-between gap-1 flex-wrap">
                      <a href="/pages/post.html?id=${filteredData[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${filteredData[i].reactions.length}</strong> Reaction(s)</small> </a>
                      <a href="/pages/post.html?id=${filteredData[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${filteredData[i].comments.length}</strong> Comment(s)</small> </a>
                    </div>
                  </div>
                </div>`
              } else {
                postFeed.innerHTML += 
                `<div class="m-auto">
                  <div class="card mb-4">
                    <div class="card-body">
                      <div class="media d-inline-flex">
                          <a href="/pages/profile.html?user=${filteredData[i].author.name}" class="d-inline-flex">
                              <img src="${filteredData[i].author.avatar}" class="d-block ui-w-40 rounded-circle" alt="profile picture" style="width:50px; height:50px; object-fit:cover; object-position:center;">
                            </a>
                          <div class="d-flex flex-column ps-2">
                          <a href="/pages/profile.html?user=${filteredData[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${filteredData[i].author.name}</div></a>
                          <div class="text-muted small" role="button" title="${filteredData[i].created.substring(11,16)}">Posted ${filteredData[i].created.substring(0,10)}</div>
                        </div>
                      </div>
                      <hr/ class="mt-2 mb-2">
                      <a href="/pages/post.html?id=${filteredData[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${filteredData[i].title}</p><div>${filteredData[i].body.substring(0,300)}</div><img src="${filteredData[i].media}" class="mw-100 mt-2 shadow rounded d-block m-auto" style="max-height:400px;"></a>
                    </div>
                    <div class="card-footer d-flex justify-content-between gap-1 flex-wrap">
                      <a href="/pages/post.html?id=${filteredData[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${filteredData[i].reactions.length}</strong> Reaction(s)</small> </a>
                      <a href="/pages/post.html?id=${filteredData[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${filteredData[i].comments.length}</strong> Comment(s)</small> </a>
                    </div>
                  </div>
                </div>`
              }
          }
        }
      }
    } catch(e) {
        console.log(e);
    }
  }
  fetchPostFeedFiltered(apiPosts);
}

search();

/*

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
      fetchPostFeedFiltered("https://nf-api.onrender.com/api/v1/social/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=asc");
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
      fetchPostFeedFiltered("https://nf-api.onrender.com/api/v1/social/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=desc");
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
        const filteredData = data.filter((item) =>
            item.title.match(`${srcBar.value}`) || item.body.match(`${srcBar.value}`) || item.author.name.match(`${srcBar.value}`)
        );
        for (let i = 0; i < filteredData.length; i++) {
            if (`${filteredData[i].media}` === "") {
                try {
                    if (`${filteredData[i].media}` === "") {
                        if (`${filteredData[i].author.avatar}` === "") {
                            postFeed.innerHTML += 
                            `<div class="m-auto">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="media d-inline-flex">
                                            <a href="/pages/profile.html?user=${filteredData[i].author.name}" class="d-inline-flex">
                                                <img src="/wireframes_design/icons/selfmade-icons/default_profile_img.svg" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-2">
                                                <a href="/pages/profile.html?user=${filteredData[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${filteredData[i].author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${filteredData[i].created.substring(11,16)}">Posted ${filteredData[i].created.substring(0,10)}</div>
                                            </div>
                                        </div>
                                        <hr/ class="mt-2 mb-2">
                                        <a href="/pages/post.html?id=${filteredData[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${filteredData[i].title}</p><div>${data[i].body.substring(0,300)}</div></a>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between flex-column flex-sm-row">
                                        <a href="/pages/post.html?id=${filteredData[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${filteredData[i].reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="/pages/post.html?id=${filteredData[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${filteredData[i].comments.length}</strong> Comment(s)</small> </a>
                                    </div>
                                </div>
                            </div>`;
                        } else {
                            postFeed.innerHTML += 
                            `<div class="m-auto">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="media d-inline-flex">
                                            <a href="/pages/profile.html?user=${filteredData[i].author.name}" class="d-inline-flex">
                                                <img src="${filteredData[i].author.avatar}" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-2">
                                                <a href="/pages/profile.html?user=${filteredData[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${filteredData[i].author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${filteredData[i].created.substring(11,16)}">Posted ${filteredData[i].created.substring(0,10)}</div>
                                            </div>
                                        </div>
                                        <hr/ class="mt-2 mb-2">
                                        <a href="/pages/post.html?id=${filteredData[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${filteredData[i].title}</p><div>${data[i].body.substring(0,300)}</div></a>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between flex-column flex-sm-row">
                                        <a href="/pages/post.html?id=${filteredData[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${filteredData[i].reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="/pages/post.html?id=${filteredData[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${filteredData[i].comments.length}</strong> Comment(s)</small> </a>
                                    </div>
                                </div>
                            </div>`;
                        }
                    } else {
                        if (`${filteredData[i].author.avatar}` === "") {
                            postFeed.innerHTML += 
                            `<div class="m-auto">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="media d-inline-flex">
                                            <a href="/pages/profile.html?user=${filteredData[i].author.name}" class="d-inline-flex">
                                                <img src="/wireframes_design/icons/selfmade-icons/default_profile_img.svg" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-2">
                                                <a href="/pages/profile.html?user=${filteredData[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${filteredData[i].author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${filteredData[i].created.substring(11,16)}">Posted ${filteredData[i].created.substring(0,10)}</div>
                                            </div>
                                        </div>
                                        <hr/ class="mt-2 mb-2">
                                        <a href="/pages/post.html?id=${filteredData[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${filteredData[i].title}</p><div>${filteredData[i].body.substring(0,300)}</div><img src="${filteredData[i].media}" class="mw-100 mt-2 shadow rounded d-block m-auto" style="max-height:400px;"></a>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between flex-column flex-sm-row">
                                        <a href="/pages/post.html?id=${filteredData[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${filteredData[i].reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="/pages/post.html?id=${filteredData[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${filteredData[i].comments.length}</strong> Comment(s)</small> </a>
                                    </div>
                                </div>
                            </div>`;
                        } else {
                            postFeed.innerHTML += 
                            `<div class="m-auto">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="media d-inline-flex">
                                            <a href="/pages/profile.html?user=${filteredData[i].author.name}" class="d-inline-flex">
                                                <img src="${filteredData[i].author.avatar}" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-2">
                                                <a href="/pages/profile.html?user=${filteredData[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${filteredData[i].author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${filteredData[i].created.substring(11,16)}">Posted ${filteredData[i].created.substring(0,10)}</div>
                                            </div>
                                        </div>
                                        <hr/ class="mt-2 mb-2">
                                        <a href="/pages/post.html?id=${filteredData[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${filteredData[i].title}</p><div>${filteredData[i].body.substring(0,300)}</div><img src="${filteredData[i].media}" class="mw-100 mt-2 shadow rounded d-block m-auto" style="max-height:400px;"></a>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between flex-column flex-sm-row">
                                        <a href="/pages/post.html?id=${filteredData[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${filteredData[i].reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="/pages/post.html?id=${filteredData[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${filteredData[i].comments.length}</strong> Comment(s)</small> </a>
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
        const filteredData = data.filter((item) =>
            item.title.match(`${srcBar.value}`) || item.body.match(`${srcBar.value}`) || item.author.name.match(`${srcBar.value}`)
        );
        console.log(data);
        for (let i = 0; i < filteredData.length; i++) {
            if (`${filteredData[i].media}`) {
                try {
                    if (`${filteredData[i].media}` === "") {
                        if (`${filteredData[i].author.avatar}` === "") {
                            postFeed.innerHTML += 
                            `<div class="m-auto">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="media d-inline-flex">
                                            <a href="/pages/profile.html?user=${filteredData[i].author.name}" class="d-inline-flex">
                                                <img src="/wireframes_design/icons/selfmade-icons/default_profile_img.svg" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-2">
                                                <a href="/pages/profile.html?user=${filteredData[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${filteredData[i].author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${filteredData[i].created.substring(11,16)}">Posted ${filteredData[i].created.substring(0,10)}</div>
                                            </div>
                                        </div>
                                        <hr/ class="mt-2 mb-2">
                                        <a href="/pages/post.html?id=${filteredData[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${filteredData[i].title}</p><div>${filteredData[i].body.substring(0,300)}</div></a>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between flex-column flex-sm-row">
                                        <a href="/pages/post.html?id=${filteredData[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${filteredData[i].reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="/pages/post.html?id=${filteredData[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${filteredData[i].comments.length}</strong> Comment(s)</small> </a>
                                    </div>
                                </div>
                            </div>`;
                        } else {
                            postFeed.innerHTML += 
                            `<div class="m-auto">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="media d-inline-flex">
                                            <a href="/pages/profile.html?user=${filteredData[i].author.name}" class="d-inline-flex">
                                                <img src="${filteredData[i].author.avatar}" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-2">
                                                <a href="/pages/profile.html?user=${filteredData[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${filteredData[i].author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${filteredData[i].created.substring(11,16)}">Posted ${filteredData[i].created.substring(0,10)}</div>
                                            </div>
                                        </div>
                                        <hr/ class="mt-2 mb-2">
                                        <a href="/pages/post.html?id=${filteredData[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${filteredData[i].title}</p><div>${filteredData[i].body.substring(0,300)}</div></a>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between flex-column flex-sm-row">
                                        <a href="/pages/post.html?id=${filteredData[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${filteredData[i].reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="/pages/post.html?id=${filteredData[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${filteredData[i].comments.length}</strong> Comment(s)</small> </a>
                                    </div>
                                </div>
                            </div>`;
                        }
                    } else {
                        if (`${filteredData[i].author.avatar}` === "") {
                            postFeed.innerHTML += 
                            `<div class="m-auto">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="media d-inline-flex">
                                            <a href="/pages/profile.html?user=${filteredData[i].author.name}" class="d-inline-flex">
                                                <img src="/wireframes_design/icons/selfmade-icons/default_profile_img.svg" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-2">
                                                <a href="/pages/profile.html?user=${filteredData[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${filteredData[i].author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${filteredData[i].created.substring(11,16)}">Posted ${filteredData[i].created.substring(0,10)}</div>
                                            </div>
                                        </div>
                                        <hr/ class="mt-2 mb-2">
                                        <a href="/pages/post.html?id=${filteredData[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${filteredData[i].title}</p><div>${filteredData[i].body.substring(0,300)}</div><img src="${data[i].media}" class="mw-100 mt-2 shadow rounded d-block m-auto" style="max-height:400px;"></a>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between flex-column flex-sm-row">
                                        <a href="/pages/post.html?id=${filteredData[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${filteredData[i].reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="/pages/post.html?id=${filteredData[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${filteredData[i].comments.length}</strong> Comment(s)</small> </a>
                                    </div>
                                </div>
                            </div>`;
                        } else {
                            postFeed.innerHTML += 
                            `<div class="m-auto">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="media d-inline-flex">
                                            <a href="/pages/profile.html?user=${filteredData[i].author.name}" class="d-inline-flex">
                                                <img src="${filteredData[i].author.avatar}" class="d-block ui-w-40 rounded-circle" alt="profile picture" width="50px" height="50px">
                                            </a>
                                            <div class="d-flex flex-column ps-2">
                                                <a href="/pages/profile.html?user=${filteredData[i].author.name}" class="text-dark text-decoration-none fw-bold"><div class="media-body">${filteredData[i].author.name}</div></a>
                                                <div class="text-muted small" role="button" title="${filteredData[i].created.substring(11,16)}">Posted ${filteredData[i].created.substring(0,10)}</div>
                                            </div>
                                        </div>
                                        <hr/ class="mt-2 mb-2">
                                        <a href="/pages/post.html?id=${filteredData[i].id}" class="text-dark text-decoration-none"><p class="fs-5 text m-0">${filteredData[i].title}</p><div>${filteredData[i].body.substring(0,300)}</div><img src="${filteredData[i].media}" class="mw-100 mt-2 shadow rounded d-block m-auto" style="max-height:400px;"></a>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between flex-column flex-sm-row">
                                        <a href="/pages/post.html?id=${filteredData[i].id}" class="d-inline-block text-muted text-decoration-none"> <small class="align-middle"> <strong>${filteredData[i].reactions.length}</strong> Reaction(s)</small> </a>
                                        <a href="/pages/post.html?id=${filteredData[i].id}" class="d-inline-block text-muted ml-3 text-decoration-none"> <small class="align-middle"> <strong>${filteredData[i].comments.length}</strong> Comment(s)</small> </a>
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
});*/