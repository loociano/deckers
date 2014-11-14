function Bus(line){
	this.line = line;
	var firstNode = this.line.firstNode();
	
	// Copy first node into bus' current position
	this.pos = {
		x: firstNode.x,
		y: firstNode.y
	};
}

Bus.prototype = {

	getPos: function(){
		return this.pos;
	},

	nextPos: function(){
		return this.line.nextNode();
	},

	setPos: function(pos){
		this.pos = pos;
	},

	moveNode: function(){
		this.line.moveNode();
	}
}