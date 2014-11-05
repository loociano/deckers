function Square(){
	this.lines = [];
}

Square.prototype = {
	addLine: function(colour){
		this.lines.push(colour);
	},

	isEmpty: function(){
		return this.lines.length == 0;
	},

	getTopLine: function(){
		return this.lines[0];
	} 
};