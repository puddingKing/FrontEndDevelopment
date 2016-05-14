var resizablePanelObj=function(){
}

resizablePanelObj.prototype.init=function(){
	
	resizablePanel("uiResizablePanel");
}

function mouseDownResizablePanel(e,panel,ctrl,type){
	var e = e||window.event;
			//鼠标在当前元素的位置
	m_start_x = e.pageX - ctrl.offsetLeft;
	m_start_y = e.pageY - ctrl.offsetTop;

	m_panel = panel;
	m_ctrl = ctrl;
	m_type = type;
	//开始侦听移动
	moving = setInterval(mouseMoveResizablePanel,10);
}

document.onmousemove = function(e){
	var e=window.event||e;
    m_to_x = e.pageX;
    m_to_y = e.pageY;
}

function mouseUpResizablePanel(){
	clearInterval(moving);
	moving = 0;
	var cls = document.getElementsByClassName('ui-Resizable-ctrl');
	for(var i = 0;i < cls.length;i++){
		cls[i].style.left = "";
		cls[i].style.top = "";
	}
}

function mouseMoveResizablePanel(){
	if(moving){
		var to_x = m_to_x - m_start_x;
		var to_y = m_to_y - m_start_y;

		var min_x = m_panel.offsetLeft;
		var min_y = m_panel.offsetTop;

		to_x=Math.max(min_x,to_x);
		to_y=Math.max(min_y,to_y);

		switch(m_type){
			case 'r':
				m_ctrl.style.left = to_x + 'px';
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

function resizablePanel(panel_id){
	var panel=document.getElementById(panel_id);
	var r=document.createElement("div");
	var b=document.createElement("div");
	var rb=document.createElement("div");

	r.class=r.className="ui-Resizable-r ui-Resizable-ctrl";
	b.class=b.className="ui-Resizable-b ui-Resizable-ctrl";
	rb.class=rb.className="ui-Resizable-rb ui-Resizable-ctrl";
	panel.appendChild(r);
	panel.appendChild(b);
	panel.appendChild(rb);
	


	r.addEventListener('mousedown',function(e){
		mouseDownResizablePanel(e,panel,r,'r');
	});
	b.addEventListener('mousedown',function(e){
		mouseDownResizablePanel(e,panel,b,'b');
	})
	rb.addEventListener('mousedown',function(e){
		mouseDownResizablePanel(e,panel,rb,'rb');
	})

	r.addEventListener('mouseup',function(e){
		mouseUpResizablePanel();
	});
	b.addEventListener('mouseup',function(e){
		mouseUpResizablePanel();
	});
	rb.addEventListener('mouseup',function(e){
		mouseUpResizablePanel();
	});
}