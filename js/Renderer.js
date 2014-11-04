function Renderer(){

	this.busHeight = "64";
	this.body = document.body;
	this.ground = document.createElement("div");
}

Renderer.prototype = {
	
	render: function(){
		this.renderGround();
		for(var i = 0; i < 1; i++){
			this.renderBus(0, 0);	
		}
	},

	renderGround: function(){
		this.ground.className = "ground";
		this.body.appendChild(this.ground);
	},

	renderBus: function(x, y){

		var bus = document.createElement("div");
		bus.className = "bus";

		var shadow = document.createElement("div");
		shadow.className = "shadow";

		setTop(bus, x, y, this.busHeight);
		setBottom(shadow, "12.8", "12.8", this.busHeight);

		rotateLeft(bus);
		
		bus.appendChild(shadow);
		this.ground.appendChild(bus);
	}
};