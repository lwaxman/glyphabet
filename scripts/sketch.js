/*
* 14.11.14
* Laurie Waxman
* 
* Colour picker courtesy of http://jscolor.com/
* Hex to RGB function courtsey of http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
*
*/

var canvasWidth = $(window).width();
var canvasHeight = $(window).height();
var pgTextColour;
var pg;
var myType = "TEXT";
var insideText = false;
var textMode = "randoCircles";
var minSize = 10;
var maxSize = 20;
var textSize = 100;
var gridSize = 50;
var textFillColour;

$("#gridCircles").on("click", function(){ 
	drawGridCircles(); 
	return textMode = "gridCircles";
});
$("#randoCircles").on("click", function(){ 
	drawCircles(); 
	return textMode = "randoCircles";
});
$("#weirdoCircles").on("click", function(){ 
	drawWeirdoCircles(); 
	return textMode = "weirdoCircles";
});
$("#randoSquares").on("click", function(){ 
	drawRandoSquares(); 
	return textMode = "randoSquares";
});
$("#gridSquares").on("click", function(){ 
	drawGridSquares();; 
	return textMode = "gridSquares";
});

$("#shapeSize-range").slider({
	range: true,
	min: 0,
	max: 40,
	values: [ 10, 20 ],
	slide: function( event, ui ) {
		$( "#shapeSize" ).val( ui.values[0] + " - " + ui.values[1] );
		minSize = ui.values[0];
		maxSize = ui.values[1];
		draw();
	}
});
$("#shapeSize").val( $("#shapeSize-range").slider("values",0) + " - " + $("#shapeSize-range").slider("values",1) );


$("#gridSize-range").slider({
	value: 50,
	range: "min",
	slide: function( event, ui ) {
		$("#gridSize").val( ui.value + 30);
		gridSize = ui.value + 30;
		draw();
	}
});
$("#gridSize").val( $("#gridSize-range").slider("values",0) + " - " + $("#gridSize-range").slider("values",1)  );

/////////////////////////////////////////////////////////////////////////////////////////// canvas

function setup(){
	pgTextColour = color(0);
	createCanvas(800, 800);
	pg = createGraphics(800,800);
	pg.background(255);
	pg.noStroke();
	pg.fill(0);
	pg.textSize(getTextSize());
	pg.textAlign(CENTER);
	pg.text(myType, 400, 500);
}

function draw(){
	background(255);	
	noLoop();
	if(textMode=="gridCircles"){
		drawGridCircles();
	}else if(textMode=="randoCircles"){
		drawRandoCircles();
	}else if(textMode=="weirdoCircles"){
		drawWeirdoCircles();
	}else if(textMode=="gridSquares"){
		drawGridSquares();
	}else if(textMode=="randoSquares"){
		drawRandoSquares();
	}else{
		drawGridCircles();
	}
	
}

function getTextSize(){
	var textArray = myType.split("");
	var textLength = textArray.length;
	textSize = (canvasWidth/textLength)*0.8;
	return textSize;
}

function drawGridCircles(){
	background(255);
	noStroke();
	fill(0);
	for (var x=0; x<gridSize; x++) {
		for(var y=0; y<gridSize; y++){
			var xPos = x * (width/gridSize);
			var yPos = y * (width/gridSize);
			var textColour = pg.get(xPos, yPos);
			var shapeSize = random(minSize, maxSize);
			if( textColour[0] == 0 ){
				ellipse(xPos, yPos, shapeSize, shapeSize);
			}
		}
	}
}

function drawRandoCircles(){
	background(255);
	stroke(255);
	fill(0);
	for (var i=0; i<3000; i++) {
		var xPos = random(800);
		var yPos = random(100, 600);
		var textColour = pg.get(xPos, yPos);
		var shapeSize = random(minSize, maxSize);
		if( textColour[0] == 0 ){
			ellipse(xPos, yPos, shapeSize, shapeSize);
		}
	}
}

function drawWeirdoCircles(){
	background(255);
	stroke(255);
	fill(0);
	for (var i=0; i<3000; i++) {
		var xPos = random(800);
		var yPos = random(200, 600);
		var textColour = pg.get(xPos, yPos);
		var shapeSize = random(minSize, maxSize);
		if( textColour[0] == 0 ){
			for(var back=20; back>0; back--){
				stroke(255-(back*10));
				ellipse(xPos-back, yPos-back, shapeSize, shapeSize);
			}
			stroke(0);
			ellipse(xPos, yPos, shapeSize, shapeSize);
		}
	}
}

function drawGridSquares(){
	background(255);
	noStroke();
	fill(0);
	for (var x=0; x<gridSize; x++) {
		for(var y=0; y<gridSize; y++){
			var xPos = x * (width/gridSize);
			var yPos = y * (width/gridSize);
			var textColour = pg.get(xPos, yPos);
			var shapeSize = random(minSize, maxSize);
			if( textColour[0] == 0 ){
				rect(xPos, yPos, shapeSize, shapeSize);
			}
		}
	}
}

function drawRandoSquares(){
	background(255);
	stroke(255);
	fill(0);
	for (var i=0; i<3000; i++) {
		var xPos = random(800);
		var yPos = random(100, 600);
		var textColour = pg.get(xPos, yPos);
		var shapeSize = random(minSize, maxSize);
		if( textColour[0] == 0 ){
			rect(xPos, yPos, shapeSize, shapeSize);
		}
	}
}

function Layer() {
  this.x = 200;
  this.y = 500;
  this.style = textMode;
  this.font = textFont;
  this.colour = textColour;
  this.shape = textStyleShape;
}

//LOGIC? 
// thisLayer = layerOne; 
// layerOne  = new Layer();
// layerOne.colour = getColour();
// thisLayer.colour = getColour();


/*
* hexToRgb function from 
* http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
*/
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


$('#colourTextBox').on('input', function() { 
	colourBoxColour = $("#colourTextBox").val();
	var rgbFillString = "color("+hexToRgb(colourBoxColour).r +","+hexToRgb(colourBoxColour).g +","+hexToRgb(colourBoxColour).b +")"
	console.log(rgbFillString);
	return fillColour = rgbFillString;
});

// hexToRgb("#0033ff").g 











