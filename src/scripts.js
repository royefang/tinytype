
// disable jquery mobile loading text

// onScreentext box
onScreenText = '';

// get list of buttons
var allInputKeys = document.getElementsByClassName("inputKey");

var allOptionKeys = document.getElementsByClassName("optionKey");

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
	if(Number(onScreenText[onScreenText.length - 2])){
		console.log('hello')
		onScreenText = onScreenText.slice(0, -9);
	}
	else if(onScreenText.endsWith(';')) 
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

// event listener for emoji switch //
document.getElementById('emoji').addEventListener('click', function() {

	for (var i = 0; i < allInputKeys.length; i++) {
		if( allInputKeys[i].style.display === 'none' )
			allInputKeys[i].style.display = 'initial';
		else
			allInputKeys[i].style.display = 'none';
	}

	for (var i = 0; i < allOptionKeys.length; i++) {
		if( allOptionKeys[i].style.display === 'none' )
			allOptionKeys[i].style.display = 'initial';
		else
			allOptionKeys[i].style.display = 'none';
	}

	var canvas = document.getElementById('cvsMain');
	if (canvas.style.display === 'none')
		canvas.style.display = 'inherit';
	else
		canvas.style.display = 'none';

})
//


//
// Adapted from Xiang 'Anthony' Chen
//

var ISKETCH = ISKETCH || {}

$(document).ready(() => {
    //
    //  TIP: how you print information
    //
    console.log('Welcome to iSketch!')

    // initialize the canvas
    $('#cvsMain')[0].width = 75;
    $('#cvsMain')[0].height = 75;
    $('#cvsMain').css('background-color', '#aaaaaa');
	$('#cvsMain').css('display', 'none');
    ISKETCH.context = $('#cvsMain')[0].getContext('2d');
    ISKETCH.context.strokeStyle = "#000000";
    ISKETCH.context.lineJoin = "round";
    ISKETCH.context.lineWidth = 1;

    // add input event handlers
    $('#cvsMain').on('mousedown', ISKETCH.canvasMouseDown);
    $('#cvsMain').on('mousemove', ISKETCH.canvasMouseMove);
    $('#cvsMain').on('mouseup', ISKETCH.canvasMouseUp);
})

//
//
//
ISKETCH.canvasMouseDown = function (e) {
    ISKETCH.context.clearRect(0, 0, $('#cvsMain').width(), $('#cvsMain').height());
    ISKETCH.context.beginPath();

    let rect = $('#cvsMain')[0].getBoundingClientRect();
    let x = e.clientX - rect.left, y = e.clientY - rect.top
    ISKETCH.context.moveTo(x, y);
    ISKETCH.context.stroke();

    ISKETCH.isDragging = true;

    ISKETCH.coords = []
    
    let coord = {x: undefined, y: undefined}


}

//
//
//
ISKETCH.canvasMouseMove = function (e) {
    if (!ISKETCH.isDragging) return;

    let rect = $('#cvsMain')[0].getBoundingClientRect();
    let x = e.clientX - rect.left, y = e.clientY - rect.top
    ISKETCH.context.lineTo(x, y);
    ISKETCH.context.moveTo(x, y);
    ISKETCH.context.stroke();

	ISKETCH.coords.push(new Point(x, y)); 


}

//
ISKETCH.canvasMouseUp = function (e) {
	
    ISKETCH.isDragging = false;
    ISKETCH.context.closePath();
	var one = new DollarRecognizer();
	result = one.Recognize(ISKETCH.coords);
	console.log(result.Name);

	if(result.Name === 'star')
		onScreenText += '&#129321;'
	
	if(result.Name === 'smile')
		onScreenText += '&#128514;'
	
	if(result.Name === 'frown')
		onScreenText += '&#128542;'
	
	if(result.Name === 'angry')
		onScreenText += '&#128545;'
	
	if(result.Name === 'circle')
		onScreenText += '&#128175;'
	
    
	console.log(onScreenText);
	document.getElementById("outputText").innerHTML = onScreenText;
}

/**
 * The $1 Unistroke Recognizer (JavaScript version)
 *
 *  Jacob O. Wobbrock, Ph.D.
 *  The Information School
 *  University of Washington
 *  Seattle, WA 98195-2840
 *  wobbrock@uw.edu
 *
 *  Andrew D. Wilson, Ph.D.
 *  Microsoft Research
 *  One Microsoft Way
 *  Redmond, WA 98052
 *  awilson@microsoft.com
 *
 *  Yang Li, Ph.D.
 *  Department of Computer Science and Engineering
 *  University of Washington
 *  Seattle, WA 98195-2840
 *  yangli@cs.washington.edu
 *
 * The academic publication for the $1 recognizer, and what should be
 * used to cite it, is:
 *
 *     Wobbrock, J.O., Wilson, A.D. and Li, Y. (2007). Gestures without
 *     libraries, toolkits or training: A $1 recognizer for user interface
 *     prototypes. Proceedings of the ACM Symposium on User Interface
 *     Software and Technology (UIST '07). Newport, Rhode Island (October
 *     7-10, 2007). New York: ACM Press, pp. 159-168.
 *     https://dl.acm.org/citation.cfm?id=1294238
 *
 * The Protractor enhancement was separately published by Yang Li and programmed
 * here by Jacob O. Wobbrock:
 *
 *     Li, Y. (2010). Protractor: A fast and accurate gesture
 *     recognizer. Proceedings of the ACM Conference on Human
 *     Factors in Computing Systems (CHI '10). Atlanta, Georgia
 *     (April 10-15, 2010). New York: ACM Press, pp. 2169-2172.
 *     https://dl.acm.org/citation.cfm?id=1753654
 *
 * This software is distributed under the "New BSD License" agreement:
 *
 * Copyright (C) 2007-2012, Jacob O. Wobbrock, Andrew D. Wilson and Yang Li.
 * All rights reserved. Last updated July 14, 2018.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *    * Redistributions of source code must retain the above copyright
 *      notice, this list of conditions and the following disclaimer.
 *    * Redistributions in binary form must reproduce the above copyright
 *      notice, this list of conditions and the following disclaimer in the
 *      documentation and/or other materials provided with the distribution.
 *    * Neither the names of the University of Washington nor Microsoft,
 *      nor the names of its contributors may be used to endorse or promote
 *      products derived from this software without specific prior written
 *      permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Jacob O. Wobbrock OR Andrew D. Wilson
 * OR Yang Li BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
 * OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
**/
//
// Point class
//
function Point(x, y) // constructor
{
	this.X = x;
	this.Y = y;
}
//
// Rectangle class
//
function Rectangle(x, y, width, height) // constructor
{
	this.X = x;
	this.Y = y;
	this.Width = width;
	this.Height = height;
}
//
// Unistroke class: a unistroke template
//
function Unistroke(name, points) // constructor
{
	this.Name = name;
	this.Points = Resample(points, NumPoints);
	var radians = IndicativeAngle(this.Points);
	this.Points = RotateBy(this.Points, -radians);
	this.Points = ScaleTo(this.Points, SquareSize);
	this.Points = TranslateTo(this.Points, Origin);
	this.Vector = Vectorize(this.Points); // for Protractor
}
//
// Result class
//
function Result(name, score, ms) // constructor
{
	this.Name = name;
	this.Score = score;
	this.Time = ms;
}
//
// DollarRecognizer constants
//
const NumUnistrokes = 5;
const NumPoints = 64;
const SquareSize = 250.0;
const Origin = new Point(0,0);
const Diagonal = Math.sqrt(SquareSize * SquareSize + SquareSize * SquareSize);
const HalfDiagonal = 0.5 * Diagonal;
const AngleRange = Deg2Rad(45.0);
const AnglePrecision = Deg2Rad(2.0);
const Phi = 0.5 * (-1.0 + Math.sqrt(5.0)); // Golden Ratio
//
// DollarRecognizer class
//
function DollarRecognizer() // constructor
{
	//
	// one built-in unistroke per gesture type
	//
	
	this.Unistrokes = new Array(NumUnistrokes);
	this.Unistrokes[0] = new Unistroke("smile", new Array(new Point(61,210),new Point(61,210),new Point(61,211),new Point(61,212),new Point(61,213),new Point(61,214),new Point(61,214),new Point(61,215),new Point(61,216),new Point(61,217),new Point(61,218),new Point(61,218),new Point(61,219),new Point(61,220),new Point(61,221),new Point(61,222),new Point(61,222),new Point(61,223),new Point(61,224),new Point(61,225),new Point(61,226),new Point(61,226),new Point(61,227),new Point(61,228),new Point(61,229),new Point(61,229),new Point(61,230),new Point(61,230),new Point(62,230),new Point(63,231),new Point(64,232),new Point(64,233),new Point(65,234),new Point(66,234),new Point(68,235),new Point(68,236),new Point(69,237),new Point(70,238),new Point(72,238),new Point(73,239),new Point(73,240),new Point(75,241),new Point(76,241),new Point(77,241),new Point(79,242),new Point(81,242),new Point(83,242),new Point(85,242),new Point(88,243),new Point(89,243),new Point(92,244),new Point(95,244),new Point(96,244),new Point(97,244),new Point(99,244),new Point(101,244),new Point(102,244),new Point(104,244),new Point(105,244),new Point(107,244),new Point(108,244),new Point(109,244),new Point(110,244),new Point(111,244),new Point(113,243),new Point(114,243),new Point(115,242),new Point(117,242),new Point(117,241),new Point(118,240),new Point(119,239),new Point(120,239),new Point(121,238),new Point(121,238),new Point(122,238),new Point(123,237),new Point(123,236),new Point(124,236),new Point(124,235),new Point(125,235),new Point(125,234),new Point(125,234),new Point(126,234),new Point(126,233),new Point(126,232),new Point(127,231),new Point(128,230),new Point(129,230),new Point(129,229),new Point(129,228),new Point(130,227),new Point(130,226),new Point(131,226),new Point(132,225),new Point(132,223),new Point(133,222),new Point(133,222),new Point(133,220),new Point(133,219),new Point(133,218),new Point(133,217),new Point(134,216),new Point(134,215),new Point(134,214),new Point(134,213),new Point(134,212),new Point(135,212),new Point(135,211),new Point(135,210),new Point(135,210)));
	this.Unistrokes[1] = new Unistroke("frown", new Array(new Point(62,223),new Point(62,222),new Point(62,221),new Point(62,220),new Point(62,219),new Point(62,219),new Point(62,218),new Point(62,217),new Point(62,216),new Point(63,215),new Point(63,214),new Point(63,213),new Point(63,212),new Point(63,211),new Point(63,211),new Point(64,209),new Point(64,208),new Point(64,207),new Point(64,206),new Point(64,205),new Point(64,204),new Point(64,203),new Point(64,203),new Point(64,202),new Point(64,201),new Point(65,201),new Point(65,200),new Point(65,199),new Point(65,199),new Point(65,199),new Point(65,198),new Point(65,197),new Point(66,197),new Point(67,197),new Point(68,195),new Point(68,195),new Point(69,195),new Point(69,194),new Point(70,193),new Point(72,192),new Point(73,191),new Point(73,191),new Point(74,191),new Point(75,191),new Point(76,191),new Point(77,190),new Point(77,190),new Point(78,189),new Point(80,189),new Point(81,189),new Point(83,188),new Point(85,187),new Point(85,187),new Point(88,187),new Point(89,187),new Point(91,187),new Point(93,187),new Point(95,187),new Point(97,186),new Point(98,186),new Point(100,186),new Point(101,186),new Point(103,186),new Point(106,186),new Point(107,186),new Point(110,185),new Point(113,185),new Point(113,185),new Point(115,185),new Point(116,185),new Point(117,185),new Point(117,185),new Point(118,185),new Point(119,185),new Point(121,185),new Point(123,185),new Point(125,186),new Point(127,187),new Point(129,187),new Point(131,188),new Point(133,189),new Point(134,190),new Point(137,191),new Point(138,191),new Point(141,192),new Point(141,192),new Point(142,193),new Point(143,194),new Point(145,194),new Point(145,195),new Point(145,195),new Point(146,195),new Point(146,196),new Point(147,196),new Point(148,196),new Point(148,197),new Point(148,198),new Point(149,198),new Point(149,199),new Point(149,199),new Point(149,199),new Point(149,200),new Point(150,200),new Point(150,201),new Point(150,202),new Point(150,203),new Point(151,203),new Point(151,204),new Point(152,204),new Point(152,206),new Point(152,207),new Point(153,207),new Point(153,208),new Point(153,209),new Point(153,210),new Point(153,211),new Point(153,211),new Point(153,212),new Point(153,213),new Point(153,214),new Point(153,215),new Point(153,215),new Point(153,216),new Point(153,217),new Point(153,218),new Point(153,219),new Point(153,219),new Point(153,220),new Point(153,221)));
	this.Unistrokes[2] = new Unistroke("angry", new Array(new Point(89,164),new Point(90,162),new Point(92,162),new Point(94,164),new Point(95,166),new Point(96,169),new Point(97,171),new Point(99,175),new Point(101,178),new Point(103,182),new Point(106,189),new Point(108,194),new Point(111,199),new Point(114,204),new Point(117,209),new Point(119,214),new Point(122,218),new Point(124,222),new Point(126,225),new Point(128,228),new Point(130,229),new Point(133,233),new Point(134,236),new Point(136,239),new Point(138,240),new Point(139,242),new Point(140,244),new Point(142,242),new Point(142,240),new Point(142,237),new Point(143,235),new Point(143,233),new Point(145,229),new Point(146,226),new Point(148,217),new Point(149,208),new Point(149,205),new Point(151,196),new Point(151,193),new Point(153,182),new Point(155,172),new Point(157,165),new Point(159,160),new Point(162,155),new Point(164,150),new Point(165,148),new Point(166,146)));
	this.Unistrokes[3] = new Unistroke("star", new Array(new Point(75,250),new Point(75,247),new Point(77,244),new Point(78,242),new Point(79,239),new Point(80,237),new Point(82,234),new Point(82,232),new Point(84,229),new Point(85,225),new Point(87,222),new Point(88,219),new Point(89,216),new Point(91,212),new Point(92,208),new Point(94,204),new Point(95,201),new Point(96,196),new Point(97,194),new Point(98,191),new Point(100,185),new Point(102,178),new Point(104,173),new Point(104,171),new Point(105,164),new Point(106,158),new Point(107,156),new Point(107,152),new Point(108,145),new Point(109,141),new Point(110,139),new Point(112,133),new Point(113,131),new Point(116,127),new Point(117,125),new Point(119,122),new Point(121,121),new Point(123,120),new Point(125,122),new Point(125,125),new Point(127,130),new Point(128,133),new Point(131,143),new Point(136,153),new Point(140,163),new Point(144,172),new Point(145,175),new Point(151,189),new Point(156,201),new Point(161,213),new Point(166,225),new Point(169,233),new Point(171,236),new Point(174,243),new Point(177,247),new Point(178,249),new Point(179,251),new Point(180,253),new Point(180,255),new Point(179,257),new Point(177,257),new Point(174,255),new Point(169,250),new Point(164,247),new Point(160,245),new Point(149,238),new Point(138,230),new Point(127,221),new Point(124,220),new Point(112,212),new Point(110,210),new Point(96,201),new Point(84,195),new Point(74,190),new Point(64,182),new Point(55,175),new Point(51,172),new Point(49,170),new Point(51,169),new Point(56,169),new Point(66,169),new Point(78,168),new Point(92,166),new Point(107,164),new Point(123,161),new Point(140,162),new Point(156,162),new Point(171,160),new Point(173,160),new Point(186,160),new Point(195,160),new Point(198,161),new Point(203,163),new Point(208,163),new Point(206,164),new Point(200,167),new Point(187,172),new Point(174,179),new Point(172,181),new Point(153,192),new Point(137,201),new Point(123,211),new Point(112,220),new Point(99,229),new Point(90,237),new Point(80,244),new Point(73,250),new Point(69,254),new Point(69,252)));
	this.Unistrokes[4] = new Unistroke("circle",new Array(new Point(127,141),new Point(124,140),new Point(120,139),new Point(118,139),new Point(116,139),new Point(111,140),new Point(109,141),new Point(104,144),new Point(100,147),new Point(96,152),new Point(93,157),new Point(90,163),new Point(87,169),new Point(85,175),new Point(83,181),new Point(82,190),new Point(82,195),new Point(83,200),new Point(84,205),new Point(88,213),new Point(91,216),new Point(96,219),new Point(103,222),new Point(108,224),new Point(111,224),new Point(120,224),new Point(133,223),new Point(142,222),new Point(152,218),new Point(160,214),new Point(167,210),new Point(173,204),new Point(178,198),new Point(179,196),new Point(182,188),new Point(182,177),new Point(178,167),new Point(170,150),new Point(163,138),new Point(152,130),new Point(143,129),new Point(140,131),new Point(129,136),new Point(126,139)));
	
	//
	// The $1 Gesture Recognizer API begins here -- 3 methods: Recognize(), AddGesture(), and DeleteUserGestures()
	//
	this.Recognize = function(points, useProtractor)
	{	
		var t0 = Date.now();
		var candidate = new Unistroke("", points);

		var u = -1;
		var b = +Infinity;
		for (var i = 0; i < this.Unistrokes.length; i++) // for each unistroke template
		{
			var d;
			if (useProtractor)
				d = OptimalCosineDistance(this.Unistrokes[i].Vector, candidate.Vector); // Protractor
			else
				d = DistanceAtBestAngle(candidate.Points, this.Unistrokes[i], -AngleRange, +AngleRange, AnglePrecision); // Golden Section Search (original $1)
			if (d < b) {
				b = d; // best (least) distance
				u = i; // unistroke index
			}
		}
		var t1 = Date.now();
		return (u == -1) ? new Result("No match.", 0.0, t1-t0) : new Result(this.Unistrokes[u].Name, useProtractor ? (1.0 - b) : (1.0 - b / HalfDiagonal), t1-t0);
	}
	this.AddGesture = function(name, points)
	{
		this.Unistrokes[this.Unistrokes.length] = new Unistroke(name, points); // append new unistroke
		var num = 0;
		for (var i = 0; i < this.Unistrokes.length; i++) {
			if (this.Unistrokes[i].Name == name)
				num++;
		}
		return num;
	}
	this.DeleteUserGestures = function()
	{
		this.Unistrokes.length = NumUnistrokes; // clear any beyond the original set
		return NumUnistrokes;
	}
}
//
// Private helper functions from here on down
//
function Resample(points, n)
{
	var I = PathLength(points) / (n - 1); // interval length
	var D = 0.0;
	var newpoints = new Array(points[0]);
	for (var i = 1; i < points.length; i++)
	{
		var d = Distance(points[i-1], points[i]);
		if ((D + d) >= I)
		{
			var qx = points[i-1].X + ((I - D) / d) * (points[i].X - points[i-1].X);
			var qy = points[i-1].Y + ((I - D) / d) * (points[i].Y - points[i-1].Y);
			var q = new Point(qx, qy);
			newpoints[newpoints.length] = q; // append new point 'q'
			points.splice(i, 0, q); // insert 'q' at position i in points s.t. 'q' will be the next i
			D = 0.0;
		}
		else D += d;
	}
	if (newpoints.length == n - 1) // somtimes we fall a rounding-error short of adding the last point, so add it if so
		newpoints[newpoints.length] = new Point(points[points.length - 1].X, points[points.length - 1].Y);
	return newpoints;
}
function IndicativeAngle(points)
{
	var c = Centroid(points);
	return Math.atan2(c.Y - points[0].Y, c.X - points[0].X);
}
function RotateBy(points, radians) // rotates points around centroid
{
	var c = Centroid(points);
	var cos = Math.cos(radians);
	var sin = Math.sin(radians);
	var newpoints = new Array();
	for (var i = 0; i < points.length; i++) {
		var qx = (points[i].X - c.X) * cos - (points[i].Y - c.Y) * sin + c.X
		var qy = (points[i].X - c.X) * sin + (points[i].Y - c.Y) * cos + c.Y;
		newpoints[newpoints.length] = new Point(qx, qy);
	}
	return newpoints;
}
function ScaleTo(points, size) // non-uniform scale; assumes 2D gestures (i.e., no lines)
{
	var B = BoundingBox(points);
	var newpoints = new Array();
	for (var i = 0; i < points.length; i++) {
		var qx = points[i].X * (size / B.Width);
		var qy = points[i].Y * (size / B.Height);
		newpoints[newpoints.length] = new Point(qx, qy);
	}
	return newpoints;
}
function TranslateTo(points, pt) // translates points' centroid
{
	var c = Centroid(points);
	var newpoints = new Array();
	for (var i = 0; i < points.length; i++) {
		var qx = points[i].X + pt.X - c.X;
		var qy = points[i].Y + pt.Y - c.Y;
		newpoints[newpoints.length] = new Point(qx, qy);
	}
	return newpoints;
}
function Vectorize(points) // for Protractor
{
	var sum = 0.0;
	var vector = new Array();
	for (var i = 0; i < points.length; i++) {
		vector[vector.length] = points[i].X;
		vector[vector.length] = points[i].Y;
		sum += points[i].X * points[i].X + points[i].Y * points[i].Y;
	}
	var magnitude = Math.sqrt(sum);
	for (var i = 0; i < vector.length; i++)
		vector[i] /= magnitude;
	return vector;
}
function OptimalCosineDistance(v1, v2) // for Protractor
{
	var a = 0.0;
	var b = 0.0;
	for (var i = 0; i < v1.length; i += 2) {
		a += v1[i] * v2[i] + v1[i+1] * v2[i+1];
		b += v1[i] * v2[i+1] - v1[i+1] * v2[i];
	}
	var angle = Math.atan(b / a);
	return Math.acos(a * Math.cos(angle) + b * Math.sin(angle));
}
function DistanceAtBestAngle(points, T, a, b, threshold)
{
	var x1 = Phi * a + (1.0 - Phi) * b;
	var f1 = DistanceAtAngle(points, T, x1);
	var x2 = (1.0 - Phi) * a + Phi * b;
	var f2 = DistanceAtAngle(points, T, x2);
	while (Math.abs(b - a) > threshold)
	{
		if (f1 < f2) {
			b = x2;
			x2 = x1;
			f2 = f1;
			x1 = Phi * a + (1.0 - Phi) * b;
			f1 = DistanceAtAngle(points, T, x1);
		} else {
			a = x1;
			x1 = x2;
			f1 = f2;
			x2 = (1.0 - Phi) * a + Phi * b;
			f2 = DistanceAtAngle(points, T, x2);
		}
	}
	return Math.min(f1, f2);
}
function DistanceAtAngle(points, T, radians)
{
	var newpoints = RotateBy(points, radians);
	return PathDistance(newpoints, T.Points);
}
function Centroid(points)
{
	var x = 0.0, y = 0.0;
	for (var i = 0; i < points.length; i++) {
		x += points[i].X;
		y += points[i].Y;
	}
	x /= points.length;
	y /= points.length;
	return new Point(x, y);
}
function BoundingBox(points)
{
	var minX = +Infinity, maxX = -Infinity, minY = +Infinity, maxY = -Infinity;
	for (var i = 0; i < points.length; i++) {
		minX = Math.min(minX, points[i].X);
		minY = Math.min(minY, points[i].Y);
		maxX = Math.max(maxX, points[i].X);
		maxY = Math.max(maxY, points[i].Y);
	}
	return new Rectangle(minX, minY, maxX - minX, maxY - minY);
}
function PathDistance(pts1, pts2)
{
	var d = 0.0;
	for (var i = 0; i < pts1.length; i++) // assumes pts1.length == pts2.length
		d += Distance(pts1[i], pts2[i]);
	return d / pts1.length;
}
function PathLength(points)
{
	var d = 0.0;
	for (var i = 1; i < points.length; i++)
		d += Distance(points[i - 1], points[i]);
	return d;
}
function Distance(p1, p2)
{
	var dx = p2.X - p1.X;
	var dy = p2.Y - p1.Y;
	return Math.sqrt(dx * dx + dy * dy);
}
function Deg2Rad(d) { return (d * Math.PI / 180.0); }