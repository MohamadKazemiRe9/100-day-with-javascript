const wordsArray = ["hello", "world", "python", "glad", "yourself", "there", "are", "also", "words", "you", "already", "know", "for", "instance", "the", "latest", "update", "of", "the", "oxford", "english", "dictionary", "added", "new", "english", "like", "banana", "bread"];
const words = document.getElementById("words");
const timerContainer = document.querySelector("#timer>span");
const inputText = document.getElementById("test-input");
const listOfWords = document.getElementsByClassName("word");
const recordChar = document.getElementById("record-characters");
const recordWord = document.getElementById("record-word");

window.onload = function(){
    for(let txt of wordsArray){
        let word = document.createElement("div");
        word.setAttribute("class", "word");
        word.innerText = txt;
        words.appendChild(word);
    }
}

inputText.onkeydown = function(e){
    if(e.keyCode == 8){
        e.preventDefault();
    }
}

let wordsCounter = 0;

inputText.onkeyup = function(e){
    timer();
    let charInput = String.fromCharCode(e.keyCode).toLowerCase();
    let firstChar = listOfWords[wordsCounter].innerText[0];
    if(charInput === firstChar){
        listOfWords[wordsCounter].innerText = listOfWords[wordsCounter].innerText.replace(firstChar, "");
        recordChar.innerText = Number(recordChar.innerText) + 1;
        if(listOfWords[wordsCounter].innerText.length == 0){
            wordsCounter++;
            inputText.value += " ";
            recordWord.innerText = Number(recordWord.innerText) + 1;
        }
        inputText.style.color = "green";
    }else{
        if(e.keyCode !== 8){
            inputText.style.color = "red";
        }
    }
}



function timer(){
    let currentTime = Number(timerContainer.innerText);
    let time = setInterval(()=>{
        currentTime -= 1;
        if(currentTime == 0){
            clearInterval(time);
            let timerBox = document.querySelector("#timer");
            timerBox.style.backgroundColor = "red";
            timerBox.style.color = "#fff";
            inputText.disabled = true;
        }
        timerContainer.innerText = currentTime;
    }, 1000);
}