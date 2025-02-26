let form;
let nameIn;
let emailIn;
let commentsIn;
let errorOut;
let infoOut;

let errorMessages = [];

function afterDOM () {
    form = document.getElementById("random-form");
    nameIn = document.getElementById("name");
    emailIn = document.getElementById("email");
    commentsIn = document.getElementById("comments");
    errorOut = document.getElementById("error");
    infoOut = document.getElementById("info");

    commentsIn.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
      });
}

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

document.addEventListener("DOMContentLoaded", afterDOM);