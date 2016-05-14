var chartRingObj = function(){
	this.chartRingParts = [];
	this.canWidth;
	this.canHeight;
	this.canvas;
	this.colors = []; //暂时是10个数据,可以修改
	this.r;
	this.datas = [];
	this.scale;
	this.timer;
	this.flag;
	this.speed;
}
chartRingObj.prototype.init = function(ele) {
	//console.log("chartPieObjinit--");
	var canWidth = ele.getAttribute("data-width");
	var canHeight = ele.getAttribute("data-height");
	this.canvas = document.createElement("canvas");
	this.canWidth = canWidth;
	this.canHeight = canHeight;
	this.r = canWidth/4;
	this.colors = ["#FF7256","#B9D3EE","#6495ED","#8968CD","#EEE685","#EE9572","#F08080","#388E8E","#68228B","#BC8F8F"];
	this.datas = ele.getAttribute("data-chartData").split(",");
	this.scale = 0;
	this.timer = 0;
	this.flag = 0;
	this.speed = 50;


	this.canvas.width = this.canWidth;
	this.canvas.height = this.canHeight;	
	//console.log("sum",sum);
	var as = ele.getElementsByTagName('canvas');
	if (as.length>=1) {
		as[0].remove();
	};
	ele.appendChild(this.canvas);//将画布放入网页中


}
chartRingObj.prototype.draw=function(){
	var canvas = this.canvas;
	var context = canvas.getContext("2d");
	var length = this.datas.length;
	var sAngle = [];
	var eAngle = [];
	var sum = datasSum(this.datas);
	this.timer = this.timer + lakeDeltatime;
	if(this.timer > this.speed){
		//console.log(this.timer);
		this.timer %= this.speed;
		this.scale = Math.min(this.scale + 0.06,1);
	}
	var scale = this.scale;
	context.clearRect(0,0,this.canWidth,this.canHeight);
	for(var i=0 ; i<length ; i++){
		if(i == 0){
			sAngle[i] = 0;
			eAngle[i] = (this.datas[i]/sum)*Math.PI*2*scale;
		}else{
			sAngle[i] = eAngle[i-1];
			eAngle[i] = sAngle[i] + (this.datas[i]/sum)*Math.PI*2*scale;
		}//设置每一个扇形的起始和结束的度数，such as : Math.PI
		this.chartRingParts[i] = new chartRingPartObj();
		this.chartRingParts[i].context = context;
		this.chartRingParts[i].ax = this.canWidth/2;
		this.chartRingParts[i].ay = this.canHeight/2;
		this.chartRingParts[i].r = this.r;
		this.chartRingParts[i].sAngle = sAngle[i];
		this.chartRingParts[i].eAngle = eAngle[i];
		this.chartRingParts[i].fillColor = this.colors[i];
		this.chartRingParts[i].lineWidth = 50;
		this.chartRingParts[i].data = this.datas[i];
		this.chartRingParts[i].draw();
	}//绘制每个部分的扇形
}

function datasSum(array){
	var l = array.length;
	var sum = 0;
	for(var j = 0;j < l;j++){
		sum = sum + parseFloat(array[j]);
	}
	return sum;
}