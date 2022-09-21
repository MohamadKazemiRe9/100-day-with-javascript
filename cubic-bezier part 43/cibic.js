"use strict";
const inputs = document.querySelectorAll(".input-container>input");
const btnStart = document.getElementById("btn-start");
const testOne = document.getElementById("test1");
const testTwo = document.getElementById("test2");
const btnCopy = document.getElementById("btn-copy");
const duration = document.getElementById("duration");
const durationSeconds = document.getElementById("duration-seconds");
const patterns = document.querySelectorAll(".select-for-another>button");
let pattern = "linear";

let [p0, p1, p2, p3] = [1, 1, 1, 1];
let isStart = false;

for (let input of inputs){
    input.addEventListener("keyup", function(){
        if (Number(inputs[0].value) > 1 || Number(inputs[2].value) > 1 || Number(inputs[0].value) < 0 || Number(inputs[2].value) < 0){
            input.value = "";
        }
        else{
            p0 = Number(inputs[0].value);
            p1 = Number(inputs[1].value);
            p2 = Number(inputs[2].value);
            p3 = Number(inputs[3].value);
        }
    });
}

btnStart.addEventListener("click", function(){
    testOne.style.transition = `all ${duration.value}s ${pattern}`;
    testTwo.style.transition = `all ${duration.value}s cubic-bezier(${p0}, ${p1}, ${p2}, ${p3})`;
    if (!isStart){
        isStart = true;
        testOne.style.transform = "translateX(1000%)";
        testTwo.style.transform = "translateX(1000%)";
    }else{
        isStart = false;
        testOne.style.transform = "translateX(0%)";
        testTwo.style.transform = "translateX(0%)";
    }
});

btnCopy.addEventListener("click", function(){
    window.navigator.clipboard.writeText(`cubic-bezier(${p0}, ${p1}, ${p2}, ${p3})`);
});

duration.addEventListener("change", function(){
    if(Number(duration.value) == 1){
        durationSeconds.innerText = `${this.value} second`;
    }else{
        durationSeconds.innerText = `${this.value} seconds`;
    }
});

for(let btn of patterns){
    btn.addEventListener("click", function(){
        removeActive();
        this.classList.add("btn-adctive");
        pattern = btn.innerText;
    });
}

function removeActive(){
    for(let btn of patterns){
        if (btn.classList.contains("btn-adctive")){
            btn.classList.remove("btn-adctive");
        }
    }
}