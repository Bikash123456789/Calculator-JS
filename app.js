const display = document.querySelector('h1');
const inputArray = document.querySelectorAll('button');
const clearbtn = document.querySelector('.clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

//adds Decimal if not added
function addDecimal(){

    if(awaitingNextValue) return;
    if(!display.textContent.includes('.')){
        display.textContent = `${display.textContent}.`
    }
}


calculate = {
    '/':(firstNumber, secondNumber)=>firstNumber/secondNumber,

    '*':(firstNumber, secondNumber)=>firstNumber*secondNumber,

    '+':(firstNumber, secondNumber)=>firstNumber+secondNumber,

    '-':(firstNumber, secondNumber)=>firstNumber-secondNumber,

    '=':(firstNumber, secondNumber)=>secondNumber,
};

//Operator
function useOperator(operator){
    const currentValue = Number(display.textContent);
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    if(!firstValue) {
        firstValue = currentValue;
    }
    else{
        console.log(firstValue,operatorValue,currentValue)
        const result = calculate[operatorValue](firstValue,currentValue);
        firstValue = result;
        console.log(result);
        display.textContent = result;
    }
    //Ready for next value
    awaitingNextValue = true;
    operatorValue = operator;
   
}

//gets Number from each click and displays it
function sendNumber(number){
   
   if(awaitingNextValue){
        display.textContent = number;
        awaitingNextValue = false;
   }
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

inputArray.forEach( btn => {
if(btn.classList.length===0){
    btn.addEventListener('click',()=>{
        sendNumber(btn.value);
    })
}
else if(btn.classList.contains('operator')){
    btn.addEventListener('click',()=>{
        useOperator(btn.value);
    })
}
else if(btn.classList.contains('decimal')){
    btn.addEventListener('click',()=>{
        addDecimal();
    })
}
  
});

//Reset Function
function resetAll(){
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    display.textContent = '0';
}

clearbtn.addEventListener('click', resetAll);
console.log(inputArray);