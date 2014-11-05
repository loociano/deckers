function Renderer(ground){

	this.ground = ground;

	this.busHigh = "64";
	this.busWidth = "32";
	this.busHeight = "96";
	this.step = 10;

	this.size = this.busWidth;

	this.body = document.body;
	this.groundElt = document.createElement("div");

	this.bus = null;
}

Renderer.prototype = {
	
	render: function(){
		this.renderGround();
		this.renderLines();
		//this.renderBus();
	},

	renderGround: function(){
		this.groundElt.className = "ground";
		this.body.appendChild(this.groundElt);

		for (var y = 0; y < this.ground.getHeight(); y++){
			for (var x = 0; x < this.ground.getWidth(); x++){
				var square = this.ground.getSquare(x, y);
				var squareElt = document.createElement("div");
				this.setClassNames(squareElt, square);
				this.setPosition(squareElt, x, y);
				this.groundElt.appendChild(squareElt);
			}
		}
	},

	renderLines: function(){
		
		var pos = null;

		for (var y = 0; y < this.ground.getHeight(); y++){
			for (var x = 0; x < this.ground.getWidth(); x++){
				
				var square = this.ground.getSquare(x, y);
				if (!square.isEmpty()){
					
					if (pos != null){
						var dx = (x - pos.x);
						var dy = (y - pos.y);

						var length = (Math.max(dx, dy) + 1) * this.size;

						var line = document.createElement("div");
						line.className = "line " + square.getTopLine();
						line.style.width = length.toString() + "px";
						line.style.height = this.size + "px";
						this.setPosition(line, pos.x, pos.y);

						if (dx == dy){
							//this.rotate45(line);
						}
						this.groundElt.appendChild(line);
					}
					// Update buffer
					pos = {x: x, y: y};
				}				
			}
		}
	},

	setClassNames: function(blockElt, block){
		blockElt.className = "square";
	},

	/** Sets the position using CSS transform */
	setPosition: function(elt, x, y){
		elt.style.transform = "matrix(1, 0, 0, 1, " + x * this.size + ", " + y * this.size + ")";
	},

	rotate45: function(elt){
		var array = getPosition(elt);
		array[0] = "0.707";
		array[1] = "0.707";
		array[2] = "-0.707";
		array[3] = "0.707";
		array[4] = array[4] - this.size*0.5; 
		array[5] = array[5] + this.size; 
		setPositionArray(elt, array);
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

		this.groundElt.appendChild(this.bus);
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