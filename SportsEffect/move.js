function move(obj,attr,iTarget,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iCurAttr = attr == 'opacity' 
			? parseInt(parseFloat(getStyleAttr(obj,attr))*100)  
			: parseInt(getStyleAttr(obj,attr));
		
		var iSpeed = (iTarget - iCurAttr)/8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		if(iCurAttr == iTarget){
			clearInterval(obj.timer);
			if(typeof fn === 'function'){
				fn();
			}
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

function move2(obj,attrJson,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var bAllDone = true;
		for(var attr in  attrJson){
			//bAllDone = true;
			var iCurAttr = attr == 'opacity' 
			? parseInt(parseFloat(getStyleAttr(obj,attr))*100)  
			: parseInt(getStyleAttr(obj,attr));
		
			var iSpeed = (attrJson[attr] - iCurAttr)/8;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if(iCurAttr == attrJson[attr]){
				bAllDone = true;
			}else{
				bAllDone = false;
				if(attr == 'opacity'){
					obj.style.filter = 'alpha(opacity:' + (iCurAttr + iSpeed) +')';
					obj.style.opacity = (iCurAttr + iSpeed)/100;
				}else{
					obj.style[attr] = iCurAttr + iSpeed + 'px';
				}
			}
			//1
		}
		//2
		if(bAllDone){
			clearInterval(obj.timer);
			if(typeof fn === 'function'){fn();}
		}
	},30);
}