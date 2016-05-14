var chartRectObj = function(){
	this.x;
	this.y;
	this.canvas;
	this.width;
	this.height;
	this.fillColor;
	this.data;
}

chartRectObj.prototype.init = function(){
	var context = this.canvas.getContext("2d");
	var x = this.x;
	var y = this.y;
	var width = this.width;
	var height = this.height;
	var fillColor = this.fillColor;
	var data = this.data;
	
	context.save();
	context.fillStyle = fillColor;
	context.fillRect(x,y,width,height);
	context.restore();	
	context.save();
	context.font="12px Arial";
 	context.fillStyle = '#000';
	context.fillText(data,x+3,y-3);
	context.restore();
}