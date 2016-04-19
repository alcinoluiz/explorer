var canvas;
var context;
var agent;
var positions = [];
var imgGround = new Image();
imgGround.src = "ground.png";
var imgGroundGray = new Image();
imgGroundGray.src = "groundGray.png";

var positionValue = function (px,py){
	for(var i = 0; i<positions.length; i++){
		if(positions[i].x == px && positions[i].y == py){
			return positions[i];			
		}
	}
	return null;
}


var Position = function(x,y){
	this.x = x;
	this.y = y;
	this.value = true;
	this.obj = {};
	this.setSpaceProps = function(value){this.value = value;}
	this.draw = function(){
		if(this.value){
			context.drawImage(imgGround, this.x, this.y, 59, 59);
		}else{
			context.drawImage(imgGroundGray, this.x, this.y, 59, 59);
		}
		if(this.obj.draw != null){
			this.obj.draw();
		}		
		
	}
	console.log("Position created");
}

function init(){
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
	var space = 60;
	for(var i = space; i < 600; i+=space){
		context.beginPath();
		context.moveTo(i,0);
		context.lineTo(i,600);

		context.moveTo(0,i);
		context.lineTo(600,i);

		context.stroke();		
	}

	for(var i =0; i <10; i++){
		for(var j =0; j <10; j++){
			positions.push(new Position(60*i,60*j));
			
		}	
	}
	window.addEventListener('keydown', function(event) {
		agent.move(event.keyCode);		
	}, false);	
}

window.onload = function(e){
	init();

	positions[0].setSpaceProps(false);
	positions[35].setSpaceProps(false);
	positions[22].obj = {
		name:"test",
		draw: function(){
			var centerX = canvas.width / 2;
			var centerY = canvas.height / 2;
			var radius = 20;

			context.beginPath();
			context.arc(positions[22].x+29, positions[22].y+29, radius, 0, 2 * Math.PI, false);
			context.fillStyle = 'blue';
			context.fill();
			context.lineWidth = 5;
			context.strokeStyle = '#003300';
			context.stroke();
		}
	}
	positions[22].setSpaceProps(false);
	positions[99].setSpaceProps(false);

	agent = new Agent();


	var ang = 0;
	setInterval(function () {
            context.save(); 
            
            	positions.forEach(function(pos){
			pos.draw();
		});
            	agent.draw();
        }, 30);	
	
	
	

}