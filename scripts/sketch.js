var canvasWidth = $(window).width() - 300;
var canvasHeight = $(window).height();

function setup(){
	createCanvas(canvasWidth, canvasHeight);
	noLoop();
}

function draw(){
	textFont("Helvetica");
	var myLetter = "b";
	textSize(750);
	text(myLetter, (canvasWidth/2)-200, 750);

}



function getFontSize(thisText){
	var text = thisText.split("");
	console.log(text.length);
	var size = (canvasWidth-100 / text.length) / (text.length/2) ;
	console.log(size);
	return size;
}
