function Renderer(){

	this.busHigh = "64";
	this.busWidth = "48";
	this.busHeight = "96";

	this.body = document.body;
	this.ground = document.createElement("div");
}

Renderer.prototype = {
	
	render: function(){
		this.renderGround();
		for(var i = 0; i < 5; i++){
			this.renderBus(i*this.busHeight*1.1, 0);	
		}
	},

	renderGround: function(){
		this.ground.className = "ground";
		this.body.appendChild(this.ground);
	},

	renderBus: function(x, y){

		// Create bus
		var bus = document.createElement("div");
		bus.className = "bus";

		// Add shadow
		var shadow = document.createElement("div");
		shadow.className = "shadow";
		bus.appendChild(shadow);

		// Position bus
		var die = getRandomInt(0,3);
		while(die > 0){
			rotateLeft(bus);
			die--;
		}

		this.setBusPosition(bus, x, y);

		this.ground.appendChild(bus);
	},

	setBusPosition: function(bus, x, y){
		setTop(bus, x, y, this.busHigh);
		setBottom(bus.children[0], "12.8", "12.8", this.busHigh);
	}
};