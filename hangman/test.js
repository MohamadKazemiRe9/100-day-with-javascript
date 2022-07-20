const words = document.getElementById("words");
const alpha = "ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی";
const arrAplpha = alpha.split("");
const boxes = document.getElementsByClassName("box");
const guess = document.getElementsByClassName("guess")[0];
const hangman = document.getElementsByClassName("hangman")[0];
const maxChance = 7;
let counter = 0;
let guessWord = ""
let endGame = document.getElementsByClassName("end-game")[0];



let guesses = ["تهران", "اصفهان"];


function prepareGame(){
    counter = 1;
    const random = Math.floor(Math.random()*guesses.length);
    const word = guesses[random];
    
    for(let i=1; i <= word.length; i++){
        guessWord += "-";
        guess.innerText = guessWord;
    }

    for (let char of arrAplpha){
        let box = document.createElement("div");
        box.setAttribute("class", "box hover");
        box.innerHTML = char;
        words.appendChild(box);
    }
    boxClick(word)
}


function boxClick(word){

    for (let box of boxes){
        box.addEventListener("click", function(){
            if (word.includes(this.innerText)){
                this.classList.remove("hover");
                this.classList.add("currect-select");
                for(let i in word){
                    if(word[i] == this.innerText){
                        guessWord = replaceAt(guessWord, i, this.innerText);
                        console.log(guessWord)
                    }
                }
                guess.innerText = guessWord;
                if (guessWord == word){
                    gameOver()
                }

            }else{
                this.classList.remove("hover");
                this.classList.add("incorrect");
                let lvl = document.createElement("div");
                lvl.setAttribute("class", `hangman-lvl${counter}`)
                hangman.appendChild(lvl);
                
                if (counter >= maxChance){
                    gameOver()
                }
                counter += 1;
            }
        })
    }
    
}

// for replace in exact index
function replaceAt(str, index, replaceChar){
    part1 = str.slice(0, index);
    part2 = str.slice(index, str.lenght)
    part2 = part2.replace(part2[0], replaceChar);
    return part1+part2
  }

function gameOver(){
    endGame.style.display = "block"
    let btnYes = document.getElementsByClassName("btn-yes")[0];
    let btnNo = document.getElementsByClassName("btn-no")[0];
    btnYes.addEventListener("click", ()=>{
        endGame.style.display = "none";
        resetGame();
    });

    btnNo.addEventListener("click", ()=>{
        window.close();
    });
}

function resetGame(){
    guess.innerText = "";
    words.textContent = "";
    guessWord = "";
    counter = 0;
    hangman.textContent = "";
    prepareGame();
}

prepareGame()