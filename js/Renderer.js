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
}

Renderer.prototype = {
	
	render: function(){
		this.renderGround();
		this.renderLines2();
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

	renderLines2: function(){

		var line = new Line();
		var buffer = null;

		for (var i = 0; i < line.getLength(); i++){
			
			if (buffer != null){

				var pos = line.getPos(i);

				var dx = (pos.x - buffer.x);
				var dy = (pos.y - buffer.y);

				var length = Math.max(dx, dy) * this.size;
				
				if (dx == dy){
					length = (dx + 0.707)*0.707*this.size;
				}
				if (dx > dy){
					length += this.size;
					if (dy > 0){
						return;
					}
				}
				if (dy > dx){
					length += this.size;
					if (dx > 0){
						return;
					}
				}
					
				var lineElt = document.createElement("div");
				lineElt.className = "line " + line.getColour();
				lineElt.style.width = length.toString() + "px";
				lineElt.style.height = this.size + "px";
				this.setPosition(lineElt, buffer.y, buffer.x);

				if (dx == dy){
					lineElt.style.transformOrigin = this.hsize + "px " + this.hsize + "px";
					this.rotate45(lineElt);
				}

				if (dx > dy){
					lineElt.style.transformOrigin = this.hsize + "px " + this.hsize + "px";
					this.rotate90(lineElt);
				}
				this.groundElt.appendChild(lineElt);
			}
			// Update buffer
			buffer = line.getPos(i);
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

						var length = Math.max(dx, dy) * this.size;
						
						if (dx == dy){
							length = (dx + 0.707)*0.707*this.size;
						}
						if (dx > dy){
							length += this.size;
							if (dy > 0){
								return;
							}
						}
						if (dy > dx){
							length += this.size;
							if (dx > 0){
								return;
							}
						}
							
						var line = document.createElement("div");
						line.className = "line " + square.getTopLine();
						line.style.width = length.toString() + "px";
						line.style.height = this.size + "px";
						this.setPosition(line, pos.y, pos.x);

						if (dx == dy){
							line.style.transformOrigin = this.hsize + "px " + this.hsize + "px";
							this.rotate45(line);
						}

						if (dx > dy){
							line.style.transformOrigin = this.hsize + "px " + this.hsize + "px";
							this.rotate90(line);
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
		elt.style.transform = "matrix(1, 0, 0, 1, " + y * this.size + ", " + x * this.size + ")";
	},

	rotate45: function(elt){
		var array = getPosition(elt);
		array[0] = "0.707";
		array[1] = "0.707";
		array[2] = "-0.707";
		array[3] = "0.707";
		setPositionArray(elt, array);
	},

	rotate90: function(elt){
		var array = getPosition(elt);
		array[0] = "0";
		array[1] = "1";
		array[2] = "-1";
		array[3] = "0";
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