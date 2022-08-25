const myInput = document.getElementsByTagName("input")[0];
const btn = document.getElementsByTagName("button")[0];
// Ali_reza21@gmail.com
let emailPattern = /^([A-Za-z0-9.-_]+\@[a-zA-Z0-9]+\.[a-zA-Z]+)$/g

myInput.addEventListener("keyup", function(){
    let myMail = myInput.value;
    let checker = myMail.match(emailPattern);
    if (checker !== null){
        myInput.style.backgroundColor = "green";
        myInput.style.color = "#fff";
    }else{
        myInput.style.backgroundColor = "red";
        myInput.style.color = "#fff";
    }
});

btn.addEventListener("click", ()=>{
    let myMail = myInput.value;
    alert(myMail.match(emailPattern));
});