function move(obj,attr,iTarget){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iCurAttr = attr == 'opacity' 
			? parseInt(parseFloat(getStyleAttr(obj,attr))*100)  
			: parseInt(getStyleAttr(obj,attr));
		
		var iSpeed = (iTarget - iCurAttr)/8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		if(iCurAttr == iTarget){
			clearInterval(obj.timer);
		}else{
			if(attr == 'opacity'){
				obj.style.filter = 'alpha(opacity:' + (iCurAttr + iSpeed) +')';
				obj.style.opacity = (iCurAttr + iSpeed)/100;
			}else{
				obj.style[attr] = iCurAttr + iSpeed + 'px';
			}
		}
	},30);
}

function getStyleAttr(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}