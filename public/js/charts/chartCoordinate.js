//这是一个坐标轴对象
var chartCoordinateObj = function(){
	this.canvas;
	this.dataX=[];
	this.dataY=[];
	this.unitPxX;
	this.xWidth;
	this.yWidth;
	this.lineX = [];
	this.originX;
	this.originY;
}
chartCoordinateObj.prototype.init = function(){
	var canvas = this.canvas;
	var context = canvas.getContext("2d");
	var canWidth = canvas.width;
	var canHeight = canvas.height;

	this.originX = 20;
	this.originY = canHeight - 65;
	var xEndX = canWidth - 10;
	var yEndY = 40;//this.originY - 150;
	this.xWidth = xEndX - this.originX;
	this.yWidth = this.originY - yEndY;
	yWidth = this.yWidth;
	var dataX = this.dataX;
	var dataY = this.dataY;
	var dataXQuantites = dataX.length;
	this.unitPxX = this.xWidth/dataXQuantites;
	var unitPxX = this.unitPxX;
	var unitPxY = this.yWidth/dataY.length;

	this.lineX = [];
	var lineY = [];
	var textX = [];
	for (var i = 0; i < dataXQuantites; i++) {
		this.lineX[i] = this.originX + unitPxX*(i+1);
		textX[i] = this.lineX[i] - unitPxX/2 - 8; //here
	};
	for (var j = 0; j < (yWidth/unitPxY); j++) {
		lineY[j] = this.originY - unitPxY*(j+1);
	};
	drawCoordinate(context,this.originX,this.originY,xEndX,yEndY,this.lineX,lineY,dataX,dataY,textX,canWidth,canHeight);
}

function drawCoordinate(ctx,ox,oy,xex,yey,lx,ly,dx,dy,tx,cw,ch){
	ctx.clearRect(0,0,cw,ch);
	ctx.save();
	ctx.strokeStyle = "#CFCFCF";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(ox,oy);
	ctx.lineTo(xex,oy);
	ctx.moveTo(ox,oy);
	ctx.lineTo(ox,yey);
	ctx.stroke();
	ctx.save();
	ctx.fillStyle = "#8B8386";
	ctx.font = "12px Microsoft Yahei";
	ctx.fillText("0",ox-20,oy);
	ctx.restore();

	ctx.save();
	ctx.strokeStyle = "#CFCFCF";
	ctx.lineWidth = 1;
	ctx.fillStyle = "#8B8386";
	ctx.font = "12px Microsoft Yahei";
for (var i = 0; i < lx.length; i++) {
	ctx.moveTo(lx[i],oy);
	ctx.lineTo(lx[i],yey);
	ctx.fillText(dx[i],tx[i],oy+20);
};
for (var j = 0; j < ly.length; j++) {
	ctx.moveTo(ox,ly[j]);
	ctx.lineTo(xex,ly[j]);
};
	ctx.stroke();
	ctx.restore();
	

}
