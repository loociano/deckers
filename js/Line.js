function Line(){
	this.colour = "blue";
	this.line = [];
	this.generate();
}

Line.prototype = {
	
	generate: function(){
		this.line.push({x: 0, y: 0}, {x: 5, y: 0}, {x: 5, y: 5}, {x: 0, y: 5}, {x: 0, y: 0});
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