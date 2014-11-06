function Renderer(ground){

	this.ground = ground;

	this.busHigh = "64";
	this.busWidth = "32";
	this.busHeight = "96";
	this.step = 10;

	this.size = 32;
	this.hsize = 16;

	this.body = document.body;
	this.groundElt = document.createElement("div");

	this.bus = null;
	this.lines = [];
}

Renderer.prototype = {

	render: function(){
		this.generateLines();
		this.renderGround();
		this.renderLines();
		//this.renderBus();
	},

	generateLines: function(){

		var nodes = [
			{x: 0, y: 0}, 
			{x: 5, y: 0}, 
			{x: 5, y: 5}, 
			{x: 0, y: 5}, 
			{x: 0, y: 0}];
		
		var line = new Line("blue");
		line.setNodes(nodes);
		this.lines.push(line);

		var nodes = [
			{x: 6, y: 0}, 
			{x: 11, y: 0}, 
			{x: 11, y: 5}, 
			{x: 6, y: 5}, 
			{x: 6, y: 0}];
		
		var line = new Line("green");
		line.setNodes(nodes);
		this.lines.push(line);

		var nodes = [
			{x: 3, y: 3}, 
			{x: 3, y: 9}, 
			{x: 15, y: 9},
			{x: 9, y: 3},
			{x: 3, y: 3}];
		
		var line = new Line("red");
		line.setNodes(nodes);
		this.lines.push(line);
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
		for(var l = 0; l < this.lines.length; l++){
			this.renderLine(this.lines[l]);
		}
	},

	renderLine: function(line){

		var buffer = null;

		for (var i = 0; i < line.getLength(); i++){
			
			if (buffer != null){

				var pos = line.getPos(i);

				var dx = pos.x - buffer.x;
				var dy = pos.y - buffer.y;

				// Skip node repetition
				if (dx == 0 && dy == 0) continue;

				var length = (Math.max(Math.abs(dx), Math.abs(dy)) + 1) * this.size;
				
				// Adjust length for 45deg
				if (dx == dy){
					length = (length * sqrt2) - this.hsize;
				}
					
				var lineElt = document.createElement("div");
				lineElt.className = "line " + line.getColour();
				lineElt.style.width = length.toString() + "px";
				lineElt.style.height = this.size + "px";
				lineElt.style.transformOrigin = this.hsize + "px " + this.hsize + "px";
				this.setPosition(lineElt, buffer.x, buffer.y);

				if (dx == dy){
					if (dx > 0){
						rotate45r(lineElt);	
					} else {
						rotate45l(lineElt);
					}
				} else {
					if (dx < 0){
						rotate90l(lineElt);
					} else {
						if (dy < 0){
							rotate180(lineElt);
						} else {
							if (dx > dy){
								rotate90r(lineElt);
							}
						}
					}
				}
				this.groundElt.appendChild(lineElt);
			}
			// Update buffer
			buffer = line.getPos(i);
		}
	},

	setClassNames: function(blockElt, block){
		blockElt.className = "square";
	},

	/** Sets the position using CSS transform */
	setPosition: function(elt, x, y){
		elt.style.transform = "matrix(1, 0, 0, 1, " + y * this.size + ", " + x * this.size + ")";
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