function Renderer(ground){

	this.ground = ground;

	this.busHigh = "64";
	this.busWidth = "32";
	this.busHeight = "96";
	this.step = 10;

	// Square size
	this.size = 16;
	this.hsize = this.size / 2;

	this.body = document.body;
	this.groundElt = document.createElement("div");

	this.lines = [];
	this.busElts = [];

	this.groundZRot = 45;
}

Renderer.prototype = {

	render: function(){
		this.generateLines();
		this.renderGround();
		//this.renderTiles();
		this.renderLines();
		this.renderBuses();
	},

	update: function(){
		this.updateBuses();
	},

	generateLines: function(){

		/*
		// Random line
		var nodes = new RandomLineGenerator({x: 10, y: 10});
		
		var line = new Line("blue", nodes, this.size);
		this.lines.push(line);*/

		/* 
		//Square line
		var nodes = [
			{x: 0, y: 0}, 
			{x: 10, y: 0}, 
			{x: 10, y: 10}, 
			{x: 0, y: 10}, 
			{x: 0, y: 0}];
		
		var line = new Line("green", nodes, this.size);
		this.lines.push(line);*/

		var nodes = [
			{x: 3, y: 3}, 
			{x: 3, y: 9}, 
			{x: 0, y: 12},
			{x: 0, y: 15},
			{x: 9, y: 15},
			{x: 12, y: 12},
			{x: 6, y: 12},
			{x: 6, y: 6},
			{x: 9, y: 3},
			{x: 9, y: 0},
			{x: 3, y: 0},
			{x: 3, y: 3}];
		
		var line = new Line("red", nodes, this.size);
		this.lines.push(line);
	},

	renderGround: function(){
		this.groundElt.className = "ground";
		rotate(this.groundElt, 45, 0, this.groundZRot);
		this.body.appendChild(this.groundElt);
	},

	updateGround: function(deg){
		// FIXME: handle one full turn to avoid rotation number overflow
		// this.groundZRot == 360 ? this.groundZRot = 45 : this.groundZRot += deg;
		this.groundZRot += deg;
		rotate(this.groundElt, 45, 0, this.groundZRot);
	},

	renderTiles: function(){
		for (var y = 0; y < this.ground.getHeight(); y++){
			for (var x = 0; x < this.ground.getWidth(); x++){
				var square = this.ground.getSquare(x, y);
				var squareElt = document.createElement("div");
				this.setClassNames(squareElt, square);
				this.setPosition(squareElt, x*this.size, y*this.size);
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

				var length = (Math.max(Math.abs(dx), Math.abs(dy)) + this.size);
				
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

		if (dx == 0 && dy == 0) return;
		
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
					} else {
						rotate0(elt);
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
		set3dPosition(elt, y, x, 0);
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
		busElt.style.transformOrigin = "48px 16px";

		// Add shadow
		var shadowElt = document.createElement("div");
		shadowElt.className = "shadow";
		busElt.appendChild(shadowElt);

		var pos = bus.getPos();

		this.setBusPosition(busElt, pos.x, pos.y);
		
		// Set bus rotation
		var diff = bus.getDxDy();
		this.rotate(diff.x, diff.y, busElt);

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

		var cur = bus.getPos();
		var diff = bus.getDxDy();
		
		// Move towards next point
		this.move(busElt, cur, this.size);

		if (Math.abs(diff.x) == this.size || Math.abs(diff.y) == this.size){
			this.rotateBus(bus, busElt);
		}
	},

	rotateBus: function(bus, busElt){
		bus.moveNode();
		diff = bus.getDxDy();
		this.rotate(diff.x, diff.y, busElt);
	},

	setBusPosition: function(elt, x, y){
		var posY = y - this.busHeight/2 + this.hsize;
		var posX = x - this.hsize;

		setTop(elt, posY, posX, this.busHigh);
		setBottom(elt.children[0], "12.8", "12.8", this.busHigh);
	},

	move: function(elt, pos, step){	

		var r = getRotation(elt);
		switch(r){

			case 0:
				this.moveY(elt, step);
				pos.y = pos.y + step;
				break;

			case 45:
				this.moveXY(elt, -step, step);
				pos.x = pos.x - step;
				pos.y = pos.y + step;
				break;

			case 90:
				this.moveX(elt, -step);
				pos.x = pos.x - step;
				break;

			case 135:
				this.moveXY(elt, -step, -step);
				pos.x = pos.x - step;
				pos.y = pos.y - step;
				break;

			case 180:
				this.moveY(elt, -step);
				pos.y = pos.y - step;
				break;

			case 225:
				this.moveXY(elt, step, -step);
				pos.x = pos.x + step;
				pos.y = pos.y - step;
				break;

			case 270:
				this.moveX(elt, step);
				pos.x = pos.x + step;
				break;

			case 315:
				this.moveXY(elt, step, step);
				pos.x = pos.x + step;
				pos.y = pos.y + step;
				break;
		}
	},

	moveX: function(elt, step){
		addOffsetY(elt, step);
	},

	moveY: function(elt, step){
		addOffsetX(elt, step);
	},

	moveXY: function(elt, stepX, stepY){
		addOffsetXY(elt, stepY, stepX);
	}
};