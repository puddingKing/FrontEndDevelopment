var slideViewObj = function(){
	this.counter;
	this.timer;
	this.intervaller;
	this.len;
	this.divs=[];
	this.canvasPre;
	this.roundUl;
	this.roundLi=[];
	this.update = false;
}
slideViewObj.prototype.init=function(ele){
	this.counter = 0;
	this.timer = 0;
	this.intervaller = 4000;
	this.len = 0;
	//this.pause=false;	
	this.divs=ele.getElementsByTagName("span");
	this.len=this.divs.length;

	var canvasPreGlobalAlpha = 0;
	var data_interval = ele.getAttribute("data-interval");
	if(data_interval){
		this.intervaller=data_interval;
	}
	var srcs=[];
	for (var i = 0; i < this.len; i++) {
		srcs[i]=this.divs[i].getAttribute("data-src");
		this.divs[i].style.background = "url("+srcs[i]+") no-repeat";
		if(i == 0){
			this.divs[i].style.opacity = "1";			
		}else{
			this.divs[i].style.opacity = "0";
		}
		this.divs[i].addEventListener("mouseover",function(){
			cancelAnimationFrame(lakeslideViewAnim);//鼠标移入取消/暂停动画切换效果
		});
		this.divs[i].addEventListener("mouseout",function(){
			requestAnimationFrame(lakeanimate);//鼠标移出开始执行计算动画
		});			
	};
	if(!this.update){
		this.canvasPre = document.createElement("canvas");
		this.canvasPre.width = 75;
		this.canvasPre.height = 150 ;
		//怎样改变元素位置，js?	 //可以用css解决，下面有css类名
		this.canvasPre.className = "preCanvas";
		//drawPre(this.canvasPre);
	 	
	 	this.roundUl = document.createElement("ul");
	 	this.roundUl.className = "roundList";
	 	for (var i = 0; i < this.len; i++) {
	 		this.roundLi[i]=document.createElement("li");
	 		this.roundLi[i].setAttribute("id","slideViewRoundLi"+i);
	 		this.roundUl.appendChild(this.roundLi[i]);
	 	};
	 	this.roundLi[0].style.transform = "scale(1)";
	 	var canvas = ele.getElementsByTagName('canvas');
	 	var uls = ele.getElementsByTagName('ul');
	 	if (canvas.length >= 1) {
	 		canvas[0].remove();
	 		uls[0].remove();
	 	};
	 	ele.appendChild(this.canvasPre);
	 	ele.appendChild(this.roundUl);
	}
	//设置next/pre click
	
}

slideViewObj.prototype.slide=function(){
	this.timer = lakeDeltatime + this.timer;
	    if(this.timer > this.intervaller){
			this.counter=changeView(this.counter,this.len);	
			this.divs = showView(this.counter,this.divs,this.len);
			this.timer %= this.intervaller;
	    }
	   // console.log(this.counter);
	for(var i=0;i<this.len;i++){
		if(i == this.counter){
			this.roundLi[this.counter].style.transform="scale(1)";
		}else{
			this.roundLi[i].style.transform="scale(0.6)";
		}		
	}	 	    			
}
//改变视图，通过counter
function changeView(counter,l){
	if(counter == parseInt(l) - 1){
		 counter = 0;
	}else{
		 counter = parseInt(counter) + 1;
	}
	return counter;
}
//显示视图,设置DOM
function showView(c,d,l){
	for (var i = 0; i < l; i++) {
		if(i == c){
			d[i].style.opacity = "1";
		}else{
			d[i].style.opacity = "0";
		}
	};
	return d;
}

function changePause(p){
	if(p == false){
		p = true;
	}else{
		p = false;
	}
	return p;
}

function changeViewByClick(id){
	id=id.slice(-1);
	for (var i = 0; i < lake_slide_views.length; i++) {
		lake_slide_views[i].counter=id;
		showView(lake_slide_views[i].counter,lake_slide_views[i].divs,lake_slide_views[i].len);//ex:i=slideViewRoundLi3
		console.log(lake_slide_views[i].counter);
		lake_slide_views[i].timer = 0;
	};
	
}

function drawPre(c){
	var canvasPWidth = c.width;
	var canvasPHeight = c.height;
	var canvasPContext = c.getContext("2d");
	canvasPContext.clearRect(0,0,canvasPWidth,canvasPHeight);	
	canvasPContext.save();
	canvasPContext.globalAlpha = 0.6;
	canvasPContext.lineWidth = 6;
	canvasPContext.strokeStyle = "white";
	canvasPContext.shadowBlur = 8;
	canvasPContext.shadowColor = "white";
	canvasPContext.lineCap = "round";
	canvasPContext.lineJoin = "round";
	canvasPContext.moveTo(canvasPWidth/4,canvasPHeight/4);
	canvasPContext.lineTo(canvasPWidth/4*3,canvasPHeight/2);
	canvasPContext.lineTo(canvasPWidth/4,canvasPHeight/4*3);
	canvasPContext.stroke();
	canvasPContext.restore();	
}
function drawPreHover(c){
	var canvasPWidth = c.width;
	var canvasPHeight = c.height;
	var canvasPContext = c.getContext("2d");	
	canvasPContext.clearRect(0,0,canvasPWidth,canvasPHeight);
	canvasPContext.save();
	canvasPContext.globalAlpha = 1;
	canvasPContext.lineWidth = 6;
	canvasPContext.strokeStyle = "white";
	canvasPContext.shadowBlur = 30;
	canvasPContext.shadowColor = "white";
	canvasPContext.lineCap = "round";
	canvasPContext.lineJoin = "round";
	canvasPContext.moveTo(canvasPWidth/4,canvasPHeight/4);
	canvasPContext.lineTo(canvasPWidth/4*3,canvasPHeight/2);
	canvasPContext.lineTo(canvasPWidth/4,canvasPHeight/4*3);
	canvasPContext.stroke();
	canvasPContext.restore();	
}
