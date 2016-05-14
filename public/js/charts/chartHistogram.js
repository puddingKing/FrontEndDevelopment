//这是一个柱状图
var chartHistogramObj = function() {
	this.data = [];
	this.dataX=[];
	this.dataY=[];
	this.canWidth;
	this.canHeight;
	this.canvas;
	this.coordinate;
	this.scale;
	this.colors;
	this.timer;
	this.dYA;
}
chartHistogramObj.prototype.init = function(ele){
	ele.innerHtml = "";
	var dXS = ele.getAttribute('data-chartDataX');
	var dYS = ele.getAttribute('data-chartDataY');
	var dXA = dXS.split(',');
	this.dYA = dYS.split(',');
	for (var a = 0; a < dXA.length; a++) {
		var dataEle = {
			"unit": dXA[a],
			"data": this.dYA[a]
		};
		this.data.push(dataEle);
	};
	var obj = [];
	for (var i = 0; i < this.data.length; i++) {
		obj[i] = this.data[i];
		this.dataX[i] = obj[i].unit;
		if(obj[i].data == null) {
			obj[i].data = obj[i-1].data;
		}
		this.dataY[i] = obj[i].data.split(' ');
		console.log(obj[i].data.split(' ')[0]);
	};
	var canWidth = ele.getAttribute("data-width");
	var canHeight = ele.getAttribute("data-height");
	this.canWidth = canWidth;
	this.canHeight = canHeight;
	this.scale = 0;
	this.colors = ["#FF7256","#B9D3EE","#6495ED","#8968CD","#EEE685","#EE9572","#F08080","#388E8E","#68228B","#BC8F8F"];
	var canvas = document.createElement("canvas");
	this.canvas = canvas;
	canvas.width = this.canWidth;
	canvas.height = this.canHeight;
	var as = ele.getElementsByTagName('canvas');
	if (as.length>=1) {
		as[0].remove();
	};
	ele.appendChild(canvas);

	this.coordinate = new chartCoordinateObj();
	this.coordinate.canvas = canvas;
	this.coordinate.dataX = this.dataX;
	this.coordinate.dataY = this.dataY;
	this.coordinate.init();  //初始化一个坐标轴
}

chartHistogramObj.prototype.draw = function(){	
	this.scale = Math.min(this.scale + 0.04,1);
	var dataQuantity = this.dataY[0].length;
	var rectsWidth = this.coordinate.unitPxX - 10;
	var rectWidth = rectsWidth/dataQuantity;//每个柱子的宽度
	var max = histogramDataMax(this.dataY);//求dataY中的最大数值
	var frag = max/(this.coordinate.yWidth)//一个像素代表多大的值;
	var rectHeight = [];
	rectHeight = histogramRectHeight(this.dataY,frag); //每个柱子的高du
	var rectX = [];
	rectX = histogramRectX(rectWidth,this.coordinate.lineX,this.dataY);	//每个柱子矩形的x坐标
	var canvas = this.canvas;
	var context = canvas.getContext("2d");
	var originY = this.coordinate.originY;
	var chartRects = [];
	var colors = this.colors;
	context.clearRect(0,0,this.canWidth,this.canHeight);

	this.coordinate = new chartCoordinateObj();
	this.coordinate.canvas = canvas;
	this.coordinate.dataX = this.dataX;
	this.coordinate.dataY = this.dataY;
	this.coordinate.init();  //初始化一个坐标轴

	for (var i = 0; i < this.dataY.length; i++) {
		chartRects[i] = [];
		for (var j = 0; j < this.dataY[i].length; j++) {
			//draw(context,rectX[i][j],rectHeight[i][j],originY,rectWidth,rectHeight[i][j],this.dataY[i][j],this.colors[j]);
			chartRects[i][j] = new chartRectObj();
			chartRects[i][j].x = rectX[i][j];
			chartRects[i][j].y = originY - rectHeight[i][j];
			chartRects[i][j].canvas = canvas;
			chartRects[i][j].width = rectWidth;
			chartRects[i][j].height = rectHeight[i][j]*this.scale;
			chartRects[i][j].fillColor = colors[j];
			chartRects[i][j].data = this.dataY[i][j];
			chartRects[i][j].init();
			// drawDate(canvas,this.dataY[i][j],rectX[i][j],originY - rectHeight[i][j]);

		};
	};
}
function histogramRectX(rw,lx,dy){
	var a = dy.length; //6
	var b = dy[0].length; //2
	var rectx = [];
	for (var i = 0; i < a; i++) {
		rectx[i] = [];
		for (var j = 0; j < b; j++) {
			rectx[i][j] = lx[i] - 5 - rw*(b-j);
		};
	};
	return rectx;
}

function histogramDataMax(array){
	var a = array.length;
	var b = array[0].length;
	var max = 0;
	for (var i = 0; i < a; i++) {
		for (var j = 0; j < b; j++) {
			max = Math.max(array[i][j],max);
		};	
	};
	return max;
}
function histogramRectHeight(array,f){
	var a = array.length;
	var b = array[0].length;
	var heights = [];
	for (var i = 0; i < a; i++) {
		heights[i] = [];
		for (var j = 0; j < b; j++) {
			heights[i][j] = array[i][j]/f;
		};	
	};
	return heights;
}