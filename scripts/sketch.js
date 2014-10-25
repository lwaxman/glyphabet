var canvasWidth = $(window).width() - 300;
var canvasHeight = $(window).height();
var chosenColour; 

/////////////////////////////////////////////////////////////////////////////////////////// colour picker

var colourPicker = function( colour ) {
  colour.setup = function() {
  	colour.background(0,255,0);
  };

  colour.draw = function() {

    colour.fill(chosenColour);
    colour.rect(10,10,50,50);
  };

  colour.mousePressed = function(){
  	var colour = colour.get(mouseX, mouseY);
  	chosenColour  = colour;
  	console.log(chosenColour);
  }

};

/////////////////////////////////////////////////////////////////////////////////////////// canvas

var dropCanvas = function (sketch){

	sketch.setup = function() {
		sketch.background(255,0,0);
		sketch.createCanvas(canvasWidth, canvasHeight);
		sketch.noLoop();
	};

	sketch.draw = function(){
		sketch.textFont("Helvetica");
		var myLetter = "b";
		sketch.textSize(750);
		sketch.fill(chosenColour);
		sketch.text(myLetter, (canvasWidth/2)-200, 750);
	};
	
}

var myColourCanvas = new p5(colourPicker, 'here');
var mySketchCanvas = new p5(dropCanvas);
