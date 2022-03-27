const inputArray = document.querySelectorAll('button');
const display = document.querySelector('h1');
const clearbutton = document.querySelector('.clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = 'false';


//--------Reset All function-------------
function resetAll(){
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = 'false';
    display.textContent = '0';
}

//---------Function to display number when clicked-----------
function displayNumber(number){
    //if operator is clicked
    if(awaitingNextValue){
        display.textContent = number;
        awaitingNextValue = false;
    }
    //if operator is not clicked
    else{
        const displayValue = display.textContent;
        if(displayValue==='0'){
            display.textContent = number;
        }
        else{
            display.textContent = displayValue + number;
        }
    }
   }

//-----Calculation----
function calculate(num1, num2,operator){
    if(operator==='+') {
        return num1+num2;
    }
    else if(operator==='-') {
        return num1-num2;
    }
    else if(operator==='*') {
        return num1*num2;
    }
    else if(operator==='/') {
        return num1/num2;
    }
    else {
        return num2;
    }
}

//---Function to display decimal when decimal button is clicked----
function addDecimal(){
    if(awaitingNextValue) return;
    if(!display.textContent.includes('.'))
    display.textContent = display.textContent+'.';
}

//---Function to display decimal when decimal button is clicked----
function useOperator(operator){
    const currentValue = Number(display.textContent);
    if(operator&&awaitingNextValue){
        operatorValue = operator;
        return;
    }
    if(!firstValue){
        firstValue = currentValue;
    }
    else{
        console.log(firstValue, operatorValue, currentValue);
        const result = calculate(firstValue,currentValue,operatorValue);
        firstValue = result;
        console.log(result);
        display.textContent = result;
    }
    operatorValue = operator;
    awaitingNextValue = true;
}

//Event Listeners
inputArray.forEach(btn =>{
    //Number buttons clicked
    if(btn.classList.length===0){
        btn.addEventListener('click',()=>{
            displayNumber(btn.value);
        })
    }

    //Clear button clicked
    if(btn.classList.contains('clear-btn')){
        btn.addEventListener('click',()=>{
            resetAll();
        })
    }

    //Decimal button clicked
    if(btn.classList.contains('decimal')){
        btn.addEventListener('click',()=>{
            addDecimal();
        })
    }

    // Operator button clicked
    if(btn.classList.contains('operator')){
        btn.addEventListener('click',()=>{
            useOperator(btn.value);
        })
    }
})