var navObj=function(){
	this.len;
	this.nav;
	this.nav_items=[];
	this.canvasItems;
	this.canvasItemsMask;
}
navObj.prototype.init=function(ele){
	var dbWidth=document.body.clientWidth;
	this.nav_items=ele.getElementsByTagName("span");
	this.len = this.nav_items.length;
	this.nav = ele;
	this.canvasItemsMask = 0;
	var canvasItems = document.createElement("canvas");
	this.canvasItems=canvasItems;
	canvasItems.className = "lakeItems";
	canvasItems.width = 50;
	canvasItems.height = 50;
	canvasItems.style.zIndex = 5;
	var canvasWidth = canvasItems.width;
	var canvasHeight = canvasItems.height;
	//canvasItems.setAttribute("id","canvas_items");
	var canvasItemsContext=canvasItems.getContext("2d");
	canvasItemsContext.save();
	canvasItemsContext.clearRect(0,0,canvasWidth,canvasHeight);
	canvasItemsContext.lineWidth = 4;
	canvasItemsContext.strokeStyle = "white";
	canvasItemsContext.lineCap = "round";
	canvasItemsContext.globalAlpha = 0.8;

	canvasItemsContext.moveTo(canvasWidth/4,canvasHeight/4);
	canvasItemsContext.lineTo(canvasWidth/4*0.5*3,canvasHeight/4);
	canvasItemsContext.moveTo(parseInt(canvasWidth/2),canvasHeight/4);
	canvasItemsContext.lineTo(canvasWidth/4*3.5,canvasHeight/4);

	canvasItemsContext.moveTo(canvasWidth/4,canvasHeight/4*2);
	canvasItemsContext.lineTo(canvasWidth/4*0.5*3,canvasHeight/4*2);
	canvasItemsContext.moveTo(parseInt(canvasWidth/2),canvasHeight/4*2);
	canvasItemsContext.lineTo(canvasWidth/4*3.5,canvasHeight/4*2);

	canvasItemsContext.moveTo(canvasWidth/4,canvasHeight/4*3);
	canvasItemsContext.lineTo(canvasWidth/4*0.5*3,canvasHeight/4*3);
	canvasItemsContext.moveTo(parseInt(canvasWidth/2),canvasHeight/4*3);
	canvasItemsContext.lineTo(canvasWidth/4*3.5,canvasHeight/4*3);

	canvasItemsContext.stroke();
	canvasItemsContext.restore();

	document.body.appendChild(canvasItems);
	canvasItems.addEventListener("mousedown",function(){
		if (lake_navs[0].canvasItemsMask == 0) {
			lake_navs[0].nav.style.transform = "scale(1)";
		    for (var i = 0; i < lake_navs[0].nav_items.length; i++) {
				lake_navs[0].nav_items[i].style.padding = "0px";
			};	
			lake_navs[0].canvasItemsMask = 1;
		}else{
			lake_navs[0].nav.style.transform = "scale(0.001)";
			lake_navs[0].canvasItemsMask = 0;
		};	
	})	
}
navObj.prototype.adapt=function(){
	if (parseInt(document.body.clientWidth) > 600) {
		this.canvasItems.style.display = "none";
		var dbWidth=document.body.clientWidth;
		var nav_items_paddingLeft = dbWidth/this.len * 0.2;
		for (var i = 0; i < this.nav_items.length; i++) {
			this.nav_items[i].style.paddingLeft = nav_items_paddingLeft/2+"px";
			this.nav_items[i].style.paddingRight = nav_items_paddingLeft/2+"px";
		}
		lake_navs[0].nav.style.transform = "scale(1)";
	}else{
		this.canvasItems.style.display = "block";
		this.nav.style.paddingLeft = "0px";
		for (var i = 0; i < this.nav_items.length; i++) {
			this.nav_items[i].style.paddingLeft = 0+"px";
			this.nav_items[i].style.paddingRight = 0+"px";
		}
	};
}