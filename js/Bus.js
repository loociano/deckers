function Bus(line){
	this.line = line;
	this.pos = this.line.firstNode();
}

Bus.prototype = {

	getPos: function(){
		return this.pos;
	},

	nextPos: function(){
		return this.line.nextNode();
	}
}