// get list of buttons
var allInputKeys = document.getElementsByClassName("inputKey");
onScreenText = '';
// create event listener function to print button text
var testFunction = function() {
	// console.log(this.innerHTML);
	onScreenText += this.innerHTML;
	console.log(onScreenText);
	document.getElementById("outputArea").innerHTML = onScreenText;

};

// each input key has an event listener that executes the above function
for (var i = 0; i < allInputKeys.length; i++) {
	allInputKeys[i].addEventListener('click', testFunction, false);
}

// event listener for backspace
document.getElementById('backspace').addEventListener('click', function() {
	onScreenText = onScreenText.slice(0, -1)
	document.getElementById("outputArea").innerHTML = onScreenText;
})

// event listener for space
document.getElementById('space').addEventListener('click', function() {
	onScreenText += ' ';
	document.getElementById("outputArea").innerHTML = onScreenText;
})

// TODO: add cursor so user knows where current location is
// TODO: clear all by holding backspace
// TODO: capitalize