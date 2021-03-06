const instance = "hix2e1rlv5";
const baseUrl = `https://${instance}.execute-api.us-east-1.amazonaws.com/dev`;

const inDev = process.env.NODE_ENV === "development";

export function getApi(path = "", callback) {
  const options = {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      Authorization: localStorage.getItem("token"),
      //'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  /*
  fetch('flowers.jpg')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    return response.blob();
  })
  .then(myBlob => {
    myImage.src = URL.createObjectURL(myBlob);
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
  */

  fetch(baseUrl + path, options)
    .then((res) => res.json())
    .then((data) => {
      if (inDev)
        console.log(`${path} returned ${JSON.stringify(data, null, 2)}`);
      callback(null, data);
    })
    .catch((err) => {
      console.log(`error is ${JSON.stringify(err, null, 2)}`);
      callback(err);
    });
}

export async function postApi(path = "", data = {}, callback) {
  // Default options are marked with *
  const options = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
      //'Content-Type': 'application/x-www-form-urlencoded',
    },
    //redirect: 'follow', // manual, *follow, error
    //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };
  console.log(JSON.stringify(options));
  fetch(baseUrl + path, options)
    .then((res) => res.json())
    .then((data) => {
      if (inDev)
        console.log(`${path} returned ${JSON.stringify(data, null, 2)}`);
      callback(null, data);
    })
    .catch((err) => callback(err));
}
