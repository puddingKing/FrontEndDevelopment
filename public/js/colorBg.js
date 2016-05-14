var colorBgObj = function(){
	this.data_width;
	this.data_height;
	this.canvas;
	this.canWidth;
	this.canHeight;
}
colorBgObj.prototype.init = function(ele){
	this.data_width=ele.getAttribute("data-width");
	this.data_height=ele.getAttribute("data-height");
	this.canvas = document.createElement("canvas");
	ele.appendChild(this.canvas);
	this.canvas.className = "lakeColorBgCanvas";
	var pageWidth = document.body.clientWidth;
	//var pageHeight = document.body.clientHeight;
	this.canWidth = this.data_width*pageWidth;
	this.canHeight = this.data_height;
		
	ele.appendChild(this.canvas);
}
colorBgObj.prototype.draw=function(){
	this.canvas.width = this.canWidth;
	this.canvas.height = this.canHeight;
	console.log(this.canHeight);
	var context = this.canvas.getContext("2d");
	drawColorBg(context,this.canWidth,this.canHeight);
}

function drawColorBg(ctx,cw,ch){
	ctx.clearRect(0,0,cw,ch);
	ctx.save();
	var my_gradient=ctx.createLinearGradient(0,0,cw,ch);
	my_gradient.addColorStop(0,"#5E5E5E");
	my_gradient.addColorStop(1,"#7171C6");
	ctx.fillStyle=my_gradient;
	ctx.fillRect(0,0,cw,ch);
	ctx.restore();	
}