function Renderer(){

	this.busHigh = "64";
	this.busWidth = "48";
	this.busHeight = "96";
	this.step = 10;

	this.body = document.body;
	this.ground = document.createElement("div");

	this.bus = null;
}

Renderer.prototype = {
	
	render: function(){
		this.renderGround();
		this.renderBus();
	},

	renderGround: function(){
		this.ground.className = "ground";
		this.body.appendChild(this.ground);
	},

	renderBus: function(){

		// Create bus
		this.bus = document.createElement("div");
		this.bus.className = "bus";

		// Add shadow
		var shadow = document.createElement("div");
		shadow.className = "shadow";
		this.bus.appendChild(shadow);

		this.setBusPosition(0, 0);

		this.ground.appendChild(this.bus);
	},

	setBusPosition: function(x, y){
		setTop(this.bus, x, y, this.busHigh);
		setBottom(this.bus.children[0], "12.8", "12.8", this.busHigh);
	},

	moveX: function(step){
		addOffsetX(this.bus, step);
	},

	moveY: function(step){
		addOffsetY(this.bus, step);
	},

	move: function(step){
		var r = getRotation(this.bus);
		switch(r){
			case 0:
				this.moveX(step);
				break;

			case 90:
				this.moveY(-step);
				break;

			case 180:
				this.moveX(-step);
				break;

			case 270:
				this.moveY(step);
				break;
		}
	},

	turnRight: function(){
		rotateRight(this.bus);
	},

	turnLeft: function(){
		rotateLeft(this.bus);
	}
};