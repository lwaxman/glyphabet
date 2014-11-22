/*
* 14.11.14
* Laurie Waxman
* 
* Colour picker courtesy of http://jscolor.com/
* Hex to RGB function courtsey of http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
*
	TO DO: 
		seperate layers (currentLayer = layerOne, etc)
		select layer
		add new layer
		array of layers?
		normal style
		position layer
		add new line of text
		fix check for black area
*
*/

var canvasWidth = $(window).width() - 310;
var canvasHeight = $(window).height() - 10;
// var pgTextColour;
var pg;
var myType = "TEXT";
var insideText = false;
var style = "randoCircles";
var minSize = 10;
var maxSize = 20;
var textSize = 100;
var gridSize = 50;
var textFillColour;
var xOffset;
var yOffset;

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////// SETUP
////////////////////////////////////////////////////////////////////////////////////////////////

function setup(){
	textFillColour = color(25,212,255, 150);
	// pgTextColour = color(0);

	//draw word to pgraphic 
	createCanvas(canvasWidth, canvasHeight);
	pg = createGraphics(canvasWidth,800);
	pg.background(255);
	pg.noStroke();
	pg.fill(0);
	pg.textSize(getTextSize());
	pg.textAlign(CENTER);
	pg.text(myType, canvasWidth/2, 500);
	currentLayer = new Layer();
}

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////// BASIC JS/JQUERY
////////////////////////////////////////////////////////////////////////////////////////////////

$("#gridCircles").on("click", function(){ 
	drawGridCircles(); 
	return style = "gridCircles";
});
$("#randoCircles").on("click", function(){ 
	drawCircles(); 
	return style = "randoCircles";
});
$("#weirdoCircles").on("click", function(){ 
	drawWeirdoCircles(); 
	return style = "weirdoCircles";
});
$("#randoSquares").on("click", function(){ 
	drawRandoSquares(); 
	return style = "randoSquares";
});
$("#gridSquares").on("click", function(){ 
	drawGridSquares();
	return style = "gridSquares";
});

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////// SLIDERS
////////////////////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////// CANVAS P5JS
////////////////////////////////////////////////////////////////////////////////////////////////



function draw(){

	background(255);	
	noLoop();

	layerOne = new Layer();

	layerTwo = new Layer();
	layerTwo.styleMode = "gridCircles";
	layerTwo.colour = color(0,100,255,150);
	layerTwo.display();

	currentLayer = layerTwo;
	currentLayer.styleMode = "gridCircles";
	currentLayer.colour = textFillColour;
	currentLayer.grid = gridSize;
	currentLayer.minShapeSize = minSize;
	currentLayer.maxShapeSize = maxSize;
	currentLayer.stroke = false;
	currentLayer.display();
}

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////

function getTextSize(){
	var textArray = myType.split("");
	var textLength = textArray.length;
	textSize = (canvasWidth/textLength)*1.2;
	return textSize;
}

function drawRandoCircles(){
	for (var i=0; i<3000; i++) {
		var xPos = random(canvasWidth);
		var yPos = random(100, 600);
		var textColour = pg.get(xPos, yPos);
		var shapeSize = random(minSize, maxSize);
		if( textColour[0] == 0 ){
			ellipse(xPos, yPos, shapeSize, shapeSize);
		}
	}
}

function drawWeirdoCircles(){
	for (var i=0; i<3000; i++) {
		var xPos = random(canvasWidth);
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

function drawGridSquares(thisGridSize, minShapeSize, maxShapeSize){
	for (var x=0; x<thisGridSize; x++) {
		for(var y=0; y<thisGridSize; y++){
			var xPos = x * (width/thisGridSize);
			var yPos = y * (width/thisGridSize);
			var textColour = pg.get(xPos, yPos);
			var shapeSize = random(minShapeSize, maxShapeSize);
			if( textColour[0] == 0 ){
				rect(xPos, yPos, shapeSize, shapeSize);
			}
		}
	}
}

function drawRandoSquares(){
	for (var i=0; i<3000; i++) {
		var xPos = random(canvasWidth);
		var yPos = random(100, 600);
		var textColour = pg.get(xPos, yPos);
		var shapeSize = random(minSize, maxSize);
		if( textColour[0] == 0 ){
			rect(xPos, yPos, shapeSize, shapeSize);
		}
	}
}


function drawGridCircles(thisGridSize, minShapeSize, maxShapeSize){
	for (var x=0; x<thisGridSize; x++) {
		for(var y=0; y<thisGridSize; y++){
			var xPos = x * (width/thisGridSize);
			var yPos = y * (width/thisGridSize);
			var textColour = pg.get(xPos, yPos);
			var shapeSize = random(minShapeSize, maxShapeSize);
			if( textColour[0] == 0 ){
				ellipse(xPos, yPos, shapeSize, shapeSize);
			}
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////// CLASS LAYER
////////////////////////////////////////////////////////////////////////////////////////////////

function Layer() {
	this.xOffset;
	this.yOffset;
	this.styleMode = "gridSquares";
	this.font;
	this.colour;
	this.grid = 80;
	this.stroke;
	this.minShapeSize = 5;
	this.maxShapeSize = 10;

	this.display = function(){
		if(this.stroke){
			stroke(100);
		}else{
			noStroke();
		}

		if(this.styleMode=="gridCircles"){
			fill(this.colour);
			drawGridCircles(this.grid, this.minShapeSize, this.maxShapeSize);
		}else if(this.styleMode=="randoCircles"){
			drawRandoCircles();
		}else if(this.styleMode=="weirdoCircles"){
			drawWeirdoCircles();
		}else if(this.styleMode=="gridSquares"){
			fill(this.colour);
			drawGridSquares(this.grid, this.minShapeSize, this.maxShapeSize);
		}else if(this.styleMode=="randoSquares"){
			drawRandoSquares();
		}else{
			fill(this.colour);
			drawGridSquares(this.grid, this.minShapeSize, this.maxShapeSize);
		}
	}


}//end class Layer


////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////// COLOURS
////////////////////////////////////////////////////////////////////////////////////////////////


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

function getColour(){
	colourBoxColour = $("#colourTextBox").val();
	var rgbFillColour = color(hexToRgb(colourBoxColour).r, hexToRgb(colourBoxColour).g, hexToRgb(colourBoxColour).b, 150);
	textFillColour = rgbFillColour;
	console.log(textFillColour);
	draw();
	return textFillColour;
	// return rgbFillColour;
}

$('#colourTextBox').on('change', getColour);

// hexToRgb("#0033ff").g 











