const nameField = document.getElementById("username");
let isValidName = false;

const emailField = document.getElementById("email");
let isValidEmail = false;

const pwField = document.getElementById("password");
let isValidPw = false;

const confirmField = document.getElementById("password-match");
let pwMatched = false;

const submit = document.getElementById("submit");

nameField.addEventListener("change", e => {
    const input = e.target.value;
    const lettersExp = new RegExp("^[a-zA-Z]+$");

    if(input.length >= 3 && lettersExp.test(input)) {
        isValidName = true;
        validState(nameField);
    }
    else {
        isValidName = false;
        invalidState(nameField);
    }
});

emailField.addEventListener("change", e => {
    const input = e.target.value;
    // const emailExp = new RegExp("^[a-zA-Z0-9_!#$%&'*+\/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$", "gm");
    // const emailExp = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");   
    const emailExp = new RegExp("^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-z]+$", "gm");

    if(emailExp.test(input)) {
        isValidEmail = true;
        validState(emailField);
    }
    else {
        isValidEmail = false;
        invalidState(emailField);
    }
});

pwField.addEventListener("change", e => {
    const input = e.target.value;
    const pwExp = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");

    if(pwExp.test(input)) {
        isValidPw = true;
        validState(pwField);
    }
    else {
        isValidPw = false;
        invalidState(pwField);
    }
});

confirmField.addEventListener("input", e => {
    const input = e.target.value;
    if(input === pwField.value) {
        pwMatched = true;
        validState(confirmField);
    }
    else {
        pwMatched = false;
        invalidState(confirmField);
    }
});

function validState(field) {
    field.classList.remove("invalid");
    field.classList.add("valid");
    field.nextElementSibling.textContent = "";
    enableSubmit();
}

function invalidState(field) {
    field.classList.remove("valid");
    field.classList.add("invalid");
    field.nextElementSibling.textContent = `Invalid ${field.id}`;
}

function enableSubmit() {
    let allFieldsValid = isValidName && isValidEmail && isValidPw && pwMatched;
    if (allFieldsValid) submit.removeAttribute("disabled")
    else return;
}