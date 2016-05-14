var chartPiePartObj = function(){
	this.ax;
	this.ay;
	this.r;
	this.context;
	this.sAngle;
	this.eAngle;
  this.fillColor;
  this.data;
}
chartPiePartObj.prototype.draw=function(){
	var context = this.context;
	var x = this.ax;
	var y = this.ay;
	var r = this.r;
	var sAngle = this.sAngle;
	var eAngle = this.eAngle;
  var fillColor = this.fillColor;
  var data = this.data;
	Shan(x,y,r,sAngle,eAngle,context,fillColor,data);
}

function Shan(x, y, radius, sDeg, eDeg, ctx , fillColor,data) {
  // 初始保存
  var midDeg = sDeg + (eDeg-sDeg)/2;
  ctx.save();
  // 位移到目标点
  ctx.translate(x, y);

  ctx.beginPath();
  // 画出圆弧
  ctx.arc(0,0,radius,sDeg, eDeg);
  // 再次保存以备旋转
  ctx.save();

  // 旋转至起始角度
  ctx.rotate(eDeg);
  // 移动到终点，准备连接终点与圆心
  ctx.moveTo(radius,0);
  // 连接到圆心
  ctx.lineTo(0,0);
  // 还原
  ctx.restore();
  
  // 旋转至起点角度
  ctx.rotate(sDeg);
  // 从圆心连接到起点
  ctx.lineTo(radius,0);
  ctx.closePath();
  // 还原到最初保存的状态
  ctx.restore();

  ctx.fillStyle = fillColor;
  ctx.fill();

  ctx.save();
  ctx.font="16px Arial";
  ctx.fillStyle = '#000';
  ctx.translate(x, y);
  ctx.rotate(midDeg);
  ctx.fillText(data,radius+10,0);
  ctx.restore();
  
 }