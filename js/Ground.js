function Ground(){

	this.width = 40;
	this.height = 20;
	this.ground = [];

	this.initGround();
}

Ground.prototype = {

	getWidth: function(){
		return this.width;
	},

	getHeight: function(){
		return this.height;
	},
	
	initGround: function(){

		for (var y = 0; y < this.height; y++){
			var line = [];
			for (var x = 0; x < this.width; x++){
				line.push(new Square());
			}
			this.ground.push(line);
		}
	},

	/* Deprecated */
	addLine: function(){
		var line = new Line();
		for (var i = 0; i < line.length(); i++){
			var pos = line.getPos(i);
			var square = this.ground[pos.y][pos.x];
			square.addLine(line.getColour());
		}
	},

	getSquare: function(x, y){
		return this.ground[y][x];
	}
};