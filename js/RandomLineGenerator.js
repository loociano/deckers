function RandomLineGenerator(firstNode){
	
	// {x: 0, y: 0}
	this.currentNode = firstNode;

	this.nodes = [];
	this.nodes.push(firstNode);

	this.max = 10;
	this.min = -10;

	this.segments = 10;

	this.die = 0;

	return this.generate();
}

RandomLineGenerator.prototype = {

	generate: function(){

		while(this.segments > 0) {
			
			do {
				var die = getRandomInt(0, 2);
			} while (die == this.die);

			this.die = die;

			var nextNode = null;

			switch(die){
				case 0:
					nextNode = this.addLineYAxis();
					break;
				case 1:
					nextNode = this.addLineXAxis();
					break;
				case 2:
					nextNode = this.addLineSAxis();
					break;
			}
			this.currentNode = nextNode;
			this.nodes.push(this.currentNode);

			this.segments--;
		}
		console.table(this.nodes);
		return this.nodes;
	},

	addLineYAxis: function(){
		var newY = getRandomInt(this.min, this.max);
		var newNode = {
			x: this.currentNode.x,
			y: this.currentNode.y + newY
		};
		return newNode; 
	},

	addLineXAxis: function(){
		var newX = getRandomInt(this.min, this.max);
		var newNode = {
			x: this.currentNode.x + newX,
			y: this.currentNode.y
		};
		return newNode; 
	},

	addLineSAxis: function(){
		var newX = getRandomInt(this.min, this.max);
		if (Math.random() > 0.5)
			var newY = newX;
		else
			var newY = -newX;

		var newNode = {
			x: this.currentNode.x + newX,
			y: this.currentNode.y + newY
		};
		return newNode; 
	},
};