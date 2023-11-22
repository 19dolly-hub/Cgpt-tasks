// GETTING THE ELEMENTS
const nameField = document.getElementById("username");
const emailField = document.getElementById("email");
const pwField = document.getElementById("password");
const confirmField = document.getElementById("password-match");
const togglePw = document.querySelector("icon");
const submit = document.getElementById("submit");


// INITIALIZE VALIDATION
let isValidName = false;
let isValidEmail = false;
let isValidPw = false;
let pwMatched = false;


// ADDING EVENT-LISTENERS

// CHECKING INPUT FIELDS
nameField.addEventListener("change", e => {
    const input = e.target.value;
    const lettersExp = new RegExp("^[a-zA-Z]{3,}$");

    isValidName = lettersExp.test(input);
    updateState(nameField, isValidName);
});

emailField.addEventListener("change", e => {
    const input = e.target.value;
    const emailExp = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");   

    isValidEmail = emailExp.test(input);
    updateState(emailField, isValidEmail);
});

pwField.addEventListener("change", e => {
    const input = e.target.value;
    const pwExp = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");

    isValidPw = pwExp.test(input);
    updateState(pwField, isValidPw);
});

confirmField.addEventListener("input", e => {
    const input = e.target.value;

    pwMatched = input === pwField.value;
    updateState(confirmField, pwMatched);
});


// UPDATING STATE AS PER FIELD AND VALIDATION STATE
function updateState(field, isValid) {
    if(isValid) {
        field.classList.remove("invalid");
        field.classList.add("valid");
        field.nextElementSibling.textContent = "";
    }
    else {
        field.classList.remove("valid");
        field.classList.add("invalid");
        field.nextElementSibling.textContent = `Invalid ${field.id}`;
    }
}


// TOGGLE PASSWORD VISIBILITY
togglePw.addEventListener("click", () => {
    const type = confirmField.getAttribute("type") === "password" ? "text" : "password";
    confirmField.setAttribute("type", type);

    document.getElementById("i-o").classList.toggle("none");
    document.getElementById("i-slash").classList.toggle("none");
});


// SUBMIT HANDLERS
submit.addEventListener("click", e => {
    enableSubmit(e);
});

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
    `<h1 style="color: white; text-transform: uppercase;">Thankyou! Data has been printed on the console.</h1>`
    ;
}