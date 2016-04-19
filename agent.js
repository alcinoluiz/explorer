var src = "img/bob.png";
var img = new Image();
var ang = 0;
var dirs = ["Up", "Down", "Left", "Right"];
img.src = src;

var Agent = function(){
	this.autoPilot = false;
	this.x = 60*5;
	this.y = 60*9;
	this.seeX = 0;
	this.seeY = 0;
	this.direction = "Left";
	this.img = new Image();
	this.src = "img/agent"+this.direction+".png";
	this.run = function(){
		this.update();
		this.draw();
	}
	this.update = function(){
		this.see();
		if(this.energy < 400){
			this.feeling = "hungry";
		}
		if(this.autoPilot){
			this.randomWalk();
		}
	}
	this.looking = {};
	this.energy = 1000;
	this.feeling = "ok";
	this.think = function(){
		if(this.feeling == "hungry"){

		}
	}
	this.randomWalk = function(){

		var dirNumber = Math.floor((Math.random() * 4));
		var times = Math.floor((Math.random() * 9) + 1);
		this.moveTo(dirs[dirNumber], times);

	}
	this.moveTo = function(dir, times){
		
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
		// img.src = "img/agent"+this.direction+".png";		
		context.drawImage(img, this.x, this.y, 59, 59);
	}
	this.move = function(dir){
		switch(dir){
			case "Up":
				if(this.y > 0 && this.direction == "Up"  && positionValue(this.x, this.y-60).value){
					console.log("Up"+ " x:" + this.x + " - y:" + this.y );
					this.y -= 60;
				}
			break;
			case "Down":
				if(this.y < 540 && this.direction == "Down" && positionValue(this.x, this.y+60).value){
					console.log("Down"+ " x:" + this.x + " - y:" + this.y );
					this.y += 60;
				}
			break;
			case "Right":
				if(this.x < 540 && this.direction == "Right" && positionValue(this.x+60, this.y).value == true){
					console.log("Right"+ " x:" + this.x + " - y:" + this.y );
					this.x += 60;
				}
			break;
			case "Left":
				if(this.x > 0 && this.direction == "Left" && positionValue(this.x-60, this.y).value == true){
					console.log("Left"+ " x:" + this.x + " - y:" + this.y );
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
	this.seeX = this.x;
	this.seeY = this.y;
	this.img.src = this.src;
	this.width = this.img.width;
	this.height = this.img.height;
	console.log("Agent is ready.");	
}