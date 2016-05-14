$(function(){
	var page = document.getElementById("page");
	var data = document.getElementById("data");
	
	var p = data.getElementsByTagName("p")[0];
	var pHtml;
	var divData = [];
	$('#show').hide();
	pHtml = p.firstChild.nodeValue;
	var divs = JSON.parse(pHtml);
	for (var i = 0; i < divs.length; i++) {
		var item = divs[i];
		showEle(item,page);
	};
	$('#output').bind('click',function(){
		var pageHtml = page.innerHTML;
		pageHtml = ToHtmlString(pageHtml);
		$('#show').html(pageHtml);
		$('#show').fadeIn();
		$('#mask').show();
	})
	$('#mask').bind('click',function(){
		$(this).fadeOut();
		$('#show').hide();
	})
	
})

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
//Html结构转字符串形式显示 支持<br>换行 
function ToHtmlString(htmlStr) {
    return toTXT(htmlStr).replace(/\&lt\;br[\&ensp\;|\&emsp\;]*[\/]?\&gt\;|\r\n|\n/g, "<br/>");
}
//Html结构转字符串形式显示
function toTXT(str) {
    var RexStr = /\<|\>|\"|\'|\&|　| /g
    str = str.replace(RexStr,
    function (MatchStr) {
        switch (MatchStr) {
            case "<":
                return "&lt;";
                break;
            case ">":
                return "&gt;";
                break;
            case "\"":
                return "&quot;";
                break;
            case "'":
                return "&#39;";
                break;
            case "&":
                return "&amp;";
                break;
            case " ":
                return "&ensp;";
                break;
            case "　":
                return "&emsp;";
                break;
            default:
                break;
        }
    }
    )
    return str;
} 