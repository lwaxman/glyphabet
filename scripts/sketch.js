/*
* 14.11.14
* Laurie Waxman
* 
* Colour picker courtesy of http://jscolor.com/
* Hex to RGB function courtsey of http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
*
	TO DO: 
		seperate layers (layers[0] = layers[1], etc)
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
var myType = "TEST";
var insideText = false;
var style = "normal";
var minSize = 10;
var maxSize = 20;
var thisTextSize = 100;
var gridSize = 50;
var textFillColour;
var xOffset = 0;
var yOffset = 0;

var layerTemp = new Layer();

var layers = [];

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////// SETUP
////////////////////////////////////////////////////////////////////////////////////////////////

function setup(){
	textFillColour = color(25,212,255, 150);

	for(var i=0; i<4; i++){
		layers[i] = new Layer();
	}

	layerTemp = layers[1];
	
	//draw word to pgraphic 
	createCanvas(canvasWidth, canvasHeight);
	pg = createGraphics(canvasWidth,800);
	pg.background(255);
	pg.noStroke();
	pg.fill(0);
	pg.textSize(getTextSize());
	pg.textAlign(CENTER);
	pg.text(myType, canvasWidth/2, 500);
}

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////// BASIC JS/JQUERY
////////////////////////////////////////////////////////////////////////////////////////////////

$("#gridCircles").on("click", function(){ 
	// layers[0].styleMode = "gridCircles";
	style = "gridCircles";
	draw();
});
$("#randoCircles").on("click", function(){ 
	// layers[0].styleMode = "randoCircles";
	style = "randoCircles";
	draw();
});
$("#weirdoCircles").on("click", function(){ 
	// layers[0].styleMode = "weirdoCircles";
	style = "weirdoCircles";
	draw();
});
$("#randoSquares").on("click", function(){ 
	// layers[0].styleMode = "randoSquares";
	style = "randoSquares";
	draw();
});
$("#gridSquares").on("click", function(){ 
	// layers[0].styleMode = "gridSquares";
	style = "gridSquares";
	draw();
});
$("#normal").on("click", function(){ 
	// layers[0].styleMode = "gridSquares";
	style = "normal";
	draw();
});

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////// SLIDERS
////////////////////////////////////////////////////////////////////////////////////////////////

$("#shapeSize-range").slider({
	range: true,
	min: 1,
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
	min: 30,
	max: 250,
	range: "min",
	slide: function( event, ui ) {
		$("#gridSize").val( ui.value);
		gridSize = ui.value;
		draw();
	}
});
$("#gridSize").val( $("#gridSize-range").slider("values",0) + " - " + $("#gridSize-range").slider("values",1)  );

$("#xOffset-range").slider({
	value: 0,
	min: -50,
	max: 50,
	range: "min",
	slide: function( event, ui ) {
		$("#xOffset").val( ui.value);
		xOffset = ui.value;
		draw();
	}
});
$("#xOffset").val( $("#xOffset-range").slider("values",0) + " - " + $("#xOffset-range").slider("values",1) );

$("#yOffset-range").slider({
	value: 0,
	min: -50,
	max: 50,
	range: "min",
	slide: function( event, ui ) {
		$("#yOffset").val( ui.value);
		yOffset = ui.value;
		draw();
	}
});
$("#yOffset").val( $("#yOffset-range").slider("values",0) + " - " + $("#yOffset-range").slider("values",1) );

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////// CANVAS P5JS
////////////////////////////////////////////////////////////////////////////////////////////////

function draw(){

	background(255);	
	noLoop();

	layers[1].styleMode = "normal";
	layers[1].colour = color(0,100,255,150);
	layers[1].xOffset = 20;
	layers[1].yOffset = 20;
	// layers[1].display();

	layers[2].styleMode = "gridCircles";
	layers[2].xOffset = 10;
	layers[2].yOffset = 30;
	layers[2].colour = color(0,200,255,150);
	layers[2].display();

	layerTemp.styleMode = style;
	layerTemp.colour = textFillColour;
	layerTemp.grid = gridSize;
	layerTemp.minShapeSize = minSize;
	layerTemp.maxShapeSize = maxSize;
	layerTemp.stroke = false;
	layerTemp.xOffset = xOffset;
	layerTemp.yOffset = yOffset;
	layerTemp.display();

	for(var j=1; j<4; j++){
		layers[j].display();
	}
}

var layerCount = 1;
$("#newLayer").on("click", addNewLayer( layers[layerCount+1] ));

$(".layer").on("click", function(){
	console.log("clicky " + this.id);
	var thisLayer = this.id;
	var thisLayerNumber = thisLayer.split("r");
	switchLayers(thisLayerNumber[1]);
});

function addNewLayer(thisLayer){
	layerCount++;
}

function switchLayers(layerNumber){
	// console.log(thisLayer);
	// console.log(thisLayerID+" is now layer[0]");
	// return layers[2].display();

	console.log("this layer number = " + layerNumber);
	// layers[10] = layerTemp;
	layers[layerNumber].styleMode = layerTemp.styleMode;
	layers[layerNumber].xOffset = layerTemp.xOffset;
	layers[layerNumber].yOffset = layerTemp.yOffset;
	layers[layerNumber].font = layerTemp.font;
	layers[layerNumber].colour = layerTemp.colour;
	layers[layerNumber].grid = layerTemp.grid;
	layers[layerNumber].stroke = layerTemp.stroke;
	layers[layerNumber].minShapeSize = layerTemp.minShapeSize;
	layers[layerNumber].maxShapeSize = layerTemp.maxShapeSize;
	console.log("layerNumber: " + layers[layerNumber].styleMode);

	// layers[5] = layers[layerNumber];
	layers[0].styleMode = layers[layerNumber].styleMode;
	layers[0].xOffset = layers[layerNumber].xOffset;
	layers[0].yOffset = layers[layerNumber].yOffset;
	layers[0].font = layers[layerNumber].font;
	layers[0].colour = layers[layerNumber].colour;
	layers[0].grid = layers[layerNumber].grid;
	layers[0].stroke = layers[layerNumber].stroke;
	layers[0].minShapeSize = layers[layerNumber].minShapeSize;
	layers[0].maxShapeSize = layers[layerNumber].maxShapeSize;
	console.log("0: " + layers[0].styleMode);

	// layerTemp = layers[0];
	layerTemp.styleMode = layers[0].styleMode;
	layerTemp.xOffset = layers[0].xOffset;
	layerTemp.yOffset = layers[0].yOffset;
	layerTemp.font = layers[0].font;
	layerTemp.colour = layers[0].colour;
	layerTemp.grid = layers[0].grid;
	layerTemp.stroke = layers[0].stroke;
	layerTemp.minShapeSize = layers[0].minShapeSize;
	layerTemp.maxShapeSize = layers[0].maxShapeSize;
	console.log("temp: " + layerTemp.styleMode);


	draw();
}


////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////

function getTextSize(){
	var textArray = myType.split("");
	var textLength = textArray.length;
	thisTextSize = (canvasWidth/textLength)*1.2;
	return thisTextSize;
}

function drawNormal(xOffset, yOffset){
	textSize(getTextSize());
	textAlign(CENTER);
	text(myType, (canvasWidth/2)+xOffset, 500+yOffset);
}

function drawRandoCircles(xOffset, yOffset){
	for (var i=0; i<3000; i++) {
		var xPos = random(canvasWidth);
		var yPos = random(100, 600);
		var textColour = pg.get(xPos, yPos);
		var shapeSize = random(minSize, maxSize);
		if( textColour[0] == 0 ){
			ellipse(xPos+xOffset, yPos+yOffset, shapeSize, shapeSize);
		}
	}
}

function drawWeirdoCircles(xOffset, yOffset){
	for (var i=0; i<3000; i++) {
		var xPos = random(canvasWidth);
		var yPos = random(200, 600);
		var textColour = pg.get(xPos, yPos);
		var shapeSize = random(minSize, maxSize);
		if( textColour[0] == 0 ){
			var strokeColour = textFillColour;
			for(var back=20; back>0; back--){
				strokeColour+=10;
				stroke(strokeColour);
				ellipse(xPos-back, yPos-back, shapeSize, shapeSize);
			}
			stroke(0);
			ellipse(xPos+xOffset, yPos+yOffset, shapeSize, shapeSize);
		}
	}
}

function drawGridSquares(thisGridSize, minShapeSize, maxShapeSize, xOffset, yOffset){
	for (var x=0; x<thisGridSize; x++) {
		for(var y=0; y<thisGridSize; y++){
			var xPos = x * (width/thisGridSize);
			var yPos = y * (width/thisGridSize);
			var textColour = pg.get(xPos, yPos);
			var shapeSize = random(minShapeSize, maxShapeSize);
			if( textColour[0] == 0 ){
				rect(xPos+xOffset, yPos+yOffset, shapeSize, shapeSize);
			}
		}
	}
}

function drawRandoSquares(xOffset, yOffset){
	for (var i=0; i<3000; i++) {
		var xPos = random(canvasWidth);
		var yPos = random(100, 600);
		var textColour = pg.get(xPos, yPos);
		var shapeSize = random(minSize, maxSize);
		if( textColour[0] == 0 ){
			rect(xPos+xOffset, yPos+yOffset, shapeSize, shapeSize);
		}
	}
}


function drawGridCircles(thisGridSize, minShapeSize, maxShapeSize, xOffset, yOffset){
	for (var x=0; x<thisGridSize; x++) {
		for(var y=0; y<thisGridSize; y++){
			var xPos = x * (width/thisGridSize);
			var yPos = y * (width/thisGridSize);
			var textColour = pg.get(xPos, yPos);
			var shapeSize = random(minShapeSize, maxShapeSize);
			if( textColour[0] == 0 ){
				ellipse(xPos+xOffset, yPos+yOffset, shapeSize, shapeSize);
			}
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////// CLASS LAYER
////////////////////////////////////////////////////////////////////////////////////////////////

function Layer(){
	this.xOffset = 0;
	this.yOffset = 0;
	this.styleMode = "normal";
	this.font = "helvetica";
	this.colour; //= color(0,0,0, 100);
	this.grid = 80;
	this.stroke;
	this.opacity = false;
	this.minShapeSize = 5;
	this.maxShapeSize = 10;

	this.display = function(){
		if(this.stroke){
			stroke(100);
		}else{
			noStroke();
		}

		if(this.opacity){
			fill(this.colour);
		}else{
			noFill();
		}

		fill(this.colour);
		if(this.styleMode=="gridCircles"){
			drawGridCircles(this.grid, this.minShapeSize, this.maxShapeSize, this.xOffset, this.yOffset);
		}else if(this.styleMode=="randoCircles"){
			drawRandoCircles(this.xOffset, this.yOffset);
		}else if(this.styleMode=="weirdoCircles"){
			drawWeirdoCircles(this.xOffset, this.yOffset);
		}else if(this.styleMode=="gridSquares"){
			drawGridSquares(this.grid, this.minShapeSize, this.maxShapeSize, this.xOffset, this.yOffset);
		}else if(this.styleMode=="randoSquares"){
			drawRandoSquares(this.xOffset, this.yOffset);
		}else if(this.styleMode=="normal"){
			drawNormal(this.xOffset, this.yOffset);
		}else{
			drawNormal(this.xOffset, this.yOffset);
		}
	};


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
	var colourBoxColour = $("#colourTextBox").val();
	var rgbFillColour = color(hexToRgb(colourBoxColour).r, hexToRgb(colourBoxColour).g, hexToRgb(colourBoxColour).b, 150);
	textFillColour = rgbFillColour;
	// console.log(textFillColour);
	draw();
	return textFillColour;
	// return rgbFillColour;
}
$('#colourTextBox').on('change', getColour);

// getText();
function getText(){
	var textBoxResult = $("#textBox").val();
	console.log(textBoxResult);

	myType = textBoxResult;
	pg.background(255);
	pg.noStroke();
	pg.fill(0);
	pg.textSize(getTextSize());
	pg.textAlign(CENTER);
	pg.text(myType, canvasWidth/2, 500);

	draw();
}
$('#textBox').keyup(getText);











