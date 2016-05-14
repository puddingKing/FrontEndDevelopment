var lakeLasttime;
var lakeDeltatime;
//动画效果
var lakelastTime = 0;

var lake_slide_views=[];//需要应用动画的全局变量 
var lakeslideViewAnim;

var lake_navs=[];

var lake_chartPies=[];
var lake_chartRings=[];
var lake_chartHistograms=[];
var lake_chartSins = [];

var lake_lineAnims=[];
var lake_colorBgs = [];
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
if ( !requestAnimationFrame || !cancelAnimationFrame ) {
    requestAnimationFrame = function( callback, element ) {
      var currTime = new Date().getTime();
      //为了使setTimteout的尽可能的接近每秒60帧的效果
      var timeToCall = Math.max( 0, 16 - ( currTime - lakelastTime ) ); 
      var id = window.setTimeout( callback, timeToCall );
      lakelastTime = currTime + timeToCall;
      return id;
    };   
    cancelAnimationFrame = function( id ) {
      window.clearTimeout( id );
    };
}

function lakeanimate(){	
	var now = Date.now();
	lakeDeltatime = now - lakeLasttime;
	lakeLasttime = now;
	for(var i=0;i<lake_slide_views.length;i++){
		lake_slide_views[i].slide();//滑动视图函数			
	}
	for (var i = 0; i < lake_navs.length; i++) {
		lake_navs[i].adapt();
	}
	for (var i = 0; i < lake_chartPies.length; i++) {
		//lake_chartPies[i].init();
		lake_chartPies[i].draw();
	}
	for (var i = 0; i < lake_chartRings.length; i++) {
		lake_chartRings[i].draw();
	};
	for (var i = 0; i < lake_lineAnims.length; i++) {
		lake_lineAnims[i].anim();
	};
	for(var i = 0; i < lake_chartHistograms.length; i++){
		lake_chartHistograms[i].draw();
	};
	for (var i = 0; i < lake_chartSins.length; i++) {
		lake_chartSins[i].draw();
	};
	lakeslideViewAnim=requestAnimationFrame(lakeanimate);
}

function loadScript(url,callback){
	var script = document.createElement("script");
	script.type = "text/javascript";
	if(script.readyState){//IE
		script.onreadystatechange = function(){
			if(script.readyState == "loaded" || script.readyState == "complete"){
				script.onreadystatechange = null;
				callback();
			}
		}
	}else{
		script.onload = function(){
			callback();
		}
	}
	script.src = url;
	console.log("url:"+url);
	var scripts = document.getElementsByTagName("head")[0].getElementsByTagName("script");
	for (var i = 0; i < scripts.length; i++) {
		console.log("script.src:"+scripts[i].src);
		if(scripts[i].src == 'http://localhost:3000'+url){
			console.log("存在相同sr");
			scripts[i].remove();
		}
	};
	document.getElementsByTagName("head")[0].appendChild(script);
}//添加src="url"的<script>标签并load

window.onload=function(){
	lakeLasttime = Date.now();
	uiResizablePanelLoad();
	colorButtonLoad();
	slideViewLoad();
	navLoad();
	chartLoad();
	chartSinLoad();
	chartHistogramsLoad();
	chartRingsLoad();
	chartPiesLoad();
	chartLinesLoad();
	scaleLargeLoad();
	sideBarLoad();
	lineAnimLoad();
	addLoad();
	lakeanimate();//load slideView的动画
}	

function colorBgLoad(){
	var colorBgs = document.getElementsByClassName("lakeColorBg");
	if(colorBgs.length!=0){
		loadScript("/js/colorBg.js",function(){
			lake_colorBgs = [];
			for (var i = 0; i < colorBgs.length; i++) {
				lake_colorBgs[i] = new colorBgObj();
				lake_colorBgs[i].init(colorBgs[i]);
				lake_colorBgs[i].draw();
			};
		})
	}
}
function addLoad(){
	var adds = document.getElementsByClassName("lakeAdd");
	if(adds.length!=0){
		loadScript("/js/add.js",function(){
			var lake_adds = [];
			for (var i = 0; i < adds.length; i++) {
				lake_adds[i] = new addObj();
				lake_adds[i].init(adds[i]);
			};
		});
	}
}
function lineAnimLoad(){
	var lineAnims = document.getElementsByClassName("lakeLineAnim");
	if(lineAnims.length!=0){
		loadScript("/js/lineAnim.js",function(){
			for (var i = 0; i < lineAnims.length; i++) {
				lake_lineAnims[i] = new lineAnimObj();
				lake_lineAnims[i].init(lineAnims[i]);
			//	lake_lineAnims[i].anim();
			};
		})
	}
}

function chartLoad(){
	loadScript("/js/charts/chartCoordinate.js",function(){});
	loadScript("/js/charts/chartRect.js",function(){});
}
function chartSinLoad(){
	var chartSins = document.getElementsByClassName("lakeChartSin");
	if (chartSins.length!=0) {
		loadScript("/js/charts/chartSin.js",function(){
			lake_chartSins = [];
			for (var i = 0; i < chartSins.length; i++) {
				lake_chartSins[i] = new chartSinObj();
				lake_chartSins[i].init(chartSins[i]);
				lake_chartSins[i].draw();
			};
		});
	};
}
	
function chartHistogramsLoad(){
	var chartHistograms = document.getElementsByClassName("lakeChartHistogram");
	if(chartHistograms.length!=0){
		loadScript("/js/charts/chartHistogram.js",function(){
			for (var i = 0; i < chartHistograms.length; i++) {
				lake_chartHistograms[i] = new chartHistogramObj();
				lake_chartHistograms[i].init(chartHistograms[i]);
				//lake_chartHistograms[i].draw();
			};
		});
	}
}
	
function chartRingsLoad(){
	var chartRings = document.getElementsByClassName("lakeChartRing");
	if (chartRings.length!=0) {
		loadScript("/js/charts/chartRing.js",function(){
			loadScript("/js/charts/chartRingPart.js",function(){
			    lake_chartRings = [];
				for (var i = 0; i < chartRings.length; i++) {
					lake_chartRings[i] = new chartRingObj();
					lake_chartRings[i].init(chartRings[i]);
					lake_chartRings[i].draw();
				};
			})
		})
	}//判断环形，导入chartRing.js
}
	
function chartPiesLoad(){
	var chartPies = document.getElementsByClassName("lakeChartPie");
	if (chartPies.length!=0) {
		loadScript("/js/charts/chartPie.js",function(){
			loadScript("/js/charts/chartPiePart.js",function(){
				lake_chartPies = [];
				for (var i = 0; i < chartPies.length; i++) {
					lake_chartPies[i] = new chartPieObj();
					lake_chartPies[i].init(chartPies[i]);
					lake_chartPies[i].draw();
				};
			})
		});
	}//判断扇形，导入chartPie.js
}
	
function chartLinesLoad(){
	var chartLines = document.getElementsByClassName("lakeChartLine");
	if (chartLines.length!=0) {
		loadScript("/js/charts/chartLine.js",function(){
			var lake_chartLines = [];
			for (var i = 0; i < chartLines.length; i++) {
				lake_chartLines[i] = new chartLineObj();
				lake_chartLines[i].init(chartLines[i]);
			};
		})
	};//判断折线图,导入chartLine.js
}
function sideBarLoad(){
	var sideBars = document.getElementsByClassName("lakeSideBar");
	if(sideBars.length!=0){
		loadScript("/js/sideBar.js",function(){
			var lake_sideBars = [];
			for (var i = 0; i < sideBars.length; i++) {
				lake_sideBars[i] = new sideBarObj();
				lake_sideBars[i].init(sideBars[i]);
			};
		})
	}
}

function navLoad(){
	var navs = document.getElementsByClassName("lakeNav");
	if (navs.length!=0) {
		loadScript("/js/nav.js",function(){
			for (var i = 0; i < navs.length; i++) {
				lake_navs[i]=new navObj();
				lake_navs[i].init(navs[i]);
			};
		})
	}; 
}
//判断页面中是否存在id为uiResizablePanel的元素，如果有init
function uiResizablePanelLoad(){
	var uiResizablePanel=document.getElementById("uiResizablePanel");
	if(uiResizablePanel){
		loadScript("/js/resizablePanel.js",function(){
			var resizablePanel=new resizablePanelObj();
			resizablePanel.init();
		});	
	}
}
//判断页面是否存在className为"colorButton"的元素，如果有,init()，支持多个同时存在
function colorButtonLoad(){
	var colorButtons=document.getElementsByClassName("lakeColorButton");
	var len=colorButtons.length;
	if(len!=0){
		loadScript("/js/colorButton.js",function(){
			var buttons=[];
			for(var i=0;i<len;i++){
				buttons[i]=new colorButtonObj();
				buttons[i].init(colorButtons[i]);
			}
		});
	}
}
function scaleLargeLoad(){
	var scaleLarges = document.getElementsByClassName("lakeScaleLarge");
	var len = scaleLarges.length;
	if(len!=0){
		loadScript("/js/scaleLarge.js",function(){
			var lake_scaleLarges = [];
			for (var i = 0; i < scaleLarges.length; i++) {
				lake_scaleLarges[i]=new scaleLargeObj();
				lake_scaleLarges[i].init(scaleLarges[i]);
			};
		})
	}
}
//loadScript("js/slideView.js",function(){});
function slideViewLoad(){
	var slideViews=document.getElementsByClassName("lakeSlideView");
	var len=slideViews.length;
	if (len!=0) {
		loadScript("/js/slideView.js",function(){	    		
			for (var i=0;i<len;i++) {
				lake_slide_views[i]=new slideViewObj();
				lake_slide_views[i].init(slideViews[i]);
				lake_slide_views[i].canvasPre.addEventListener("click",function(){
					for(var i=0;i<lake_slide_views.length;i++){
						lake_slide_views[i].counter = changeView(lake_slide_views[i].counter,lake_slide_views[i].len);
						showView(lake_slide_views[i].counter,lake_slide_views[i].divs,lake_slide_views[i].len);
						lake_slide_views[i].timer = 0;
					}					
				})
				lake_slide_views[i].canvasPre.addEventListener("mouseover",function(){
					for(var i=0;i<lake_slide_views.length;i++){
						drawPreHover(lake_slide_views[i].canvasPre);
					}
				})
				lake_slide_views[i].canvasPre.addEventListener("mouseout",function(){
					for(var i=0;i<lake_slide_views.length;i++){
						drawPre(lake_slide_views[i].canvasPre);
					}
				})
				for (var j = 0; j < lake_slide_views[i].roundLi.length; j++) {
					lake_slide_views[i].roundLi[j].addEventListener("mousedown",function(){
						for(var i=0;i<lake_slide_views.length;i++){
							for (var a = 0; a < lake_slide_views[i].roundLi.length; a++) {
								lake_slide_views[i].roundLi[a].onclick = function(){
									changeViewByClick(this.id);
								}
							}
						}	
					})
				}	
			}//for()
		});//loadScript
	}//if(len!=0)
}//slideViewLoad


		
