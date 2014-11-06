function Line(){
	this.colour = "blue";
	this.line = [];
	this.generate();
}

Line.prototype = {
	
	generate: function(){
		this.line.push({x: 0, y: 0}, {x: 5, y: 0}, {x: 5, y: 1}, {x: 10, y: 1}, {x: 12, y: 3}, {x: 12, y: 4}, {x: 15, y: 7}, {x: 17, y: 7});
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