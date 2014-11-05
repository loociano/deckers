function Game(){
	this.id = null;

	this.tickMillis = 50;
	this.stepLength = 10;
	this.resetStep();

	this.renderer = new Renderer(new Ground());	
}

Game.prototype = {
	
	resetStep: function(){
		this.steps = 16;
	},

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
			this.resetStep();
		}
	}
}