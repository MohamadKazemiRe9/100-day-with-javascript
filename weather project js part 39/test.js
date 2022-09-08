const cityInput = document.getElementById("city-input");
const btnCheck = document.getElementsByClassName("btn-check")[0];
const temp = document.getElementById("temp");
const cool = document.getElementById("cool");
const warm = document.getElementById("warm");
const btnReset = document.getElementById("btn-reset");
const key = "109d424b54ae460e540bad9953047757";

console.log(temp.innerText)

btnCheck.addEventListener("click", function(){
    let city = cityInput.value;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then(function(res){
        temp.innerText = (Number(res.data.main.temp) - 273.15).toFixed(1);
        cool.innerText = `${(Number(res.data.main.temp_min) - 273.15).toFixed(2)} °C`
        warm.innerText = `${(Number(res.data.main.temp_max) - 273.15).toFixed(2)} °C`
    })
    .catch(function(err){
        console.log(err)
    })
});

btnReset.addEventListener("click", function(){
    cityInput.value = "";
    temp.innerText= "00.0";
    cool.innerText = "Cool";
    warm.innerText = "Warm";
});