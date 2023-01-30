// There are several ways to use AJAX in vanilla JavaScript:

// The XMLHttpRequest object, which is a built-in JavaScript object that allows you to make HTTP requests. This is the most common method of using AJAX in vanilla JavaScript.

// The fetch() method, which is a modern method for making HTTP requests. It is supported by most modern browsers and is similar to using XMLHttpRequest.

// The async and await keywords, which allow you to write asynchronous code in a more synchronous-looking style. This can make your code easier to read and understand.

// Third-party libraries such as axios, which can make it easier to perform common AJAX tasks such as making GET and POST requests, handling errors, and working with JSON data.

// use of Jquery ajax() method which is very similar to XMLHttpRequest and fetch(), but provides some additional features and conveniences.
//

const postContainer = document.getElementById("post-list");

function sendRequestAjax(page){
    fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "GET",
})
.then(res => res.json())
    .then(data => {
        for (let post of data.slice(page*10, (page+1)*10)) {
            postContainer.innerHTML += `<div class="post" *ngFor="let post of posts">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
    </div>`;
        }
        isAjax = false;
    })
    .catch(err => console.log(err));
}
sendRequestAjax(0);

let pageNumber = 1;
let isAjax = false;

window.addEventListener("scroll", function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isAjax) {
        isAjax = true;
        sendRequestAjax(pageNumber);
        pageNumber++;
    }
});



function sendPostAjaxRequest(){
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method:"POST",
        body: JSON.stringify({
            title:"new post",
            body: "body of new post just for test",
            userId: 8,
        }),
        headers:{
            'Content-type':'application/json; charset=UTF-8',
        }
    }).then(res => res.json()).then(data => console.log(data));
}

sendPostAjaxRequest();
