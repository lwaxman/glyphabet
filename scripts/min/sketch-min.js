function setup(){textFillColour=color(0,0,0,150),rectMode(CENTER);for(var e=0;8>e;e++)layers[e]=new Layer;windowHeight>windowWidth?windowHeight=windowWidth:windowWidth>windowHeight&&(windowWidth=windowHeight),pg=createGraphics(windowWidth,windowHeight+20),pg.textFont(font),createCanvas(windowWidth,windowHeight),getText(),draw(),getText()}function draw(){background(255,255,255),noLoop(),layers[currentLayer].styleMode=style,layers[currentLayer].colour=textFillColour,layers[currentLayer].grid=gridSize,layers[currentLayer].onGrid=structure,layers[currentLayer].minShapeSize=minSize,layers[currentLayer].maxShapeSize=maxSize,layers[currentLayer].font=font,layers[currentLayer].stroke=strokeShow,layers[currentLayer].xOffset=xOffset,layers[currentLayer].yOffset=yOffset,layers[currentLayer].alpha=alphaVal;for(var e=0;layerCount>e;e++)layers[e].display()}function componentToHex(e){var t=e.toString(16);return 1==t.length?"0"+t:t}function rgbToHex(e,t,i){return componentToHex(e)+componentToHex(t)+componentToHex(i)}function getHexValue(e){return rgbToHex(e.rgba[0],e.rgba[1],e.rgba[2])}function switchLayers(e){currentLayer=parseInt(e,10),$(".layer").removeClass("active"),$("#layer"+currentLayer).addClass("active"),style=layers[currentLayer].styleMode,textFillColour=layers[currentLayer].colour,gridSize=layers[currentLayer].grid,structure=layers[currentLayer].onGrid,minSize=layers[currentLayer].minShapeSize,maxSize=layers[currentLayer].maxShapeSize,font=layers[currentLayer].font,strokeShow=layers[currentLayer].stroke,xOffset=layers[currentLayer].xOffset,yOffset=layers[currentLayer].yOffset;var t=getHexValue(layers[currentLayer].colour);return $("#colourTextBox").val(t),$("#colourTextBox").css("background","#"+t),currentLayer}function addNewLayer(){return $("#layers").append("<div class='layer' id='layer"+layerCount+"'><div class='layerName'>LAYER"+layerCount+"</div><div class='edit'></div></div>"),switchLayers(layerCount),layerCount++,draw(),layerCount}function getTextSize(){var e=myType.split(""),t=e.length;textsize=windowWidth/t*1.2,textFont(font),textSize(textsize);var i=textWidth(myType),r=i/width;return.7>r&&r>=.5&&(textsize=windowWidth/t*1.6),.5>r&&(textsize=windowWidth/t*2),textsize}function drawNormal(e,t,i){textSize(getTextSize()),textFont(i),textAlign(CENTER),text(myType,windowWidth/2+e,windowHeight/2+.4*textsize+t)}function drawCircles(e,t,i,r,a,o){for(var s=textWidth(myType),n=width/2-s/2-50,l=width/2+s/2+50,d=height/2-.5*textsize-.9*textsize-50,c=height/2+.5*textsize+50,h=width/t,u=n;l>u;u+=h)for(var y=d;c>y;y+=h){var f=u,g=y,w=pg.get(f,g),x=random(i,r),v=random(-10,10);0==w[0]&&(e?ellipse(f+a,g+o,x,x):ellipse(f+a+v,g+o+v,x,x))}}function drawSquares(e,t,i,r,a,o){for(var s=textWidth(myType),n=width/2-s/2-50,l=width/2+s/2+50,d=height/2-.5*textsize-.9*textsize-50,c=height/2+.5*textsize+50,h=width/t,u=n;l>u;u+=h)for(var y=d;c>y;y+=h){var f=u,g=y,w=pg.get(f,g),x=random(i,r),v=random(-10,10);0==w[0]&&(e?rect(f+a,g+o,x,x):rect(f+a+v,g+o+v,x,x))}}function drawExes(e,t,i,r,a,o,s){for(var n=textWidth(myType),l=width/2-n/2-50,d=width/2+n/2+50,c=height/2-.5*textsize-.9*textsize-50,h=height/2+.5*textsize+50,u=width/t,y=l;d>y;y+=u)for(var f=c;h>f;f+=u){var g=y,w=f,x=pg.get(g,w),v=random(i,r),p=random(-10,10),v=random(i,r),m=v/2;stroke(s),0==x[0]&&(e?(line(g+a-m,w+o-m,g+a+m,w+o+m),line(g+a-m,w+o+m,g+a+m,w+o-m)):(stroke(s),line(g+a+p-m,w+p+o-m,g+p+a+m,w+p+o+m),line(g+a+p-m,w+p+o+m,g+p+a+m,w+p+o-m)))}}function polygon(e,t,i,r){var a=TWO_PI/r;beginShape();for(var o=0;TWO_PI>o;o+=a){var s=e+cos(o)*i,n=t+sin(o)*i;vertex(s,n)}endShape(CLOSE)}function drawPolygons(e,t,i,r,a,o){for(var s=textWidth(myType),n=width/2-s/2-50,l=width/2+s/2+50,d=height/2-.5*textsize-.9*textsize-50,c=height/2+.5*textsize+50,h=width/t,u=n;l>u;u+=h)for(var y=d;c>y;y+=h){var f=u,g=y,w=pg.get(f,g),x=random(i,r),v=random(-10,10);0==w[0]&&(e?polygon(f+a,g+o,.6*x,6):polygon(f+a+v,g+o+v,.6*x,6))}}function Layer(){this.xOffset=0,this.yOffset=0,this.styleMode="normal",this.font=font,this.colour=color(0,0,0,100),this.grid=80,this.stroke=strokeShow,this.opacity=!1,this.minShapeSize=5,this.maxShapeSize=10,this.onGrid=!0,this.alpha=180,this.display=function(){this.stroke?stroke(100):noStroke(),this.opacity?fill(this.colour):noFill(),textSize(getTextSize()),fill(this.colour),"circles"==this.styleMode?drawCircles(this.onGrid,this.grid,this.minShapeSize,this.maxShapeSize,this.xOffset,this.yOffset):"squares"==this.styleMode?drawSquares(this.onGrid,this.grid,this.minShapeSize,this.maxShapeSize,this.xOffset,this.yOffset):"exes"==this.styleMode?drawExes(this.onGrid,this.grid,this.minShapeSize,this.maxShapeSize,this.xOffset,this.yOffset,this.colour):"polygons"==this.styleMode?drawPolygons(this.onGrid,this.grid,this.minShapeSize,this.maxShapeSize,this.xOffset,this.yOffset):"normal"==this.styleMode?drawNormal(this.xOffset,this.yOffset,this.font):drawNormal(this.xOffset,this.yOffset,this.font)}}function hexToRgb(e){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:null}function getColour(){colourBoxColour=$("#colourTextBox").val();var e=color(hexToRgb(colourBoxColour).r,hexToRgb(colourBoxColour).g,hexToRgb(colourBoxColour).b,alphaVal);return textFillColour=e,draw(),textFillColour}function getText(){var e=$("#textBox").val();""==e&&(e=" "),myType=e,pg.background(255),pg.noStroke(),pg.fill(0),pg.textFont(font),pg.textAlign(CENTER),pg.textSize(getTextSize()),pg.textLeading(getTextSize()),pg.text(myType,windowWidth/2+xOffset,windowHeight/2+.4*textsize+yOffset),draw()}var myCanvas,windowWidth=$(window).width()-310,windowHeight=$(window).height()-10,pg,myType="TEXT",font="Helvetica",insideText=!1,style="normal",minSize=10,maxSize=20,textsize=100,gridSize=80,textFillColour,xOffset=0,yOffset=0,structure=!0,layerCount=1,strokeShow=!1,alphaVal=180,currentLayer=0,layers=[];$("#lightBox").hide(),$("#normal").on("click",function(){style="normal",$(".styleMode").removeClass("active"),$("#normal").addClass("active"),draw()}),$("#circles").on("click",function(){style="circles",$(".styleMode").removeClass("active"),$("#circles").addClass("active"),draw()}),$("#squares").on("click",function(){style="squares",$(".styleMode").removeClass("active"),$("#squares").addClass("active"),draw()}),$("#exes").on("click",function(){style="exes",$(".styleMode").removeClass("active"),$("#exes").addClass("active"),draw()}),$("#polygons").on("click",function(){style="polygons",$(".styleMode").removeClass("active"),$("#polygons").addClass("active"),draw()}),$("#gridOn").on("click",function(){structure=!0,$(".gridControl").removeClass("active"),$("#gridOn").addClass("active"),draw()}),$("#gridOff").on("click",function(){structure=!1,$(".gridControl").removeClass("active"),$("#gridOff").addClass("active"),draw()}),$("#sansSerif").on("click",function(){$(".fontStyle").removeClass("active"),$("#sansSerif").addClass("active"),font="Helvetica",draw()}),$("#serif").on("click",function(){$(".fontStyle").removeClass("active"),$("#serif").addClass("active"),font="Georgia",draw()}),$("#monospace").on("click",function(){$(".fontStyle").removeClass("active"),$("#monospace").addClass("active"),font="monospace",draw()}),$("#brushScript").on("click",function(){$(".fontStyle").removeClass("active"),$("#brushScript").addClass("active"),font="Brush Script MT",draw()}),$("#save").on("click",function(){var e=document.getElementsByTagName("canvas");console.log(e);var t=e[0].toDataURL();console.log(t),$("#imageContainer").attr("src",t),$("#lightBox").show()}),$("#lightBox").on("click",function(){$("#lightBox").hide()});var editable=!1;$("#layers").on("click",".edit",function(){editable=!editable,editable?($(this).addClass("editActive"),$(this).siblings().attr("contenteditable","true")):($(this).removeClass("editActive"),$(this).siblings().attr("contenteditable","false"))}),$(window).resize(function(){console.log("resizing: "+$(window).width()),windowWidth=$(window).width()-310,windowHeight=$(window).height()-10,windowHeight>windowWidth?windowHeight=windowWidth:windowWidth>windowHeight&&(windowWidth=windowHeight),createCanvas(windowWidth,windowHeight),getText(),draw()}),$("#shapeSize-range").slider({range:!0,min:1,max:40,values:[10,20],slide:function(e,t){$("#shapeSize").val(t.values[0]+" - "+t.values[1]),minSize=t.values[0],maxSize=t.values[1],draw()}}),$("#shapeSize").val($("#shapeSize-range").slider("values",0)+" - "+$("#shapeSize-range").slider("values",1)),$("#gridSize-range").slider({value:80,min:30,max:250,range:"min",slide:function(e,t){$("#gridSize").val(t.value),gridSize=t.value,draw()}}),$("#gridSize").val($("#gridSize-range").slider("values",0)),$("#xOffset-range").slider({value:0,min:-50,max:50,range:"min",slide:function(e,t){$("#xOffset").val(t.value),xOffset=t.value,draw()}}),$("#xOffset").val($("#xOffset-range").slider("values",0)),$("#yOffset-range").slider({value:0,min:-50,max:50,range:"min",slide:function(e,t){$("#yOffset").val(t.value),yOffset=t.value,draw()}}),$("#yOffset").val($("#yOffset-range").slider("values",0)),$("#opacity-range").slider({value:180,min:0,max:255,range:"min",slide:function(e,t){$("#opacity").val(t.value),alphaVal=t.value,getColour(),draw()}}),$("#opacity").val($("#opacity-range").slider("values",0)),$("#newLayer").on("click",function(){console.log("new layer"),addNewLayer()}),$("#layers").on("click",".layer",function(){var e=this.id,t=e.split("r"),i=parseInt(t[1],10);$(".layer").removeClass("active"),$("#layer"+i).addClass("active"),console.log("#layer"+i),switchLayers(i)});var colourBoxColour;$("#colourTextBox").on("change",getColour),$("#textBox").keyup(getText);