
// Data samples are stored here
var dataSet = [];

document.addEventListener( 'DOMContentLoaded', function () {
	// Run this once after the DOM is loaded
	if (!!window.EventSource) {
		// Good example on using SSE
		// http://www.html5rocks.com/en/tutorials/eventsource/basics/
		
		var source = new EventSource('data');
		source.addEventListener('message', function(e) {
			// e.data is the SSE data, which is a two-character hexadecimal string representing a value
			// console.log("msg=" + e.data);
            for(var ii = 0; ii < e.data.length; ii += 2) {
                handleData(parseInt('0x' + e.data.substr(ii, ii + 2)));
            }
		}, false);
	}
	else {
		console.log('sse not supported');
	}
}, false );


function handleData(data) {
	// data is a number value (currently 0 - 255)
	
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	// console.log(data);
	
	// Add to the data set, remove from the left if it gets wider than the canvas
	dataSet.push(data);
	if (dataSet.length > (canvas.width - 1)) {
		dataSet.shift();
	}
	
	// Erase
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);	
	
	// Draw samples
	ctx.fillStyle = "#000000";
	
	for(var ii = 0; ii < dataSet.length; ii++) {
		// The canvas coordinate space increases going down the page, but the graph
		// makes more sense flipped the other way so subtract the value from the 
		// maximum value
		var yy = 255 - dataSet[ii];

		ctx.fillRect(ii, yy, 1, 1);
	}
	
	
}

