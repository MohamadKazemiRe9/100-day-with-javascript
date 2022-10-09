'use strict';
const video = document.getElementById("video-scource");
const videoBackground = document.getElementById("video-background");

const videContainer = document.getElementsByClassName("video-palyer-container")[0];
const videoPlayBtn = document.getElementById("btn-play");
const videoPlayBtnIcon = document.querySelector("#btn-play>i");
const playPauseAnimate = document.getElementById("video-player-pause-animate");
const playPauseAnimateIcon = document.querySelector("#video-pause-icon>i");
const videoCover = document.getElementById("cover-all-video");
const videoProgressContainer = document.getElementById("video-player-progress-bar-container");
const videoProgressBar = document.getElementById("video-player-progress-bar");
// video time
const videoTotalTimeMinutes = document.getElementById("video-time-total-minutes");
const videoTotalTimeSeconds = document.getElementById("video-time-total-seconds");
const videoPassedTimeMinutes = document.getElementById("video-time-passed-minutes");
const videoPassedTimeSeconds = document.getElementById("video-time-passed-seconds");
// volume
const volumeContainer = document.getElementById("volume-container");
const volumeBtn = document.getElementById("volume-btn");
const volumeIcon = document.querySelector("#volume-btn>i");
const rangeVolume = document.getElementById("range-volume");
const volumeBoard = document.getElementById("volume-board-number");
const videoCanvas = document.getElementById("canvas");
// settings
const settingsBtn = document.querySelector("#setting-btn > i");
const settingsBoxContainer = document.getElementById("video-player-settings-box-container");
const settingsRows = document.getElementsByClassName("video-player-settings-row");
const settingsQualities = document.getElementById("video-player-settings-qualities-container");
const videoQualitiesRows = document.getElementsByClassName("video-player-settings-qualities-body-row");
// fullscreen
const fullscreenBtn = document.querySelector("#video-player-btn-fullscreen > i");

videoPlayBtn.addEventListener("click", function () {
    if (videoPlayBtnIcon.classList.contains("fa-play")) {
        videoPlay();
    } else {
        videoPause();
    }
});

videoCover.addEventListener("click", function () {
    if (videoPlayBtnIcon.classList.contains("fa-play")) {
        videoPlay();
    } else {
        videoPause();
    }
});


function videoPlay() {
    video.play();
    if (videoPlayBtnIcon.classList.contains("fa-play")) {
        videoPlayBtnIcon.classList.remove("fa-play");
        videoPlayBtnIcon.classList.add("fa-pause");
    } else {
        videoPlayBtnIcon.classList.remove("fa-pause");
        videoPlayBtnIcon.classList.add("fa-play");
    }
    // change play icon
    playPauseAnimateIcon.classList.remove("fa-pause");
    playPauseAnimateIcon.classList.add("fa-play");

    playPauseAnimate.classList.add("fade-animate");
    setTimeout(() => {
        playPauseAnimate.classList.remove("fade-animate");
    }, 1000);
}

function videoPause() {
    video.pause();
    if (videoPlayBtnIcon.classList.contains("fa-pause")) {
        videoPlayBtnIcon.classList.remove("fa-pause");
        videoPlayBtnIcon.classList.add("fa-play");
    } else {
        videoPlayBtnIcon.classList.remove("fa-play");
        videoPlayBtnIcon.classList.add("fa-pause");
    }
    // change play icon
    playPauseAnimateIcon.classList.remove("fa-play");
    playPauseAnimateIcon.classList.add("fa-pause");

    playPauseAnimate.classList.add("fade-animate");
    setTimeout(() => {
        playPauseAnimate.classList.remove("fade-animate");
    }, 500);
}

const isVideoPlaying = video => !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);

// progress bar

let videoInterval;

video.onplay = function () {
    videoInterval = setInterval(() => {
        let barWidth = video.currentTime / video.duration;
        progressBar(barWidth * 100);
        timePassed();
        videoCheckEnd();
    }, 20);
}

function progressBar(w) {
    videoProgressBar.style.width = `${w}%`
}


video.addEventListener("pause", function () {
    clearInterval(videoInterval);
})


// convert seconds to min and sec
function convertTime(seconds) {
    let min = 0;
    let sec = 0;
    min = seconds / 60;
    sec = seconds % 60;
    return [min, sec];
}

// set times
window.onload = function () {
    setTimeout(() => {
        video.volume = rangeVolume.value / 100;
        let videoTime = convertTime(video.duration);
        videoTotalTimeMinutes.innerText = parseInt(videoTime[0]);
        videoTotalTimeSeconds.innerText = parseInt(videoTime[1]);
    }, 500);
}

// time passed funcation
function timePassed(sec = null) {
    let videoTime;
    if (!sec) {
        videoTime = convertTime(video.currentTime);
    } else {
        videoTime = convertTime(sec);
    }
    videoPassedTimeMinutes.innerText = parseInt(videoTime[0]);
    if (parseInt(videoTime[1]) < 10) {
        videoPassedTimeSeconds.innerText = `0${parseInt(videoTime[1])}`;
    } else {
        videoPassedTimeSeconds.innerText = parseInt(videoTime[1]);
    }
}

// set valume
volumeContainer.addEventListener("mouseenter", function () {
    rangeVolume.style.display = "block";
})
volumeContainer.addEventListener("mouseleave", function () {
    rangeVolume.style.display = "none";
});

rangeVolume.addEventListener("input", function () {
    video.volume = this.value / 100;
    setVolumeIcon();
});


function setVolumeIcon() {
    if (video.volume > 0.50) {
        volumeIcon.className = "";
        volumeIcon.setAttribute("class", "fas fa-volume-up");
    }
    else if (video.volume <= 0.50 && video.volume > 0.01) {
        volumeIcon.className = "";
        volumeIcon.setAttribute("class", "fas fa-volume-down");
    } else {
        volumeIcon.className = "";
        volumeIcon.setAttribute("class", "fas fa-volume-off");
    }
    rangeVolume.style.background = `linear-gradient(to right, #e3e3e3 0%, #e3e3e3 ${rangeVolume.value}%, rgb(135, 135, 135) ${rangeVolume.value}%, rgb(135, 135, 135) 100%)`
}

let isMute = false;
let currentVolume;

volumeIcon.addEventListener("click", function(){
    if(!isMute){
        currentVolume = video.volume;
        video.volume = 0;
        volumeIcon.className = "";
        volumeIcon.classList.add("fas");
        volumeIcon.classList.add("fa-volume-mute");
        isMute = true;
    }else{
        video.volume = currentVolume;
        isMute = false;
        setVolumeIcon();
    }
    
});


window.addEventListener("keydown", function (e) {
    console.log(e.key)
    switch (e.key) {
        case "ArrowUp":
            rangeVolume.value = parseInt(rangeVolume.value) + 5;
            if (video.volume < 0.95) {
                video.volume = (video.volume * 100 + 5) / 100;
                volumeBoard.innerText = `${parseInt(video.volume * 100)}%`;
                volumeBoard.classList.add("fade-animate");
                this.setTimeout(() => {
                    volumeBoard.classList.remove("fade-animate");
                }, 500);
            } else {
                video.volume = 1;
                volumeBoard.innerText = `${parseInt(video.volume * 100)}%`;
                volumeBoard.classList.add("fade-animate");
                this.setTimeout(() => {
                    volumeBoard.classList.remove("fade-animate");
                }, 500);
            }
            setVolumeIcon();
            break;
        case "ArrowDown":
            rangeVolume.value -= 5;
            // for error (-)
            if (video.volume > 0.05) {
                video.volume -= 0.05;
                volumeBoard.innerText = `${parseInt(video.volume * 100)}%`;
                volumeBoard.classList.add("fade-animate");
                this.setTimeout(() => {
                    volumeBoard.classList.remove("fade-animate");
                }, 500);
            } else {
                video.volume = 0;
                volumeBoard.innerText = `${parseInt(video.volume * 100)}%`;
                volumeBoard.classList.add("fade-animate");
                this.setTimeout(() => {
                    volumeBoard.classList.remove("fade-animate");
                }, 500);
            }
            setVolumeIcon();
            break;
        case " ":
            if (isVideoPlaying(video)) {
                videoPause();
            } else {
                videoPlay();
            }
            break;
        case "ArrowRight":
            video.currentTime += 10;
            break;
        case "ArrowLeft":
            video.currentTime -= 10;
            break;
        case "Enter":
            fullscreenVideo(video);
            break;
    }
});

// check end video
function videoCheckEnd() {
    if (video.currentTime == video.duration) {
        video.pause();
        video.currentTime = 0;
        videoPassedTimeMinutes.innerText = "0";
        videoPassedTimeSeconds.innerText = "00";
        progressBar(0);
        videoPlayBtnIcon.className = "";
        videoPlayBtnIcon.classList.add("fas");
        videoPlayBtnIcon.classList.add("fa-play");
    }
}


// show preview
videoProgressContainer.addEventListener("mousemove", function (e) {
    this.style.height = "0.6em";
    let mousePosition = e.clientX;
    const distanceFromLeft = this.getBoundingClientRect().left;
    let clickedPositionProgress = mousePosition - distanceFromLeft;
    let progressContainerWidth = this.offsetWidth;
    let calcuteProgress = clickedPositionProgress / progressContainerWidth;
    this.style.background = `linear-gradient(to right, #e3e3e3 0%, #e3e3e3 ${calcuteProgress * 100}%, rgb(135, 135, 135) ${calcuteProgress * 100}%, rgb(135, 135, 135) 100%)`;
    videoCanvas.style.display = "block";
    
    if(calcuteProgress <= 0.5){
        videoCanvas.style.left = `${mousePosition}px`;
    }else{
        videoCanvas.style.left = `${mousePosition * (calcuteProgress - 0.32)}px`;
    }
    capture(calcuteProgress * video.duration)
});
videoProgressContainer.addEventListener("mouseleave", function () {
    this.style.height = "0.3em";
    this.style.background = ``;
    this.style.backgroundColor = "rgb(135, 135, 135)";
    videoCanvas.style.display = "none";
});


function capture(videoSecond) {
    videoBackground.currentTime = videoSecond;
    videoCanvas.width = videoBackground.videoWidth;
    videoCanvas.height = videoBackground.videoHeight;
    videoCanvas.getContext("2d")
        .drawImage(videoBackground, 0, 0, videoBackground.videoWidth, videoBackground.videoHeight);
}

// timeline video
videoProgressContainer.addEventListener("click", function (e) {
    let positionClicekd = e.clientX;
    const distanceFromLeft = this.getBoundingClientRect().left;
    let clickedPositionProgress = positionClicekd - distanceFromLeft;
    let progressContainerWidth = this.offsetWidth;
    let calcuteProgress = clickedPositionProgress / progressContainerWidth;
    video.currentTime = calcuteProgress * video.duration;
    // change red bar position
    progressBar(calcuteProgress * 100);
    // update passed time
    timePassed(calcuteProgress * video.duration);
});

// settings
let isActiveSettings = false;
settingsBtn.addEventListener("click", function () {
    if (!isActiveSettings) {
        this.style.transform = `rotatez(30deg)`;
        isActiveSettings = true;
        settingsBoxContainer.style.display = "block";
    } else {
        this.style.transform = `rotatez(-30deg)`;
        isActiveSettings = false;
        settingsBoxContainer.style.display = "none";
        settingsQualities.style.display = "none";
    }
});

settingsRows[1].addEventListener("click", function () {
    settingsBoxContainer.style.display = "none";
    settingsQualities.style.display = "grid";
});

for (let row of videoQualitiesRows) {
    row.addEventListener("click", function (e) {
        settingsQualities.style.display = "none";
        let quality = this.querySelector(".video-player-settings-qualities-body-row-items");
        changeQulaity(Number(quality.innerText.replace(/\D/g, '')));
    });
}

function changeQulaity(quality) {
    let videoCurrent = video.currentTime;
    const videoQualityDescription = document.getElementsByClassName("video-player-settings-box-desription")[1].querySelector("span");
    videoQualityDescription.innerHTML = `${quality}p <i class="fas fa-angle-right"></i>`
    video.pause();
    video.setAttribute("src", `./assets/test${quality}.mp4`);
    video.currentTime = videoCurrent;
    videoPlay();
    isActiveSettings = false;
    settingsBtn.style.transform = `rotatez(-30deg)`;
}




// fullscreen
function fullscreenVideo(video) {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) { /* Safari */
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE11 */
        video.msRequestFullscreen();
    }
}

fullscreenBtn.addEventListener("click", function(){
    fullscreenVideo(video);
})