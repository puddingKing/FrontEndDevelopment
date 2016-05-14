var lineAnimObj = function(){
	this.canvas;
	this.canWidth;
	this.canHeight;
	this.timer;
	this.number;
	this.unitX;
	this.ax = [];
	this.ay = [];
	this.targetY = [];
	this.colorStyle;
	this.speed;
}
lineAnimObj.prototype.init=function(ele){
	var data_width = ele.getAttribute("data-width");
	var data_height = ele.getAttribute("data-height");
	var pageWidth = document.body.clientWidth;
	this.canWidth = data_width*pageWidth;
	this.canHeight = data_height;
	this.canvas = document.createElement("canvas");
	this.canvas.width = this.canWidth;
	this.canvas.height = this.canHeight;
	this.speed = 4000;
	var context = this.canvas.getContext("2d");
	this.timer = this.speed;
	this.number = 18;
	this.colorStyle = "#708090";
	this.unitX = this.canWidth/(this.number-1);
	for (var i = 0; i < this.number; i++) {
		if(i==0){
			this.ax[i] = 0;
		}else{
			this.ax[i] = this.ax[i-1]+this.unitX;
		}
		this.ay[i] = Math.random()*this.canHeight;				
	};	
	drawLineAnimArcs(context,this.canWidth,this.canHeight,this.ax,this.ay,5,this.colorStyle);
	ele.appendChild(this.canvas);
}
lineAnimObj.prototype.anim=function(){
	this.timer = this.timer + lakeDeltatime;
	var context = this.canvas.getContext("2d");
	if(this.timer > this.speed){
		//console.log("hello",this.timer);
		this.timer %= this.speed;
		for (var i = 0; i < this.number; i++) {
			this.targetY[i] = Math.random()*this.canHeight*0.9;
		}		
	}
	for (var j = 0; j < this.number; j++) {
		if(this.targetY[j] - this.ay[j] > 0){
			//console.log("+");	
			this.ay[j] = Math.min(this.ay[j]+lakeDeltatime*0.09,this.targetY[j]);
		}
		if(this.targetY[j] - this.ay[j] < 0){
			this.ay[j] = Math.max(this.ay[j]-lakeDeltatime*0.09,this.targetY[j]);
			//console.log("-");
		}
		//console.log("-------",this.targetY[j]-this.ay[j]);	
	};
	    //this.timer %= 1000;
	drawLineAnimArcs(context,this.canWidth,this.canHeight,this.ax,this.ay,2,this.colorStyle);
}	


function drawLineAnimArcs(ctx,cw,ch,ax,ay,r,color){
	var grd=ctx.createLinearGradient(170,0,0,0);
	grd.addColorStop(0,"#6495ED");
	grd.addColorStop(1,"#BA55D3");
	ctx.clearRect(0,0,cw,ch);
	ctx.strokeStyle = grd;
	for (var i = 0; i < ax.length; i++) {
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle=grd;
		ctx.globalAlpha = 0.5;
		ctx.arc(ax[i],ay[i],r,0,Math.PI*2);
		ctx.fill();
		ctx.restore();
		ctx.save();
		// ctx.strokeStyle = grd;
		ctx.globalAlpha = 1;
		ctx.lineWidth = 3;
		ctx.lineTo(ax[i+1],ay[i+1]);
		ctx.stroke();
		ctx.restore();
	}
}