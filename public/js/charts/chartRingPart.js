var chartRingPartObj = function(){
	this.ax;
	this.ay;
	this.r;
	this.context;
	this.sAngle;
	this.eAngle;
  this.fillColor;
  this.lineWidth;
  this.data;
}
chartRingPartObj.prototype.draw=function(){
	var context = this.context;
	var x = this.ax;
	var y = this.ay;
	var r = this.r;
	var sAngle = this.sAngle;
	var eAngle = this.eAngle;
  var fillColor = this.fillColor;
  var lineWidth = this.lineWidth;
  var data = this.data;
	RingPart(x,y,r,sAngle,eAngle,context,fillColor,lineWidth,data);
}

function RingPart(x,y,radius,sDeg,eDeg,ctx,fillColor,lw,data) {
    var midDeg = sDeg + (eDeg-sDeg)/2;
    ctx.save();
    ctx.lineWidth = lw;
    ctx.strokeStyle = fillColor;
    ctx.beginPath();
    ctx.arc(x,y,radius,sDeg,eDeg);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.font="16px Arial";
    ctx.fillStyle = '#000';
    ctx.translate(x, y);
    ctx.rotate(midDeg);
    ctx.fillText(data,radius+30,0);
    ctx.restore();
 }
 /*cancontext.lineWidth = lw;
  cancontext.strokeStyle = color;
  cancontext.beginPath();
  cancontext.arc(x,y,r,startAngle,endAngle);
  //cancontext.fillStyle = "white";
  cancontext.fillText(text+"%",px,py);
  cancontext.stroke();*/