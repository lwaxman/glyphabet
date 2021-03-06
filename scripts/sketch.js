/*
* 14.11.14
* Laurie Waxman
* 
* Colour picker courtesy of http://jscolor.com/
* Hex to RGB function courtsey of http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
*
	TO DO: 
		+ seperate layers (layers[0] = layers[1], etc)
		+ select layer
		+ add new layer
		+ array of layers?
		+ normal style
		+ position layer
		/ add new line of text
		+ create slider control for alpha value
		+ fix check for black area
		hide/show controls
		update sliders when layer switched
		change font
*
*/

var myCanvas;

var windowWidth = $(window).width() - 310;
var windowHeight = $(window).height() - 10;
var pg;
var myType = "hello";
var font = "Helvetica";
var insideText = false;
var style = "normal";
var minSize = 10;
var maxSize = 20;
var textsize = 100;
var gridSize = 80;
var textFillColour;
var xOffset = 0;
var yOffset = 0;
var structure = true;
var layerCount = 1;
var strokeShow = false;
var alphaVal = 180;
var currentLayer = 0;
// var layerTemp = new Layer();
var layers = [];

// if(windowHeight>windowWidth) $(".floatAllMiddle").css("width", windowWidth);
// $(".floatAllMiddle").css("width", windowWidth+310);
// 
////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////// BASIC JS/JQUERY
////////////////////////////////////////////////////////////////////////////////////////////////

$("#lightBox").hide();

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
$("#lines").on("click", function(){ 
	style = "lines";
	$(".styleMode").removeClass("active");
	$("#lines").addClass("active");
	draw();
});
$("#triangles").on("click", function(){ 
	style = "triangles";
	$(".styleMode").removeClass("active");
	$("#triangles").addClass("active");
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

$("#sansSerif").on("click", function(){ 
	$(".fontStyle").removeClass("active");
	$("#sansSerif").addClass("active");
	font = "Helvetica";
	getText();
	draw();
	return font;
});
$("#serif").on("click", function(){ 
	$(".fontStyle").removeClass("active");
	$("#serif").addClass("active");
	font = "Georgia";
	getText();
	draw();
	return font;
});
$("#monospace").on("click", function(){ 
	$(".fontStyle").removeClass("active");
	$("#monospace").addClass("active");
	font = "monospace";
	getText();
	draw();
	return font;
});
$("#brushScript").on("click", function(){ 
	$(".fontStyle").removeClass("active");
	$("#brushScript").addClass("active");
	font = "Brush Script MT";
	getText();
	draw();
	return font;
});

$("#save").on("click", function(){ 
	var can = document.getElementsByTagName("canvas");
	console.log(can);
	var dataURL = can[0].toDataURL();
	console.log(dataURL);
    $("#imageContainer").attr("src", dataURL);
    
	$("#lightBox").show();
});

$("#lightBox").on("click", function(){
	$("#lightBox").hide();
});

var editable = false;
$("#layers").on("click", ".edit", function(){ 
	editable = !editable;
	if(editable){
		$(this).addClass("editActive");
		$(this).siblings().attr('contenteditable','true');
	}else{
		$(this).removeClass("editActive");
		$(this).siblings().attr('contenteditable','false');
	}
});

$(window).resize(function(){
	console.log("resizing: " + $(window).width());
	windowWidth = $(window).width() - 310;
	windowHeight = $(window).height() - 10;

	if(windowHeight>windowWidth) windowHeight = windowWidth;
	else if(windowWidth>windowHeight) windowWidth = windowHeight;

	createCanvas(windowWidth, windowHeight);
	getText();
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
$("#xOffset").val( $("#xOffset-range").slider("values",0));

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
$("#yOffset").val( $("#yOffset-range").slider("values",0));

$("#opacity-range").slider({
	value: 180,
	min: 0,
	max: 255,
	range: "min",
	slide: function( event, ui ) {
		$("#opacity").val( ui.value);
		alphaVal = ui.value;
		getColour();
		draw();
	}
});
$("#opacity").val( $("#opacity-range").slider("values",0));

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////// SETUP
////////////////////////////////////////////////////////////////////////////////////////////////

function setup(){
	textFillColour = color(0,0,0, 150);
	rectMode(CENTER);

	for(var i=0; i<8; i++){
		layers[i] = new Layer();
	}
	
	if(windowHeight>windowWidth) windowHeight = windowWidth;
	else if(windowWidth>windowHeight) windowWidth = windowHeight;

	pg = createGraphics(windowWidth,windowHeight+20);
	pg.textFont(font);

	createCanvas(windowWidth, windowHeight);
	getText();
	draw();
	
	// if(windowHeight>windowWidth) windowHeight = windowWidth; 
	// else if(windowWidth>windowHeight) windowWidth = windowHeight;

	// createCanvas(windowWidth, windowHeight);
	// myCanvas = createCanvas(windowWidth, windowHeight);
	// myCanvas.parent("canvasContainer");
	// createCanvas(windowWidth, windowHeight);
	// getText();

	getText();
}

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////// DRAW
////////////////////////////////////////////////////////////////////////////////////////////////

function draw(){

	background(255,255,255);	
	noLoop();
	// image(pg, 0, 0);
	// console.log("draw(): current layer = "+ currentLayer);
	layers[currentLayer].styleMode = style;
	layers[currentLayer].colour = textFillColour;
	layers[currentLayer].grid = gridSize;
	layers[currentLayer].onGrid = structure;
	layers[currentLayer].minShapeSize = minSize;
	layers[currentLayer].maxShapeSize = maxSize;
	layers[currentLayer].font = font;
	layers[currentLayer].stroke = strokeShow;
	layers[currentLayer].xOffset = xOffset;
	layers[currentLayer].yOffset = yOffset;
	layers[currentLayer].alpha = alphaVal;

	for(var j=0; j<layerCount; j++){
		layers[j].display();
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////// LAYER CONTROLS
////////////////////////////////////////////////////////////////////////////////////////////////

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
	// console.log("hexColour #"+ componentToHex(r) + componentToHex(g) + componentToHex(b));
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getHexValue(colour){
	// console.log(colour);
	return rgbToHex(colour.rgba[0], colour.rgba[1], colour.rgba[2]);
}

function switchLayers(layerNumber){
	currentLayer = parseInt(layerNumber, 10);
	$(".layer").removeClass("active");
	$("#layer"+currentLayer).addClass("active");

	style = layers[currentLayer].styleMode;
	textFillColour = layers[currentLayer].colour;
	gridSize = layers[currentLayer].grid;
	structure = layers[currentLayer].onGrid;
	minSize = layers[currentLayer].minShapeSize;
	maxSize = layers[currentLayer].maxShapeSize;
	font = layers[currentLayer].font;
	strokeShow = layers[currentLayer].stroke;
	xOffset = layers[currentLayer].xOffset;
	yOffset = layers[currentLayer].yOffset;

	var setColour = getHexValue(layers[currentLayer].colour);
	$("#colourTextBox").val(setColour);
	$("#colourTextBox").css("background", "#"+setColour);
	return currentLayer;
}

function addNewLayer(){
	$("#layers").append("<div class='layer' id='layer"+ layerCount +"'><div class='layerName'>LAYER"+ layerCount +"</div><div class='edit'></div></div>" );
	switchLayers(layerCount);
	layerCount++;
	draw();
	return layerCount;
}

$("#newLayer").on("click", function(){
	console.log("new layer");
	addNewLayer();
});

$("#layers").on("click", ".layer", function(){
	var thisLayer = this.id;
	var thisLayerNumber = thisLayer.split("r");
	var layerNumber = parseInt(thisLayerNumber[1], 10);

	$(".layer").removeClass("active");
	$("#layer"+layerNumber).addClass("active");
	console.log("#layer"+layerNumber);
	switchLayers(layerNumber);

});

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////// SHAPE FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////

function getTextSize(){
	var textArray = myType.split("");
	var textLength = textArray.length;
	textsize = (windowWidth/textLength)*1.2;
	textFont(font);
	textSize(textsize);
	var textwidth = textWidth(myType);
	var ratio = textwidth/width;
	if(ratio<0.7 && ratio>=0.5){
		textsize = (windowWidth/textLength)*1.6;
	}if(ratio<0.5){
		textsize = (windowWidth/textLength)*2;
	}
	// if(myType.split("").length<22){
	// 	console.log("getTextSize: less than 22 char");
	// 	if(ratio<0.7 && ratio>=0.5){
	// 		textsize = (windowWidth/textLength)*1.6;
	// 	}if(ratio<0.5){
	// 		textsize = (windowWidth/textLength)*2;
	// 	}
	// }else{
	// 	console.log("getTextSize: greater than 22 char");
	// 	textsize = 80;
	// }

	// console.log(textsize);
	return textsize;

}

function drawNormal(xOffset, yOffset, font){
	textSize(getTextSize());
	textFont(font);
	textAlign(CENTER);
	// text(myType, 0+xOffset, 0+yOffset, 600, 600);
	// pg.text(myType, (windowWidth/2)-(windowWidth-200)/2, ((windowHeight/2)+(textsize*0.4))-(windowHeight-100)/4 , windowWidth-200, windowHeight-100)
	text(myType, (windowWidth/2)+xOffset, (windowHeight/2)+(textsize*0.4)+yOffset);
	// textFont(font);
}

function drawCircles(onGrid, thisGridSize, minShapeSize, maxShapeSize, xOffset, yOffset){
	// textSize(textsize);
	var thisWidth = textWidth(myType);
	var textXMin = (width/2) - (thisWidth/2) - 150;
	var textXMax = (width/2) + (thisWidth/2) + 150;
	var textYMin = (height/2)-(textsize*0.5)-(textsize*0.9) - 150;
	var textYMax = (height/2)+(textsize*0.5) + 150;
	var gridGrid = width/thisGridSize;
	for (var x=textXMin; x<textXMax; x+=gridGrid) {
		for(var y=textYMin; y<textYMax; y+=gridGrid){
			var xPos = x;
			var yPos = y;
			var textColour = pg.get(xPos, yPos);
			var shapeSize = random(minShapeSize, maxShapeSize);
			var randomOffset = random(-10, 10);
			if( textColour[0] == 0 ){
				if(onGrid){
					ellipse(xPos+xOffset, yPos+yOffset, shapeSize, shapeSize);
				}else{
					ellipse(xPos+xOffset+randomOffset, yPos+yOffset+randomOffset, shapeSize, shapeSize);
				}
			}
		}
	}
}

function drawSquares(onGrid, thisGridSize, minShapeSize, maxShapeSize, xOffset, yOffset){
	// textSize(textsize);
	var thisWidth = textWidth(myType);
	var textXMin = (width/2) - (thisWidth/2) - 150;
	var textXMax = (width/2) + (thisWidth/2) + 150;
	var textYMin = (height/2)-(textsize*0.5)-(textsize*0.9)-150;
	var textYMax = (height/2)+(textsize*0.5) + 150;
	var gridGrid = width/thisGridSize;
	for (var x=textXMin; x<textXMax; x+=gridGrid) {
		for(var y=textYMin; y<textYMax; y+=gridGrid){
			var xPos = x;
			var yPos = y;
			var textColour = pg.get(xPos, yPos);
			var shapeSize = random(minShapeSize, maxShapeSize);
			var randomOffset = random(-10, 10);
			if( textColour[0] == 0 ){
				if(onGrid){
					rect(xPos+xOffset, yPos+yOffset, shapeSize, shapeSize);
				}else{
					rect(xPos+xOffset+randomOffset, yPos+yOffset+randomOffset, shapeSize, shapeSize);
				}
			}
		}
	}
}

function drawExes(onGrid, thisGridSize, minShapeSize, maxShapeSize, xOffset, yOffset, colour){
	// textSize(textsize);
	var thisWidth = textWidth(myType);
	var textXMin = (width/2) - (thisWidth/2) - 150;
	var textXMax = (width/2) + (thisWidth/2) + 150;
	var textYMin = (height/2)-(textsize*0.5)-(textsize*0.9)-150;
	var textYMax = (height/2)+(textsize*0.5) + 150;
	var gridGrid = width/thisGridSize;
	for (var x=textXMin; x<textXMax; x+=gridGrid) {
		for(var y=textYMin; y<textYMax; y+=gridGrid){
			var xPos = x;
			var yPos = y;
			var textColour = pg.get(xPos, yPos);
			var shapeSize = random(minShapeSize, maxShapeSize);
			var randomOffset = random(-10, 10);
			var shapeSize = random(minShapeSize, maxShapeSize);
			var radius = shapeSize/2;
			stroke(colour);
			// strokeWeight(2);
			if( textColour[0] == 0 ){
				if(onGrid){
					line(xPos+xOffset-radius, yPos+yOffset-radius, xPos+xOffset+radius, yPos+yOffset+radius);
					line(xPos+xOffset-radius, yPos+yOffset+radius, xPos+xOffset+radius, yPos+yOffset-radius);
				}else{
					stroke(colour);
					line(xPos+xOffset+randomOffset-radius, yPos+randomOffset+yOffset-radius, xPos+randomOffset+xOffset+radius, yPos+randomOffset+yOffset+radius);
					line(xPos+xOffset+randomOffset-radius, yPos+randomOffset+yOffset+radius, xPos+randomOffset+xOffset+radius, yPos+randomOffset+yOffset-radius);
				}
			}
		}
	}
}

function drawLines(onGrid, thisGridSize, minShapeSize, maxShapeSize, xOffset, yOffset, colour){
	// textSize(textsize);
	var thisWidth = textWidth(myType);
	var textXMin = (width/2) - (thisWidth/2) - 150;
	var textXMax = (width/2) + (thisWidth/2) + 150;
	var textYMin = (height/2)-(textsize*0.5)-(textsize*0.9)-150;
	var textYMax = (height/2)+(textsize*0.5) + 150;
	var gridGrid = width/thisGridSize;
	for (var x=textXMin; x<textXMax; x+=gridGrid) {
		for(var y=textYMin; y<textYMax; y+=gridGrid){
			var xPos = x;
			var yPos = y;
			var textColour = pg.get(xPos, yPos);
			var shapeSize = random(minShapeSize, maxShapeSize);
			var randomOffset = random(-10, 10);
			var shapeSize = random(minShapeSize, maxShapeSize);
			var radius = shapeSize/2;
			stroke(colour);
			strokeWeight(2);
			if( textColour[0] == 0 ){
				if(onGrid){
					line(xPos+xOffset-radius, yPos+yOffset-radius, xPos+xOffset+radius, yPos+yOffset+radius);
				}else{
					// stroke(colour);
					line(xPos+xOffset+randomOffset-radius, yPos+randomOffset+yOffset-radius, xPos+randomOffset+xOffset+radius, yPos+randomOffset+yOffset+radius);
				}
			}
		}
	}
}

function drawTriangles(onGrid, thisGridSize, minShapeSize, maxShapeSize, xOffset, yOffset, colour){
	// textSize(textsize);
	var thisWidth = textWidth(myType);
	var textXMin = (width/2) - (thisWidth/2) - 150;
	var textXMax = (width/2) + (thisWidth/2) + 150;
	var textYMin = (height/2)-(textsize*0.5)-(textsize*0.9)-150;
	var textYMax = (height/2)+(textsize*0.5) + 150;
	var gridGrid = width/thisGridSize;
	var trackPos = 0;
	for (var x=textXMin; x<textXMax; x+=gridGrid) {
		for(var y=textYMin; y<textYMax; y+=gridGrid){
			trackPos++;
			var xPos = x;
			var yPos = y;
			var textColour = pg.get(xPos, yPos);
			var shapeSize = random(minShapeSize, maxShapeSize);
			var randomOffset = random(-10, 10);
			var shapeSize = random(minShapeSize, maxShapeSize);
			var radius = shapeSize/2;
			// stroke(colour);
			// strokeWeight(2);
			if( textColour[0] == 0 ){
				if(onGrid){
					// if(trackPos%2==0){
						triangle(xPos+xOffset,yPos+yOffset, xPos+xOffset,yPos+yOffset+shapeSize, xPos+xOffset+shapeSize,yPos+yOffset)
					// }
					// line(xPos+xOffset-radius, yPos+yOffset-radius, xPos+xOffset+radius, yPos+yOffset+radius);
				}else{
					// stroke(colour);
					triangle(xPos+xOffset+randomOffset,yPos+yOffset+randomOffset, xPos+xOffset+randomOffset,yPos+yOffset+randomOffset+shapeSize, xPos+xOffset+randomOffset+shapeSize,yPos+yOffset+randomOffset)
				}
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
	// textSize(textsize);
	var thisWidth = textWidth(myType);
	var textXMin = (width/2) - (thisWidth/2) - 150;
	var textXMax = (width/2) + (thisWidth/2) + 150;
	var textYMin = (height/2)-(textsize*0.5)-(textsize*0.9)-150;
	var textYMax = (height/2)+(textsize*0.5) + 150;
	var gridGrid = width/thisGridSize;
	for (var x=textXMin; x<textXMax; x+=gridGrid) {
		for(var y=textYMin; y<textYMax; y+=gridGrid){
			var xPos = x;
			var yPos = y;
			var textColour = pg.get(xPos, yPos);
			var shapeSize = random(minShapeSize, maxShapeSize);
			var randomOffset = random(-10, 10);
			if( textColour[0] == 0 ){
				if(onGrid){
					polygon(xPos+xOffset, yPos+yOffset, shapeSize*0.6, 6);
				}else{
					polygon(xPos+xOffset+randomOffset, yPos+yOffset+randomOffset, shapeSize*0.6, 6);
				}
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
	this.font = font;
	this.colour = color(0,0,0,100);
	this.grid = 80;
	this.stroke = strokeShow;
	this.opacity = false;
	this.minShapeSize = 5;
	this.maxShapeSize = 10;
	this.onGrid = true;
	this.alpha = 180;

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

		textSize(getTextSize());
		fill(this.colour);
		if(this.styleMode=="circles"){
			$("#gridControl").show();
			$("#slider1").show();
			$("#slider2").show();
			drawCircles(this.onGrid, this.grid, this.minShapeSize, this.maxShapeSize, this.xOffset, this.yOffset);
		}else if(this.styleMode=="squares"){
			$("#gridControl").show();
			$("#slider1").show();
			$("#slider2").show();
			drawSquares(this.onGrid, this.grid, this.minShapeSize, this.maxShapeSize, this.xOffset, this.yOffset);
		}else if(this.styleMode=="exes"){
			$("#gridControl").show();
			$("#slider1").show();
			$("#slider2").show();
			drawExes(this.onGrid, this.grid, this.minShapeSize, this.maxShapeSize, this.xOffset, this.yOffset, this.colour);
		}else if(this.styleMode=="lines"){
			$("#gridControl").show();
			$("#slider1").show();
			$("#slider2").show();
			drawLines(this.onGrid, this.grid, this.minShapeSize, this.maxShapeSize, this.xOffset, this.yOffset, this.colour);
		}else if(this.styleMode=="triangles"){
			$("#gridControl").show();
			$("#slider1").show();
			$("#slider2").show();
			drawTriangles(this.onGrid, this.grid, this.minShapeSize, this.maxShapeSize, this.xOffset, this.yOffset);
		}else if(this.styleMode=="polygons"){
			$("#gridControl").show();
			$("#slider1").show();
			$("#slider2").show();
			drawPolygons(this.onGrid, this.grid, this.minShapeSize, this.maxShapeSize, this.xOffset, this.yOffset);
		}else if(this.styleMode=="normal"){
			$("#gridControl").hide();
			$("#slider1").hide();
			$("#slider2").hide();
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


//set colour of colour box from object later.  

var colourBoxColour;// = $("#colourTextBox").val();
function getColour(){
	colourBoxColour = $("#colourTextBox").val();
	var rgbFillColour = color(hexToRgb(colourBoxColour).r, hexToRgb(colourBoxColour).g, hexToRgb(colourBoxColour).b, alphaVal);
	textFillColour = rgbFillColour;
	draw();
	return textFillColour;
}
$('#colourTextBox').on('change', getColour);

function getText(){
	var textBoxResult = $("#textBox").val();
	if(textBoxResult==""){
		textBoxResult = " ";
	}

	myType = textBoxResult;
	pg = createGraphics(windowWidth+300,windowHeight+20);
	pg.background(255);
	pg.noStroke();
	pg.fill(0);
	pg.textFont(font);
	pg.textAlign(CENTER);
	pg.textSize(getTextSize());
	pg.textLeading(getTextSize());
	pg.text(myType, (windowWidth/2)+xOffset, (windowHeight/2)+(textsize*0.4)+yOffset);

	draw();

}
$('#textBox').keyup(getText);


