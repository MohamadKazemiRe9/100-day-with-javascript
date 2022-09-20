const cityInput = document.getElementById("city-input");
const btnCheck = document.getElementsByClassName("btn-check")[0];
const temp = document.getElementById("temp");
const cool = document.getElementById("cool");
const warm = document.getElementById("warm");
const btnReset = document.getElementById("btn-reset");
const key = "109d424b54ae460e540bad9953047757";


btnCheck.addEventListener("click", function(){
    let city = cityInput.value;

    let myPromis = new Promise((resolve, reject)=>{
        let req = new XMLHttpRequest();
        req.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);
        req.onload = function(){
            if (req.status == 200){
                resolve(req.response);
            }else{
                reject(req.response)
            }
        };
        req.send();
    })
    .then((value)=>{
        data = JSON.parse(value);
        temp.innerText = (Number(data.main.temp) - 273.15).toFixed(1);
        cool.innerText = `${(Number(data.main.temp_min) - 273.15).toFixed(2)} °C`;
        warm.innerText = `${(Number(data.main.temp_max) - 273.15).toFixed(2)} °C`;
    })
    .catch((err)=>{
        console.log(err);
    });

});


btnReset.addEventListener("click", function(){
    cityInput.value = "";
    temp.innerText= "00.0";
    cool.innerText = "Cool";
    warm.innerText = "Warm";
});