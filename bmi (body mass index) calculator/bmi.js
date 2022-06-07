// BMI calculator
// BMI = Weight (kg) / Height (m)²  

const height = prompt("plese enter your height in cm");

const weight = prompt("plese enter your weigth");

const bmi = weight / (height/100) ** 2;

console.log(`Your BMI is ${bmi}`);