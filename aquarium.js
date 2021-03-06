

/*
	========================================================================
	
	Copyright (C) 2017 Roland Rytz <roland@draemm.li>
	Licensed under the GNU Affero General Public License Version 3
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as
	published by the Free Software Foundation, either version 3 of the
	License, or (at your option) any later version.
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
	For more information, see:
	https://draemm.li/various/aquarium/LICENSE
	
	========================================================================
*/

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var container = document.getElementById("canvasContainer");

canvas.width = container.clientWidth;
canvas.height = container.clientHeight;

var mouseX = canvas.width/2;
var mouseY = canvas.height/2;

/*var draggyLine = new DraggyLine(
	 canvas.width/2
	,canvas.height/2
	,canvas.width/2+100
	,canvas.height/2+100
	,10
);*/
//draggyLine.render(Date.now());

//renderLoop();

/*window.addEventListener("mousemove", function(e){
	mouseX = e.clientX - container.offsetLeft;
	mouseY = e.clientY - container.offsetTop;
});*/

/*function renderLoop(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	draggyLine.render(mouseX, mouseY);
	requestAnimationFrame(renderLoop);
}*/

function DraggyLine(x, y, toX, toY, sections){

	var points = [];
	var pointCount = sections;
	var totalLength = Math.sqrt(Math.pow(x - toX, 2) + Math.pow(y - toY, 2));
	var sectionLength = totalLength/pointCount;

	for(var i = 0; i <= pointCount; i++){
		points.push([
			 x + (toX-x)*i/pointCount
			,y + (toY-y)*i/pointCount
		]);
	}

	function render(newX, newY){
		context.beginPath();

		var newPoints = [];

		newPoints.push([newX, newY]);
		
		var i = 0;
		context.moveTo(
			 newPoints[i][0]
			,newPoints[i][1]
		);

		for(var i = 1; i <= pointCount; i++){

			var currentDist = Math.sqrt(Math.pow(points[i][0] - newPoints[i-1][0], 2) + Math.pow(points[i][1] - newPoints[i-1][1], 2));
			var relative = sectionLength/currentDist;

			newPoints.push([
				 newPoints[i-1][0] + (points[i][0] - newPoints[i-1][0])*relative
				,newPoints[i-1][1] + (points[i][1] - newPoints[i-1][1])*relative
			]);
			
			context.lineTo(
				 newPoints[i][0]
				,newPoints[i][1]
			);
		}

		points = newPoints;

		context.stroke();
	}

	return {
		render: render
	};
	
}

var jellyfishCount = 70;
var jellies = [];

for(var i = 0; i < jellyfishCount; i++){
	jellies.push(
		new Jellyfish(
			 canvas.width*Math.random()
			,canvas.height*Math.random()
			,Math.random()*Math.PI/4 - Math.PI/8
			,Math.random()*0.2+0.1
		)
	);
}
renderLoop();

function renderLoop(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	for(var i = 0; i < jellies.length; i++){
		jellies[i].render(Date.now());
	}
	requestAnimationFrame(renderLoop);
}

function Jellyfish(startX, startY, direction, speed){

	var x = startX;
	var y = startY;

	var size = 5 + ~~(Math.pow(Math.random(), 6)*20);

	var angleSpan = 1.5*Math.PI;

	//speed = 20;
	speed = (1/speed)*(1000/(2*Math.PI));

	var draggyLineCount = 11;
	var draggyLineLength = size*2;

	var pointCount = size;

	var points = [];

	var draggyLines = [];
	
	for(var i = 0; i <= pointCount; i++){
		var p = (i / pointCount) * angleSpan - angleSpan/2 + Math.PI/2;
		
		points.push([
			 Math.cos(p)*size
			,Math.sin(p)*size
		]);
	}

	for(var i = 0; i <= draggyLineCount; i++){
		var time = Date.now();
		var lineX = getCurrentX(points.length-1, time) - (getCurrentX(points.length-1, time) - getCurrentX(0, time))*(Math.cos(Math.PI*i/draggyLineCount)/2+0.5);
		draggyLines.push(
			new DraggyLine(
				 lineX
				,getCurrentY(points.length-1, time)
				,lineX
				,getCurrentY(points.length-1, time)+draggyLineLength+Math.random()*(draggyLineLength*0.3)
				,size/3
			)
		);
	}

	function getCurrentX(i, time){
		return x + points[i][0] + points[i][0]*Math.sqrt(1-points[i][1]/size)*(1-Math.sin(time/speed - 1.1*(1-points[i][1]/size))*0.5);
	}

	function getCurrentY(i, time){
		return y - points[i][1]*(1+Math.sin(time/speed)*0.3);
	}

	function render(time){

		y -= (size)*(0.7+Math.sin(time/speed+0.3))/(speed/10);

		var trueX = startX + Math.sin(direction)*(startY-y);
		var trueY = startY - Math.cos(direction)*(startY-y);

		if(trueX < 0-3*size || trueX > canvas.width + 3*size || trueY < 0-3*size || trueY > canvas.height + 6*size){
			startX = Math.random() * canvas.width;
			startY = canvas.height + 4*size;
			x = startX;
			y = startY;
			direction = Math.random()*Math.PI/4 - Math.PI/8;
		}
		
		var a = (size-4)/21;
		
		context.strokeStyle = "rgba(100, 200, 255, "+(0.2*a)+")";
		context.fillStyle = "rgba(100, 200, 255, "+(0.4*a)+")";
		context.lineWidth = Math.max(size/10, 1);

		context.save();
		context.translate(startX, startY);
		context.rotate(direction);
		context.translate(-startX, -startY);

		for(var i = 0; i <= draggyLineCount; i++){
			var lineX = getCurrentX(points.length-1, time) - (getCurrentX(points.length-1, time) - getCurrentX(0, time))*(Math.cos(Math.PI*i/draggyLineCount)/2+0.5);
			draggyLines[i].render(
				 lineX+Math.random()
				,getCurrentY(points.length-1, time)
			);
		}

		context.strokeStyle = "rgba(100, 200, 255, "+(0.5*a)+")";

		/*context.beginPath()
		context.arc(x, y, size/5, 0, 2*Math.PI);
		context.stroke();*/
		
		context.beginPath();
		var i = 0;
		context.moveTo(
			 getCurrentX(i, time)
			,getCurrentY(i, time)
		);

		for(var i = 1; i <= pointCount; i++){
			context.lineTo(
				 getCurrentX(i, time)
				,getCurrentY(i, time)
			);
		}
		context.closePath();

		context.fill();
		context.stroke();

		context.restore();	
		
	}

	return {
		render: render
	};
	
}



/*generateStemPlant();

function generateStemPlant(){

	context.strokeStyle = "#FFFFFF";
	generateLeaf(500, 500, 0);

	function generateLeaf(x, y, angle){

		context.save();
		context.translate(x, y);
		context.rotate(angle);

		var length = 100;
		var spines = 50;
		var roundness = 1;
		var spineAngle = Math.PI*0.3;
		//var spineAngle = Math.PI/2;

		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(0, length);
		context.stroke();

		for(var i = 1; i < spines; i++){

			var spineLength = Math.sqrt((i/spines) * (1-(i/spines)));
			spineLength *= (length*roundness);
			
			context.save();
			context.translate(0, (i/spines)*length);
			context.rotate(spineAngle);
			
			context.beginPath();
			context.moveTo(0, 0);
			context.lineTo(0, spineLength);
			context.stroke();

			context.rotate(-2*spineAngle);
			
			context.beginPath();
			context.moveTo(0, 0);
			context.lineTo(0, spineLength);
			context.stroke();

			context.restore();
		}

		context.restore();
		
	}
	
}
*/









































