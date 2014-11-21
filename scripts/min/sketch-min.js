function setup(){textFillColour=color(230,255,0,150),createCanvas(canvasWidth,canvasHeight),pg=createGraphics(canvasWidth,800),pg.background(255),pg.noStroke(),pg.fill(0),pg.textSize(getTextSize()),pg.textAlign(CENTER),pg.text(myType,canvasWidth/2,500),currentLayer=new Layer}function draw(){background(255),noLoop(),layerOne=new Layer,layerTwo=new Layer,layerTwo.styleMode="gridCircles",layerTwo.colour=color(0,100,255,150),layerTwo.display(),currentLayer=layerTwo,currentLayer.styleMode="gridCircles",currentLayer.colour=textFillColour,currentLayer.grid=gridSize,currentLayer.minShapeSize=minSize,currentLayer.maxShapeSize=maxSize,currentLayer.stroke=!1,currentLayer.display()}function getTextSize(){var e=myType.split(""),r=e.length;return textSize=canvasWidth/r*1.2}function drawRandoCircles(){for(var e=0;3e3>e;e++){var r=random(canvasWidth),i=random(100,600),a=pg.get(r,i),o=random(minSize,maxSize);0==a[0]&&ellipse(r,i,o,o)}}function drawWeirdoCircles(){for(var e=0;3e3>e;e++){var r=random(canvasWidth),i=random(200,600),a=pg.get(r,i),o=random(minSize,maxSize);if(0==a[0]){for(var t=20;t>0;t--)stroke(255-10*t),ellipse(r-t,i-t,o,o);stroke(0),ellipse(r,i,o,o)}}}function drawGridSquares(e,r,i){for(var a=0;e>a;a++)for(var o=0;e>o;o++){var t=a*(width/e),n=o*(width/e),l=pg.get(t,n),s=random(r,i);0==l[0]&&rect(t,n,s,s)}}function drawRandoSquares(){for(var e=0;3e3>e;e++){var r=random(canvasWidth),i=random(100,600),a=pg.get(r,i),o=random(minSize,maxSize);0==a[0]&&rect(r,i,o,o)}}function drawGridCircles(e,r,i){for(var a=0;e>a;a++)for(var o=0;e>o;o++){var t=a*(width/e),n=o*(width/e),l=pg.get(t,n),s=random(r,i);0==l[0]&&ellipse(t,n,s,s)}}function Layer(){this.xOffset,this.yOffset,this.styleMode="gridSquares",this.font,this.colour,this.grid=80,this.stroke,this.minShapeSize=5,this.maxShapeSize=10,this.display=function(){this.stroke?stroke(100):noStroke(),"gridCircles"==this.styleMode?(fill(this.colour),drawGridCircles(this.grid,this.minShapeSize,this.maxShapeSize)):"randoCircles"==this.styleMode?drawRandoCircles():"weirdoCircles"==this.styleMode?drawWeirdoCircles():"gridSquares"==this.styleMode?(fill(this.colour),drawGridSquares(this.grid,this.minShapeSize,this.maxShapeSize)):"randoSquares"==this.styleMode?drawRandoSquares():(fill(this.colour),drawGridSquares(this.grid,this.minShapeSize,this.maxShapeSize))}}function hexToRgb(e){var r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null}function getColour(){colourBoxColour=$("#colourTextBox").val();var e=color(hexToRgb(colourBoxColour).r,hexToRgb(colourBoxColour).g,hexToRgb(colourBoxColour).b,150);return textFillColour=e,console.log(textFillColour),draw(),textFillColour}var canvasWidth=$(window).width()-310,canvasHeight=$(window).height()-10,pg,myType="TEXT",insideText=!1,style="randoCircles",minSize=10,maxSize=20,textSize=100,gridSize=50,textFillColour,xOffset,yOffset;$("#gridCircles").on("click",function(){return drawGridCircles(),style="gridCircles"}),$("#randoCircles").on("click",function(){return drawCircles(),style="randoCircles"}),$("#weirdoCircles").on("click",function(){return drawWeirdoCircles(),style="weirdoCircles"}),$("#randoSquares").on("click",function(){return drawRandoSquares(),style="randoSquares"}),$("#gridSquares").on("click",function(){return drawGridSquares(),style="gridSquares"}),$("#shapeSize-range").slider({range:!0,min:0,max:40,values:[10,20],slide:function(e,r){$("#shapeSize").val(r.values[0]+" - "+r.values[1]),minSize=r.values[0],maxSize=r.values[1],draw()}}),$("#shapeSize").val($("#shapeSize-range").slider("values",0)+" - "+$("#shapeSize-range").slider("values",1)),$("#gridSize-range").slider({value:50,range:"min",slide:function(e,r){$("#gridSize").val(r.value+30),gridSize=r.value+30,draw()}}),$("#gridSize").val($("#gridSize-range").slider("values",0)+" - "+$("#gridSize-range").slider("values",1)),$("#colourTextBox").on("change",getColour);