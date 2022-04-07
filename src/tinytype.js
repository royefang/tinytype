// TODO: capitalize
// TODO: research swiping with jquery

// get list of buttons
var allInputKeys = document.getElementsByClassName("inputKey");
onScreenText = '';

// create event listener function to print button text
var printText = function() {

	onScreenText += this.innerHTML;
	console.log(onScreenText);
	console.log('this is the last char: ' + onScreenText.charAt(onScreenText.length - 1))
	document.getElementById("outputText").innerHTML = onScreenText;
};

// each input key has an event listener that executes the above function
for (var i = 0; i < allInputKeys.length; i++) {
	allInputKeys[i].addEventListener('click', printText, false);
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


