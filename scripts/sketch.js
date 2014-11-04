var canvasWidth = $(window).width();
var canvasHeight = $(window).height();
var pgTextColour;
var pg;
var myType = "TYPE";
var insideText = false;
var mode = "squares";
var minSize = 10;
var maxSize = 20;


$( "#slider-range" ).slider({
	range: true,
	min: 0,
	max: 40,
	values: [ 10, 20 ],
	slide: function( event, ui ) {
		$( "#amount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
		minSize = ui.values[0];
		maxSize = ui.values[1];
		draw();
	}
});

$( "#amount" ).val( $( "#slider-range" ).slider( "values", 0 ) + " - " + $( "#slider-range" ).slider( "values", 1 ) );



/////////////////////////////////////////////////////////////////////////////////////////// canvas

function setup(){
	pgTextColour = color(0);
	createCanvas(800, 800);
	pg = createGraphics(800,800);
	pg.background(255);
	pg.noStroke();
	pg.fill(0);
	pg.textSize(250);
	pg.textAlign(CENTER);
	pg.text(myType, 400, 500);
}

function draw(){
	background(255);	
	noLoop();
	stroke(255);
	// image(pg, 100, 100);
	for (var i=0; i<3000; i++) {
		var xPos = random(800);
		var yPos = random(200, 600);
		var fillColour = pg.get(xPos, yPos);
		var ellipseSize = random(minSize, maxSize);
		if( fillColour[0] == 0 ){
			console.log("match");
			fill(0);
			drawMode(xPos, yPos, ellipseSize, ellipseSize);
		}
		// var insideText = (== pgTextColour);

	}
}

function drawMode(x, y, elementWidth, elementHeight){
	if(mode=="circles"){
		ellipse(x, y, elementWidth, elementHeight);
	}else if(mode == "squares"){
		rect(x, y, elementWidth, elementHeight);
	}else if(mode == "weirdoCircle3D"){
		for(var back=20; back>0; back--){
			stroke(255-(back*10));
			ellipse(x-back, y-back, elementWidth, elementHeight);
		}
		ellipse(x, y, elementWidth, elementHeight);
	}else if(mode == "normal3D"){
		text(myType, 400, 500);
	}
}