function setup(){textFillColour=color(0,0,0,150),rectMode(CENTER);for(var e=0;5>e;e++)layers[e]=new Layer;canvasHeight>canvasWidth?canvasHeight=canvasWidth:canvasWidth>canvasHeight&&(canvasWidth=canvasHeight),createCanvas(canvasWidth,canvasHeight),pg=createGraphics(canvasWidth,canvasHeight+20),getText(),createImage()}function createImage(){pg.noStroke(),pg.fill(0),pg.textFont(font),pg.textSize(getTextSize()),pg.textLeading(getTextSize()),console.log("creatingImage"),pg.textAlign(CENTER),pg.text(myType,canvasWidth/2+xOffset,canvasHeight/2+.4*textsize+yOffset),draw()}function draw(){background(255),noLoop(),console.log("draw(): current layer = "+currentLayer),layers[currentLayer].styleMode=style,layers[currentLayer].colour=textFillColour,layers[currentLayer].grid=gridSize,layers[currentLayer].onGrid=structure,layers[currentLayer].minShapeSize=minSize,layers[currentLayer].maxShapeSize=maxSize,layers[currentLayer].font=font,layers[currentLayer].stroke=strokeShow,layers[currentLayer].xOffset=xOffset,layers[currentLayer].yOffset=yOffset;for(var e=0;layerCount>e;e++)layers[e].display()}function componentToHex(e){var t=e.toString(16);return 1==t.length?"0"+t:t}function rgbToHex(e,t,a){return"#"+componentToHex(e)+componentToHex(t)+componentToHex(a)}function getHexValue(e){console.log(e),console.log("r: "+e[0]),console.log("g: "+e[1]),console.log("b: "+e[2])}function switchLayers(e){return currentLayer=parseInt(e,10),$(".layer").removeClass("active"),$("#layer"+currentLayer).addClass("active"),style=layers[currentLayer].styleMode,textFillColour=layers[currentLayer].colour,gridSize=layers[currentLayer].grid,structure=layers[currentLayer].onGrid,minSize=layers[currentLayer].minShapeSize,maxSize=layers[currentLayer].maxShapeSize,font=layers[currentLayer].font,strokeShow=layers[currentLayer].stroke,xOffset=layers[currentLayer].xOffset,yOffset=layers[currentLayer].yOffset,currentLayer}function addNewLayer(){return $("#layers").append("<div class='layer' id='layer"+layerCount+"'><div class='layerName'>LAYER"+layerCount+"</div><div class='edit'></div></div>"),switchLayers(layerCount),layerCount++,draw(),layerCount}function getTextSize(){var e=myType.split(""),t=e.length;textsize=canvasWidth/t*1.2,textSize(textsize);var a=textWidth(myType),i=a/width;return.7>i&&i>=.5&&(textsize=canvasWidth/t*1.6),.5>i&&(textsize=canvasWidth/t*2),console.log(textsize),textsize}function drawNormal(e,t,a){textSize(getTextSize()),textFont(a),textAlign(CENTER),text(myType,canvasWidth/2+e,canvasHeight/2+.4*textsize+t)}function drawCircles(e,t,a,i,r,s){for(var n=textWidth(myType),o=width/2-n/2-50,l=width/2+n/2+50,c=height/2-.5*textsize-.9*textsize,d=height/2+.5*textsize+10,h=width/t,y=o;l>y;y+=h)for(var g=c;d>g;g+=h){var f=y,u=g,v=pg.get(f,u),x=random(a,i),p=random(-10,10);0==v[0]&&(e?ellipse(f+r,u+s,x,x):ellipse(f+r+p,u+s+p,x,x))}}function drawSquares(e,t,a,i,r,s){for(var n=textWidth(myType),o=width/2-n/2-50,l=width/2+n/2+50,c=height/2-.5*textsize-.9*textsize,d=height/2+.5*textsize+10,h=width/t,y=o;l>y;y+=h)for(var g=c;d>g;g+=h){var f=y,u=g,v=pg.get(f,u),x=random(a,i),p=random(-10,10);0==v[0]&&(e?rect(f+r,u+s,x,x):rect(f+r+p,u+s+p,x,x))}}function drawExes(e,t,a,i,r,s,n){for(var o=textWidth(myType),l=width/2-o/2-50,c=width/2+o/2+50,d=height/2-.5*textsize-.9*textsize,h=height/2+.5*textsize+10,y=width/t,g=l;c>g;g+=y)for(var f=d;h>f;f+=y){var u=g,v=f,x=pg.get(u,v),p=random(a,i),m=random(-10,10),p=random(a,i),S=p/2;stroke(n),0==x[0]&&(e?(line(u+r-S,v+s-S,u+r+S,v+s+S),line(u+r-S,v+s+S,u+r+S,v+s-S)):(stroke(n),line(u+r+m-S,v+m+s-S,u+m+r+S,v+m+s+S),line(u+r+m-S,v+m+s+S,u+m+r+S,v+m+s-S)))}}function polygon(e,t,a,i){var r=TWO_PI/i;beginShape();for(var s=0;TWO_PI>s;s+=r){var n=e+cos(s)*a,o=t+sin(s)*a;vertex(n,o)}endShape(CLOSE)}function drawPolygons(e,t,a,i,r,s){for(var n=textWidth(myType),o=width/2-n/2-50,l=width/2+n/2+50,c=height/2-.5*textsize-.9*textsize,d=height/2+.5*textsize+10,h=width/t,y=o;l>y;y+=h)for(var g=c;d>g;g+=h){var f=y,u=g,v=pg.get(f,u),x=random(a,i),p=random(-10,10);0==v[0]&&(e?polygon(f+r,u+s,.6*x,6):polygon(f+r+p,u+s+p,.6*x,6))}}function Layer(){this.xOffset=0,this.yOffset=0,this.styleMode="normal",this.font=font,this.colour=color(0,0,0,100),this.grid=80,this.stroke=strokeShow,this.opacity=!1,this.minShapeSize=5,this.maxShapeSize=10,this.onGrid=!0,this.display=function(){this.stroke?stroke(100):noStroke(),this.opacity?fill(this.colour):noFill(),textSize(getTextSize()),fill(this.colour),"circles"==this.styleMode?drawCircles(this.onGrid,this.grid,this.minShapeSize,this.maxShapeSize,this.xOffset,this.yOffset):"squares"==this.styleMode?drawSquares(this.onGrid,this.grid,this.minShapeSize,this.maxShapeSize,this.xOffset,this.yOffset):"exes"==this.styleMode?drawExes(this.onGrid,this.grid,this.minShapeSize,this.maxShapeSize,this.xOffset,this.yOffset,this.colour):"polygons"==this.styleMode?drawPolygons(this.onGrid,this.grid,this.minShapeSize,this.maxShapeSize,this.xOffset,this.yOffset):"normal"==this.styleMode?drawNormal(this.xOffset,this.yOffset,this.font):drawNormal(this.xOffset,this.yOffset,this.font)}}function hexToRgb(e){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:null}function getColour(){colourBoxColour=$("#colourTextBox").val();var e=color(hexToRgb(colourBoxColour).r,hexToRgb(colourBoxColour).g,hexToRgb(colourBoxColour).b,alphaVal);return textFillColour=e,draw(),textFillColour}function getText(){var e=$("#textBox").val();""==e&&(e=" "),myType=e,pg.background(255),pg.noStroke(),pg.fill(0),pg.textAlign(CENTER),pg.textSize(getTextSize()),pg.textLeading(getTextSize()),pg.text(myType,canvasWidth/2+xOffset,canvasHeight/2+.4*textsize+yOffset),createImage(),draw()}var canvasWidth=$(window).width()-310,canvasHeight=$(window).height()-10,pg,myType="TEST",font="Helvetica",insideText=!1,style="normal",minSize=10,maxSize=20,textsize=100,gridSize=80,textFillColour,xOffset=0,yOffset=0,structure=!0,layerCount=1,strokeShow=!1,currentLayer=0,layers=[];$("#normal").on("click",function(){style="normal",$(".styleMode").removeClass("active"),$("#normal").addClass("active"),draw()}),$("#circles").on("click",function(){style="circles",$(".styleMode").removeClass("active"),$("#circles").addClass("active"),draw()}),$("#squares").on("click",function(){style="squares",$(".styleMode").removeClass("active"),$("#squares").addClass("active"),draw()}),$("#exes").on("click",function(){style="exes",$(".styleMode").removeClass("active"),$("#exes").addClass("active"),draw()}),$("#polygons").on("click",function(){style="polygons",$(".styleMode").removeClass("active"),$("#polygons").addClass("active"),draw()}),$("#gridOn").on("click",function(){structure=!0,$(".gridControl").removeClass("active"),$("#gridOn").addClass("active"),draw()}),$("#gridOff").on("click",function(){structure=!1,$(".gridControl").removeClass("active"),$("#gridOff").addClass("active"),draw()});var editable=!1;$("#layers").on("click",".edit",function(){editable=!editable,editable?($(this).addClass("editActive"),$(this).siblings().attr("contenteditable","true")):($(this).removeClass("editActive"),$(this).siblings().attr("contenteditable","false"))}),$(window).resize(function(){console.log("resizing: "+$(window).width()),canvasWidth=$(window).width()-310,canvasHeight=$(window).height()-10,canvasHeight>canvasWidth?canvasHeight=canvasWidth:canvasWidth>canvasHeight&&(canvasWidth=canvasHeight),createCanvas(canvasWidth,canvasHeight),createImage(),draw()}),$("#shapeSize-range").slider({range:!0,min:1,max:40,values:[10,20],slide:function(e,t){$("#shapeSize").val(t.values[0]+" - "+t.values[1]),minSize=t.values[0],maxSize=t.values[1],draw()}}),$("#shapeSize").val($("#shapeSize-range").slider("values",0)+" - "+$("#shapeSize-range").slider("values",1)),$("#gridSize-range").slider({value:80,min:30,max:250,range:"min",slide:function(e,t){$("#gridSize").val(t.value),gridSize=t.value,draw()}}),$("#gridSize").val($("#gridSize-range").slider("values",0)),$("#xOffset-range").slider({value:0,min:-50,max:50,range:"min",slide:function(e,t){$("#xOffset").val(t.value),xOffset=t.value,draw()}}),$("#xOffset").val($("#xOffset-range").slider("values",0)),$("#yOffset-range").slider({value:0,min:-50,max:50,range:"min",slide:function(e,t){$("#yOffset").val(t.value),yOffset=t.value,draw()}}),$("#yOffset").val($("#yOffset-range").slider("values",0)),$("#newLayer").on("click",function(){console.log("new layer"),addNewLayer()}),$("#layers").on("click",".layer",function(){var e=this.id,t=e.split("r"),a=parseInt(t[1],10);$(".layer").removeClass("active"),$("#layer"+a).addClass("active"),console.log("#layer"+a),switchLayers(a)});var alphaVal=150,colourBoxColour;$("#colourTextBox").on("change",getColour),$("#textBox").keyup(getText);