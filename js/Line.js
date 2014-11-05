function Line(){
	this.colour = "blue";
	this.line = [];
	this.generate();
}

Line.prototype = {
	
	generate: function(){
		this.line.push({x: 1, y: 3}, {x: 1, y: 2});
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