const media = document.getElementById("audio-scource");
const mediaTimePastMinutes = document.getElementById("media-time-past-minutes");
const mediaTimePastSeconds = document.getElementById("media-time-past-seconds");
const mediaTimeTotalMinutes = document.getElementById("media-time-total-minutes");
const mediaTimeTotalSeconds = document.getElementById("media-time-total-seconds");
const mediaProgress = document.getElementById("media-progress");
const mediaBackwardBtn = document.getElementById("media-backward-main");
const mediaForwardBtn = document.getElementById("media-forward-main");
const mediaRepeatBtn = document.getElementById("media-repeat");
const mediaStopBtn = document.getElementById("media-stop");

const btnPlay = document.getElementById("btn-play");

window.onload = function(){
    setTimeout(() => {
        let seconds;
        let minutes;
        seconds = secondToTime(media.duration)[0];
        minutes = secondToTime(media.duration)[1];
        mediaTimeTotalSeconds.innerText = seconds;
        mediaTimeTotalMinutes.innerText = minutes;
    }, 500);
}

btnPlay.addEventListener("click", function(){
    if(media.paused){
        media.play();
        this.setAttribute("src", "./assets/pause.png");
        this.classList.add("animate__flipInY");
        setInterval(() => {
            timePass(media.currentTime);
            mediaProgressBar((media.currentTime / media.duration)*100);
        }, 1000);
        setTimeout(()=>{
            this.classList.remove("animate__flipInY");
        }, 500);
    }else{
        media.pause();
        this.setAttribute("src", "./assets/play.png");
        this.classList.add("animate__flipInY");
        setTimeout(()=>{
            this.classList.remove("animate__flipInY");
        }, 500);
    }
});

mediaBackwardBtn.addEventListener("click", function(){
    changeCurrent(-1);
    this.classList.add("animate__rubberBand");
    console.log(this.classList)
    setTimeout(()=>{
        this.classList.remove("animate__rubberBand");
    }, 500);
});

mediaForwardBtn.addEventListener("click", function(){
    changeCurrent(+1);
    this.classList.add("animate__rubberBand");
    console.log(this.classList)
    setTimeout(()=>{
        this.classList.remove("animate__rubberBand");
    }, 500);
})

function changeCurrent(side){
    if (side < 0){
        if (media.currentTime < side*15){
            media.currentTime = 0;
        }else{
            media.currentTime -= 10;
        }
    }
    else{
        if(media.duration < media.currentTime + side*10){
            media.currentTime = media.duration;
        }else{
            media.currentTime += 10;
        }
    }
}


function mediaProgressBar(width){
    mediaProgress.style.width = `${width}%`;
}

function timePass(){
        let seconds;
        let minutes;
        seconds = secondToTime(media.currentTime)[0];
        minutes = secondToTime(media.currentTime)[1];
        mediaTimePastSeconds.innerText = seconds;
        mediaTimePastMinutes.innerText = minutes;
}

function secondToTime(seconds){
    let sec = Number(seconds);

    let min = parseInt(sec / 60);
    let resultSeconds = parseInt(sec % 60);
    if (resultSeconds < 10){
        resultSeconds = `0${resultSeconds}`;
    }
    if (min < 10){
        min = `0${min}`;
    }
    return [resultSeconds, min];
}

mediaRepeatBtn.addEventListener("click", function(){
    const img = this.querySelector("img");
    if(!media.loop){
        img.classList.add("media-active");
        media.loop = true;
    }else{
        img.classList.remove("media-active");
        media.loop = false;
    }
});


mediaStopBtn.addEventListener("click", ()=>{
    mediaStop();
});

function mediaStop(){
    mediaTimePastMinutes.innerText = "00";
    mediaTimePastSeconds.innerText = "00";
    mediaProgress.style.width = 0;
    media.pause();
    media.currentTime = 0;
    btnPlay.setAttribute("src","./assets/play.png")
}