const nameField = document.getElementById("username");
let isValidName = false;

const emailField = document.getElementById("email");
let isValidEmail = false;

const pwField = document.getElementById("password");
let isValidPw = false;

const confirmField = document.getElementById("password-match");
let pwMatched = false;

const togglePw = document.querySelector("icon");

togglePw.addEventListener("click", () => {
    const type = confirmField.getAttribute("type") === "password" ? "text" : "password";
    confirmField.setAttribute("type", type);

    document.getElementById("i-o").classList.toggle("none");
    document.getElementById("i-slash").classList.toggle("none");
});

const submit = document.getElementById("submit");

submit.addEventListener("click", e => {
    enableSubmit(e);
});

nameField.addEventListener("change", e => {
    const input = e.target.value;
    const lettersExp = new RegExp("^[a-zA-Z]{3,}$");

    if(lettersExp.test(input)) {
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
    const emailExp = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");   

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
}

function invalidState(field) {
    field.classList.remove("valid");
    field.classList.add("invalid");
    field.nextElementSibling.textContent = `Invalid ${field.id}`;
}

function enableSubmit(e) {
    let allFieldsValid = isValidName && isValidEmail && isValidPw && pwMatched;
    let elseCase = !allFieldsValid && nameField.value !== "" && emailField.value !== "" && pwField.value !== "" && confirmField.value !== "";
    if (allFieldsValid) {
        e.preventDefault();
        alert("Form submitted successfully!");
        successSubmit({
            username: nameField.value,
            email: emailField.value,
            password: pwField.value
        });
        // return;
    }
    else if (elseCase) {
        e.preventDefault();
        alert("Invalid Details");
    }
}

function successSubmit(dataObject) {
    console.log(dataObject);
    document.querySelector("main").innerHTML = 
    `<h1 style="color: white; text-transform: uppercase;">Thankyou! Data is printed on the console.</h1>`
    ;
}