'use strict';

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

const formInputs = [userName, cardNumber, month, year, cvc];

const form = document.querySelector('.form-container');
const btn = document.querySelector('.btn');
const input = document.querySelectorAll('input');
const label = document.querySelectorAll('label');
const body = document.querySelector('body');

const CARD_NUM_LEN = cardNumber.dataset.length;
const DATE_NUM_LEN = month.dataset.length;
const CVC_NUM_LEN = cvc.dataset.length;


// ERROR HANDLING FUNCTIONS

function displayErr(el, errMsg) {
    // creating error message to append to its parent element
    const p = document.createElement("p");
    p.textContent = `${errMsg}`;
    p.className = 'error-message';

    // add error class and error message to element
    el.classList.add('error');
    el.parentNode.appendChild(p);
}

function removeErrorMessage(input) {
    // getting the appended p tag
    const existingError = input.parentNode.querySelector('.error-message');
    // check if error message exists and removes it
    if (existingError) {
        input.parentNode.removeChild(existingError);
    }
}

function formatCreditCardNumber() {
    // replacing non number characters with empty
    let value = this.value.replace(/\D/g, '');
    // matching Card Number with this regEx
    value = value.match(/.{1,4}/g)?.join(' ') || '';

    this.value = value;
}

function formatNumbers() {
    // replacing non number characters with empty
    let value = this.value.replace(/\D/g, '');
    this.value = value;
}

function checkIfNumber(el, len) {
    // el is already a number due to the formatting from previous function

    // remove error class and error message if present
    removeErrorMessage(el);
    el.classList.remove('error');

    // check if element value is the same lengt as the required length
    if (el.value.length < len) {
        // remove error class and error message if present and disp
        removeErrorMessage(el);
        // ternery operator for the error message for the input field if blank or not following the format
        return displayErr(el, `${el.value.trim() === ''? "Can't be blank" : 'Wrong format, numbers only'}`);
    }
}

function formatUsername() {
    // replacing any whitespace at the beginning with empty and not allowing for any number
    let value = this.value.replace(/^[\s]/g, '');
    value = value.replace(/[0-9]/g, '');
    this.value = value;
}

function checkIfString(el) {
    // check if element value is a number or is empty
    if (Number.parseInt(el.value) || el.value.trim() === '') {
        // remove error message if present and display new error
        removeErrorMessage(el);
        return displayErr(el, 'Please input your full name')
    };

    // check element value against the regEx
    const pattern = /^[A-Za-z]+ [A-Za-z]+$/;
    if (pattern.test(el.value)) {
        // remove error class and error message if present
        removeErrorMessage(el);
        return el.classList.remove('error');}
}

// RENDERING TO CARD FUNCTIONS

function renderCard(el, target) {
    // check if el value is empty OR el value is < 0
    if (el.value.trim() === '' || el.value.length < 0) return;

    // remove any whitespace infront of the el value
    el.value.trim();
    target.textContent = '';

    let text = el.value;
    const name = el.value.split(' ');
    let fullname;
     
    if (name.length === 2) {
        text = name[0].slice(0, 1).toUpperCase() + name[0].slice(1).toLowerCase();
        const text2 = name[1].slice(0, 1).toUpperCase() + name[1].slice(1).toLowerCase();;
        
        fullname = `${text} ${text2}`;
        return target.textContent = fullname;   
    }

    text = text.slice(0, 1).toUpperCase() + text.slice(1).toLowerCase();
    target.textContent = text;
}

// EVENT LISTENER FUNCTIONS

function typeChecker() {
    // check types of all input values before rendering
    checkIfString(userName);
    checkIfNumber(cardNumber, CARD_NUM_LEN);
    checkIfNumber(cvc, CVC_NUM_LEN);
    [month, year].forEach(el => checkIfNumber(el, DATE_NUM_LEN));   
}

function renderAll() {
    // render input values when all are correct
    renderCard(userName, cardName);
    renderCard(cardNumber, frontCardNumber);
    renderCard(month, cardMonth);
    renderCard(year, cardYear);
    renderCard(cvc, cardCVC);
}

function checkError() {
    // check if all the input values have the error class
    let containsError = false;
    formInputs.forEach(el => {
        if (el.classList.contains('error'))
            containsError = true;
        })
    return containsError;
}

function displayCompleted() {
    // display html after user inputs correct information
    const html = `<div class="complete">
      <img src="images/icon-complete.svg" alt="complete" class="complete_img">
      <p class="complete_head">thank you! ${userName.value}</p>
      <p class="complete_p">We've added your card details</p>
      <button class="btn btn--reload">confirm</button>
    </div>`

    form.innerHTML = '';
    form.insertAdjacentHTML('afterbegin', html);
}

function renderForm() {
    const html = ``
}

function init() {
    // clear the values of all the input fields
    input.forEach(el => {
        el.value = '';
    })
}

function formValidation() {
     // Error handling function calls
     typeChecker();
    
     if (checkError() === true) return; 
     // Display texts from form on the cards
     renderAll();
 
     //display completed html
     displayCompleted();
     init();
}

// to immediately focus on the input element
userName.focus();

// Event listener for when user starts typing
userName.addEventListener('input', formatUsername);
cardNumber.addEventListener('input', formatCreditCardNumber);
month.addEventListener('input', formatNumbers);
year.addEventListener('input', formatNumbers);
cvc.addEventListener('input', formatNumbers);


// Event listener for submitting form and checking user info
btn.addEventListener('click', function (e) {
    e.preventDefault();
    formValidation();
})

// Listening for the enter key to submit form
form.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        formValidation();
    }
})