$(function(){
	var toolContent = document.getElementById('toolContent');
 	var imageShowClose = document.getElementById('imageShowClose');
 	var imageShowContent = document.getElementById('imageShowContent');
 	var imageShow = document.getElementById('imageShow');
	var mask = document.getElementById('mask');
	var upload = document.getElementById('upload');
	var fileInput = document.getElementById('fileInput');
	var deside = document.getElementById('deside');
	var changeIndex = document.getElementById('changeIndex');
	var upperUI = document.getElementById('upperUI');
	var lowerUI = document.getElementById('lowerUI');
	var toolwidth =document.getElementById('tool').clientWidth;
	var tool = $('#tool');
	var page = $('#page');
	var divnum = 0;
	var scalenum = 0;
	var m_panel,m_ctrl,m_type;
	var moving = 0,m_start_x = 0,m_start_y = 0,m_to_x = 0,m_to_y = 0;
	var start_x,start_y;
	var navToolActive = false;
	var navExist = false;
	var divActive = page;
	var dragdiv;
	var desideImg;

	var data = document.getElementById("data");
	var p = data.getElementsByTagName("p")[0];
	var pHtml;
	var divData = [];
	pHtml = p.innerHTML;
	if(pHtml.length > 0){
		console.log('有值');
		$('#save').css('display','block');
		var divs = JSON.parse(pHtml);
		var pa = document.getElementById('page');
		for (var i = 0; i < divs.length; i++) {
			var item = divs[i];
			showEle(item,pa);
		};
		var lakeUIs = $('.lakeUI');
		for (var j = 0; j < lakeUIs.length; j++) {
			editEvent(lakeUIs[j]);
		};
		saveEvent();
	}
 	imageShowClose.onclick = function(){
 		imageShow.style.display = 'none';
 		mask.style.display = 'none';
 	}
 	deside.onclick = function(){
		mask.style.display = 'none';
		imageShow.style.display = 'none';
 		desideImg = fileInput.innerHTML;
 		var divClass = divActive.className;
 		console.log("divClass:"+divClass);
		if (/lakeDiv/i.test(divClass)) {
			divActive.style.background = 'url(/upload/div/'+desideImg+')';
		}else if(/lakeScaleLarge/i.test(divClass)){
			divActive.setAttribute('data-image','/upload/div/'+desideImg);
			divActive.innerHTML = '';
			scaleLargeLoad();
			changePosition(divActive);
			divCtrlsClick(divActive);
		}else if(/lakeSlideView/i.test(divClass)){
			var newSpan = document.createElement('span');
			newSpan.setAttribute('data-src','/upload/div/'+desideImg);
			divActive.appendChild(newSpan);
			updateSlideView();
			var children = divActive.getElementsByTagName('span');
			toolSpansShow(children,'data-src');
		}
 	}
 	function disResizable(ele){
 		var ctrls = ele.getElementsByClassName('ui-Resizable-ctrl');
 		for (var i = 0; i < ctrls.length; i++) {
 			ctrls[i].remove();
 		};
 	}
 	$("#file1").bind('change',function(){
 		var array = this.value.split('\\');
 		var l = array.length;
 		var end = l-1;
 		fileInput.innerHTML = array[end];
 	})
	upload.onclick = function(){
		console.log('upload start--');
		console.log('uploadname'+fileInput.innerHTML);
		var data = new FormData();
		var files = $("#file1")[0].files;
		var fileName = fileInput.innerHTML;
		if (files) {
			data.append("file",files[0]);
		}
		$.ajax({
			type:'POST',
			dataType:'json',
			url:'/uploadImage',
			data: data,
			contentType:false,
			processData:false,
			success:function(results){
				queryAllImage();
			}
		})
	}
	upperUI.onclick = function(){
		var targetElement = divActive.nextSibling;
		insertAfter(divActive,targetElement);
	}
	lowerUI.onclick = function(){
		console.log('lower')
		var target = divActive.previousSibling;
		console.log(target);
		var parent = divActive.parentNode;
		parent.insertBefore(divActive,target);
	}
	$('#addDiv').bind('click',function(){
		var div0 = document.createElement('div');
		div0.classList.add('lakeDiv');
		div0.classList.add('lakeUI');
		div0.setAttribute('id','div' + divnum);
		div0.style.width = '50px';
		div0.style.height = '50px';
		div0.style.border = '1px solid grey';
		div0.style.position = 'absolute';
		div0.style.left = '100px';
		div0.style.top = '100px';
		div0.style.background = 'transparent';
		page.append(div0);
		editEvent(div0);
		divnum++;
	})
	$('#addNav').bind('click',function(){
		if(!navExist){
			var div0 = document.createElement('div');
			div0.className = 'lakeNav';
			div0.classList.add('lakeUI');
			div0.setAttribute('id','nav');	
			var span = [];
			span[0] = document.createElement('span');
			span[1] = document.createElement('span');
			span[0].innerHTML = "首页";
			span[1].innerHTML = "社区";
			div0.appendChild(span[0]);
			div0.appendChild(span[1]);
			Resizable(div0);

			div0.onclick = function(){
				toolContent.innerHTML = "";
				var spans = this.getElementsByTagName('span');			
				showTool('nav');
				toolSpansShow(spans,'nodeValue');
				addSpan.onclick = function(){
					var addData = document.createElement('span');
					var toolSpans = document.getElementById("toolSpans");
					var addInput = document.createElement('input');
					addInput.setAttribute('type','text');
					addInput.className = 'editInput';
					addInput.onblur = function(){
						console.log('input onblur--');
						var newSpan = document.createElement('span');
						newSpan.innerHTML = this.value;
						var nav = document.getElementById('nav');
						nav.appendChild(newSpan);
						var spans = nav.getElementsByTagName('span');
						toolSpansShow(spans,'nodeValue');
					}
					addData.className = 'toolSpan';
					addData.appendChild(addInput);
					toolSpans.appendChild(addData);
				}			
			}
			page.append(div0);
			navLoad();
			navExist = true;
		}
		lakeUIHover();
	})	
	$('#addSlideView').bind('click',function(){
		var div0 = document.createElement('div');
		div0.className = 'lakeSlideView';
		div0.classList.add('lakeUI');
		div0.setAttribute('data-interval','4000');
		var span = [];
		span[0] = document.createElement('span');
		span[1] = document.createElement('span');
		span[0].setAttribute('data-src','/image/slideView1.jpg');
		span[1].setAttribute('data-src','/image/slideView2.jpg');
		span[0].innerHTML = '';
		span[1].innerHTML = '';
		div0.appendChild(span[0]);
		div0.appendChild(span[1]);
		page.append(div0);
		slideViewLoad();
		div0.style.width = '500px';
		div0.style.height = '300px';
		div0.style.left = '50px';
		div0.style.top = '200px';
		editEvent(div0);
	})
	$('#addButton').bind('click',function(){
		var newButton = document.createElement('div');
		newButton.className = 'lakeColorButton';
		newButton.classList.add('lakeUI');
		newButton.setAttribute('data-size','1');
		newButton.innerHTML = '确定';
		page.append(newButton);
		colorButtonLoad();
		editEvent(newButton);
	})
	$("#addPie").bind('click',function(){	
		var newChart = document.createElement('div');
		newChart.className = 'lakeChartPie';
		newChart.classList.add('lakeUI');
		newChart.setAttribute('data-chartData','30,90,34,60');
		newChart.setAttribute('data-chartName','sony,toshiba,lenove,A8');
		newChart.setAttribute('data-width','250');
		newChart.setAttribute('data-height','250');
		page.append(newChart);
		chartPiesLoad();
		editEvent(newChart);
		clearChartPie();
	})
	$("#addRing").bind('click',function(){
		var newChart = document.createElement('div');
		newChart.className = 'lakeChartRing';
		newChart.classList.add('lakeUI');
		newChart.setAttribute('data-chartData','30,90,34,60');
		newChart.setAttribute('data-chartName','sony,toshiba,lenove,A8');
		newChart.setAttribute('data-width','250');
		newChart.setAttribute('data-height','250');
		page.append(newChart);
		chartRingsLoad();
		editEvent(newChart);
		clearChartRing();
	})
	$('#addScaleLarge').bind('click',function(){
		var newDiv = document.createElement('div');
		newDiv.className = 'lakeScaleLarge';
		newDiv.classList.add('lakeUI');
		newDiv.setAttribute('id','scaleLarge'+scalenum);
		newDiv.setAttribute('data-image','/image/book.jpg');
		page.append(newDiv);
		scaleLargeLoad();
		editEvent(newDiv);
		scalenum++;
	})
	$('#addHistogram').bind('click',function(){
		var newDiv = document.createElement('div');
		newDiv.className = 'lakeChartHistogram';
		newDiv.classList.add('lakeUI');
		newDiv.setAttribute('data-width','400');
		newDiv.setAttribute('data-height','400');
		newDiv.setAttribute('data-chartDataX','一月,二月,三月,四月,五月,六月');
		newDiv.setAttribute('data-chartDataY','20 35,25 28,40 36,60 54,43 28,30 32');	
		page.append(newDiv);
		chartHistogramsLoad();
		editEvent(newDiv);
		clearChartHistogram();
	})
	$('#returnNav').bind('click',function(){
		disTool("navTool");
		var toolContent = document.getElementById("toolContent");
		toolContent.innerHTML="";		
	})	
	$('#saveLayout').bind('click',function(){
		//获得第一层的子元素
		console.log("saveLayout click!!");
		var uiCtrls = [];
		uiCtrls = document.getElementsByClassName("ui-Resizable-ctrl");
		var l = uiCtrls.length;
		console.log("length:**"+uiCtrls.length);
		for (var i = l-1; i >= 0; i--) {
			console.log("length:end**"+i);
			uiCtrls[i].remove();
		};
		//对网页截图
		html2canvas($('#page'),{
			onrendered:function(canvas){
				var divArray = $('#page').children();
				var layoutName = document.getElementById("layoutName");
				var name = layoutName.value;
				var array = saveDiv(divArray);
				var myImage = canvas.toDataURL("image/jpeg");
				// console.log(myImage);
				$.ajax({
					type: 'POST',
					dataType: 'json',
					url: '/saveLayout',
					data: {"layout":array,"name":name,"imageData":myImage},
					success:function(results){
						var lakeUIs = $('.lakeUI');
						for (var i = 0; i < lakeUIs.length; i++) {
							editEvent(lakeUIs[i]);
						};
						if (results.success === 1) {
							$('#save').css('display','block');
							$('#save').attr('data-id',results.id);
							$('#save').attr('data-image',results.fName);
							$('#saveLayoutSuccess').fadeIn();
							$('#saveLayoutSuccess').css('bottom','60px');
							$('#saveLayoutSuccess').delay(3000).hide(0);
							saveEvent();
						}else{
							//save fail
						}
					}
				})
			}
		})	
	})
	function editEvent(item){
		Resizable(item);
		if(/lakeSlideView/i.test(item.className)){
			item.setAttribute('id','slideView');
			updateCtrls(item);
		}else if(/lakeColorButton/i.test(item.className)){
			btnCtrlsClick(item);
		}else if(/lakeScaleLarge/i.test(item.className)){
			divCtrlsClick(item);
		}else if(/lakeChartPie/i.test(item.className)){
			chartPieCtrlsClick(item);
		}else if(/lakeChartRing/i.test(item.className)){
			chartRingCtrlsClick(item);	
		}else if(/lakeChartHistogram/i.test(item.className)){
			chartHistogramCtrlsClick(item);	
		}else if(/lakeDiv/i.test(item.className)){
			divCtrlsClick(item);
		}
		lakeUIHover();
	}
	function saveEvent(){
		$('#save').bind('click',function(){
			var uiCtrls = [];
			uiCtrls = document.getElementsByClassName("ui-Resizable-ctrl");
			var l = uiCtrls.length;
			console.log("length:**"+uiCtrls.length);
			for (var i = l-1; i >= 0; i--) {
				console.log("length:end**"+i);
				uiCtrls[i].remove();
			};
			html2canvas($('#page'),{
				onrendered:function(canvas){
					var array1 = $('#page').children();
					var array2 = saveDiv(array1);
					var myImage = canvas.toDataURL("image/jpeg");
					var id = $('#save').attr('data-id');
					var fName = $('#save').attr('data-image');
					$.ajax({
						type: 'POST',
						dataType: 'json',
						url: '/updateLayout',
						data:{'id':id,'layout':array2,'fName':fName,'imageData':myImage},
						success:function(results){
							var lakeUIs = $('.lakeUI');
							for (var i = 0; i < lakeUIs.length; i++) {
								editEvent(lakeUIs[i]);
							};
							if(results.success === 1){
								$('#updateLayoutSuccess').fadeIn();
								$('#updateLayoutSuccess').css('bottom','60px');
								$('#updateLayoutSuccess').delay(3000).hide(0);
							}else{
								//update fail
							}
						}
					})
				}
			})				
		})
	}
	function clearChartHistogram(){
		var chartexist =document.getElementsByClassName('lakeChartHistogram');
		for (var i = 0; i < chartexist.length; i++) {
			chartexist[i].innerHTML = '';
			Resizable(chartexist[i]);
			chartHistogramCtrlsClick(chartexist[i]);
		};
	}
	function clearChartRing(){
		var chartexist = document.getElementsByClassName('lakeChartRing');
		for (var i = 0; i < chartexist.length; i++) {
			chartexist[i].innerHTML = '';
			Resizable(chartexist[i]);
			chartRingCtrlsClick(chartexist[i]);
		};
	}
	function clearChartPie(){
		var chartexist = document.getElementsByClassName('lakeChartPie');
		for (var i = 0; i < chartexist.length; i++) {
			chartexist[i].innerHTML = '';
			Resizable(chartexist[i]);
			chartPieCtrlsClick(chartexist[i]);
		};
	}
	function chartHistogramCtrlsClick(parent){
		var ctrls = parent.getElementsByClassName('ui-Resizable-ctrl');
		for (var i = 0; i < ctrls.length; i++) {	
			ctrls[i].onclick = function(){
				console.log("test---")
				if(!navToolActive){
					showTool("nav");
				}
				divActive = this.parentNode;
				toolContent.innerHTML = '';
				var toolSpans = document.createElement('div');
				toolSpans.setAttribute('id','toolSpans');
				toolContent.appendChild(toolSpans);
				var titspan = document.createElement('div');
				titspan.className = 'toolSpan';
				titspan.innerHTML = "标签 --  数据";
				toolSpans.appendChild(titspan);
				var span=[];
				var x=[];
				var y=[];
				var xInput = [];
				var yInput = [];
				x=divActive.getAttribute('data-chartDataX').split(',');
				y=divActive.getAttribute('data-chartDataY').split(',');
				for (var i = 0; i < x.length; i++) {
					span[i]=document.createElement('div');
					span[i].className = 'toolSpan';
					xInput[i] = document.createElement('input');
					yInput[i] = document.createElement('input');
					xInput[i].className = 'editInput xInput';
					yInput[i].className = 'editInput yInput';
					xInput[i].value = x[i];
					yInput[i].value = y[i];
					xInput[i].type = 'text';
					yInput[i].type = 'text';
					span[i].appendChild(xInput[i]);
					span[i].appendChild(yInput[i]);
					toolSpans.appendChild(span[i]);
					xInput[i].onblur = function(){
						xInputHBlur();
					}
					yInput[i].onblur = function(){
						yInputHBlur();
					}
				};
				var add = document.createElement('div');
				add.className = 'toolSpan chartadd';
				add.innerHTML = '添加';
				toolSpans.appendChild(add);
				add.onclick = function(){
					var newSpan = document.createElement('div');
					newSpan.className = 'toolSpan';
					var newXInput = document.createElement('input');
					var newYInput = document.createElement('input');
					newXInput.className = 'editInput xInput';
					newYInput.className = 'editInput yInput';
					newYInput.type = 'text';
					newXInput.type = 'text';
					newSpan.appendChild(newXInput);
					newSpan.appendChild(newYInput);
					toolSpans.insertBefore(newSpan,this);
					newXInput.onblur = function(){
						xInputHBlur();
					}
					newYInput.onblur = function(){
						yInputHBlur();
					}
				}
			}
		};
	}
	function chartRingCtrlsClick(parent){
		var ctrls = parent.getElementsByClassName('ui-Resizable-ctrl');
		for (var i = 0; i < ctrls.length; i++) {
			ctrls[i].onclick = function(){
				if(!navToolActive){
					showTool("nav");
				}
				divActive = this.parentNode;
				toolContent.innerHTML = '';
				var toolSpans = document.createElement('div');
				toolSpans.setAttribute('id','toolSpans');
				toolContent.appendChild(toolSpans);
				var titspan = document.createElement('div');
				titspan.className = 'toolSpan';
				titspan.innerHTML = "标签 --  数据";
				toolSpans.appendChild(titspan);
				var span=[];
				var x=[];
				var y=[];
				var xInput = [];
				var yInput = [];
				x=divActive.getAttribute('data-chartName').split(',');
				y=divActive.getAttribute('data-chartData').split(',');
				for (var i = 0; i < x.length; i++) {
					span[i]=document.createElement('div');
					span[i].className = 'toolSpan';
					xInput[i] = document.createElement('input');
					yInput[i] = document.createElement('input');
					xInput[i].className = 'editInput xInput';
					yInput[i].className = 'editInput yInput';
					xInput[i].value = x[i];
					yInput[i].value = y[i];
					xInput[i].type = 'text';
					yInput[i].type = 'text';
					span[i].appendChild(xInput[i]);
					span[i].appendChild(yInput[i]);
					toolSpans.appendChild(span[i]);
					xInput[i].onblur = function(){
						xInputRingBlur();
					}
					yInput[i].onblur = function(){
						yInputRingBlur();
					}
				};
				var add = document.createElement('div');
				add.className = 'toolSpan chartadd';
				add.innerHTML = '添加';
				toolSpans.appendChild(add);
				add.onclick = function(){
					var newSpan = document.createElement('div');
					newSpan.className = 'toolSpan';
					var newXInput = document.createElement('input');
					var newYInput = document.createElement('input');
					newXInput.className = 'editInput xInput';
					newYInput.className = 'editInput yInput';
					newYInput.type = 'text';
					newXInput.type = 'text';
					newSpan.appendChild(newXInput);
					newSpan.appendChild(newYInput);
					toolSpans.insertBefore(newSpan,this);
					newXInput.onblur = function(){
						xInputRingBlur();
					}
					newYInput.onblur = function(){
						yInputRingBlur();
					}
				}
			}
		}
	}
	function chartPieCtrlsClick(parent){
		var ctrls = parent.getElementsByClassName('ui-Resizable-ctrl');
		for (var i = 0; i < ctrls.length; i++) {
			ctrls[i].onclick = function(){
				if(!navToolActive){
					showTool("nav");
				}
				divActive = this.parentNode;
				toolContent.innerHTML = '';
				var toolSpans = document.createElement('div');
				toolSpans.setAttribute('id','toolSpans');
				toolContent.appendChild(toolSpans);
				var titspan = document.createElement('div');
				titspan.className = 'toolSpan';
				titspan.innerHTML = "标签 --  数据";
				toolSpans.appendChild(titspan);
				var span=[];
				var x=[];
				var y=[];
				var xInput = [];
				var yInput = [];
				x=divActive.getAttribute('data-chartName').split(',');
				y=divActive.getAttribute('data-chartData').split(',');
				for (var i = 0; i < x.length; i++) {
					span[i]=document.createElement('div');
					span[i].className = 'toolSpan';
					xInput[i] = document.createElement('input');
					yInput[i] = document.createElement('input');
					xInput[i].className = 'editInput xInput';
					yInput[i].className = 'editInput yInput';
					xInput[i].value = x[i];
					yInput[i].value = y[i];
					xInput[i].type = 'text';
					yInput[i].type = 'text';
					span[i].appendChild(xInput[i]);
					span[i].appendChild(yInput[i]);
					toolSpans.appendChild(span[i]);
					xInput[i].onblur = function(){
						xInputPieBlur();
					}
					yInput[i].onblur = function(){
						yInputPieBlur();
					}
				};
				var add = document.createElement('div');
				add.className = 'toolSpan chartadd';
				add.innerHTML = '添加';
				toolSpans.appendChild(add);
				add.onclick = function(){
					var newSpan = document.createElement('div');
					newSpan.className = 'toolSpan';
					var newXInput = document.createElement('input');
					var newYInput = document.createElement('input');
					newXInput.className = 'editInput xInput';
					newYInput.className = 'editInput yInput';
					newYInput.type = 'text';
					newXInput.type = 'text';
					newSpan.appendChild(newXInput);
					newSpan.appendChild(newYInput);
					toolSpans.insertBefore(newSpan,this);
					newXInput.onblur = function(){
						xInputPieBlur();
					}
					newYInput.onblur = function(){
						yInputPieBlur();
					}
				}
			}
		}
	}
	function xInputPieBlur(){
		var ex = toolSpans.getElementsByClassName('editInput xInput');
		var exv = [];
		for (var i = 0; i < ex.length; i++) {
			exv[i] = ex[i].value;
		};
		var exs = exv.join();
		divActive.setAttribute('data-chartName',exs);
		divActive.innerHTML = "";
		chartPiesLoad();
		clearChartPie();
	}
	function yInputPieBlur(){
		var ex = toolSpans.getElementsByClassName('editInput yInput');
		var exv = [];
		for (var i = 0; i < ex.length; i++) {
			exv[i] = ex[i].value;
		};
		var exs = exv.join();
		divActive.setAttribute('data-chartData',exs);
		divActive.innerHTML = "";
		chartPiesLoad();
		clearChartPie();
	}
	function xInputHBlur(){
		var ex = toolSpans.getElementsByClassName('editInput xInput');
		var exv = [];
		for (var i = 0; i < ex.length; i++) {
			exv[i] = ex[i].value;
		};
		var exs = exv.join();
		divActive.setAttribute('data-chartDataX',exs);
		divActive.innerHTML = "";
		chartHistogramsLoad();
		clearChartHistogram();
	}
	function yInputHBlur(){
		var ex = toolSpans.getElementsByClassName('editInput yInput');
		var exv = [];
		for (var i = 0; i < ex.length; i++) {
			exv[i] = ex[i].value.toString();
		};
		var exs = exv.join();
		divActive.setAttribute('data-chartDataY',exs.toString());
		divActive.innerHTML = "";
		chartHistogramsLoad();
		clearChartHistogram();
	}
	function xInputRingBlur(){
		var ex = toolSpans.getElementsByClassName('editInput xInput');
		var exv = [];
		for (var i = 0; i < ex.length; i++) {
			exv[i] = ex[i].value;
		};
		var exs = exv.join();
		divActive.setAttribute('data-chartName',exs);
		divActive.innerHTML = "";
		chartRingsLoad();
		clearChartRing();
	}
	function yInputRingBlur(){
		var ex = toolSpans.getElementsByClassName('editInput yInput');
		var exv = [];
		for (var i = 0; i < ex.length; i++) {
			exv[i] = ex[i].value;
		};
		var exs = exv.join();
		divActive.setAttribute('data-chartData',exs);
		divActive.innerHTML = "";
		chartRingsLoad();
		clearChartRing();
	}
	function btnCtrlsClick(parent){
		var ctrls = parent.getElementsByClassName('ui-Resizable-ctrl');
		for (var i = 0; i < ctrls.length; i++) {
			ctrls[i].onclick = function(){
				if(!navToolActive){
					showTool("nav");
				}
				divActive = this.parentNode;
				toolContent.innerHTML = '';
				var toolSpans = document.createElement('div');
				toolSpans.setAttribute('id','toolSpans');
				var span0 = document.createElement('div');
				var span1 = document.createElement('div');

				var nameInput = document.createElement('input');
				nameInput.type = 'text';
				nameInput.value = divActive.firstChild.nodeValue;
				nameInput.className = 'editInput';
				span0.className = 'toolSpan';
				span0.innerHTML = "按钮：";
				span0.appendChild(nameInput);
				//onblur
				nameInput.onblur = function(){
					divActive.firstChild.nodeValue = this.value;
				}
				span1.className = 'toolSpan';
				var sizeInput = document.createElement('input');
				sizeInput.type = 'number';
				sizeInput.value = divActive.getAttribute('data-size');
				sizeInput.className = 'editInput';
				span1.innerHTML = "大小：";
				span1.appendChild(sizeInput);
				sizeInput.onblur = function(){
					divActive.setAttribute('data-size',this.value);
					divActive.innerHTML = '';
					divActive.innerHTML = nameInput.value;
					colorButtonLoad();
					changePosition(divActive);
					btnCtrlsClick(divActive);
				}

				toolSpans.appendChild(span0);
				toolSpans.appendChild(span1);
				toolContent.appendChild(toolSpans);
			}
		};
	}
	function queryAllImage(){
		$.ajax({
			type:'POST',
			dataType:'json',
			url:'/queryUserImage',
			success:function(results){
				var userImages = results.images;
				imageShowContent.innerHTML = '';
				for (var i = 0; i < userImages.length; i++) {
					var div = document.createElement('div');
					var divh = document.createElement('div');
					div.className = 'imgDiv';
					divh.className = 'imgDivHover';
					var img = document.createElement('img');
					img.src = '/upload/div/'+userImages[i].url;
					img.setAttribute('id',userImages[i].url);
					var icon = document.createElement('i');
					icon.className = 'iconfont iconClose';
					icon.innerHTML = "&#xf000a;";
					divh.appendChild(icon);
					div.appendChild(img);
					div.appendChild(divh);
					icon.addEventListener('click',function(){
						var deleteimg = this.parentNode.previousSibling;
						deleteImage(deleteimg);
					})
					img.addEventListener('mouseover',function(){
						this.nextSibling.style.display = 'block';
					})
					img.addEventListener('mouseout',function(){
						this.nextSibling.style.display = 'none';
					})
					divh.addEventListener('mouseover',function(){
						this.style.display = 'block';
					})
					divh.addEventListener('mouseout',function(){
						this.style.display = 'none';
					})
					imageShowContent.appendChild(div);
					img.onclick = function(){
						fileInput.innerHTML = this.id;
					}
				};
			}
		})
	}
	function deleteImage(img){
		var id = img.getAttribute('id');
		console.log(id);
		$.ajax({
			type:'DELETE',
			url:"/deleteImage?id="+id
		}).done(function(results){
			if (results.success) {
				queryAllImage();
			};
		})
	}
	function toolSpansShow(spans,type){
		console.log('toolSpansShow start - -');
		toolContent.innerHTML = "";
		var toolSpans = document.createElement('div');
		toolSpans.setAttribute('id','toolSpans');
		var addSpan = document.createElement('div');
		addSpan.setAttribute('id','addSpan');
		addSpan.innerHTML = "添加";
		if(type == 'nodeValue'){
			console.log('addSpan nav**');
			addSpan.onclick = function(){
				console.log('click addSpan');
				var addData = document.createElement('span');
				var toolSpans = document.getElementById("toolSpans");
				var addInput = document.createElement('input');
				addInput.setAttribute('type','text');
				addInput.style.color = 'black';
				addInput.style.height = '50px';
				addInput.style.width = '100px';
				addInput.style.paddingLeft = "20px";
				//input 失去焦点时 将value处理
				addInput.onblur = function(){
					console.log('input onBlur--');
					var newSpan = document.createElement('span');
					newSpan.innerHTML = this.value;
					var nav = document.getElementById('nav');
					nav.appendChild(newSpan);
					var spans = nav.getElementsByTagName('span');
					toolSpansShow(spans,'nodeValue');
				}
				addData.className = 'toolSpan';
				addData.appendChild(addInput);
				toolSpans.appendChild(addData);
			}
		}else if(type == 'data-src'){
			addSpan.onclick = function(){
				//获取所有图片，选择图片
				console.log('assSpan');
				mask.style.display = 'block';
				imageShow.style.display = 'block';
				queryAllImage();
			}
		}
		toolContent.appendChild(toolSpans);
		toolContent.appendChild(addSpan);
		for (var i = 0; i < spans.length; i++) {
			var array = [];
			var iconClose=[];
			array[i] = document.createElement('span');
			iconClose[i] = document.createElement('i');
			iconClose[i].className = 'iconfont iconClose';
			iconClose[i].setAttribute('id','iconClose'+i);
			iconClose[i].innerHTML= "&#xf000a;";
			iconClose[i].onclick = function(){
				var iconCloseId = this.getAttribute('id');
				var id = iconCloseId.split('iconClose')[1];
				var toolSpans = document.getElementById("toolSpans");	
				var is = toolSpans.getElementsByTagName('i');
				toolSpans.getElementsByTagName('span')[id].remove();
				if(type == 'nodeValue'){
					var nav = divActive;
					nav.getElementsByTagName('span')[id].remove();
				}else if(type == 'data-src'){
					var slideView = divActive;
					var slideViewSpan = slideView.getElementsByTagName('span');
					slideViewSpan[id].remove();
					updateSlideView();
				}
				for (var i = 0; i < is.length; i++) {
					is[i].setAttribute('id','iconClose'+i);
				};
			}
			if(type == 'nodeValue'){
				array[i].innerHTML = spans[i].firstChild.nodeValue;
			}else if(type == 'data-src'){
				array[i].innerHTML = "<img src='"+spans[i].getAttribute('data-src')+"'>";
			}
			array[i].className = 'toolSpan';
			array[i].appendChild(iconClose[i]);
			toolSpans.appendChild(array[i]);
		};
	}
	function updateSlideView(){
		slideViewLoad();
		// disResizable(slideView);
		// Resizable(slideView);
		editEvent(divActive);
		updateCtrls(divActive);
	}
	function divCtrlsClick(parent){
		var ctrls = parent.getElementsByClassName('ui-Resizable-ctrl');
		for (var i = 0; i < ctrls.length; i++) {
			ctrls[i].onclick = function(){
				if(!navToolActive){
					showTool("nav");
				}
				divActive = this.parentNode;
				// var id = this.parentNode.getAttribute('id');
				var width = this.parentNode.offsetWidth;
				var height = this.parentNode.offsetHeight;
				var left = this.parentNode.style.left;
				var top = this.parentNode.style.top;
				var bg = this.parentNode.style.background;	
				toolContent.innerHTML = "";
				var toolSpans = document.createElement('div');
				toolSpans.setAttribute('id','toolSpans');
				toolContent.appendChild(toolSpans);
				var widthSpan = document.createElement('span');
				widthSpan.innerHTML = "宽度："+width; 
				widthSpan.className = 'toolSpan';
				var heightSpan = document.createElement('span');
				heightSpan.innerHTML = "高度："+height;
				heightSpan.className = 'toolSpan';
				var leftSpan = document.createElement('span');
				leftSpan.innerHTML = "左边距："+left;
				leftSpan.className = 'toolSpan';
				var topSpan = document.createElement('span');
				topSpan.innerHTML = "上边距："+top;
				topSpan.className = 'toolSpan';
				var bgSpan = document.createElement('span');
				bgSpan.innerHTML = "背景：<span id='bgEdit'><i class='icon iconfont'>&#xe729;</i></span>";
				bgSpan.className = 'toolSpan';
				toolSpans.appendChild(widthSpan);
				toolSpans.appendChild(heightSpan);
				toolSpans.appendChild(leftSpan);
				toolSpans.appendChild(topSpan);
				toolSpans.appendChild(bgSpan);
				var bgEdit = document.getElementById('bgEdit');
				bgEdit.onclick = function(){						
					mask.style.display = 'block';
					imageShow.style.display = 'block';	
					//获取当前用户上传的所有的图片
					queryAllImage();
				}
			}
		};
	}
	function updateCtrls(parent){
		var ctrls = parent.getElementsByClassName('ui-Resizable-ctrl');
		for (var i = 0; i < ctrls.length; i++) {
			ctrls[i].onclick = function(){
				if(!navToolActive){
					showTool("nav");
				}
				divActive = this.parentNode;
				var children = divActive.getElementsByTagName('span');
				toolSpansShow(children,'data-src');
				addSpan.onclick = function(){
					//获取所有图片，选择图片
					mask.style.display = 'block';
					imageShow.style.display = 'block';
					queryAllImage();
				}
			}
		};
	}
	function showTool(name){
		var toolName = name+"Tool";
		var tool = document.getElementById(toolName);
		tool.style.left = "0";
		navToolActive = true;
	}
	function disTool(name){
		var tool = document.getElementById(name);
		tool.style.left = "-20%";
		navToolActive = false;
	}
	function saveDiv(divArray){
		var l = divArray.length;
		var array = [];
		for(var i=0;i<l;i++){
			var eleObj = objNode(divArray[i]);
			array.push(eleObj);
		}
		return array;
	}
	//	返回一个对象
	function objNode(node){
		var width = node.style.width;
		var height = node.style.height;
		var left = node.style.left;
		var top = node.style.top;
		var className = node.className;
		var tagName = node.tagName;
		var childs = [];
		var bg = node.style.background;
		var data;
		var text = "";
		if(/lakeSlideView/i.test(className)){
			data = node.getAttribute('data-interval');
		}else if(/lakeColorButton/i.test(className)){
			console.log("lake color button save");
			data = node.getAttribute('data-size');
			text = node.firstChild.nodeValue;
		}else if(/lakeScaleLarge/i.test(className)){
			data = node.getAttribute('data-image');
		}else if(/lakeChartPie/i.test(className)){
			data = {
				'dataX':node.getAttribute('data-chartName'),
				'dataY':node.getAttribute('data-chartData'),
				'cWidth':node.getAttribute('data-width'),
				'cHeight':node.getAttribute('data-height')
			}
		}else if(/lakeChartRing/i.test(className)){
			data = {
				'dataX':node.getAttribute('data-chartName'),
				'dataY':node.getAttribute('data-chartData'),
				'cWidth':node.getAttribute('data-width'),
				'cHeight':node.getAttribute('data-height')
			}
		}else if(/lakeChartHistogram/i.test(className)){
			data = {
				"dataX":node.getAttribute('data-chartDataX'),
				"dataY":node.getAttribute('data-chartDataY'),
				"cWidth":node.getAttribute('data-width'),
				"cHeight":node.getAttribute('data-height')
			}
		}
		var state;
		var childEles = node.getElementsByTagName('div');
		var childEle = [];
		for (var i = 0; i < childEles.length; i++) {
			if(childEles[i].parentNode == node){
				childEle.push(childEles[i]);
			}
		};
		var childSpans = node.getElementsByTagName('span');
		var childSpan = [];
		for (var i = 0; i < childSpans.length; i++) {
			if(childSpans[i].parentNode == node){
				childSpan.push(childSpans[i]);
			}
		};

		console.log('childSpan.length:'+childSpan.length);
		console.log('childEle.length:'+childEle.length);
		if(childSpan.length > 0&&childEle.length == 0){
			state = "spanmarry";
			console.log('有span子元素');
			for (var j = 0; j < childSpan.length; j++) {
				console.log(childSpan[j].tagName);
				var spanObj = {
					"type": "span",
					"text": childSpan[j].innerHTML,
					"marginLeft":childSpan[j].style.marginLeft,
					"marginTop": childSpan[j].style.marginTop,
					"className": childSpan[j].className,
					"data-src": childSpan[j].getAttribute("data-src")
				}
				childs.push(spanObj);
			};
		}else if(childEle.length > 0&&childSpan.length == 0){
			state = "divmarry";
			console.log('有div子元素');
			for (var i = 0; i < childEle.length; i++) {
				var divObj = objNode(childEle[i]);
				childs.push(divObj);
			};
		}else if(childEle.length > 0 && childSpan.length > 0){
			state = "marry";
			console.log("既有span又有div");
			for (var a = 0; a < childSpan.length; a++) {
				console.log(childSpan[a].tagName);
				var spanObj = {
					"tagName": "span",
					"text": childSpan[a].innerHTML,
					"marginLeft":childSpan[a].style.marginLeft,
					"marginTop": childSpan[a].style.marginTop,
					"className": childSpan[a].className,
					"data-src": childSpan[a].getAttribute("data-src")
				}
				childs.push(spanObj);
			};
			for (var b = 0; b < childEle.length; b++) {
				var divObj = objNode(childEle[b]);
				childs.push(divObj);
			};
		}else{
			state = "single";
		}
		//对象化的元素
		var eleObj;
		eleObj = {
			"width": width,
			"height": height,
			"left": left,
			"top": top,
			"className":className,
			"childs":childs,
			"background": bg,
			"tagName":tagName,
			"state":state,
			"data":data,
			"text":text
		}
		return eleObj;
	}
	function changePosition(e){
		var panel = e;
		panel.setAttribute('draggable',true);
		panel.classList.add('draggable');
		var t=document.createElement("div");
		t.class=t.className="ui-Resizable-t ui-Resizable-ctrl";
		panel.appendChild(t);
		t.addEventListener('mousedown',function(e){
			mouseDown(e,panel,t,'t');
		})
		var boxes = document.querySelectorAll('.draggable');
		[].forEach.call(boxes,function(box){
			box.addEventListener('dragstart',handleDragStart,false);
			box.addEventListener('dragenter',handleDragEnter,false);
			box.addEventListener('dragover',handleDragOver,false);
			box.addEventListener('dragleave',handleDragLeave,false);
			box.addEventListener('drag',handleDrag,false);
			box.addEventListener('drop',handleDrop,false);
			box.addEventListener('dragend',handleDragEnd,false);
		})
	}
	function Resizable(p){
		var panel=p;
		p.setAttribute('draggable',true);
		var r=document.createElement("div");
		var b=document.createElement("div");
		var rb=document.createElement("div");
		var t=document.createElement("div");
		t.class=t.className="ui-Resizable-t ui-Resizable-ctrl";
		r.class=r.className="ui-Resizable-r ui-Resizable-ctrl";
		b.class=b.className="ui-Resizable-b ui-Resizable-ctrl";
		rb.class=rb.className="ui-Resizable-rb ui-Resizable-ctrl";
		panel.appendChild(t);
		panel.appendChild(r);
		panel.appendChild(b);
		panel.appendChild(rb);
		t.addEventListener('mousedown',function(e){
			mouseDown(e,panel,t,'t');
		})
		r.addEventListener('mousedown',function(e){
			mouseDown(e,panel,r,'r');
		});
		b.addEventListener('mousedown',function(e){
			mouseDown(e,panel,b,'b');
		})
		rb.addEventListener('mousedown',function(e){
			mouseDown(e,panel,rb,'rb');
		})
		p.addEventListener('dragstart',handleDragStart,false);
		p.addEventListener('dragenter',handleDragEnter,false);
		p.addEventListener('dragover',handleDragOver,false);
		p.addEventListener('dragleave',handleDragLeave,false);
		p.addEventListener('drag',handleDrag,false);
		p.addEventListener('drop',handleDrop,false);
		p.addEventListener('dragend',handleDragEnd,false);
	}
	function mouseDown(e,panel,ctrl,type){
		var e = e||window.event;
		e.preventDefault();
		m_start_x = e.pageX - ctrl.offsetLeft;
		m_start_y = e.pageY - ctrl.offsetTop;
		start_x = e.pageX - panel.offsetLeft;
		start_y = e.pageY - panel.offsetTop;
		m_panel = panel;
		m_ctrl = ctrl;
		m_type = type;
		moving = setInterval(mouseMove,10);
	}
	function mouseMove(){
		if(moving){
			var to_x = m_to_x - m_start_x;
			var to_y = m_to_y - m_start_y;
			var min_x = m_ctrl.offsetLeft;
			var min_y = m_panel.offsetTop;
			var move_x = m_to_x - start_x;
			var move_y = m_to_y - start_y;
			switch(m_type){
				case 't':
					m_panel.style.left = move_x + 'px';
					m_panel.style.top = move_y + 'px';
				break;
				case 'r':
					m_ctrl.style.left = to_x + 'px';
			        //m_ctrl.style.top = to_y + 'px';
			        m_panel.style.width = to_x +10+ 'px';
				break;
				case 'b':
					//m_ctrl.style.left = to_x + 'px';
					m_ctrl.style.top = to_y + 'px';
					m_panel.style.height = to_y +10+ 'px';
				break;
				case 'rb':
					m_ctrl.style.left = to_x + 'px';
					m_ctrl.style.top = to_y + 'px';
					m_panel.style.width = to_x +20+ 'px';
					m_panel.style.height = to_y +20+ 'px';
				break;
			}
		}
	}
	document.onmousemove=function(e){
		
		var e=window.event||e;
		m_to_x = Math.max(toolwidth,e.pageX);
		m_to_y = Math.max(0,e.pageY);
	}
	document.onmouseup = function(){
		clearInterval(moving);
		moving = 0;
		var cls = document.getElementsByClassName('ui-Resizable-ctrl');
		for(var i = 0;i < cls.length;i++){
			cls[i].style.left = "";
			cls[i].style.top = "";
		}
	}
	//以下为拖放的事件函数
	function handleDragStart(e){
		this.style.opacity = '0.4';

		e.dataTransfer.effectAllowed = 'all';
		dragdiv = this;
		console.log(dragdiv);
	}
	function handleDragOver(e){
		if(e.preventDefault){
			e.preventDefault();
		}
		e.dataTransfer.dropEffect = 'link';
		return false;
	}
	function handleDragEnter(e){
		this.classList.add('over');
	}
	function handleDragLeave(e){
		this.classList.remove('over');
	}
	function handleDrag(e){
		//console.log('drag',this);
	}
	function handleDrop(e){
		if(e.stopPorpagation){
			e.stopPorpagation();
		}
		console.log("drop :"+this);
		dragdiv.style.left = '5px';
		dragdiv.style.top = '5px';
		e.target.appendChild(dragdiv);
		return false;
	}
	function handleDragEnd(e){
		this.style.opacity = '1';
		var boxes = document.querySelectorAll('.draggable');
		[].forEach.call(boxes,function(box){
			box.classList.remove('over');
		});
	}
	function lakeUIHover(){
		var lakeUIs = document.getElementsByClassName('lakeUI');
		for (var i = 0; i < lakeUIs.length; i++) {
			lakeUIs[i].addEventListener('mouseover',function(){
				var ctrls = this.getElementsByClassName('ui-Resizable-ctrl');
				for (var j = 0; j < ctrls.length; j++) {
					ctrls[j].style.background = 'grey';
					ctrls[j].style.opacity = '0.2';
				};
				var width = this.offsetWidth;
				var height = this.offsetHeight;
				var wh = document.createElement('div');
				wh.setAttribute('id','wh');
				wh.style.position = 'absolute';
				wh.style.right = '10px';
				wh.style.top = '-16px';
				wh.style.color = 'grey';
				wh.style.fontFamily = 'Microsoft Yahei';
				wh.style.fontSize = '10px';
				wh.innerHTML = width+'px*'+height+'px';
				this.appendChild(wh);
			})
			lakeUIs[i].addEventListener('mouseout',function(){
				var ctrls = this.getElementsByClassName('ui-Resizable-ctrl');
				for (var j = 0; j < ctrls.length; j++) {
					ctrls[j].style.background = 'transparent';
				};
				var wh = document.getElementById('wh');
				wh.remove();
			})
		};
	}
	function insertAfter(newElement,targetElement){
		var parent = targetElement.parentNode;
		if(parent.lastChild == targetElement){
			parent.appendChild(newElement);
		}else{
			parent.insertBefore(newElement,targetElement.nextSibling);
		}
	}
	function showEle(item,pa){
		var ele = document.createElement(item.tagName);
		ele.style.width = item.width;
		ele.style.height = item.height;
		ele.style.top = item.top;
		ele.style.left = item.left;
		ele.className = item.className;
		ele.style.background = item.background;
		if(/lakeSlideView/i.test(item.className)){
			ele.setAttribute('data-interval',item['data']);
		}else if(/lakeColorButton/i.test(item.className)){
			ele.setAttribute('data-size',item['data']);
			ele.innerHTML = item.text;
		}else if(/lakeScaleLarge/i.test(item.className)){
			ele.setAttribute('data-image',item['data']);
		}else if(/lakeChartPie/i.test(item.className)){
			ele.setAttribute('data-chartName',item['data'].dataX);
			ele.setAttribute('data-chartData',item['data'].dataY);
			ele.setAttribute('data-width',item['data'].cWidth);
			ele.setAttribute('data-height',item['data'].cHeight);
		}else if(/lakeChartRing/i.test(item.className)){
			ele.setAttribute('data-chartName',item['data'].dataX);
			ele.setAttribute('data-chartData',item['data'].dataY);
			ele.setAttribute('data-width',item['data'].cWidth);
			ele.setAttribute('data-height',item['data'].cHeight);
		}else if(/lakeChartHistogram/i.test(item.className)){
			ele.setAttribute('data-chartDataX',item['data'].dataX);
			ele.setAttribute('data-chartDataY',item['data'].dataY);
			ele.setAttribute('data-width',item['data'].cWidth);
			ele.setAttribute('data-height',item['data'].cHeight);
		}
		if(item.state == "spanmarry"){
			for (var i = 0; i < item.childs.length; i++) {
				var span = document.createElement('span');
				span.innerHTML = item.childs[i].text;
				if(item.childs[i].marginLeft!=null) span.style.marginLeft = item.childs[i].marginLeft;
				if(item.childs[i].marginTop!=null) span.style.marginTop = item.childs[i].marginTop;
				if(item.childs[i].className!=null) span.className = item.childs[i].className;
				if(item.childs[i]['data-src']!=null) span.setAttribute('data-src',item.childs[i]['data-src']);
				ele.appendChild(span);
			};
		}else if(item.state == "divmarry"){
			for (var j = 0; j < item.childs.length; j++) {
				showEle(item.childs[j],ele);
			};
		}else if(item.state == "marry"){
			for (var k = 0; k < item.childs.length; k++) {
				if(item.childs[k].tagName == "span"){
					var span = document.createElement('span');
					span.innerHTML = item.childs[k].text;
					if(item.childs[k].marginLeft!=null) span.style.marginLeft = item.childs[k].marginLeft;
					if(item.childs[k].marginTop!=null) span.style.marginTop = item.childs[k].marginTop;
					if(item.childs[k].className!=null) span.className = item.childs[k].className;
					if(item.childs[k]['data-src']!=null) span.setAttribute('data-src',item.childs[k]['data-src']);
					ele.appendChild(span);
				}else{
					showEle(item.childs[k],ele);
				}
				
			};
		}
		pa.appendChild(ele);
	}
})