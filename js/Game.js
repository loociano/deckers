function Game(){
	this.id = null;

	this.tick = 1000; // Milliseconds
	this.tickRotate = 1000; // Milliseconds
	
	this.stepLength = 10; // Pixels
	this.rotateStep = 1; // Degrees
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
 			parent.renderer.update();
 		}, this.tick);

		this.id = window.setInterval(function(){
 			parent.renderer.updateGround(parent.rotateStep);
 		}, this.tickRotate);
	}
}