var chartLineObj = function(){
	this.chartLine;
	this.dataX = [];
	this.dataY = [];
	this.dataXLength = [];
	this.dataArcSize;
	this.nameX;
	this.nameY;
	this.titleName;
}
chartLineObj.prototype.init = function(ele){
	this.chartLine = ele;
	var chartDataX = ele.getAttribute("data-chartDataX");
	var chartDataY = ele.getAttribute("data-chartDataY");
	this.nameX = ele.getAttribute("data-nameX");
	this.nameY = ele.getAttribute("data-nameY");
	this.titleName = ele.getAttribute("data-title");
	this.dataX = chartDataX.split(",");
	this.dataY = chartDataY.split(",");
	this.dataArcSize = 3;
	//console.log(this.dataX[1]);
	var max = 0;
	var min = this.dataY[0];

	for (var i = 0; i < this.dataY.length; i++) {
		max = Math.max(this.dataY[i],max);
		min = Math.min(this.dataY[i],min);
	};
	console.log(max,min);
	//创建一个画布
	var canvasChartLine = document.createElement("canvas");
	canvasChartLine.width = 400;
	canvasChartLine.height = 400;
	var canWidth = canvasChartLine.width;
	var canHeight = canvasChartLine.height;
	var as = ele.getElementsByTagName('canvas');
	if (as.length>=1) {
		as[0].remove();
	};
	ele.appendChild(canvasChartLine);
	var context = canvasChartLine.getContext("2d");
	for (var i = 0; i < this.dataX.length; i++) {
		this.dataXLength[i] = this.dataX[i].length;
	};
	drawChartLineXY(context,canWidth,canHeight,this.dataX.length,min,max,this.dataX,this.dataY,this.dataXLength,this.dataArcSize,this.nameX,this.nameY,this.titleName);
}

function drawChartLineXY(ctx,w,h,l,mi,ma,dataX,dataY,dataXLength,size,nx,ny,title){
	var originX = w/15+10;
	var originY = h/4*3;
	var yEY = h/16*3;
	var xEX = w - originX -10;
	var xUnit = (w - originX*2 - 30)/l;
	var yUnit = parseInt(200/(l+1));

	var y = parseInt(ma/l);
	var r=size;
	var titleLength = title.length;
	if(/[\u4e00-\u9fa5]/.test(title)){
		titleLength = titleLength*10; //如果标题是中文
	}else{
		titleLength = titleLength*5;//如果标题是英文
	}
	//y/yUnit = dataY/?  ?=dataY[i]*yUnit/y

	ctx.save();
	ctx.moveTo(originX,originY);
	ctx.lineTo(originX,yEY);
	ctx.lineTo(originX-4,yEY+8);
	ctx.moveTo(originX,yEY);
	ctx.lineTo(originX+4,yEY+8);
	ctx.moveTo(originX,originY);
	ctx.lineTo(xEX,originY);
	ctx.lineTo(xEX-8,originY-4);
	ctx.moveTo(xEX,originY);
	ctx.lineTo(xEX-8,originY+4);
	for (var i = 0; i < l; i++) {
		ctx.moveTo(originX+xUnit*(i+1),originY);
		ctx.lineTo(originX+xUnit*(i+1),originY-5);
		if(/[\u4e00-\u9fa5]/.test(dataX[i])){
			ctx.fillText(dataX[i],originX+xUnit*(i+1)-0.5*dataXLength[i]*12.5,originY+20);
		}//如果是中文
		else{
			ctx.fillText(dataX[i],originX+xUnit*(i+1)-0.5*dataXLength[i]*6,originY+20);
		}//如果是英文
	};
	for(var j = 0; j < l+1 ;j++){
		var textY = y*(j+1);
		ctx.moveTo(originX,originY-(j+1)*yUnit);
		ctx.lineTo(originX+5,originY-(j+1)*yUnit);
		ctx.fillText(textY,originX-20,originY-(j+1)*yUnit+4);
	}
	ctx.fillText(nx,xEX+10,originY); //x轴名称
	ctx.fillText(ny,5,yEY-10); //y轴名称
	ctx.font="18px Verdana";
	ctx.fillText(title,w/2-1.5*originX-0.5*titleLength,yEY-25);
	ctx.stroke();
	ctx.restore();
	ctx.save();

	//画点和折线
	for (var a = 0; a < l; a++) {
		ctx.moveTo(originX+xUnit*(a+1),originY-dataY[a]*yUnit/y);
		ctx.arc(originX+xUnit*(a+1),originY-dataY[a]*yUnit/y,r,Math.PI*0,Math.PI*2);
		ctx.fillText(dataY[a],originX+xUnit*(a+1)-5,originY-dataY[a]*yUnit/y-10);
	//	console.log(originX+xUnit*(a+1),originY-dataY[a]*yUnit/y);
		if(a!=l-1){
			ctx.moveTo(originX+xUnit*(a+1),originY-dataY[a]*yUnit/y);
			ctx.lineTo(originX+xUnit*(a+2),originY-dataY[a+1]*yUnit/y);
		}
	};

	ctx.stroke();
	ctx.restore();
}