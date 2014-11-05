function Game(){
	this.id = null;
	this.tickMillis = 50;
	this.renderer = new Renderer();
	this.steps = 20;
	this.stepLength = 10;
}

Game.prototype = {
	start: function(){
		this.renderer.render();

		var parent = this;
		this.id = window.setInterval(function(){
 			parent.update();
 		}, this.tickMillis);
	},

	update: function(){
		if (this.steps > 0){
			this.renderer.move(this.stepLength);
			this.steps--;
		} else {
			this.renderer.turnRight();
			this.steps = 20;
		}
	}
}