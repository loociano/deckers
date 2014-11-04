function Renderer(){

	this.busHeight = "64";
	this.body = document.body;
	this.bus = document.createElement("div");
	this.shadow = document.createElement("div");
	this.ground = document.createElement("div");
}

Renderer.prototype = {
	
	render: function(){
		this.renderGround();
		this.renderBus();
	},

	renderGround: function(){
		this.ground.className = "ground";
		this.body.appendChild(this.ground);
	},

	renderBus: function(){
		this.bus.className = "bus";
		this.shadow.className = "shadow";

		setTop(this.bus, "48", "64", this.busHeight);
		setBottom(this.shadow, "12.8", "12.8", this.busHeight);
		
		this.bus.appendChild(this.shadow);
		this.ground.appendChild(this.bus);
	}
};