let form;
let nameIn;
let emailIn;
let commentsIn;
let errorOut;
let infoOut;

let errorMessages = [];

const namePattern = /^[A-Za-z]+([ -][A-Za-z]+)*$/;
const emailPattern = /^[a-zA-Z0-9._%+-@]*$/;

function afterDOM () {
    form = document.getElementById("random-form");
    nameIn = document.getElementById("name");
    emailIn = document.getElementById("email");
    commentsIn = document.getElementById("comments");
    submitBtn = document.getElementById("submit");
    errorOut = document.getElementById("error");
    infoOut = document.getElementById("info");

    nameIn.addEventListener('input', validateName);
    emailIn.addEventListener('input', validateEmail);
    commentsIn.addEventListener('input', validateComments);
    submitBtn.addEventListener('click', validateForm);

}

function validateName() {
    const nameVal = nameIn.value;

    if (!namePattern.test(nameVal) && nameVal !== "") {
        nameIn.classList.add("flash-error");
        errorOut.innerHTML = "Name contains illegal characters!";
        errorMessages.push({field: "name", message: "contains illegal characters", name: nameVal});
        setTimeout(() => {
            errorOut.classList.add('fade-out');
        }, 3000);
    } else {
        nameIn.classList.remove("flash-error");
    }
}

function validateEmail() {
    const emailVal = emailIn.value;

    if (!emailPattern.test(emailVal) && emailVal !== "") {
        emailIn.classList.add("flash-error");
        errorOut.innerHTML = "Email contains illegal characters!";
        errorMessages.push({field: "email", message: "contains illegal characters", name: emailVal});
        setTimeout(() => {
            errorOut.classList.add('fade-out');
        }, 3000);
    } else {
        emailIn.classList.remove("flash-error");
    }
}

function validateComments() {
    const maxLength = commentsIn.getAttribute("maxLength");
    // Check if a charDisplay element already exists, and if so, remove it
    let charDisplay = commentsIn.parentNode.querySelector(".char-display");
    if (charDisplay) {
        charDisplay.remove();
    }

    // Create a new charDisplay element
    charDisplay = document.createElement("p");
    charDisplay.classList.add("char-display"); // Add a class for styling or easier reference later
    commentsIn.parentNode.insertBefore(charDisplay, commentsIn.nextSibling);



    commentsIn.style.height = 'auto';
    commentsIn.style.height = (this.scrollHeight) + 'px';

    const charCount = commentsIn.value.length;
    charDisplay.textContent = `${maxLength - charCount} characters`;
    if (charCount > (maxLength * .90)) {
        charDisplay.style.color = 'red';
    } else if (charCount > (maxLength * .75)) {
        charDisplay.style.color = 'orange';
    } else if (charCount > maxLength / 2) {
        charDisplay.style.color = 'yellow';
    } else {
        charDisplay.style.color = 'black';
    }

    if (charCount > maxLength) {
        commentsIn.value = commentsIn.value.substring(0, maxLength);
        charDisplay.textContent = `Limit reached`;
    }
}

function validateForm(event) {
    errorMessages = [];
    event.preventDefault();

    if (nameIn.value == "") {
        errorMessages.push({field: "name", message: "name is empty", name: nameIn.value});
    }
    if (emailIn.value == "") {
        errorMessages.push({field: "email", message: "email is empty", name: emailIn.value});
    }

    validateComments();
    validateEmail();
    validateName();

    const formData = new FormData();

    formData.append("name", nameIn.value);
    formData.append("email", emailIn.value);
    formData.append("comments", commentsIn.value);

    formData.append("form-errors", JSON.stringify(errorMessages));


    fetch("https://httpbin.org/post", {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from server:', data);

        const responseString = JSON.stringify(data, null, 2);
      
        const newTab = window.open("", target="_blank");
        newTab.document.write('<pre>' + responseString + '</pre>');
    })
    .catch(error => {
        console.error('Error submitting', error);
        infoOut.innerHTML = "Form unsuccessful";
    });

    errorMessages.length = 0;
}

/*
function validateForm () {
    //Clear the error messages if any
    errorMessages = [];
    console.log(errorMessages);
    errorOut.innerHTML = "";
    infoOut.innerHTML = "";
    let successful = true;

    //Check if name is empty
    if (nameIn.value == "") {
        errorMessages.push("Name is required!");
        successful = false;
    }

    // Check if email is in a valid form
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(emailIn.value)) {
        errorMessages.push("Enter a valid email!");
        successful = false;
    }

    if (successful) {
        infoOut.innerHTML = "Form successful!";
        return true;
    } else {
        // Populate the innerHTML with the array containing all the error messages
        infoOut.innerHTML = "Form unsuccessful!";
        let combined = errorMessages.join("<br>");
        errorOut.innerHTML = combined;
        return false;
    }
}
*/

document.addEventListener("DOMContentLoaded", afterDOM);