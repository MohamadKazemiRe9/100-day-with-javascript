const passwordRegisterForm = document.getElementsByClassName("register-form-password");
const btnShowPassword = document.getElementsByClassName("show-password");
const securityLevel = document.getElementsByClassName("security-level")[0];
const passwordStatus = document.getElementById("password-status");
const btnSubmit = document.getElementById("btn-submit");
const emailFormRegister = document.getElementById("email-form-register");

let result = 0;

for (let btn of btnShowPassword) {
    btn.addEventListener("click", function (e) {
        if (this.innerText == "نمایش") {
            e.preventDefault();
            this.parentNode.childNodes[1].type = "text";
            this.innerText = "مخفی";
        } else {
            e.preventDefault();
            this.parentNode.childNodes[1].type = "password";
            this.innerText = "نمایش";
        }
    }) 
}

passwordRegisterForm[0].addEventListener("keyup", function (e) {
    result = checkPassword(this.value);
    securityLevel.style.width = `${(result / 8) * 100}%`;
    setStatus(result)
});

passwordRegisterForm[1].addEventListener("keyup", function(){
    let password = passwordRegisterForm[0].value;
    let passwordRepeat = this.value;
    for(let char=0; char < passwordRepeat.length; char++){
        if(passwordRepeat[char] !== password[char]){
            securityLevel.style.width = `0`;
            passwordStatus.innerText = "گذرواژه ها مطابقت ندارند";
        }else{
            securityLevel.style.width = `${(result / 8) * 100}%`;
            setStatus(result)
        }
    }
    if(password == passwordRepeat){
        btnSubmit.disabled = false;
    }
});

function setStatus(result){
    if (result < 3) {
        securityLevel.style.backgroundColor = "red";
        passwordStatus.innerText = "ضعیف";
    } else if (result <= 5) {
        securityLevel.style.backgroundColor = "orange";
        passwordStatus.innerText = "معمولی";
    } else if (result > 6) {
        securityLevel.style.backgroundColor = "green";
        passwordStatus.innerText = "قوی";
    }
}

function checkPassword(password) {
    let score = 0;
    const numberPattern = /[0-9]/;
    const alphaLowerPattern = /[a-z]/;
    const alphaUpperpattern = /[A-Z]/;
    const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (password.length > 6) {
        score++;
        if (password.length > 8) {
            score++;
            if (password.length > 10) {
                score++;
                if (password.length > 12) {
                    score++;
                }
            }
        }
    }
    if (numberPattern.test(password)) {
        score++;
    }
    if (alphaLowerPattern.test(password)) {
        score++;
    }
    if (alphaUpperpattern.test(password)) {
        score++;
    }
    if (specialChars.test(password)) {
        score++;
    }
    return score;
}

btnSubmit.onclick = function(e){
    let password = passwordRegisterForm[0].value;
    let passwordRepeat = passwordRegisterForm[1].value;
    if(password === "" || passwordRepeat === "" || emailFormRegister.value === "" || password !== passwordRepeat){
        e.preventDefault();
    }
}