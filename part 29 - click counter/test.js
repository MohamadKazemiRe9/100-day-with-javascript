const scoreBoard = document.getElementById("score-board");
const container = document.getElementById("container");
const timer = document.getElementById("timer");
const timerMilliseconds = document.getElementById("milliseconds");
const timerSeconds = document.getElementById("seconds");
const record = document.getElementById("record");
const btnReset = document.getElementById("reset");

let counts = 0;
let clickNumbers = 0;

container.onclick = function(){
    if(clickNumbers == 0 && counts < 500){
        time();
        clickCounter();
    }else if(counts < 500){
        clickCounter();
    }
}

function clickCounter(){
    clickNumbers++;
    scoreBoard.childNodes[1].childNodes[1].innerText = clickNumbers;
}

function time(){
    let milliseconds = 0;
    timer.style.display = "block";
    let timing = setInterval(()=>{
        counts ++;
        milliseconds += 10;
        timerMilliseconds.innerText = milliseconds % 1000;
        timerSeconds.innerText = Math.floor(counts / 100);
        if( counts >= 500){
            clearInterval(timing);
            timerMilliseconds.innerText = "000";
            container.style.display = "none";
            timer.style.display = "none";
            record.childNodes[1].innerText = clickNumbers / 5;
            record.style.display = "block";
            btnReset.style.display = "block";
        }
    }, 10)
    
}


btnReset.onclick = function(){
    btnReset.style.display = "none";
    record.style.display = "none";
    container.style.display = "block";
    counts = 0;
    clickNumbers = 0;
    scoreBoard.childNodes[1].childNodes[1].innerText = 0;
}