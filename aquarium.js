

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


generateStemPlant();

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










































