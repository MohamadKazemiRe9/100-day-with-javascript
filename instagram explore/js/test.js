'use strict';
const container = document.getElementsByClassName("container")[0];
const modalContainer = document.getElementsByClassName("modal-container")[0];
const postContainer = document.getElementsByClassName("post-container")[0];
let images;
let page_num = 2;
let flag = true;

window.onload = function () {
    new Promise(function (resolve, reject) {
        let req = new XMLHttpRequest();
        req.open("GET", `https://api.unsplash.com/photos?q=40&per_page=20&page=${page_num}&client_id=0DrCbYTgRx-3eYRB23AeBgBZ08xNATMPTyMS7wurQls`);
        req.onload = function () {
            if (req.status == 200) {
                resolve(req.response);
            } else {
                reject(req.response)
            }
        };
        req.send();
    })
        .then(function (value) {
            let data = JSON.parse(value);
            createImages(data);
            page_num++;
        })
        .catch(function (err) {
            console.log(err);
        })
}

window.onscroll = function () {
    // alert((window.scrollY >= window.innerHeight * 0.9))
    console.log(window.innerHeight);
    console.log(window.scrollY)
    if ((window.scrollY >= window.innerHeight * 0.6) && flag) {
        new Promise(function (resolve, reject) {
            flag = false
            let req = new XMLHttpRequest();
            req.open("GET", `https://api.unsplash.com/photos?per_page=10&page=${page_num}&client_id=0DrCbYTgRx-3eYRB23AeBgBZ08xNATMPTyMS7wurQls`);
            req.onload = function () {
                if (req.status == 200) {
                    resolve(req.response);
                } else {
                    reject(req.response)
                }
            };
            req.send();
        })
            .then(function (value) {
                let data = JSON.parse(value);
                createImages(data);
                setTimeout(() => {
                    page_num++;
                    flag = true;
                }, 3000);
            })
            .catch(function (err) {
                console.log(err);
            })
    }
}


function createImages(data) {
    for (let i = 0; i < data.length; i++) {
        let elm = document.createElement("div");
        elm.setAttribute("class", "test");
        container.appendChild(elm);
        let img = document.createElement("img");
        img.setAttribute("src", data[i].urls.full);
        img.setAttribute("desc", data[i].user.bio);
        img.setAttribute("title", data[i].user.username);
        img.setAttribute("height", "100%");
        img.setAttribute("width", "100%");
        elm.appendChild(img);
    }
    images = document.querySelectorAll(".test>img");
    showPost(images)
}

function showPost(images){
    for(let img of images){
        img.addEventListener("click", function(){
            let imageSource = this.getAttribute("src");
            let imageDescription = this.getAttribute("desc");
            let imageTitle = this.getAttribute("title");
            postContainer.querySelector("img").setAttribute("src",imageSource);
            postContainer.querySelector(".post-description>p").innerText = imageDescription;
            postContainer.querySelector(".post-title").innerText = imageTitle;
            modalContainer.style.display = "block";
            postContainer.style.display = "block";
        });
    }
}

modalContainer.addEventListener("click", function(){
    modalContainer.style.display = "none";
    postContainer.style.display = "none";
})