var src = "img/agentLeft.png";
var img = new Image();
var ang = 0;
img.src = src;

var Agent = function(){
	this.x = 60*5;
	this.y = 60*9;
	this.seeX = 0;
	this.seeY = 0;
	this.direction = "Left";
	this.img = new Image();
	this.src = "img/agent"+this.direction+".png";
	this.rotate = function(){
	}
	this.looking = {};
	this.moveTo = function(dir, times){
		this.direction = dir;
		while(times > 0){
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
						this.looking = "nothing";
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
						this.looking = "nothing";
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
						this.looking = "nothing";
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
						this.looking = "nothing";
					}
					pos = positionValue(this.seeX+=60, (this.seeY));
				}
			break;
		}
		console.log(this.looking);

	}
	this.draw = function(){
		this.see();
		img.src = "img/agent"+this.direction+".png";
		
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
				this.move("Down");this.
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