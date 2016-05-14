var sideBarObj = function(){

}
sideBarObj.prototype.init = function(ele){
	//#363d47 item 40px 250px
	var data_width = ele.getAttribute("data-width");
	var pageWidth = document.body.clientWidth;
	var sideBarWidth = data_width*pageWidth
	ele.style.width = sideBarWidth + "px";
	var sideBarItems = ele.getElementsByClassName("lakeSideBarItem");
	var canvasActive = document.createElement("canvas");
	canvasActive.width = sideBarWidth + 12.5;
	canvasActive.height = 40;
	var canWidth = canvasActive.width;
	var canHeight = canvasActive.height;
	canvasActive.className = "lakeCanvasActive";
	ele.appendChild(canvasActive);
	var canvasActiveContext = canvasActive.getContext("2d");
	drawRectArrow(canvasActiveContext,canWidth,canHeight);
	for (var i = 0; i < sideBarItems.length; i++) {
		sideBarItems[i].addEventListener("mousedown",function(){
			canvasActive.style.top = this.offsetTop + "px";
		});
	};
}
function drawRectArrow(ctx,cw,ch){
	ctx.save();
	ctx.fillStyle = "#363d47";
	ctx.rect(0,0,cw-12.5,ch);
	ctx.fill();
	ctx.beginPath();
	ctx.moveTo(cw-12.5,0);
	ctx.lineTo(cw,ch/2);
	ctx.lineTo(cw-12.5,ch);
	ctx.closePath();
	ctx.fill();
}