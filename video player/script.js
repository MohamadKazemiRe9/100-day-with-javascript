"use strict";
const video = document.getElementById("video-scource");

const videoPlayBtn = document.querySelector("#btn-play");
const videoPlayBtnIcon = document.querySelector("#btn-play>i");

const videoPlayPauseAnimate = document.getElementById("video-player-pause-animate");
const videoPlayPauseAnimateIcon = document.querySelector("#video-pause-icon>i");
const videoCover = document.getElementById("cover-all-video");

const videoProgressBar = document.getElementById("video-player-progress-bar");
const videoProgressBarContainer = document.getElementById("video-player-progress-bar-container");

// time
const videoTimeTotalMinute = document.getElementById("video-time-total-minutes");
const videoTimeTotalSecond = document.getElementById("video-time-total-seconds");
const videoTimePassedMinute = document.getElementById("video-time-passed-minutes");
const videoTimePassedSecond = document.getElementById("video-time-passed-seconds");


videoPlayBtn.addEventListener("click", function(){
    videoPlay();
});

videoCover.addEventListener("click", () => {
    videoPlay();
})

function videoPlay(){
    if(videoPlayBtnIcon.classList.contains("fa-play")){
        video.play();
        videoPlayBtnIcon.classList.remove("fa-play");
        videoPlayBtnIcon.classList.add("fa-pause");
        videoPlayPauseAnimateIcon.classList.remove("fa-play");
        videoPlayPauseAnimateIcon.classList.add("fa-pause");

        let timingPassed = setInterval(()=>{
            timePassed();
        }, 200)
    }else{
        video.pause();
        videoPlayBtnIcon.classList.remove("fa-pause");
        videoPlayBtnIcon.classList.add("fa-play");
        videoPlayPauseAnimateIcon.classList.remove("fa-pause");
        videoPlayPauseAnimateIcon.classList.add("fa-play");

        clearInterval(timingPassed);
    }
    videoPlayPauseAnimate.classList.add("fade-animate");
    setTimeout(() => {
        videoPlayPauseAnimate.classList.remove("fade-animate");
    }, 1000);
}



video.onplay = function(){
    setInterval(()=>{
        let barWith = video.currentTime/video.duration;
        videoProgressBar.style.width = `${barWith*100}%`;
    }, 50);
}


videoProgressBarContainer.addEventListener("mousemove", function(e){
    this.style.height = "0.6em";
    let mousePositionX = e.clientX;
    let distanceFromLeft = this.getBoundingClientRect().left;
    let mousePointerFromLeft = mousePositionX - distanceFromLeft;
    let progressBarWidth = this.offsetWidth;
    let caclulateProgress = (mousePointerFromLeft / progressBarWidth)*100;
    this.style.background = `linear-gradient( to right, #fff 0%, #fff ${caclulateProgress}%, rgb(135, 135, 135) ${caclulateProgress}%, rgb(135, 135, 135) 100%)`;
});

videoProgressBarContainer.addEventListener("mouseleave", function(){
    this.style.height = "0.3em";
    this.style.background = "";
});

videoProgressBarContainer.addEventListener("click", function(e){
    let mousePositionX = e.clientX;
    let distanceFromLeft = this.getBoundingClientRect().left;
    let mousePointerFromLeft = mousePositionX - distanceFromLeft;
    let progressBarWidth = this.offsetWidth;
    let caclulateProgress = (mousePointerFromLeft / progressBarWidth);
    video.currentTime = video.duration * caclulateProgress;
    videoProgressBar.style.width = `${caclulateProgress*100}%`;
});

function convertVideoTimeFormat(seconds){
    let min = 0;
    let sec = 0;
    min = parseInt(seconds / 60);
    sec = parseInt(seconds % 60);
    if(sec < 10){
        sec = `0${sec}`;
    }
    return [min, sec];
}

// set total time
window.onload = function(){
    setTimeout(()=>{
        let result = convertVideoTimeFormat(parseInt(video.duration));
        videoTimeTotalMinute.innerText = result[0];
        videoTimeTotalSecond.innerText = result[1];
    }, 500);
}

// set passed time
function timePassed(){
    let result = convertVideoTimeFormat(video.currentTime);
    videoTimePassedMinute.innerText = result[0];
    videoTimePassedSecond.innerText = result[1];
}


// volume
const volumeContainer = document.getElementById("volume-container");
const volumeBtn = document.getElementById("volume-container");
const volumeIcon = document.querySelector("#volume-btn>i");
const volumeRange = document.getElementById("range-volume");

volumeContainer.addEventListener("mouseenter", function(){
    volumeRange.style.display = "block";
});

volumeContainer.addEventListener("mouseleave", function(){
    volumeRange.style.display = "none";
});

volumeRange.addEventListener("input", function(){
    video.volume = this.value / 100;
    setVolumeIcon();
    this.style.background = `linear-gradient(to right, #e3e3e3 0%, #e3e3e3 ${this.value}%, rgb(135, 135, 135) ${this.value}%, rgb(135, 135, 135) 100%)`;
});

function setVolumeIcon(){
    if(video.volume > 0.5){
        volumeIcon.className = "";
        volumeIcon.setAttribute("class", "fas fa-volume-up");
    }
    else if(video.volume <= 0.5 && video.volume > 0.01 ){
        volumeIcon.className = "";
        volumeIcon.setAttribute("class", "fas fa-volume-down");
    }else{
        volumeIcon.className = "";
        volumeIcon.setAttribute("class", "fas fa-volume-off");
    }
}


volumeIcon.addEventListener("click", function(){
    if(!video.muted){
        video.muted = true;
        volumeIcon.className = "";
        volumeIcon.setAttribute("class", "fas fa-volume-mute")
    }else{
        video.muted = false;
        setVolumeIcon();
    }
});