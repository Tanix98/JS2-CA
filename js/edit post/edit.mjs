import {getUrl} from "variables.mjs";

async function getApi(url, method, postId, data) {
  try{
    const response = await fetch(`${url}/posts/${postId}`, {
      method: method,
      body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    const result = await response.json();
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

const myData = {
    title: 'edited',
};

getApi(getUrl(), "PATCH", 7, myData);