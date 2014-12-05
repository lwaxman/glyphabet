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
var font = "Georgia";
var insideText = false;
var style = "normal";
var minSize = 10;
var maxSize = 20;
var thisTextSize = 100;
var gridSize = 80;
var textFillColour;
var xOffset = 0;
var yOffset = 0;
var structure = true;

var layerTemp = new Layer();
var layers = [];

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////// BASIC JS/JQUERY
////////////////////////////////////////////////////////////////////////////////////////////////

$("#normal").on("click", function(){ 
	style = "normal";
	$(".styleMode").removeClass("active");
	$("#normal").addClass("active");
	draw();
});
$("#circles").on("click", function(){ 
	style = "circles";
	$(".styleMode").removeClass("active");
	$("#circles").addClass("active");
	draw();
});
$("#squares").on("click", function(){ 
	style = "squares";
	$(".styleMode").removeClass("active");
	$("#squares").addClass("active");
	draw();
});
$("#exes").on("click", function(){ 
	style = "exes";
	$(".styleMode").removeClass("active");
	$("#exes").addClass("active");
	draw();
});
$("#polygons").on("click", function(){ 
	style = "polygons";
	$(".styleMode").removeClass("active");
	$("#polygons").addClass("active");
	draw();
});

$("#gridOn").on("click", function(){ 
	structure = true;
	$(".gridControl").removeClass("active");
	$("#gridOn").addClass("active");
	draw();
});
$("#gridOff").on("click", function(){ 
	structure = false;
	$(".gridControl").removeClass("active");
	$("#gridOff").addClass("active");
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
	value: 80,
	min: 30,
	max: 250,
	range: "min",
	slide: function( event, ui ) {
		$("#gridSize").val( ui.value);
		gridSize = ui.value;
		draw();
	}
});
$("#gridSize").val( $("#gridSize-range").slider("values",0));

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
//////////////////////////////////////////////////////////////////////////////////////////////// SETUP
////////////////////////////////////////////////////////////////////////////////////////////////

function setup(){
	textFillColour = color(25,212,255, 150);

	for(var i=0; i<5; i++){
		layers[i] = new Layer();
	}

	layerTemp = layers[1];
	
	//draw word to pgraphic 
	createCanvas(canvasWidth, canvasHeight);
	pg = createGraphics(canvasWidth,canvasHeight+20);
	pg.background(255);
	pg.noStroke();
	pg.fill(0);
	pg.textFont(font);
	pg.textSize(getTextSize());
	pg.textAlign(CENTER);
	pg.text(myType, canvasWidth/2, canvasHeight/2);

	rectMode(CENTER);
}

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////// DRAW
////////////////////////////////////////////////////////////////////////////////////////////////

function draw(){

	background(255);	
	noLoop();

	layers[1].styleMode = "normal";
	layers[1].colour = color(0,0,0,20);
	layers[1].xOffset = 0;
	layers[1].yOffset = 0;
	layers[1].display();


	layerTemp.styleMode = style;
	layerTemp.colour = textFillColour;
	layerTemp.grid = gridSize;
	layerTemp.onGrid = structure;
	layerTemp.minShapeSize = minSize;
	layerTemp.maxShapeSize = maxSize;
	layerTemp.font = font;
	layerTemp.stroke = false;
	layerTemp.xOffset = xOffset;
	layerTemp.yOffset = yOffset;
	layerTemp.display();

	// for(var j=0; j<1; j++){
		// layers[j].display();
	// }
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
	// console.log("layerNumber: " + layers[layerNumber].styleMode);

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
	// console.log("0: " + layers[0].styleMode);

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
	// console.log("temp: " + layerTemp.styleMode);

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

function drawNormal(xOffset, yOffset, font){
	textSize(getTextSize());
	textFont(font);
	textAlign(CENTER);
	text(myType, (canvasWidth/2)+xOffset, (canvasHeight/2)+yOffset);
}

function drawCircles(onGrid, thisGridSize, minShapeSize, maxShapeSize, xOffset, yOffset){
	if(onGrid){
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
	}else{
		for (var i=0; i<3000; i++) {
		var xPos = random(canvasWidth);
			var yPos = random(100, canvasWidth);
			var textColour = pg.get(xPos, yPos);
			var shapeSize = random(minSize, maxSize);
			if( textColour[0] == 0 ){
				ellipse(xPos+xOffset, yPos+yOffset, shapeSize, shapeSize);
			}
		}
	}
}

function drawSquares(onGrid, thisGridSize, minShapeSize, maxShapeSize, xOffset, yOffset){
	if(onGrid){	
		for (var x=0; x<thisGridSize; x++) {
			for(var y=0; y<thisGridSize; y++){
				var xPos = x * (width/thisGridSize);
				var yPos = y * (width/thisGridSize);
				var textColour = pg.get(xPos, yPos);
				var shapeSize = random(minShapeSize, maxShapeSize);
				if( textColour[0] == 0 ){
					// console.log("rect");
					rect(xPos+xOffset, yPos+yOffset, shapeSize, shapeSize);
				}
			}
		}
	}else{
		for (var i=0; i<3000; i++) {
		var xPos = random(canvasWidth);
			var yPos = random(100, canvasWidth);
			var textColour = pg.get(xPos, yPos);
			var shapeSize = random(minSize, maxSize);
			if( textColour[0] == 0 ){
				rect(xPos+xOffset, yPos+yOffset, shapeSize, shapeSize);
			}
		}
	}
}

function drawExes(onGrid, thisGridSize, minShapeSize, maxShapeSize, xOffset, yOffset, colour){
	if(onGrid){
		for (var x=0; x<thisGridSize; x++) {
			for(var y=0; y<thisGridSize; y++){
				var xPos = x * (width/thisGridSize);
				var yPos = y * (width/thisGridSize);
				var textColour = pg.get(xPos, yPos);
				var shapeSize = random(minShapeSize, maxShapeSize);
				var radius = shapeSize/2;
				// strokeWidth(4);
				if( textColour[0] == 0 ){
					// console.log("drawex");
					stroke(colour);
					line(xPos+xOffset-radius, yPos+yOffset-radius, xPos+xOffset+radius, yPos+yOffset+radius);
					line(xPos+xOffset-radius, yPos+yOffset+radius, xPos+xOffset+radius, yPos+yOffset-radius);
				}
			}
		}	
	}else{
		for (var i=0; i<3000; i++) {
			var xPos = random(canvasWidth);
			var yPos = random(100, canvasWidth);
			var textColour = pg.get(xPos, yPos);
			var shapeSize = random(minSize, maxSize);
			var radius = shapeSize/2;
			if( textColour[0] == 0 ){
				stroke(colour);
				line(xPos+xOffset-radius, yPos+yOffset-radius, xPos+xOffset+radius, yPos+yOffset+radius);
				line(xPos+xOffset-radius, yPos+yOffset+radius, xPos+xOffset+radius, yPos+yOffset-radius);
			}
		}
	}
}

function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
function drawPolygons(onGrid, thisGridSize, minShapeSize, maxShapeSize, xOffset, yOffset){
	if(onGrid){
		for (var x=0; x<thisGridSize; x++) {
			for(var y=0; y<thisGridSize; y++){
				var xPos = x * (width/thisGridSize);
				var yPos = y * (width/thisGridSize);
				var textColour = pg.get(xPos, yPos);
				var shapeSize = random(minShapeSize, maxShapeSize);
				if(y%2 != 0){
					xPos+=shapeSize/2;
				}
				if( textColour[0] == 0 ){
					polygon(xPos+xOffset, yPos+yOffset, shapeSize, 6);
				}
			}
		}
	}else{
		for (var i=0; i<3000; i++) {
		var xPos = random(canvasWidth);
			var yPos = random(100, canvasWidth);
			var textColour = pg.get(xPos, yPos);
			var shapeSize = random(minSize, maxSize);
			if( textColour[0] == 0 ){
				polygon(xPos+xOffset, yPos+yOffset, shapeSize, 6);
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
	this.font = "Georgia";
	this.colour;// = color(0,0,0, 100);
	this.grid = 80;
	this.stroke;
	this.opacity = false;
	this.minShapeSize = 5;
	this.maxShapeSize = 10;
	this.onGrid = true;

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
		if(this.styleMode=="circles"){
			drawCircles(this.onGrid, this.grid, this.minShapeSize, this.maxShapeSize, this.xOffset, this.yOffset);
		}else if(this.styleMode=="squares"){
			drawSquares(this.onGrid, this.grid, this.minShapeSize, this.maxShapeSize, this.xOffset, this.yOffset);
		}else if(this.styleMode=="exes"){
			drawExes(this.onGrid, this.grid, this.minShapeSize, this.maxShapeSize, this.xOffset, this.yOffset, this.colour);
		}else if(this.styleMode=="polygons"){
			drawPolygons(this.onGrid, this.grid, this.minShapeSize, this.maxShapeSize, this.xOffset, this.yOffset);
		}else if(this.styleMode=="normal"){
			drawNormal(this.xOffset, this.yOffset, this.font);
		}else{
			drawNormal(this.xOffset, this.yOffset, this.font);
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
	pg.text(myType, canvasWidth/2, canvasHeight/2);

	draw();
}
$('#textBox').keyup(getText);


////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////// OLD RANDOMS
////////////////////////////////////////////////////////////////////////////////////////////////



// function drawRandoSquares(xOffset, yOffset){
// 	var xPos = random(canvasWidth);
// 	var yPos = random(300, 600);
// 	var textColour = pg.get(xPos, yPos);
// 	var count = 0;
// 	while(count < 300){
// 		if( textColour[0] == 0 ) continue;
// 		count++;
// 		console.log("drawing rect");
// 	}
// }


// function drawRandoCircles(xOffset, yOffset){
// 	for (var i=0; i<3000; i++) {
// 		var xPos = random(canvasWidth);
// 		var yPos = random(100, canvasWidth);
// 		var textColour = pg.get(xPos, yPos);
// 		var shapeSize = random(minSize, maxSize);
// 		if( textColour[0] == 0 ){
// 			ellipse(xPos+xOffset, yPos+yOffset, shapeSize, shapeSize);
// 		}
// 	}
// }

// function drawWeirdoCircles(xOffset, yOffset){
// 	for (var i=0; i<3000; i++) {
// 		var xPos = random(canvasWidth);
// 		var yPos = random(200, 600);
// 		var textColour = pg.get(xPos, yPos);
// 		var shapeSize = random(minSize, maxSize);
// 		if( textColour[0] == 0 ){
// 			var strokeColour = textFillColour;
// 			for(var back=20; back>0; back--){
// 				strokeColour+=10;
// 				stroke(strokeColour);
// 				ellipse(xPos-back, yPos-back, shapeSize, shapeSize);
// 			}
// 			stroke(0);
// 			ellipse(xPos+xOffset, yPos+yOffset, shapeSize, shapeSize);
// 		}
// 	}
// }







