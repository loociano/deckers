function Ground(){

	this.width = 20;
	this.height = 10;
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

		for (var y = 0; y < this.height; y++){
			var line = [];
			for (var x = 0; x < this.width; x++){
				line.push(new Square());
			}
			this.ground.push(line);
		}
	},

	addLine: function(){
		var line = new Line();
		for (var i = 0; i < line.getLength(); i++){
			var pos = line.getPos(i);
			var square = this.ground[pos.y][pos.x];
			square.addLine(line.getColour());
		}
	},

	getSquare: function(x, y){
		return this.ground[y][x];
	}
};