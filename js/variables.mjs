// queryString variables
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const postId = params.get("id");
const profileUserName = params.get("user");
export { queryString, params, postId, profileUserName };

// Post feed variable
const postFeed = document.querySelector("#post-feed");
export { postFeed };

// API url variables
const apiUrlPostId = "https://nf-api.onrender.com/api/v1/social/posts/" + postId;
const urlPostsAll = "https://nf-api.onrender.com/api/v1/social/posts/?_author=true&_comments=true&_reactions=true";
const urlPostsMain = "https://nf-api.onrender.com/api/v1/social/posts?_author=true&_comments=true&_reactions=true";
const urlPosts = "https://nf-api.onrender.com/api/v1/social/posts/";
export { apiUrlPostId, urlPostsMain, urlPostsAll, urlPosts };

// LocalStorage variables
const userToken = "Bearer " + localStorage.getItem("accessToken");
const userName = localStorage.getItem("userName");
export { userToken, userName };

// Fetch get with url parameter
/*const response1 = await fetch(`${url}`, {
    method: "GET",
    headers: {
        "Authorization": userToken
    },
});
// Fetch post with url variable
const response2 = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(sendBody),
    headers: {
        "Authorization": userToken,
        "Content-Type": "application/json"
    },
});
export { response1, response2 };*/

// Create post variables
const postTitle = document.querySelector("#post-title");
const postBody = document.querySelector("#post-body");
const postMedia = document.querySelector("#post-media");
const postBtn = document.querySelector("#post-btn");
const postError = document.querySelector("#post-error");
export { postTitle, postBody, postMedia, postBtn, postError };

// Create post mobile variables
const postTitleInputMobile = document.querySelector("#post-title-mobile");
const postBodyInputMobile = document.querySelector("#post-body-mobile");
const postMediaInputMobile = document.querySelector("#post-media-mobile");
const postErrorMobile = document.querySelector("#title-body-error-mobile");
const postMediaErrorMobile = document.querySelector("#media-error-mobile");
const mobileMenu = document.querySelector("#mobilemenu");
const postModalMobile = document.querySelector("#create-post-modal-mobile");
const openPostModalBtnMobile = document.querySelector("#open-create-post-modal-btn-mobile");
const createPostModalMobile = document.querySelector("#create-post-btn-mobile");
const cancelBtnMobile = document.querySelector("#cancel-btn-mobile");
export { postTitleInputMobile, postBodyInputMobile, postMediaInputMobile, postErrorMobile, postMediaErrorMobile, mobileMenu, postModalMobile, openPostModalBtnMobile, createPostModalMobile, cancelBtnMobile };

// Login & register variables
// Inputs
const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login-password");
const regName = document.querySelector("#reg-name");
const regEmail = document.querySelector("#reg-email");
const regPassword = document.querySelector("#reg-password");
export { loginEmail, loginPassword, regName, regEmail, regPassword };
// Error messages
const loginError = document.querySelector("#login-error");
const nameError = document.querySelector("#name-error")
const emailError1 = document.querySelector("#email-error1")
const emailError2 = document.querySelector("#email-error2")
const regPasswordError = document.querySelector("#password-error");
const regError = document.querySelector("#reg-error");
// Success message
const regSuccess = document.querySelector("#reg-success");
// Logged in variables
const loggedOutDisplay = document.querySelector(".logged_out_nav");
const loggedInDisplay = document.querySelector(".logged_in_nav");
export { loginError, nameError, emailError1, emailError2, regPasswordError, regError, regSuccess, loggedOutDisplay, loggedInDisplay };

// Edit post variables
const editPostTitleInput = document.querySelector("#edit-post-title");
const editPostBodyInput = document.querySelector("#edit-post-body");
const editPostMediaInput = document.querySelector("#edit-post-media");
const editPostError = document.querySelector("#title-body-error");
const editMediaError = document.querySelector("#media-error");
const fieldsEmpty = document.querySelector("#fields-empty");
const editPostModal = document.querySelector("#edit-post-modal");
export { editPostTitleInput, editPostBodyInput, editPostMediaInput, editPostError, editMediaError, fieldsEmpty, editPostModal };

// Search variables
const noResultsMessage = document.querySelector("#no-results-message");
const searchFooter = document.querySelector("#search-footer");
// Searchbar variables
const srcBar = document.querySelector("#search-input");
const srcBtn = document.querySelector("#search-button");
export { noResultsMessage, searchFooter, srcBar, srcBtn };

// Profile variables
const userPostFeed = document.querySelector("#user-post-feed");
const profileUrl = "https://nf-api.onrender.com/api/v1/social/profiles/" + profileUserName + "?_posts=true&_following=true&_followers=true";
const profile = document.querySelector("#profile-main");
// My profile variable
const myName = localStorage.getItem("userName");
export { userPostFeed, profileUrl, profile, myName };

// Post variables
const postUrl = "https://nf-api.onrender.com/api/v1/social/posts/" + postId + "?_author=true&_comments=true&_reactions=true";
const commentsContainer = document.querySelector("#comments-container");
const postCommentBtn = document.querySelector("#post-comment-btn");
export { postUrl, commentsContainer, postCommentBtn }

// Post feed variables
const sortByOldest = document.querySelector("#sort-oldest");
const sortByRecent = document.querySelector("#sort-recent");
const filterByMedia = document.querySelector("#filter-media");
const filterByText = document.querySelector("#filter-text");
export { sortByOldest, sortByRecent, filterByMedia, filterByText };