const userName = document.querySelector('.username');
const cardNumber = document.querySelector('.userCardNumber');
const month = document.querySelector('.month');
const year = document.querySelector('.year');
const cvc = document.querySelector('#cvc');
const btn = document.querySelector('.btn');
const input = document.querySelectorAll('input');
const label = document.querySelectorAll('label')

function displayErr(el, errMsg) {
    //1) creating error message to append to element parent element

    if (!el.classList.contains('error'));
    
    const p = document.createElement("p");
    p.textContent = `${errMsg}`;
    p.style.color = 'red';
    p.style.textTransform = 'none';
    p.className = 'error-message';

    el.classList.add('error');
    el.parentNode.appendChild(p);
}

function removeErrorMessage(input) {
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        input.parentNode.removeChild(existingError);
    }
}

function checkIfNumber(elem) {
    
    if (!+elem.value) {
        if (elem.classList.contains('error')) return;
        displayErr(elem, `${elem.value === ''? "Can't be blank" : 'Wrong format, numbers only'}`);
    }
    
    if (+elem.value) {
        elem.classList.remove('error');
        removeErrorMessage(elem);
    };
}

function init(){
    input.forEach(el => {
        el.value = '';
    })
}



btn.addEventListener('click', function (e) {
    e.preventDefault();

    checkIfNumber(cardNumber);
    checkIfNumber(cvc);
    // init();
    
    // displayErr();
})