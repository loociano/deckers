function Line(colour, nodes){
	this.colour = colour;

	// List of nodes, node example: {x: 0, y: 3}
	this.nodes = [];
	this.setNodes(nodes);

	this.current = 0;

	this.bus = new Bus(this);
}

Line.prototype = {

	getBus: function(){
		return this.bus;
	},

	isEmpty: function(){
		return this.nodes.length == 0;
	},

	firstNode: function(){
		if (!this.isEmpty())
			return this.nodes[0];
	},

	lastNode: function(){
		if (!this.isEmpty())
			return this.nodes[this.length()-1];
	},

	isCircular: function(){
		if(!this.isEmpty()){
			var first = this.firstNode();
			var last = this.lastNode();
			return first.x == last.x && first.y == last.y;
		}
	},

	setCurrentNode: function(index){
		if (index < this.length())
			this.current = index;
	},

	nextNode: function(){
		var nextIndex = this.current + 1;
		if (nextIndex < this.length()){
			if (nextIndex == this.length() - 1){
				if (this.isCircular()){
					return this.nodes[1];
				} else {
					return null;
				}
			} else {
				return this.nodes[nextIndex];
			}
		}
	},
	
	setNodes: function(nodeArray){
		for (var i = 0; i < nodeArray.length; i++){
			this.nodes.push(nodeArray[i]);	
		}
	},

	getColour: function(){
		return this.colour;
	},

	length: function(){
		return this.nodes.length;
	},

	getPos: function(index){
		if (index < this.nodes.length)
			return this.nodes[index];
	}
};