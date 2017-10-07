let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
const MIN_VALUE = 0;
const MAX_VALUE = 9999;
const ANSWER_LENGTH = 4;
const AUTORIZED_ATTEMPTS = 10;

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value == '' || attempt.value == '') {
    	setHiddenFields();
    }

    if (!validateInput(input.value)) {
    	return false;
    }
    else attempt.value++;
    console.log(attempt.value);

    if (getResults(input.value)) {
    	setMessage("You Win! :)");
    	showAnswer(true);
    	showReplay();
    }
    else if (attempt.value >= AUTORIZED_ATTEMPTS) {
    	setMessage("You Loose! :(");
    	showAnswer(false);
    	showReplay();
    }
    else setMessage("Incorrect, try again.");
}

//implement new functions here
function setHiddenFields(){
	answer.value = (Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE +1)) + MIN_VALUE).toString();

	while (answer.value.length != ANSWER_LENGTH) {answer.value = `0${answer.value}`};
	attempt.value = 0;
	console.log("answer : " + answer.value);
}

function setMessage(msg){
	document.getElementById("message").innerHTML = msg;
}

function validateInput(inputVal){
	 if (inputVal.length == 4){
	 	return true;
	 }
	 else {
	 	setMessage("Guesses must be exactly 4 characters long.");
	 	return false;
	 }

}

function getResults (inputVal){
	let strUsr = inputVal.split("");
	let goodChar = 0;
	let resultsHTML = document.getElementById("results").innerHTML;
	resultsHTML += `
		<div class="row">
			<span class="col-md-6"> ${inputVal} </span>
			<div class="col-md-6">`;
	for (let i=0; i<strUsr.length; i++){
		if (strUsr[i]==answer.value.charAt(i)) {
			resultsHTML += `
				<span class="glyphicon glyphicon-ok"></span>`;
			goodChar ++;
		}
		else if (answer.value.includes(strUsr[i])) {
			resultsHTML += `
				<span class="glyphicon glyphicon-transfer"></span>`;
		}
		else resultsHTML += `
				<span class="glyphicon glyphicon-remove"></span>`;
	}
	resultsHTML += `
			</div>
		</div>`;
	document.getElementById("results").innerHTML = resultsHTML;
	return goodChar == ANSWER_LENGTH;
}

function showAnswer (victory){
	let result;
	document.getElementById("code").innerHTML = answer.value;
	if (victory) {
		result = "success";
	}
	else result= "failure";
	console.log(document.getElementById("code"));
	document.getElementById("code").className = result;
}

function showReplay (){
document.getElementById("guessing-div").style = "display:none";
document.getElementById("replay-div").style = "display:block";
}

