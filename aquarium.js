

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
	https://draemm.li/various/euclideanSpanningTree/LICENSE
	
	========================================================================
*/

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var container = document.getElementById("canvasContainer");

canvas.width = container.clientWidth;
canvas.height = container.clientHeight;

var mouseX = canvas.width/2;
var mouseY = canvas.height/2;

var draggyLine = new DraggyLine();
//draggyLine.render(Date.now());

renderLoop();

window.addEventListener("mousemove", function(e){
	mouseX = e.clientX - container.offsetLeft;
	mouseY = e.clientY - container.offsetTop;
});

function renderLoop(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	draggyLine.render(Date.now());
	requestAnimationFrame(renderLoop);
}

function DraggyLine(){

	var points = [];
	var pointCount = 500;
	var targetLength = 2;

	for(var i = 0; i <= pointCount; i++){
		points.push([
			 canvas.width/2
			,canvas.height/2+i*targetLength
		]);
	}

	function render(){
		context.strokeStyle = "rgba(255, 255, 255, 0.8)";
		context.beginPath();

		var newPoints = [];
		
		var i = 0;
		context.moveTo(
			 mouseX
			,mouseY
		);

		newPoints.push([mouseX, mouseY]);

		for(var i = 1; i <= pointCount; i++){

			var currentDist = Math.sqrt(Math.pow(points[i][0] - newPoints[i-1][0], 2) + Math.pow(points[i][1] - newPoints[i-1][1], 2));
			var relative = targetLength/currentDist;

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

/*var jellyfish = new Jellyfish();
renderLoop();

function renderLoop(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	jellyfish.render(Date.now());
	requestAnimationFrame(renderLoop);
}

function Jellyfish(){

	var x = canvas.width/2;
	var y = canvas.height/2;

	var size = 100;

	var angleSpan = 1.2*Math.PI;

	var pointCount = 10;

	var points = [];
	
	for(var i = 0; i <= pointCount; i++){
		var p = (i / pointCount) * angleSpan - angleSpan/2 + Math.PI/2;
		
		points.push([Math.cos(p), Math.sin(p)]);
	}

	console.table(points);

	function render(time){

		var xFactor = Math.sin(time/1000)/2;
		//var xFactor = 1;
		var yFactor = 1-Math.sin(time/1000)/2;context.strokeStyle = "rgba(255, 255, 255, 0.8)";
		context.beginPath();
		context.moveTo(
			 x + points[0][0]*size + points[0][0]*(1-points[0][1])*xFactor*size
			,y - points[0][1]*size
		);

		for(var i = 1; i <= pointCount; i++){
			context.lineTo(
				 x + points[i][0]*size + points[i][0]*(1-points[i][1])*xFactor*size
				,y - points[i][1]*size
			);
		}
		context.closePath();

		context.stroke();

		
		
	}

	return {
		render: render
	};
	
}

*/

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









































