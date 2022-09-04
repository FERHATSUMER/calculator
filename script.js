const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecoundValue = false;

updateDisplay();

function updateDisplay(){
    display.value = displayValue;
}


keys.addEventListener('click', function(e){
    const element = e.target;
    
    console.log(e.target.value)
    if(!element.matches('button')) return;

    if(element.classList.contains('operator')){
        // console.log('operator',element.value);
        handleOperator(element.value);
        updateDisplay();
        return;
    }

    if(element.classList.contains('decimal')){
       // console.log('decimal', element.value);
       inputDecimal(element.value);
       updateDisplay(); 
       return;  
    }

    if(element.classList.contains('clear')){
      //  console.log('clear', element.value);
        clear();
        updateDisplay();
        return;
    }
    
    inputNumber(element.value);
    updateDisplay();
});
function handleOperator(nextOperator){
    const value = parseFloat(displayValue);

    if(operator && waitingForSecoundValue){
        operator = nextOperator;
        return;
    }
    if(firstValue === null){
        firstValue = value;
    }else if (operator){
        const result = calculate(firstValue, value, operator);

        displayValue = String(result);
        firstValue = result;
    }
    waitingForSecoundValue= true;
    operator = nextOperator;
}
function calculate(first, second, operator){
    if(operator === '+'){
        return first + second;
    }else if (operator ==='-'){
        return first - second;
    }else if(operator ==='*'){
      return first * second;
    }else if(operator ==='/'){
        return first / second;}
    }


function inputNumber(num){
    if(waitingForSecoundValue){
        displayValue = num;
        waitingForSecoundValue = false;
    }else{
    displayValue = displayValue ==='0'? num:displayValue + num;
    }
}
function inputDecimal(){
    if(!displayValue.includes('.'))
    displayValue += '.';
}
function clear(){
    displayValue ='0'
}
