function Line(colour){
	this.colour = colour;

	// List of nodes, node example: {x: 0, y: 3}
	this.nodes = [];
}

Line.prototype = {
	
	setNodes: function(nodeArray){
		for (var i = 0; i < nodeArray.length; i++){
			this.nodes.push(nodeArray[i]);	
		}
	},

	getColour: function(){
		return this.colour;
	},

	getLength: function(){
		return this.nodes.length;
	},

	getPos: function(index){
		if (index < this.nodes.length)
			return this.nodes[index];
	}
};