// Method to display welcome prompt
function displayWelcomePrompt() {
  var name = prompt("Please enter your name: ");
	if (name === null || name === "") {
    displayalert("Welcome!");
  } else {
    displayalert("Welcome " + name + "!");
  }
}

// Method to input user inputs
function displayInputPrompts() {
  var enteredNumber1 = prompt("Please enter the first number: ");
  var enteredNumber2 = prompt("Please enter the second number: ");

  enteredNumber1 = parseInt(enteredNumber1);
  enteredNumber2 = parseInt(enteredNumber2);

  if (Number.isInteger(enteredNumber1) && Number.isInteger(enteredNumber2)) {
    var sum = addition(enteredNumber1, enteredNumber2);
    displayalert("The sum of your two numbers is: " + sum);
    validateNumber(sum);
  } else {
    displayalert("Please enter a valid integer. The input must be a number.");
  }
}

// Method to display alert
function displayalert(errorText) {
  alert(errorText);
}

// Method to perform addition operation
function addition (num1, num2) {
  return (num1 + num2);
}

// Method to validate whether the number is big or small
function validateNumber(sum) {
  if (sum > 10) {
    displayalert("That is a big number.");
  } else {
    displayalert("That is a small number.");
  }
}

function checkCount() {
  var cont = window.confirm("Do you want to try again?");
  if (cont) {
    alert("Welcome back!");
    return true;
  } else {
    alert("Good Luck. See you next time!");
    return false;
  }
}