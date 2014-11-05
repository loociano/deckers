function Ground(){

	this.width = 10;
	this.height = 20;
	this.ground = [];

	this.initGround();
	this.addLine();
}

Ground.prototype = {

	getWidth: function(){
		return this.width;
	},

	getHeight: function(){
		return this.height;
	},
	
	initGround: function(){

		for (var h = 0; h < this.height; h++){
			var line = [];
			for (var w = 0; w < this.width; w++){
				line.push(new Square());
			}
			this.ground.push(line);
		}
	},

	addLine: function(){
		var line = new Line();
		for (var i = 0; i < line.getLength(); i++){
			var pos = line.getPos(i);
			var square = this.ground[pos.x][pos.y];
			square.addLine(line.getColour());
		}
	},

	getSquare: function(x, y){
		return this.ground[y][x];
	}
};