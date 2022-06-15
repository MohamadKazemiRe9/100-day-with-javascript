// Rock Paper Scissor project

// Math.floor(Math.random() * (max - min + 1)) + min

const arr = ["Rock", "Paper", "Scissor"];

let playerScore = 0;
let computerScore = 0;

let randNum = Math.floor(Math.random()*3);

let userSelect = prompt("0 Rcok, 1 Paper, 2 Scissor");
userSelect = Number(userSelect);
if(userSelect !== NaN && userSelect >= 0 && userSelect < 3){
    switch(userSelect){
        case 0:
            if(randNum == 0){
                console.log(`draw ${arr[randNum]}`);
                console.log(`computer : ${computerScore} user : ${playerScore}`);
            }else if (randNum == 1){
                console.log(`computer won - user : ${arr[userSelect]} computer ${arr[randNum]}`);
                computerScore += 1;
                console.log(`computer : ${computerScore} user : ${playerScore}`);
            }else{
                console.log(`player won - user : ${arr[userSelect]} computer ${arr[randNum]}`);
                console.log(`computer : ${computerScore} user : ${playerScore}`);
            }
            break;
        case 1:
            if(randNum == 0){
                console.log(`player won - user : ${arr[userSelect]} computer ${arr[randNum]}`);
                console.log(`computer : ${computerScore} user : ${playerScore}`);
            }else if (randNum == 1){
                console.log(`draw ${arr[randNum]}`);
                console.log(`computer : ${computerScore} user : ${playerScore}`);
            }else{
                console.log(`computer won - user : ${arr[userSelect]} computer ${arr[randNum]}`);
                console.log(`computer : ${computerScore} user : ${playerScore}`);
            }
            break;
        case 2:
            if(randNum == 0){
                console.log(`computer won - user : ${arr[userSelect]} computer ${arr[randNum]}`);
                console.log(`computer : ${computerScore} user : ${playerScore}`);
            }else if (randNum == 1){
                console.log(`player won - user : ${arr[userSelect]} computer ${arr[randNum]}`);
                console.log(`computer : ${computerScore} user : ${playerScore}`);
            }else{
                console.log(`draw ${arr[randNum]}`);
                console.log(`computer : ${computerScore} user : ${playerScore}`);
            }
    }
}else{
    console.log("Wrong input");
}