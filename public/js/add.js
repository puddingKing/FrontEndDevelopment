var addObj = function(){
	this.originWidth;
	this.originHeight;
}
addObj.prototype.init = function(ele){
	var canvas = document.createElement("canvas");
	canvas.width = 40;
	canvas.height = 40;
	var canWidth = canvas.width;
	var canHeight = canvas.height;
	ele.appendChild(canvas);
	ele.style.left = "880px";
	ele.style.top = "130px";
	ele.style.height = "80px";
	ele.style.width = "80px";
	ele.style.lineHeight = "105px";
	var context = canvas.getContext("2d");
	context.save();
	context.lineWidth = 2;
	context.strokeStyle = "#fff";
	context.moveTo(canWidth/4,canHeight/2);
	context.lineTo(canWidth/4*3,canHeight/2);
	context.moveTo(canWidth/2,canHeight/4);
	context.lineTo(canWidth/2,canHeight/4*3);
	context.stroke();
	ele.addEventListener("mousedown",function(){
		if(this.style.left == "880px"){
			this.style.borderRadius = "50%";
			this.style.left = "980px";
			this.style.top = "30px";
			this.style.height = "40px";
			this.style.width = "40px";
			this.style.lineHeight = "55px";
			this.style.transform = "rotate(135deg)";
			this.style.border = "2px solid #fff";
			this.style.transition  = "all 0.6s";
			addMouseDownAPI();
		}else{
			this.style.borderRadius = 5+"px";
			this.style.left = "880px";
			this.style.top = "130px";
			this.style.height = "80px";
			this.style.width = "80px";
			this.style.lineHeight = "105px";
			this.style.transform = "rotate(0deg)";
			this.style.border = "2px dashed #fff";
			this.style.transition  = "all 0.6s 1s";
			addMouseDownBackAPI();
		}
	})
}

function addMouseDownAPI(){
	var top = document.getElementById("top");
	var topMore = document.getElementById("topMore");
	top.style.height = "100%";
	topMore.style.transform = "scale(0.001)";
}
function addMouseDownBackAPI(){
	var top = document.getElementById("top");
	top.style.height = "320px";
	topMore.style.transform = "scale(1)";

}