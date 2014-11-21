function setup(){textFillColour=color(0,0,0),pgTextColour=color(0),createCanvas(canvasWidth,canvasWidth),pg=createGraphics(canvasWidth,800),pg.background(255),pg.noStroke(),pg.fill(0),pg.textSize(getTextSize()),pg.textAlign(CENTER),pg.text(myType,canvasWidth/2,500)}function draw(){background(255),noLoop(),"gridCircles"==textMode?drawGridCircles():"randoCircles"==textMode?drawRandoCircles():"weirdoCircles"==textMode?drawWeirdoCircles():"gridSquares"==textMode?drawGridSquares():"randoSquares"==textMode?drawRandoSquares():drawGridCircles()}function getTextSize(){var e=myType.split(""),r=e.length;return textSize=canvasWidth/r*1.2}function drawGridCircles(){background(255),noStroke(),fill(textFillColour);for(var e=0;gridSize>e;e++)for(var r=0;gridSize>r;r++){var i=e*(width/gridSize),o=r*(width/gridSize),a=pg.get(i,o),t=random(minSize,maxSize);0==a[0]&&ellipse(i,o,t,t)}}function drawRandoCircles(){background(255),stroke(255),fill(textFillColour);for(var e=0;3e3>e;e++){var r=random(canvasWidth),i=random(100,600),o=pg.get(r,i),a=random(minSize,maxSize);0==o[0]&&ellipse(r,i,a,a)}}function drawWeirdoCircles(){background(255),stroke(255),fill(textFillColour);for(var e=0;3e3>e;e++){var r=random(canvasWidth),i=random(200,600),o=pg.get(r,i),a=random(minSize,maxSize);if(0==o[0]){for(var t=20;t>0;t--)stroke(255-10*t),ellipse(r-t,i-t,a,a);stroke(0),ellipse(r,i,a,a)}}}function drawGridSquares(){background(255),noStroke(),fill(textFillColour);for(var e=0;gridSize>e;e++)for(var r=0;gridSize>r;r++){var i=e*(width/gridSize),o=r*(width/gridSize),a=pg.get(i,o),t=random(minSize,maxSize);0==a[0]&&rect(i,o,t,t)}}function drawRandoSquares(){background(255),stroke(255),fill(textFillColour);for(var e=0;3e3>e;e++){var r=random(canvasWidth),i=random(100,600),o=pg.get(r,i),a=random(minSize,maxSize);0==o[0]&&rect(r,i,a,a)}}function hexToRgb(e){var r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null}var canvasWidth=$(window).width(),canvasHeight=$(window).height(),pgTextColour,pg,myType="TEXT",insideText=!1,textMode="randoCircles",minSize=10,maxSize=20,textSize=100,gridSize=50,textFillColour,xOffset,yOffset;$("#gridCircles").on("click",function(){return drawGridCircles(),textMode="gridCircles"}),$("#randoCircles").on("click",function(){return drawCircles(),textMode="randoCircles"}),$("#weirdoCircles").on("click",function(){return drawWeirdoCircles(),textMode="weirdoCircles"}),$("#randoSquares").on("click",function(){return drawRandoSquares(),textMode="randoSquares"}),$("#gridSquares").on("click",function(){return drawGridSquares(),textMode="gridSquares"}),$("#shapeSize-range").slider({range:!0,min:0,max:40,values:[10,20],slide:function(e,r){$("#shapeSize").val(r.values[0]+" - "+r.values[1]),minSize=r.values[0],maxSize=r.values[1],draw()}}),$("#shapeSize").val($("#shapeSize-range").slider("values",0)+" - "+$("#shapeSize-range").slider("values",1)),$("#gridSize-range").slider({value:50,range:"min",slide:function(e,r){$("#gridSize").val(r.value+30),gridSize=r.value+30,draw()}}),$("#gridSize").val($("#gridSize-range").slider("values",0)+" - "+$("#gridSize-range").slider("values",1)),$("#colourTextBox").on("change",function(){colourBoxColour=$("#colourTextBox").val();var e=color(hexToRgb(colourBoxColour).r,hexToRgb(colourBoxColour).g,hexToRgb(colourBoxColour).b);return textFillColour=e,console.log(textFillColour),draw(),textFillColour});