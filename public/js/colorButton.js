var colorButtonObj=function(){
     this.unit=20;
}
colorButtonObj.prototype.init=function(ele){
    var data_color=ele.getAttribute("data-color");
    var data_size=ele.getAttribute("data-size");
    var data_name=ele.getAttribute("data-name");
    data_size = Math.min(10,data_size);
    data_size = Math.max(1.8,data_size);
    if(data_size!=null){       
    	var divWidth=parseInt(this.unit*data_size*2);
    	var divHeight=parseInt(this.unit*data_size-divWidth/10);    	
    }else{
    	var divWidth=parseInt(this.unit*2*2);
    	var divHeight=parseInt(this.unit*2-divWidth/10);
    }  
    var divFontSize = divHeight / 2;
    var divLineHeight = (((divHeight  - divFontSize) / 2) / divFontSize)*3.6;
 /*   
    var button=document.createElement("div"); 
    button.style.width = divWidth + "px";
    button.style.height = divHeight + "px";
    button.style.lineHeight = divLineHeight.toString();
    button.className = "colorButtonClass";
    button.style.fontSize = divFontSize + "px";    
    button.innerHTML = data_name;//.toString();
    ele.appendChild(button);
*/
    ele.style.width = divWidth + "px";
    ele.style.height = divHeight + "px";
    ele.style.lineHeight = divLineHeight.toString();
    ele.className = "lakeColorButton colorButtonClass";
    ele.style.fontSize = divFontSize + "px";    
   // ele.innerHTML = data_name;//.toString();

}

