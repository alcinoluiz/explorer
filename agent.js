var img = new Image();
img.src = "img/bob.png";
var Agent = function(){
	this.autoPilot = false;
	this.x = 60*5;
	this.y = 60*9;
	this.seeX = 0;
	this.seeY = 0;
	this.direction = "Up";
	this.img = new Image();
	this.img.src = "img/bob.png";
	this.seeX = this.x;
	this.seeY = this.y;
	this.img.src = this.src;
	this.width = this.img.width;
	this.height = this.img.height;
	this.looking = {};
	this.energy = 1000;
	this.feeling = "ok";
	this.lookingFor = "";
	this.goalFound = false;
	this.goalCloser = false;
	this.goalReach = false;
	this.dirs = ["Up", "Down", "Left", "Right"];

	this.sense = function(){
		this.see();
		// this.goalDistance = this.
		if(this.energy < 600){
			this.feeling = "thirsty";
		}
	}
	this.reasoning = function(){
		if (this.feeling == "thirsty"){this.lookingFor = "water";}

		if (this.looking.name == this.lookingFor) {
			console.log('goal found!');
			this.goalFound = true;
		}

		if (this.goalFound == true) {
			if (this.goalDistance() == 0) {this.goalCloser = true;}
		}

		if(this.goalReach){
			this.reset();
		}
	}
	this.acting = function(){
		if(this.lookingFor != "" && this.goalFound == false){
			this.randomWalk();
		}
		if (this.goalFound == true && !this.goalCloser) {
			console.log("moving to: " + this.looking.location());
			this.moveToGoal();
		}
		if(this.goalCloser == true){
			console.log("Goal closer")
			this.looking.eat(this);
			console.log("Ate");
			this.goalReach = true;			
		}
	}
	this.reset = function(){
		this.feeling = "ok";
		this.lookingFor = "";
		this.goalFound = false;
		this.goalCloser = false;
		this.goalReach = false;
	}
	this.run = function(){
		this.sense();
		this.reasoning();
		this.acting();
		this.energy--;
		this.draw();
	}
	this.update = function(){
		this.see();
		if (this.energy > 999) {this.feeling = "ok";}
		if(this.energy < 400){this.feeling = "hungry";	}
		if(this.autoPilot){
			this.randomWalk();
		}
	}
	this.goalDistance = function(){
		var a = this.x - (this.looking.location())[0];
		var b = this.y - (this.looking.location())[1];

		var c = Math.sqrt( a*a + b*b );
		return (c/60)-1;
	}
	this.moveToGoal = function(){
		var moves = this.goalDistance();
		console.log("distance: " + moves);
		this.moveTo(this.direction, moves);		
	}
	this.randomWalk = function(){
		var dirNumber = Math.floor((Math.random() * 4));
		var times = Math.floor((Math.random() * 9) + 1);
		this.moveTo(this.dirs[dirNumber], times);

	}
	this.moveTo = function(dir, times){
		console.log("moving to: " + dir + " " + times +" times");
		this.direction = dir;
		while(times > 0){
			if(this.energy < 1) break;
			this.move(dir);
			times--;
		}
	}
	
	this.see = function(){
		this.seeX = this.x;
		this.seeY = this.y;
		//eye
		switch(this.direction){
			case "Up":
				var pos = positionValue(this.seeX, this.seeY-60);
				while(pos != null){
					
					if(!pos.value){
						this.looking = pos.obj.name != null? pos.obj : {name:"block"};					
						break;
					}else{
						this.looking = {name:"nothing"};
					}
					pos = positionValue(this.seeX, (this.seeY-=60));
				}
			break;
			case "Down":
				var pos = positionValue(this.seeX, this.seeY+60);
				while(pos != null){
					
					if(!pos.value){
						this.looking = pos.obj.name != null? pos.obj : {name:"block"};					
						break;
					}else{
						this.looking = {name:"nothing"};
					}
					pos = positionValue(this.seeX, (this.seeY+=60));
				}
			break;
			case "Left":
				var pos = positionValue(this.seeX-60, this.seeY);
				while(pos != null){
					
					if(!pos.value){
						this.looking = pos.obj.name != null? pos.obj : {name:"block"};					
						break;
					}else{
						this.looking = {name:"nothing"};
					}
					pos = positionValue(this.seeX-=60, (this.seeY));
				}
			break;
			case "Right":
				var pos = positionValue(this.seeX+60, this.seeY);
				while(pos != null){
					
					if(!pos.value){
						this.looking = pos.obj.name != null? pos.obj : {name:"block"};					
						break;
					}else{
						this.looking = {name:"nothing"};
					}
					pos = positionValue(this.seeX+=60, (this.seeY));
				}
			break;
		}
		console.log(this.looking);

	}
	this.draw = function(){
		context.drawImage(img, this.x, this.y, 59, 59);
	}
	this.move = function(dir){
		switch(dir){
			case "Up":
				if(this.y > 0 && this.direction == "Up"  && positionValue(this.x, this.y-60).value){
					// console.log("Up"+ " x:" + this.x + " - y:" + this.y );
					this.y -= 60;
				}
			break;
			case "Down":
				if(this.y < 540 && this.direction == "Down" && positionValue(this.x, this.y+60).value){
					// console.log("Down"+ " x:" + this.x + " - y:" + this.y );
					this.y += 60;
				}
			break;
			case "Right":
				if(this.x < 540 && this.direction == "Right" && positionValue(this.x+60, this.y).value == true){
					// console.log("Right"+ " x:" + this.x + " - y:" + this.y );
					this.x += 60;
				}
			break;
			case "Left":
				if(this.x > 0 && this.direction == "Left" && positionValue(this.x-60, this.y).value == true){
					// console.log("Left"+ " x:" + this.x + " - y:" + this.y );
					this.x -= 60;
				}
			break;
		}
		// sleep(2000);
		// setTimeout(function(){}, 2000);
		this.energy--;
	}
	this.keydown = function(e){
		switch (e) {
			case 37:				
				this.move("Left");
				this.direction = "Left";
				break; 
			case 38:
				this.move("Up");
				this.direction = "Up";
				break; 
			case 39:
				this.move("Right");
				this.direction = "Right";
				break;
			case 40:
				this.move("Down");
				this.direction = "Down";
				break; 
			default:
				console.log(e); 
		}
	}
	console.log("Agent is ready.");	
}