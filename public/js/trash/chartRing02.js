var chartRingObj = function(){
	this.chartRound;
	this.dataArray=[];
	this.nameArray=[];
	this.canvasChartRound;
	this.canvasChartRoundContext;
	this.sAngle=[];
	this.eAngle=[];
	this.tx=[];
	this.ty=[];
	this.eAngleDu=[];
	this.lessAngleDu=[];
	this.r;
	this.lWidth;
	this.px=[];
	this.py=[];
	this.sum; 
	this.textC=[]; 
	this.phaseY=[];                                         
}
chartRingObj.prototype.init=function(ele){
	this.chartRound = ele;
	this.sum = 0;
	var data = ele.getAttribute("data-chartData");
	var na = ele.getAttribute("data-chartName");
	this.nameArray = na.split(",");
	this.dataArray=data.split(",");
	if (this.nameArray.length != this.dataArray.length) {
		alert("len false");
	}else{
		for (var i = 0; i < this.dataArray.length; i++) {
			this.sum = parseFloat(this.dataArray[i]) + this.sum;
			this.dataArray[i] = parseFloat(this.dataArray[i]);
		};
		console.log(this.sum);
		this.canvasChartRound = document.createElement("canvas");
		this.canvasChartRound.width = 400;
		this.canvasChartRound.height = 400;
		this.lWidth = 40;
		var canWidth=this.canvasChartRound.width;
		var canHeight=this.canvasChartRound.height;
		this.canvasChartRoundContext = this.canvasChartRound.getContext("2d");

		var x=parseInt(canWidth/2)+30;
		var y=parseInt(canHeight/2);
	
		this.r=canWidth*(2/9);
		var color = ["#FF7256","#B9D3EE","#6495ED","#8968CD","#EE9A00","#EE9572","#F08080","#388E8E","#68228B","#BC8F8F"];
		this.canvasChartRoundContext.save();
    	for (var i = 0; i < this.dataArray.length; i++) {
			if (i == 0) {
				this.sAngle[i] = 0;
				this.eAngle[i] = 2*Math.PI*(this.dataArray[i]/this.sum);
			}else{
				this.sAngle[i] = this.eAngle[parseInt(i-1)];
				this.eAngle[i] = this.sAngle[i] + 2*Math.PI*(this.dataArray[i]/this.sum);
			}
			this.eAngleDu[i] = (((this.eAngle[i]-this.sAngle[i])/2+this.sAngle[i])/Math.PI)*180;
			this.lessAngleDu[i] = changeEToLess(this.eAngleDu[i]);	
			//drawChartRoundPart(x,y,r,this.sAngle[1],this.eAngle[1],color[1],this.canvasChartRoundContext);
			//console.log(this.lessAngleDu[i]);
			if(this.lessAngleDu[i] == 90){
				this.tx[i] = 0;
				this.ty[i] = this.r+this.lWidth+5;
			}else{
				this.tx[i] = (Math.cos(this.lessAngleDu[i]/180*Math.PI))*(this.r+this.lWidth+5);
				this.ty[i] = (Math.sin(this.lessAngleDu[i]/180*Math.PI))*(this.r+this.lWidth+5);
			}
			//console.log("tx,ty"+this.tx[i],this.ty[i]);//是否需要再设一个180的情况？
			if (this.eAngleDu[i]>0 && this.eAngleDu[i]<=90) {
				this.px[i] = x + this.tx[i];
				this.py[i] = y + this.ty[i];			
			}else if (this.eAngleDu[i]>90 && this.eAngleDu[i]<=180) {
				this.px[i] = x - this.tx[i] - 24;
				this.py[i] = parseFloat(y) + parseFloat(this.ty[i]);
			}else if (this.eAngleDu[i]>180 && this.eAngleDu[i]<=270) {
				this.px[i] = x - this.tx[i] - 24;
				this.py[i] = y - this.ty[i];
			}else{
				this.px[i] = x + this.tx[i];
				this.py[i] = y - this.ty[i];
			};
			this.textC[i] = (parseFloat(this.dataArray[i]/this.sum) * 100).toFixed(2);//保留小数点后2位
			//console.log("px,py"+this.px[i],this.py[i]);
			if(i == 0){
				this.phaseY[i] = 25;
			}else{
				this.phaseY[i] = parseInt(25 + i*(20 + 12.5));
			}

			drawChartRoundPart(x,y,this.r,this.sAngle[i],this.eAngle[i],color[i],this.canvasChartRoundContext,this.lWidth,this.px[i],this.py[i],this.textC[i]);
			//drawChartPiePhase(this.nameArray[i],color[i],this.canvasChartRoundContext,canWidth,canHeight,this.phaseY[i]);
		}
		//drawChartRoundPart(x,y,r,this.sAngle[1],this.eAngle[1],color[1],this.canvasChartRoundContext);
		ele.appendChild(this.canvasChartRound);
		this.canvasChartRoundContext.restore();
	}	
}

function drawChartRoundPart(x,y,r,startAngle,endAngle,color,cancontext,lw,px,py,text){
	cancontext.lineWidth = lw;
	cancontext.strokeStyle = color;
	cancontext.beginPath();
	cancontext.arc(x,y,r,startAngle,endAngle);
	//cancontext.fillStyle = "white";
	cancontext.fillText(text+"%",px,py);
	cancontext.stroke();	
}
function drawChartPiePhase(na,color,ctx,cw,ch,py){
	ctx.save();
	ctx.fillStyle = color;
	ctx.fillRect(0,py,20,20);
	ctx.fillStyle = "black";
	ctx.fillText(na,25,py+15);
	ctx.restore();
}
function changeEToLess(e){
	var less;
	if (e>=0 && e<=90) {
		less = e;
	}else if(e>90&&e<=180){
		less = 180 - e;
	}else if(e>180&&e<=270){
		less = e - 180;
	}else{
		less = 360 - e;
	}
	return less;
}