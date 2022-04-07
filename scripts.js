
// disable jquery mobile loading text
$.mobile.loading().hide();

// onScreentext box
onScreenText = '';

// get list of buttons
var allInputKeys = document.getElementsByClassName("inputKey");

// create event listener function to print button text
var printText = function(e) {

	// right click
	if(e.type === 'contextmenu'){
		e.preventDefault();
		onScreenText += this.innerHTML[1];
	}

	// left click
	else {
		onScreenText += this.innerHTML[0];
	}
	
	console.log(onScreenText);
	// console.log('this is the last char: ' + onScreenText.charAt(onScreenText.length - 1))
	document.getElementById("outputText").innerHTML = onScreenText;
};

// each input key has an event listener that executes the above function
for (var i = 0; i < allInputKeys.length; i++) {
	allInputKeys[i].addEventListener('click', printText, false);
	allInputKeys[i].addEventListener('contextmenu', printText, false);
}

// Event listener for single click backspace
document.getElementById('backspace').addEventListener('click', function() {

	// if last character is a whitespace (&nbsp;), remove last 6 chars that make up the whitespace
	if(onScreenText.endsWith(';')) 
		onScreenText = onScreenText.slice(0, -6); // onScreenText = onScreenText.trimEnd();

	// other erase last char 
	else	
		onScreenText = onScreenText.slice(0, -1)
	
	console.log(onScreenText);
	document.getElementById("outputText").innerHTML = onScreenText;
})
//

// Event listener to clear all when holding backspace //
var mouseIsDown = false;
var timeout;
document.getElementById('backspace').addEventListener('mousedown', function() {
	mouseIsDown = true;
	holdStarter = setTimeout(function() {
		if(mouseIsDown){
			timeout = null;
			console.log('long-hold backspace to erase everything');
			onScreenText = '';
			document.getElementById("outputText").innerHTML = null;
		}

	}, 2000);
})

document.getElementById('backspace').addEventListener('mouseup', function() {
	clearTimeout(timeout);
	mouseIsDown = false;
})
//

// event listener for space //
document.getElementById('space').addEventListener('click', function() {
	onScreenText += '&nbsp;'
	console.log(onScreenText);
	document.getElementById("outputText").innerHTML = onScreenText;
})
//

// Blinking Cursor //
var cursor = true;
var interval = 500;        
setInterval(() => {
  	if (cursor) {
		document.getElementById('cursor').style.opacity = 0;
		cursor = false;
  	}
  	else {
		document.getElementById('cursor').style.opacity = 1;
		cursor = true;
	}
}, interval);
//

// swipe left for letter on the left // 
$('.inputKey').on('swipeleft', function() {
	onScreenText += this.innerHTML[0];
	console.log(onScreenText);
	// console.log('this is the last char: ' + onScreenText.charAt(onScreenText.length - 1))
	document.getElementById("outputText").innerHTML = onScreenText;
})
// 

// swipe right for letter on the right //
$('.inputKey').on('swiperight', function() {
	onScreenText += this.innerHTML[1];
	console.log(onScreenText);
	// console.log('this is the last char: ' + onScreenText.charAt(onScreenText.length - 1))
	document.getElementById("outputText").innerHTML = onScreenText;
})
//

var upperCase = false;
// Event listener for caps lock //
document.getElementById('caps').addEventListener('click', function() {

	// currently lowercase
	if(upperCase == false) {
		
		// loop through each key and convert to uppercase
		Object.keys(allInputKeys).forEach(function(i) {
			allInputKeys[i].innerHTML = allInputKeys[i].innerHTML.toUpperCase();
		});
		upperCase = true;
	}

	// currently uppercase
	else {

		// loop through each key and convert to lowercase
		Object.keys(allInputKeys).forEach(function(i) {
			allInputKeys[i].innerHTML = allInputKeys[i].innerHTML.toLowerCase();
		});
		upperCase = false;
	}
})
//
