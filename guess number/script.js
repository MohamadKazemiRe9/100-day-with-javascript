// Loops
// guess number

let number = Math.floor((Math.random()*10) + 1);
let isEnd = false;
let guessCounts = 0;
const maxGuess = 5;
let guessNumber;

do{
    guessNumber = Number(prompt("Please enter a number between 1 - 10"));
    guessCounts++;
    if(guessNumber < 1 || guessNumber > 10 || isNaN(guessNumber)){
        console.log("Wrong input!");
        isEnd = true;
    }
    // game rules
    let diffrence = number - guessNumber;
    if(diffrence > 0){
        if(Math.abs(diffrence) > 3){
            console.log("too low");
        }else{
            console.log("low");
        }
        
    }else if(diffrence < 0){
        // diffrence > 3 =>  too high ---- < 3 => high
        if(Math.abs(diffrence) > 3){
            console.log("too high");
        }else{
            console.log("high");
        }
    }else{
        console.log(`You won in ${guessCounts} guesses! answer is ${number}`);
        isEnd = true;
    }
}while(!isEnd && guessCounts < maxGuess)

console.log("Game Over");