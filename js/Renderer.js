function Renderer(ground){

	this.ground = ground;

	this.busHigh = "64";
	this.busWidth = "32";
	this.busHeight = "96";
	this.step = 10;

	this.size = 16;
	this.hsize = this.size / 2;

	this.body = document.body;
	this.groundElt = document.createElement("div");

	this.lines = [];
	this.busElts = [];
}

Renderer.prototype = {

	render: function(){
		this.generateLines();
		this.renderGround();
		this.renderTiles();
		this.renderLines();
		this.renderBuses();
	},

	generateLines: function(){

		//var nodes = new RandomLineGenerator({x: 10, y: 10});
		
		//var line = new Line("blue", nodes);
		//this.lines.push(line);

		var nodes = [
			{x: 20, y: 0}, 
			{x: 30, y: 0}, 
			{x: 30, y: 30}, 
			{x: 20, y: 30}, 
			{x: 20, y: 0}];
		
		var line = new Line("green", nodes);
		this.lines.push(line);

		var nodes = [
			{x: 3, y: 3}, 
			{x: 3, y: 9}, 
			{x: 15, y: 9},
			{x: 9, y: 3},
			{x: 3, y: 3}];
		
		var line = new Line("red", nodes);
		//this.lines.push(line);
	},

	renderGround: function(){
		this.groundElt.className = "ground";
		this.body.appendChild(this.groundElt);
	},

	renderTiles: function(){
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

		for (var i = 0; i < line.length(); i++){
			
			if (buffer != null){

				var pos = line.getPos(i);

				var dx = pos.x - buffer.x;
				var dy = pos.y - buffer.y;

				// Skip node repetition
				if (dx == 0 && dy == 0) continue;

				var length = (Math.max(Math.abs(dx), Math.abs(dy)) + 1) * this.size;
				
				// Adjust length for 45deg
				if (Math.abs(dx) == Math.abs(dy)){
					length = (length * sqrt2) - this.hsize;
				}
					
				var lineElt = document.createElement("div");
				lineElt.className = "line " + line.getColour();
				lineElt.style.width = length.toString() + "px";
				lineElt.style.height = this.size + "px";
				lineElt.style.transformOrigin = this.hsize + "px " + this.hsize + "px";
				this.setPosition(lineElt, buffer.x, buffer.y);

				this.rotate(dx, dy, lineElt);

				this.groundElt.appendChild(lineElt);
			}
			// Update buffer
			buffer = line.getPos(i);
		}
	},

	/** 
	 * Rotates an HTML element (elt) given difference on x axis (dx) 
	 * and difference on y axis (dy)
	 */
	rotate: function(dx, dy, elt){
		
		if (Math.abs(dx) == Math.abs(dy)){
			if (dx > 0){
				if (dy > 0){
					rotate45r(elt);
				} else {
					rotate135r(elt);
				}
			} else {
				if (dy > 0){
					rotate45l(elt);
				} else {
					rotate135l(elt);
				}
			}

		} else {
			if (dx < 0){
				rotate90l(elt);
			} else {
				if (dy < 0){
					rotate180(elt);
				} else {
					if (dx > dy){
						rotate90r(elt);
					}
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

	renderBuses: function(){
		for (var l = 0; l < this.lines.length; l++){
			var bus = this.lines[l].getBus();
			this.renderBus(bus);
		}
	},

	renderBus: function(bus){

		// Create bus
		var busElt = document.createElement("div");
		busElt.className = "bus";

		// Add shadow
		var shadowElt = document.createElement("div");
		shadowElt.className = "shadow";
		busElt.appendChild(shadowElt);

		var pos = bus.getPos();
		this.setBusPosition(busElt, pos.x, pos.y);

		this.groundElt.appendChild(busElt);
		this.busElts.push(busElt);
	},

	updateBuses: function(step){
		for (var l = 0; l < this.lines.length; l++){
			var bus = this.lines[l].getBus();
			this.updateBus(bus, this.busElts[l]);
		}
	},

	updateBus: function(bus, busElt){
		var next = bus.nextPos();
		var cur = bus.getPos();

		debugger





		if (cur.x < next.x || cur.y < next.y){
			this.move(busElt, this.size);
			bus.setPos(cur.x++, cur.y++);
		} else {
		
		}
	},

	setBusPosition: function(elt, x, y){
		setTop(elt, y*this.size, x*this.size, this.busHigh);
		setBottom(elt.children[0], "12.8", "12.8", this.busHigh);
	},

	moveX: function(elt, step){
		addOffsetX(elt, step);
	},

	moveY: function(elt, step){
		addOffsetY(elt, step);
	},

	move: function(elt, step){
		var r = getRotation(elt);
		switch(r){
			case 0:
				this.moveX(elt, step);
				break;

			case 90:
				this.moveY(elt, -step);
				break;

			case 180:
				this.moveX(elt, -step);
				break;

			case 270:
				this.moveY(elt, step);
				break;
		}
	},

	turnRight: function(elt){
		rotateRight(elt);
	},

	turnLeft: function(elt){
		rotateLeft(elt);
	}
};