var scaleLargeObj=function(){
	//this.image;
}
scaleLargeObj.prototype.init=function(ele){
	var data_image = ele.getAttribute("data-image");
	var canvasScaleLarge = document.createElement("canvas");
	var canvasScaleShow = document.createElement("canvas");
	canvasScaleLarge.className = "lakeScaleMirror";
	canvasScaleLarge.style.display = 'none';
	ele.appendChild(canvasScaleShow);
	ele.appendChild(canvasScaleLarge);
	var canvasScaleShowContext = canvasScaleShow.getContext("2d");
	var canvasScaleLargeContext = canvasScaleLarge.getContext("2d");
	var image = new Image();
	console.log(data_image);
	image.src = data_image;

	image.onload = function(){
		var imageWidth = image.width;
		var imageHeight = image.height;
		var wBH = imageWidth/imageHeight;
		var canShowWidth = 400;
		var canShowHeight = canShowWidth/wBH;
		canvasScaleShow.width = canShowWidth;
		canvasScaleShow.height = canShowHeight;
		canvasScaleLarge.width = 250;
		canvasScaleLarge.height = 250;
		var canLargeWidth = canvasScaleLarge.width;
		var canLargeHeight = canvasScaleLarge.height;

		drawScaleShow(canvasScaleShowContext,image,canShowWidth,canShowHeight);
		canvasScaleShow.addEventListener("mousemove",function(e){
			this.parentNode.getElementsByClassName('lakeScaleMirror')[0].style.display = 'block';
			var mouseX = e.offsetX;
			var mouseY = e.offsetY;
			//mouseX/canShowWidth = ?/image.width
			var originX = (mouseX)/canShowWidth * image.width;
			var originY = (mouseY)/canShowHeight * image.height;
			drawScaleLarge(canvasScaleLargeContext,image,canLargeWidth,canLargeHeight,originX,originY);
		})
		canvasScaleShow.addEventListener("mouseout",function(){
			this.parentNode.getElementsByClassName('lakeScaleMirror')[0].style.display = 'none';
			clearScaleLarge(canvasScaleLargeContext,canLargeWidth,canLargeHeight);
		})		
	}
}

function drawScaleShow(ctx,image,cw,ch){
	ctx.save();
	ctx.drawImage(image,0,0,cw,ch);
	ctx.restore();
}
function drawScaleLarge(ctx,image,cw,ch,ox,oy){
	ctx.clearRect(0,0,cw,ch);
	ctx.save();
	ctx.drawImage(image,ox-100,oy-100,200,200,0,0,cw,ch);
	ctx.restore();
}
function clearScaleLarge(ctx,cw,ch){
	ctx.clearRect(0,0,cw,ch);
}