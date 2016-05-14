$(function(){
	var createALayout = $('#createALayout');
	var shareALayout = $('#shareALayout');
	var yourDesigns = $('#yourDesigns');
	var createLayout = $('#createLayout');
	var shareLayout= $('#shareLayout');
	var yourLayout = $('#yourLayout');
	var requestAnimFrame = window.requestAnimationFrame;
	var cancelAnimationFrame = window.cancelAnimationFrame;
	createLayout.css('display','block');
	shareLayout.css('display','none');
	yourLayout.css('display','none');
	createALayout.bind('click',function(){
		createLayout.css('display','block');
		shareLayout.css('display','none');
		yourLayout.css('display','none');
	})
	shareALayout.bind('click',function(){
		createLayout.css('display','none');
		shareLayout.css('display','block');
		yourLayout.css('display','none');
	})

	yourDesigns.bind('click',function(){
		createLayout.css('display','none');
		shareLayout.css('display','none');
		yourLayout.css('display','block');
		$('#yourLayout').html("");
		$.ajax({
			type:'POST',
			url: '/queryLayouts',
			dataType: 'json',
			success:function(results){
				var array = results.layouts;
				var names = results.names;
				var images = results.images;
				var l = array.length;
				console.log(l);
				$('#yourLayout').append('<div id="row1"></div>')
				for(var i=0;i<l;i++){
					$('#row1').append('<div class="Alayout" id="'+array[i]+'"><div class="layoutMask"><i onclick="deleteLay(this)" class="layoutDelete iconfont" id="layoutDelete'+array[i]+'">&#xf000a;</i><a href="/createLayout/'+array[i]+'"><i class="iconfont" onclick="editLayout(this)">&#xe657;</i></a></div><a class="layname" href="/layout/'+array[i]+'">'+names[i]+'</a><div class="showEdit" onclick="showEdit(this)"><div class="showEditIcon"><i class="iconfont">&#xe700;</i></div></div><a href="/layout/'+array[i]+'"><img src="../upload/sculpture/'+images[i]+'.png" class="layoutImage"/></a></div>');
				}			
			}
		})       //异步请求该用户所有的布局
	})	
	//----------------------------

	var canvas = document.getElementById('share');
	var context = canvas.getContext('2d');
	var canWidth = canvas.width;
	var canHeight = canvas.height;
	var indexAnim;
	var anim = false;
	var hoverAnim = false;
	var moveAnim = false;
	var textHoverAnim = false;
	var shareR = 65;
	var shareAlpha = 0.5;
	var worker1R = 2;
	var worker2R = 2;
	var worker3R = 2;
	var worker4R = 2;
	var mouseX;
	var mouseY;
	var lastTime = 0;
	var currentTime = 0;
	var scalelarge;
	var share = {
		'x':canWidth/2+40,
		'y':canHeight/2-50
	}
	var shareSquare = {
		'x':canWidth/2-shareR,
		'y':canHeight/2-50-shareR,
		'width':shareR*2,
		'height':shareR*2
	}
	var worker1 = {
		'x':canWidth/4-30,
		'y':canHeight/2-100,
		'color':'#6495ED',
		'name':'新建工作组'
	}
	var tiny1 = {
		'x':canWidth/3-20,
		'y':canHeight/2-120
	}
	var tiny2 = {
		'x':canWidth/3-120,
		'y':canHeight/2-80
	}
	var tiny3 ={
		'x':canWidth/3-150,
		'y':canHeight/2-160
	}
	var worker2 = {
		'x':canWidth/4,
		'y':canHeight/2+100,
		'color':'#6495ED',
		'name':'管理工作组'
	}
	var small1 = {
		'x': worker2.x - 80,
		'y': worker2.y + 20
	}
	var small2 = {
		'x': worker2.x - 60,
		'y': worker2.y - 40	
	}
	var small3 = {
		'x': worker2.x + 80,
		'y': worker2.y + 10	
	}
	var small4 = {
		'x': worker2.x + 50,
		'y': worker2.y + 30
	}
	var worker3 = {
		'x':canWidth/2+60,
		'y':canHeight/2+170,
		'color':'#6495ED',
		'name':'已分享'
	}
	var taddy1 = {
		'x':worker3.x-40,
		'y':worker3.y+40
	}
	var taddy2 = {
		'x':worker3.x+50,
		'y':worker3.y-20
	}
	var worker4 = {
		'x':canWidth/2+350,
		'y':canHeight/2,
		'color':'#6495ED',
		'name':''
	}
	var weiny1 = {
		'x':worker4.x-40,
		'y':worker4.y+40
	}
	var weiny2 = {
		'x':worker4.x-50,
		'y':worker4.y-40
	}
	var weiny3 ={
		'x':worker4.x+50,
		'y':worker4.y-10
	}
	init();
	//animation 
	function shareAnim(){
		currentTime = Date.now();
		context.clearRect(0,0,canWidth,canHeight);
		init();
		if (anim) {
			drawWorker1();
			drawWorker2();
			drawWorker3();
			drawWorker4();
		};
		if (textHoverAnim) {
			textHover();
		};
		lastTime = currentTime;
		indexAnim = requestAnimFrame(shareAnim);
	}
	//初始化
	function init(){
		// ----start paint share round
		if(hoverAnim){
			if (shareR == 65) {
				scalelarge = false;
			}else if(shareR == 55){
				scalelarge = true;
			};
			if (!scalelarge) {
				shareR = shareR - 0.005;
				shareAlpha = shareAlpha + 0.0005;
				shareAlpha = Math.min(1,shareAlpha);
				shareR = Math.max(55,shareR);
			}else if(scalelarge){
				shareR = shareR + 0.005;
				shareAlpha = shareAlpha - 0.0005;
				shareAlpha = Math.max(0.5,shareAlpha);
				shareR = Math.min(65,shareR);
			}
		}
		if (moveAnim) {
			var v = Math.abs(canWidth/2-mouseX)/80000;
			if (canWidth/2-mouseX > 0) {
				share.x = share.x + v;
			}else{
				share.x = share.x - v;
			}
		};
		context.save();
		context.fillStyle = 'rgba(0,153,255,'+shareAlpha+')';
		context.beginPath();
		context.arc(share.x,share.y,shareR,0,Math.PI*2);
		context.closePath();
		context.fill();
		context.restore();
		context.save();
		context.fillStyle = '#fff';
		context.font = "20px Microsoft Yahei";
		context.fillText('分享',share.x-20,share.y+10);
		context.restore();
		// ----paint share round over
		// context.save();
		// context.fillStyle = '#F08080';
		// context.font = "21px Microsoft Yahei";
		// context.fillText('新建工作组',canWidth-180,50);
		// context.restore();
		//-----start paint worker1 rounds tiny
		drawWorker1Tinys();
		drawWorker2Smalls();
		drawWorker3Taddys();
		drawWorker4Weinys();
	}
	var textHoverRect = 0;
	var textHoverRectY = 0;
	var textHoverRectZ = 0;
	var textHoverRectA = 0;
	function textHover(){
		context.save();
		context.strokeStyle = '#F08080';
		context.beginPath();
		context.moveTo(canWidth-200,30);
		if (textHoverRect == 25) {
			textHoverRectY = Math.min(textHoverRectY+0.1,25);
			context.lineTo(canWidth-200,55);
			context.lineTo(canWidth-200-textHoverRectY,55);
		}else{
			textHoverRect = Math.min(textHoverRect+0.1,25);
			context.lineTo(canWidth-200,30+textHoverRect);
		}
		if (textHoverRectY == 25) {
			textHoverRectZ = Math.min(textHoverRectZ+0.1,25);
			context.lineTo(canWidth-175-textHoverRectZ,55-textHoverRectZ);
		}
		context.stroke();
		context.restore();
	}
	$('#share').bind('click',function(e){
		lastTime = Date.now();
		mouseX = e.offsetX;
		mouseY = e.offsetY;
		//click '新建工作组'
		if (mouseX >= worker1.x-75 && mouseX <= worker1.x+75 && mouseY >= worker1.y-75 && mouseY <= worker1.y + 75) {
			$('#mask').show();
			$('#groupBox').fadeIn();
		}
		//click "管理工作组"
		if (mouseX >= worker2.x-75 && mouseX <= worker2.x+75 && mouseY >= worker2.y-75 && mouseY <= worker2.y + 75) {
			var a = document.createElement('a');
			a.href = "/queryGroup";
			a.click();
		}

		if(mouseX >= shareSquare.x && mouseX <= shareSquare.x+shareSquare.width && mouseY >= shareSquare.y && mouseY <=shareSquare.y+shareSquare.height){
			anim = true;
			shareAnim();
		}
	})
	$('#share').bind('mousemove',function(e){
		mouseX = e.offsetX;
		mouseY = e.offsetY;
		//click 'share'
		moveAnim = false;
		if(mouseX >= shareSquare.x && mouseX <= shareSquare.x+shareSquare.width && mouseY >= shareSquare.y && mouseY <=shareSquare.y+shareSquare.height){
			hoverAnim = true;
			moveAnim = false;
			shareAnim();
		}else{
			hoverAnim = false;
		}
		shareAnim();
		if(mouseX >= canWidth-180 && mouseX <= canWidth && mouseY >= 0 && mouseY <= 50){
			//这边动画 
			textHoverAnim = true;
			console.log("----000-----");
			shareAnim();
		}
	})
	$('#share').bind('mouseout',function(){
		textHoverAnim = false;
		textHoverRect = 0;
		textHoverRectY = 0;
		textHoverRectZ = 0;
		cancelAnimationFrame(indexAnim);
	})
	$('#mask').bind('click',function(){
		$('#groupBox').hide();
		$(this).fadeOut();
	})
	$('#createGroup').bind('click',function(){
		var name = $('#groupName').val();
		var sign = $('#groupSign').val();	
		$.ajax({
			type: 'POST',
			url:'/createGroup',
			dataType:'json',
			data:{"name":name,"sign":sign},
			success:function(results){
				if(results.success == 1){
					alert("success");
					$('#groupBox').hide();
					$('#mask').fadeOut();
					worker1R = 2;
					worker2R = 2;
					worker3R = 2;
					worker4R = 2;
				}
			}
		})
	})
	function closerR2R(tiny,target){
		var xFu = target.x - tiny.x;
		var yFu = target.y - tiny.y;
		if(xFu > 0){
			tiny.x = tiny.x + 0.08;
			tiny.x = Math.min(tiny.x,target.x);
		}else{
			tiny.x = tiny.x - 0.08;
			tiny.x = Math.max(tiny.x,target.x);
		}
		if(yFu > 0){
			tiny.y = tiny.y + 0.08;
			tiny.y = Math.min(tiny.y,target.y);
		}else{
			tiny.y = tiny.y - 0.08;
			tiny.y = Math.max(tiny.y,target.y);
		}
		return tiny;
	}
	function drawWorker1(){
		// console.log("worker1.name:"+worker1.name);
		if(anim){
			worker1R = worker1R + 0.08;
			worker1R = Math.min(worker1R,75);
		}
		if (moveAnim) {
			var v = Math.abs(canWidth/2-mouseX)/80000;
			if (canWidth/2-mouseX > 0) {
				worker1.x = worker1.x + v;
			}else{
				worker1.x = worker1.x - v;
			}
		};
		context.save();
		context.fillStyle = worker1.color;
		context.beginPath();
		context.arc(worker1.x,worker1.y,worker1R,0,Math.PI*2);
		context.closePath();
		context.fill();
		context.restore();
		if(worker1.name != ''&&worker1R == 75){
			// console.log("liuchi");
			context.save();
			context.fillStyle = '#AEEEEE';
			context.font = "18px Microsoft Yahei";
			context.fillText(worker1.name,worker1.x - 40,worker1.y + 6);
			context.restore();
		}
	}
	function drawWorker1Tinys(){
		if (anim) {
			var resultXY;
			resultXY = closerR2R(tiny1,worker1);
			tiny1.x = resultXY.x;
			tiny1.y = resultXY.y;
			resultXY = closerR2R(tiny2,worker1);
			tiny2.x = resultXY.x;
			tiny2.y = resultXY.y;
			resultXY = closerR2R(tiny3,worker1);
			tiny3.x = resultXY.x;
			tiny3.y = resultXY.y;
		}
		if (moveAnim) {
			var v = Math.abs(canWidth/2-mouseX)/80000;
			if (canWidth/2-mouseX > 0) {
				tiny1.x = tiny1.x + v;
				tiny2.x = tiny2.x + v;
				tiny3.x = tiny3.x + v;
			}else{
				tiny1.x = tiny1.x - v;
				tiny2.x = tiny2.x - v;
				tiny3.x = tiny3.x - v;
			}
		};
		context.save();
		context.fillStyle = worker1.color;
		context.beginPath();
		context.arc(tiny1.x,tiny1.y,15,0,Math.PI*2);
		context.closePath();
		context.fill();
		// context.moveTo(canWidth/3-120,canHeight/2-80);
		context.beginPath();
		context.arc(tiny2.x,tiny2.y,5,0,Math.PI*2);
		context.closePath();
		context.fill();
		context.beginPath();
		context.arc(tiny3.x,tiny3.y,10,0,Math.PI*2);
		context.closePath();
		context.fill();
		context.restore();
	}
	function drawWorker2Smalls(){
		if (anim) {
			var resultXY;
			resultXY = closerR2R(small1,worker2);
			small1.x = resultXY.x;
			small1.y = resultXY.y;
			resultXY = closerR2R(small2,worker2);
			small2.x = resultXY.x;
			small2.y = resultXY.y;
			resultXY = closerR2R(small3,worker2);
			small3.x = resultXY.x;
			small3.y = resultXY.y;
			resultXY = closerR2R(small4,worker2);
			small4.x = resultXY.x;
			small4.y = resultXY.y;
		}
		if (moveAnim) {
			var v = Math.abs(canWidth/2-mouseX)/80000;
			if (canWidth/2-mouseX > 0) {
				small1.x = small1.x + v;
				small2.x = small2.x + v;
				small3.x = small3.x + v;
				small4.x = small4.x + v;
			}else{
				small1.x = small1.x - v;
				small2.x = small2.x - v;
				small3.x = small3.x - v;
				small4.x = small4.x - v;
			}
		};
		context.save();
		context.fillStyle = worker2.color;
		context.beginPath();
		context.arc(small1.x,small1.y,15,0,Math.PI*2);
		context.closePath();
		context.fill();
		// context.moveTo(canWidth/3-120,canHeight/2-80);
		context.beginPath();
		context.arc(small2.x,small2.y,5,0,Math.PI*2);
		context.closePath();
		context.fill();
		context.beginPath();
		context.arc(small3.x,small3.y,10,0,Math.PI*2);
		context.closePath();
		context.fill();
		context.beginPath();
		context.arc(small4.x,small4.y,5,0,Math.PI*2);
		context.closePath();
		context.fill();
		context.restore();
	}
	function drawWorker2(){
		if(anim){
			worker2R = worker2R + 0.05;
			worker2R = Math.min(worker2R,75);
		}	
		if (moveAnim) {
			var v = Math.abs(canWidth/2-mouseX)/80000;
			if (canWidth/2-mouseX > 0) {
				worker2.x = worker2.x + v;
			}else{
				worker2.x = worker2.x - v;
			}
		};
		context.save();
		context.fillStyle = worker2.color;
		context.beginPath();
		context.arc(worker2.x,worker2.y,worker2R,0,Math.PI*2);
		context.closePath();
		context.fill();
		context.restore();
		if(worker2.name != '' && worker2R == 75){
			console.log("liuchi"+worker2.name);
			context.save();
			context.fillStyle = '#AEEEEE';
			context.font = "18px Microsoft Yahei";
			context.fillText(worker2.name,worker2.x - 40,worker2.y + 6);
			context.restore();
		}
	}
	function drawWorker3(){
		if (anim) {
			worker3R = worker3R + 0.07;
			worker3R = Math.min(worker3R,60);
		};
		if (moveAnim) {
			var v = Math.abs(canWidth/2-mouseX)/80000;
			if (canWidth/2-mouseX > 0) {
				worker3.x = worker3.x + v;
			}else{
				worker3.x = worker3.x - v;
			}
		};
		context.save();
		context.fillStyle = worker3.color;
		context.beginPath();
		context.arc(worker3.x,worker3.y,worker3R,0,Math.PI*2);
		context.closePath();
		context.fill();
		context.restore();
		if(worker3.name != ''&&worker3R == 60){
			// console.log("liuchi");
			context.save();
			context.fillStyle = '#AEEEEE';
			context.font = "18px Microsoft Yahei";
			context.fillText(worker3.name,worker3.x - 25,worker3.y + 6);
			context.restore();
		}
	}
	function drawWorker4(){
		if (anim) {
			worker4R = worker4R + 0.06;
			worker4R = Math.min(worker4R,65);
		};
		if (moveAnim) {
			var v = Math.abs(canWidth/2-mouseX)/80000;
			if (canWidth/2-mouseX > 0) {
				worker4.x = worker4.x + v;
			}else{
				worker4.x = worker4.x - v;
			}
		};
		context.save();
		context.fillStyle = worker4.color;
		context.beginPath();
		context.arc(worker4.x,worker4.y,worker4R,0,Math.PI*2);
		context.closePath();
		context.fill();
		context.restore();
		if(worker4.name != ''&&worker4R == 65){
			// console.log("liuchi");
			context.save();
			context.fillStyle = '#AEEEEE';
			context.font = "18px Microsoft Yahei";
			context.fillText(worker4.name,worker4.x - 40,worker4.y + 6);
			context.restore();
		}
	}
	function drawWorker4Weinys(){
		if (anim) {
			var resultXY;
			resultXY = closerR2R(weiny1,worker4);
			weiny1.x = resultXY.x;
			weiny1.y = resultXY.y;
			resultXY = closerR2R(weiny2,worker4);
			weiny2.x = resultXY.x;
			weiny2.y = resultXY.y;
			resultXY = closerR2R(weiny3,worker4);
			weiny3.x = resultXY.x;
			weiny3.y = resultXY.y;
		}
		if (moveAnim) {
			var v = Math.abs(canWidth/2-mouseX)/80000;
			if (canWidth/2-mouseX > 0) {
				weiny1.x = weiny1.x + v;
				weiny2.x = weiny2.x + v;
				weiny3.x = weiny3.x + v;
			}else{
				weiny1.x = weiny1.x - v;
				weiny2.x = weiny2.x - v;
				weiny3.x = weiny3.x - v;
			}
		};
		context.save();
		context.fillStyle = worker4.color;
		context.beginPath();
		context.arc(weiny1.x,weiny1.y,8,0,Math.PI*2);
		context.closePath();
		context.fill();
		context.beginPath();
		context.arc(weiny2.x,weiny2.y,14,0,Math.PI*2);
		context.closePath();
		context.fill();
		context.beginPath();
		context.arc(weiny3.x,weiny3.y,20,0,Math.PI*2);
		context.closePath();
		context.fill();
		context.restore();
	}
	function drawWorker3Taddys(){
		if (anim) {
			var resultXY;
			resultXY = closerR2R(taddy1,worker3);
			taddy1.x = resultXY.x;
			taddy1.y = resultXY.y;
			resultXY = closerR2R(taddy2,worker3);
			taddy2.x = resultXY.x;
			taddy2.y = resultXY.y;
		}
		if (moveAnim) {
			var v = Math.abs(canWidth/2-mouseX)/80000;
			if (canWidth/2-mouseX > 0) {
				taddy1.x = taddy1.x + v;
				taddy2.x = taddy2.x + v;
			}else{
				taddy1.x = taddy1.x - v;
				taddy2.x = taddy2.x - v;
			}
		};
		context.save();
		context.fillStyle = worker3.color;
		context.beginPath();
		context.arc(taddy1.x,taddy1.y,15,0,Math.PI*2);
		context.closePath();
		context.fill();
		context.beginPath();
		context.arc(taddy2.x,taddy2.y,20,0,Math.PI*2);
		context.closePath();
		context.fill();
		context.restore();
	}
})
function showEdit(ele){
	var alayout = ele.parentNode;
	var showEditIcon = ele.firstChild;
	var mask = alayout.firstChild;
	if (mask.style.display == "block") {
		mask.style.display = "none";
		showEditIcon.style.transform = "rotate(0deg)";
	}else{
		mask.style.display ="block";
		showEditIcon.style.transform = "rotate(180deg)";
	}
}
function deleteLay(ele){
	var id = ele.getAttribute("id");
	var layId = id.split("layoutDelete")[1];
	$.ajax({
		type:'DELETE',
		url:"/layoutDelete?id=" + layId
	}).done(function(results){
		if(results.success === 1){
			console.log("delete success");
			$('#'+layId).remove();
		}
	})
}