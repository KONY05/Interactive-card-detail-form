const cardName = document.querySelector('.frontCardUsername');
const frontCardNumber = document.querySelector('.frontCardNumber');
const cardMonth = document.querySelector('.frontCardMonth');
const cardYear = document.querySelector('.frontCardYear');
const cardCVC = document.querySelector('.backCardCVC');

const userName = document.querySelector('.form--username');
const cardNumber = document.querySelector('.form--userCardNumber');
const month = document.querySelector('.form--month');
const year = document.querySelector('.form--year');
const cvc = document.querySelector('.form--cvc');

const btn = document.querySelector('.btn');
const input = document.querySelectorAll('input');
const label = document.querySelectorAll('label')



function displayErr(el, errMsg) {
    //1) creating error message to append to element parent element
    const p = document.createElement("p");
    p.textContent = `${errMsg}`;
    p.className = 'error-message';

    //2) add error class and error message to element
    el.classList.add('error');
    el.parentNode.appendChild(p);
}

function removeErrorMessage(input) {
    const existingError = input.parentNode.querySelector('.error-message');
    // check if error message exists and removes it
    if (existingError) {
        input.parentNode.removeChild(existingError);
    }
}

function checkIfNumber(el) {
    // remove error message if present
    removeErrorMessage(el);
    // check if element value is a string/not a number
    if (!+el.value) {
        // if current element does not contain the error class display error message
        return displayErr(el, `${el.value.trim() === ''? "Can't be blank" : 'Wrong format, numbers only'}`);
    }
    
    // check if element value is positive
    if (+el.value) {
        // remove error class and error message if present
        return el.classList.remove('error');
    };
}

function checkIfString(el) {
    // remove error message if present
    removeErrorMessage(el)
    // check if element value is a number or is empty
    if (Number.parseInt(el.value) || el.value.trim() === '') return displayErr(el, 'Please input your full name');

    // check if element value is a string
    if (typeof(el.value) === 'string')
        return el.classList.remove('error');
}

function init(){
    input.forEach(el => {
        el.value = '';
    })
}

function renderCard(el, target) {
    if (el.value.trim === '' || el.value.length < 0) return;

        target.textContent = '';
        const text1 = el.value.slice(0, 1).toUpperCase();
        const text2 = el.value.slice(1).toLowerCase();
        const text = text1 + text2;
        target.textContent = text;
}

function checkForErrorClass(el) {
    if(el.classList.contains('error')) console.log('hello');
}


// Event listener that responds when user clicks and calls functions inside it
btn.addEventListener('click', function (e) {
    e.preventDefault();

    // Error handling function calls
    checkIfString(userName);
    checkIfNumber(cardNumber);
    checkIfNumber(cvc);
    [month, year].forEach(el => checkIfNumber(el))

    const i = [...input];
    console.log(i);
    i.every(checkForErrorClass())
   

    // Display texts from form on the cards

    // renderCard(userName, cardName);
    // renderCard(cardNumber, frontCardNumber);
    // renderCard(month, cardMonth);
    // renderCard(year, cardYear);
    // renderCard(cvc, cardCVC);

    // init();
    
})