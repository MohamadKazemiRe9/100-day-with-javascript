const media = document.getElementById("audio-scource");
// play button
const btnPlay = document.getElementById("btn-play");
// forward and backward
const btnForward = document.getElementById("media-forward-main");
const btnBackward = document.getElementById("media-backward-main");
// total time
const timeTotalMinutes = document.getElementById("media-time-total-minutes");
const timeTotalSeconds = document.getElementById("media-time-total-seconds");
// time passed
const timePassedMinutes = document.getElementById("media-time-past-minutes");
const timePassedSeconds = document.getElementById("media-time-past-seconds");
// progress bar
const progressBarContainer = document.getElementById("media-progress-container");
const progressBar = document.getElementById("media-progress");
// stop
const stopBtn = document.getElementById("media-stop");
// loop
const btnLoop = document.querySelector("#media-repeat > img");
// music select
const musicSelect = document.getElementById("music-select");
const musicSelectImage = document.getElementById("music-select-image");



btnPlay.addEventListener("click", function () {
    if (media.paused) {
        playingMusic();
    } else {
        pauseMusic();
    }

})

let callTimer;

function playingMusic() {
    media.play();
    btnPlay.setAttribute("src", "./assets/pause.png");
    btnPlay.classList.add("animate__flipInY");
    setTimeout(() => {
        btnPlay.classList.remove("animate__flipInY");
    }, 500);
    callTimer = setInterval(()=>{
        timePassed();
        progressWidth((media.currentTime / media.duration)*100);
        if(media.ended){
            mediaStop();
        }
    }, 50);
}

function pauseMusic() {
    media.pause();
    btnPlay.setAttribute("src", "./assets/play.png");
    btnPlay.classList.add("animate__flipInY");
    setTimeout(() => {
        btnPlay.classList.remove("animate__flipInY");
    }, 500);
    clearInterval(callTimer);
}

// foward
btnForward.addEventListener("click", function(){
    media.currentTime += 10;
    timePassed();
    progressWidth((media.currentTime / media.duration)*100);
});

btnBackward.addEventListener("click", function(){
    media.currentTime -= 10;
    timePassed();
    progressWidth((media.currentTime / media.duration)*100);
});

// total time
window.onload = function(){
    musicOnload();
}

function musicOnload(){
    setTimeout(()=>{
        let result = converSecondsToTime(Math.round(media.duration));
        let min = result[0];
        let sec = result[1];
        timeTotalMinutes.innerText = min;
        timeTotalSeconds.innerText = sec;
    }, 200);
}

function converSecondsToTime(sec){
    let minutes = timeFixed(parseInt(sec / 60));
    let seconds = timeFixed(sec % 60);
    return [minutes, seconds];
}

function timeFixed(num){
    if(num < 10){
        return `0${num}`
    }
    return num
}

function timePassed(){
    let result = converSecondsToTime(Math.round(media.currentTime));
    timePassedMinutes.innerText = result[0];
    timePassedSeconds.innerText = result[1];
}


function progressWidth(w){
    progressBar.style.width = `${w}%`;
}

stopBtn.addEventListener("click", function(){
    mediaStop();
});

function mediaStop(){
    pauseMusic();
    media.currentTime = 0;
    timePassed();
    progressWidth(0);
}


let isActiveLoop = false;

btnLoop.addEventListener("click", function(){
    if(!isActiveLoop){
        this.classList.add("media-active");
        isActiveLoop = true;
        media.loop = true;
    }else{
        this.classList.remove("media-active");
        isActiveLoop = false;
        media.loop = false;
    }
})

// progress bar container
progressBarContainer.addEventListener("click", function(e){
    let clickPosition = e.clientX;
    let distanceFromLeft = this.getBoundingClientRect().left;
    let clickPostionContainer = clickPosition - distanceFromLeft;
    let progressContainerWidth = this.offsetWidth;
    let calcuteProgressClicked = clickPostionContainer / progressContainerWidth;
    progressWidth(calcuteProgressClicked * 100);
    media.currentTime = (calcuteProgressClicked * media.duration);
    timePassed();
});

// select music
musicSelectImage.addEventListener("click", ()=>{
    musicSelect.click();
});

musicSelect.addEventListener("change", function(){
    mediaStop();
    let file = this.files[0];
    let URL = window.URL || window.webkitURL;
    let fileURL = URL.createObjectURL(file);
    media.setAttribute("src", fileURL);
    musicOnload();
});
