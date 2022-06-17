// Loops
// guess number

let number = Math.floor(Math.random()*10) + 1;
let isEnd = false;
let guessCounts = 0;
let maxGuess = 5;
let diffrence;
let guessNumber;

do{
    guessNumber = prompt("please enter a number between 1 to 10");
    guessNumber = Number(guessNumber);
    if(isNaN(guessNumber)){
        console.log("wrong number");
        isEnd = true;
    }
    diffrence = guessNumber - number; 
    // game rules
    if (diffrence > 0){
        if(Math.abs(diffrence) > 3){
            console.log("too high");
        }else{
            console.log("high");
        }
        guessCounts++;
    }else if(diffrence < 0){
        if(Math.abs(diffrence) > 3){
            console.log("too low");
        }else{
            console.log("low");
        }
        guessCounts++;
    }else{
        console.log(`correct guess in ${guessCounts} gueses! answer is ${number}`);
        isEnd = true;
    }
    --maxGuess;
}while(!isEnd && maxGuess >= 0)

console.log("Game over!");
