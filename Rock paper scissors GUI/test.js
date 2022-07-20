const btnStart = document.getElementsByClassName("btn-start")[0];
const GameBoard = document.getElementsByClassName("gameboard")[0];
const btnGame = document.getElementsByClassName("game-btn");
const winner = document.querySelector("#winner > span");
const scoreUser = document.getElementById("player-score-number");
const scoreCpu = document.getElementById("computer-score-number");

btnStart.addEventListener("click", function(){
    this.style.display="none";
    GameBoard.style.display = "block";
});

function createRandom(){
    let randNumber = Math.floor(Math.random()*3);
    return randNumber;
}

function clear(){
    for (let btn of btnGame){
        btn.childNodes[1].classList.add("img");
        if (btn.childNodes[1].classList.contains("active-player")){
            btn.childNodes[1].classList.remove("active-player");
        }
        if(btn.childNodes[1].classList.contains("active-cpu")){
            btn.childNodes[1].classList.remove("active-cpu");
        }
        btn.childNodes[1].classList.remove("active-draw");
    }
}


for (let i in btnGame){
    btnGame[i].addEventListener("click", function(){
        clear();
        let computerSelect = createRandom();

        if (i != computerSelect){
            btnGame[i].childNodes[1].classList.remove("img");
            btnGame[i].childNodes[1].classList.add("active-player");
            btnGame[computerSelect].childNodes[1].classList.add("active-cpu");
            btnGame[computerSelect].childNodes[1].classList.remove("img");
        }else{
            btnGame[i].childNodes[1].classList.remove("img");
            btnGame[i].childNodes[1].classList.add("active-draw");
        }
        rules(i, computerSelect);
    });
}


function rules(user, cpu){
    if (user == cpu){
        winner.innerText = "Draw";
    }else if(user == 0){
        if(cpu == 1){
            winner.innerText = "User";
            scoreUser.innerText = Number(scoreUser.innerText) + 1;
        }else{
            winner.innerText = "CPU";
            scoreCpu.innerText = Number(scoreCpu.innerText) + 1;
        }
    }else if(user == 1){
        if(cpu == 0){
            winner.innerText = "CPU";
            scoreCpu.innerText = Number(scoreCpu.innerText) + 1;
        }else{
            winner.innerText = "User";
            scoreUser.innerText = Number(scoreUser.innerText) + 1
        }
    }else if (user == 2){
        if(cpu == 0){
            winner.innerText = "User";
            scoreUser.innerText = Number(scoreUser.innerText) + 1
        }else{
            winner.innerText = "CPU";
            scoreCpu.innerText = Number(scoreCpu.innerText) + 1;
        }
    }
}