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

const form = [userName, cardNumber, month, year, cvc];

const btn = document.querySelector('.btn');
const input = document.querySelectorAll('input');
const label = document.querySelectorAll('label');

const CARD_NUM_LEN = 19;
const DATE_NUM_LEN = 2;
const CVC_NUM_LEN = 3;



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

function checkIfNumber(el, len) {
    // check if element value is positive
    if (el.value.length === len) {
        // remove error class and error message if present
        removeErrorMessage(el);
        return el.classList.remove('error');
    };

    // check if element value is a string/not a number
    if (el.value.length < len) {
        // if current element does not contain the error class display error message
        removeErrorMessage(el);
        return displayErr(el, `${el.value.trim() === ''? "Can't be blank" : 'Wrong format, numbers only'}`);
    }
}

function checkIfString(el) {
    // remove error message if present
    // check if element value is a number or is empty
    if (Number.parseInt(el.value) || el.value.trim() === '') {
        removeErrorMessage(el);
        return displayErr(el, 'Please input your full name')
    };

    // check if element value is a string
    const pattern = /^[A-Za-z]+ [A-Za-z]+$/;
    if (pattern.test(el.value)){
        removeErrorMessage(el);
        return el.classList.remove('error');}
}

function renderCard(el, target) {
    if (el.value.trim() === '' || el.value.length < 0) return;

        el.value.trim();
        target.textContent = '';
        const text1 = el.value.slice(0, 1).toUpperCase();
        const text2 = el.value.slice(1).toLowerCase();
        const text = text1 + text2;
        target.textContent = text;
}

function checkForErrorClass(el) {
    if(el.classList.contains('error')) console.log('hello');
}

function formatCreditCardNumber() {
    let value = this.value.replace(/\D/g, '');

    value = value.match(/.{1,4}/g)?.join(' ') || '';

    this.value = value;
}

function formatNumbers() {
    let value = this.value.replace(/\D/g, '');
    this.value = value;
}

function formatUsername() {
    let value = this.value.replace(/^[\s]/g, '');
    value = value.replace(/[0-9]/g, '')
    this.value = value;
}

function checkError() {
    let containsError = false;
    form.forEach(el => {
        if (el.classList.contains('error'))
            containsError = true;
        })
        return containsError;
}

function init(){
    input.forEach(el => {
        el.value = '';
    })
}

// Event listener that responds when user clicks and calls functions inside it
btn.addEventListener('click', function (e) {
    e.preventDefault();

    // Error handling function calls
    checkIfString(userName);
    checkIfNumber(cardNumber, CARD_NUM_LEN);
    checkIfNumber(cvc, CVC_NUM_LEN);
    [month, year].forEach(el => checkIfNumber(el, DATE_NUM_LEN));
    
    // Display texts from form on the cards
    if (checkError() === true) return; 
        renderCard(userName, cardName);
        renderCard(cardNumber, frontCardNumber);
        renderCard(month, cardMonth);
        renderCard(year, cardYear);
        renderCard(cvc, cardCVC);

        init();
})


// Event listener for when user starts typing
cardNumber.addEventListener('input', formatCreditCardNumber);
month.addEventListener('input', formatNumbers);
year.addEventListener('input', formatNumbers);
cvc.addEventListener('input', formatNumbers);
userName.addEventListener('input', formatUsername);