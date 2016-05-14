var chartSinObj = function(){
	this.data;
	this.coordinate;
	this.canvas;
	this.dataX = [];
	this.dataY = [];
	this.scale;
	this.canWidth;
	this.canHeight;
	this.x;
	this.y;
}

chartSinObj.prototype.init = function(ele){
	this.canvas = document.createElement("canvas");
	this.canWidth = ele.getAttribute("data-width");
	this.canHeight = ele.getAttribute("data-height");
	this.canvas.width = this.canWidth;
	this.canvas.height = this.canHeight;
	ele.appendChild(this.canvas);

	this.dataX = ["一月","二月","三月","四月","五月"];
	this.dataY = ["","",""];
	this.scale = 0;
	this.coordinate = new chartCoordinateObj();
	this.coordinate.canvas = this.canvas;
	this.coordinate.dataX = this.dataX;
	this.coordinate.dataY = this.dataY;
	this.coordinate.init();  //初始化一个坐标轴
}
chartSinObj.prototype.draw = function(){
	var originX = this.coordinate.originX;
	var originY = this.coordinate.originY;
	var context = this.canvas.getContext("2d");
	var height = this.coordinate.yWidth;
	var scaleX = this.canWidth/(400/54);   //400/57 = width/?
	context.save();
	context.lineWidth = 5;
	context.strokeStyle = "#B9D3EE";
	context.beginPath();
	if(this.scale == 0){
		this.x = originX;
		this.y = originY - height/2;	
	}	
	context.moveTo(this.x,this.y);
	
	if(this.scale < this.coordinate.xWidth/scaleX){
		this.x = originX + this.scale*scaleX;
		this.y = originY - Math.sin(this.scale)*height/2 - height/2;
		context.lineTo(this.x,this.y);
		context.stroke();
		context.restore();
		this.scale += 0.1;
	}
}