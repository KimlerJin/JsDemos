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

/**
这个方法是 offsetXxx的替代，offsetXxx虽然方便，但是有隐患
因为offsetXxx是含边框及滚动条宽度的,而此方法只取CSS定义的
属性如 width:200px;height:100px;font-size:12px等等.
*/
function getStyleAttr(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}

/** 此方法与最上面的move原理相同，为了看出区别，另起了一个方法，
在demo中调用了不同的方法，其实可以都用这一个。
*/
function move2(obj,attrJson,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var bAllDone = true;
		for(var attr in  attrJson){
			var iCurAttr = attr == 'opacity' 
			? parseInt(parseFloat(getStyleAttr(obj,attr))*100)  
			: parseInt(getStyleAttr(obj,attr));
			
			//8是运动速度系数，数值越大,运动越慢。
			var iSpeed = (attrJson[attr] - iCurAttr)/8; 
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if(iCurAttr != attrJson[attr]){
				bAllDone = false;
			}

			if(attr == 'opacity'){
				obj.style.filter = 'alpha(opacity:' + (iCurAttr + iSpeed) +')';
				obj.style.opacity = (iCurAttr + iSpeed)/100;
			}else{
				obj.style[attr] = iCurAttr + iSpeed + 'px';
			}
		}

		if(bAllDone){
			clearInterval(obj.timer);
			if(typeof fn === 'function'){fn();}
		}
		
	},30);
}