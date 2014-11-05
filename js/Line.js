function Line(){
	this.colour = "blue";
	this.line = [];
	this.generate();
}

Line.prototype = {
	
	generate: function(){
		this.line.push({x: 0, y: 0}, {x: 3, y: 3}, {x: 3, y: 4}, {x: 9, y: 4});
		return this.line;
	},

	getColour: function(){
		return this.colour;
	},

	getLength: function(){
		return this.line.length;
	},

	getPos: function(index){
		if (index < this.line.length)
			return this.line[index];
	}
};