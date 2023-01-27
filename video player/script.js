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

// canavs
const canavs = document.getElementById("canvas");
const videoBackground = document.getElementById("video-background");


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
        progressBarStyleWidth(barWith);
    }, 50);
}

function progressBarStyleWidth(w){
    videoProgressBar.style.width = `${w*100}%`;
}

videoProgressBarContainer.addEventListener("mousemove", function(e){
    this.style.height = "0.6em";
    let mousePositionX = e.clientX;
    let distanceFromLeft = this.getBoundingClientRect().left;
    let mousePointerFromLeft = mousePositionX - distanceFromLeft;
    let progressBarWidth = this.offsetWidth;
    let caclulateProgress = (mousePointerFromLeft / progressBarWidth)*100;
    this.style.background = `linear-gradient( to right, #fff 0%, #fff ${caclulateProgress}%, rgb(135, 135, 135) ${caclulateProgress}%, rgb(135, 135, 135) 100%)`;
    canavs.style.display = "block";
    canvasDrawImage((caclulateProgress / 100) * video.duration);
});

videoProgressBarContainer.addEventListener("mouseleave", function(){
    this.style.height = "0.3em";
    this.style.background = "";
    canavs.style.display = "none";
});

// preview
function canvasDrawImage(videoSecond){
    videoBackground.currentTime = videoSecond;
    canavs.width = videoBackground.videoWidth;
    canavs.height = videoBackground.videoHeight;
    canavs.getContext("2d").drawImage(videoBackground, 0, 0, videoBackground.videoWidth, videoBackground.videoHeight);
}


videoProgressBarContainer.addEventListener("click", function(e){
    let mousePositionX = e.clientX;
    let distanceFromLeft = this.getBoundingClientRect().left;
    let mousePointerFromLeft = mousePositionX - distanceFromLeft;
    let progressBarWidth = this.offsetWidth;
    let caclulateProgress = (mousePointerFromLeft / progressBarWidth);
    video.currentTime = video.duration * caclulateProgress;
    videoProgressBar.style.width = `${caclulateProgress*100}%`;
    timePassed();
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

// keys
window.addEventListener("keydown", function(e){
    // console.log(e.key)
    switch(e.key){
        case "ArrowRight":
            video.currentTime += 5;
            timePassed();
            progressBarStyleWidth(video.currentTime / video.duration);
            break;
        case "ArrowLeft":
            video.currentTime -= 5;
            timePassed();
            progressBarStyleWidth(video.currentTime / video.duration);
            break;
        case "ArrowUp":
            if(video.volume < 0.9){
                let vol = video.volume + 0.1;
                vol.toFixed(2);
                video.volume = vol;
                setVolumeIcon();
                volumeRange.value = Number(volumeRange.value) + 10;
                console.log(volumeRange.value)
                volumeRange.style.background = `linear-gradient(to right, #e3e3e3 0%, #e3e3e3 ${volumeRange.value}%, rgb(135, 135, 135) ${volumeRange.value}%, rgb(135, 135, 135) 100%)`;
            }else{
                video.volume = 1;
                setVolumeIcon();
                volumeRange.value = 100;
                volumeRange.style.background = `linear-gradient(to right, #e3e3e3 0%, #e3e3e3 ${volumeRange.value}%, rgb(135, 135, 135) ${volumeRange.value}%, rgb(135, 135, 135) 100%)`;
            }
            break;
        case "ArrowDown":
            if(video.volume > 0.1){
                let vol = video.volume - 0.1;
                vol.toFixed(2);
                video.volume = vol;
                setVolumeIcon();
                volumeRange.value -= 10;
                volumeRange.style.background = `linear-gradient(to right, #e3e3e3 0%, #e3e3e3 ${volumeRange.value}%, rgb(135, 135, 135) ${volumeRange.value}%, rgb(135, 135, 135) 100%)`;
            }else{
                video.volume = 0;
                setVolumeIcon();
                volumeRange.value = 0;
                volumeRange.style.background = `linear-gradient(to right, #e3e3e3 0%, #e3e3e3 ${volumeRange.value}%, rgb(135, 135, 135) ${volumeRange.value}%, rgb(135, 135, 135) 100%)`;
            }
            break;
        case " ":
            videoPlay();
            break;
        case "Enter":
            fullscreenFunction(video);
            break;
    }
});

// fullscreen
const fullscreenIcon = document.querySelector("#video-player-btn-fullscreen > i");
fullscreenIcon.addEventListener("click", function(){
    fullscreenFunction(video);
});


function fullscreenFunction(vid){
    if (vid.requestFullscreen) {
        vid.requestFullscreen();
    } else if (vid.webkitRequestFullscreen) { /* Safari */
        vid.webkitRequestFullscreen();
    } else if (vid.msRequestFullscreen) { /* IE11 */
        vid.msRequestFullscreen();
    }
}

// settings
const settingsBtn = document.querySelector("#setting-btn > i");
const settingBoxContainer = document.getElementById("video-player-settings-box-container");
const settingRows = document.getElementsByClassName("video-player-settings-row");
const settingsQulaityContainer = document.getElementById("video-player-settings-qualities-container");
const videoQualityRows = document.getElementsByClassName("video-player-settings-qualities-body-row");

let isActiveSetting = false;
settingsBtn.addEventListener("click", function(){
    if(!isActiveSetting){
        this.style.transform = "rotateZ(30deg)";
        settingBoxContainer.style.display = "block";
        isActiveSetting = true;
    }else{
        this.style.transform = "rotateZ(-30deg)";
        settingBoxContainer.style.display = "none";
        isActiveSetting = false;
    }
});

settingRows[1].addEventListener("click", function(){
    settingBoxContainer.style.display = "none";
    settingsQulaityContainer.style.display = "block";
});

for(let row of videoQualityRows){
    row.addEventListener("click", function(){
        settingsQulaityContainer.style.display = "none";
        let quality = this.querySelector(".video-player-settings-qualities-body-row-items");
        changeQuality(quality.innerText.replace(/\D/g, ""))
    });
}

function changeQuality(q){
    let current = video.currentTime;
    video.setAttribute("src", `./assets/test${q}.mp4`);
    video.currentTime = current;
    isActiveSetting = false;
    settingsBtn.style.transform = "rotateZ(-30deg)";
}