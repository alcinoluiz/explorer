var canvas;
var context;
var agent;
var agent2;
var positions = [];
var imgGround = new Image();
var imgGroundGray = new Image();
window.run = true;

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

function createObj(positionIndex){
	var obj = new Object();
	obj = {
		name:"water",
		x : positions[positionIndex].x,
		y: positions[positionIndex].y,
		edible: true,
		eat: function(agent){
			agent.energy = 1000;
			agent.lookingFor = "";
		},
		location : function(){
			return [this.x, this.y];
		},
		draw: function(){
			var centerX = canvas.width / 2;
			var centerY = canvas.height / 2;
			var radius = 20;

			context.beginPath();
			context.arc(this.x+29, this.y+29, radius, 0, 2 * Math.PI, false);
			context.fillStyle = 'blue';
			context.fill();
			context.lineWidth = 5;
			context.strokeStyle = '#003300';
			context.stroke();
			context.closePath();
		}
	}
	return obj;
}

function init(){
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
	imgGround.src = "img/ground.png";
	imgGroundGray.src = "img/groundGray.png";
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
	window.addEventListener('keydown', function(event){
		agent.keydown(event.keyCode);
		// agent2.keydown(event.keyCode);
	}, false);
	
	positions[0].setSpaceProps(false);
	positions[35].setSpaceProps(false);
	positions[36].obj = createObj(36);
	positions[36].setSpaceProps(false);

	positions[46].setSpaceProps(false);
	// positions[60].obj = createObj(60);
	// positions[60].setSpaceProps(false);	
	positions[99].setSpaceProps(false);

	agent = new Agent();
	
	agent.autoPilot = true;

	agent2 = new Agent();
	
	agent2.autoPilot = true;	

}
window.onload = function(e){
	init();
	setInterval(function () {
		// if (window.run == true){
			context.beginPath();
		      context.rect(0, 0, 600, 650);
		      context.fillStyle = 'black';
		      context.fill();
		      
		      context.stroke();
			
			context.closePath();
			
	
			positions.forEach(function(pos){
				pos.draw();
			});
	
			context.beginPath();
			context.font = "20px Arial";
			context.fillStyle = 'white';		
			context.fillText("feeling: "+agent.feeling +" | energy: " + agent.energy + " | looking: " + agent.looking.name + " | lookingFor:" + agent.lookingFor,10,640);		
			context.closePath();
			agent.run();
			// agent2.run();
		// }else{
		// 	location.reload();
		// }
		// agent2.run();
	}, 60);
}