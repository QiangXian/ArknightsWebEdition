let items = document.getElementsByClassName("item");
let list = document.querySelector('.list');
let container = document.querySelector(".container");
let widthUnit = 21.875;

//适配移动端屏幕宽度
//动态根据图片生成小点
let pointWrap = document.querySelector(".point");
pointWrap.style.width = widthUnit + 'rem';
let points = [] ;
for(let i = 0 ; i < items.length ; i ++){
	items[i].style.width = widthUnit + 'rem';
	//生成白点
	_creatPoint(i);
}
list.style.width = items.length * widthUnit + 'rem';

//动态根据图片生成小点
function _creatPoint(i){
	let pointDom = document.createElement("li");
	pointDom.classList.add('point-item');
	if( i === 0){
		pointDom.classList.add('active');
	}
	pointDom.style.width = (widthUnit / (items.length + 0.5 )) + "rem";
	points.push(pointDom);
	pointWrap.appendChild(pointDom);
}

//小点随着index变化
var _dot = function(){
	let dots = document.getElementsByClassName('point-item');
	for(let i = 0 ; i < dots.length ; i++ ){
		dots[i].className = "point-item";
	}
	dots[state.index].className = "point-item active";
}

//触摸开始，touchstart
//当手指摸到屏幕的时候触发
//click
let state = {
	beginX : 0 ,
	endX:0 ,
	nowX:0 ,
	index:0 ,
}

//复位
var _reset = function(){
	//需要过渡让复位效果更自然
	list.style.transition = 'all,0.3s'; 
	//现在在第几张就复位到第几张
	list.style.marginLeft = - state.index * widthUnit + 'rem' ;
	_dot();
}

//上一张
var _goPrev = function(){
	if(state.index > 0){
		state.index-- ;
		list.style.transition = 'all,0.3s'; 
		list.style.marginLeft = - state.index * widthUnit + 'rem';
		_dot();
	}else{
		//复位
		_reset();
	}
}

//下一张
var _goNext = function(){
	if(state.index < items.length - 1){
		state.index++ ;
		list.style.transition = 'all,0.3s'; 
		list.style.marginLeft = -state.index * widthUnit + 'rem';
		_dot();
	}else if(state.index === items.length - 1){
		state.index = 0 ;
		list.style.transition = 'all,0.3s'; 
		list.style.marginLeft = -state.index * widthUnit + 'rem';
		_dot();
	}else{
		//复位
		_reset();
	}
}

//根据滑动距离判断应当是上还是下一张，或者复位
var _judgeMove = function(){
	let deltaX = state.endX - state.beginX ;
	if(deltaX <= -widthUnit * 2/5 ){
		//下一张
		_goNext();
	}else if(deltaX >= widthUnit * 2/5 ){
		//上一张
		_goPrev();
	}else{
		//不动
		_reset();
	}
}

//滑动图片时应当切换的当前图片位置，可能出现滑动时跳转至第一张图片的bug
var _slice = function(){
	let deltaX = state.nowX - state.beginX;
	list.style.marginLeft= (- state.index * widthUnit) + deltaX + "rem" ;
}

//点击长条跳转至相应广告
let dots = document.querySelectorAll('.point-item')
//遍历li .point-item标签,为每个标签添加eventListener
for(let i = 0 ; i <dots.length ; i++){
	dots[i].addEventListener('click',function(e){
		//点击白条后跳转至相应页面
		state.index = i ;
		list.style.transition = 'all,0.3s';
		list.style.marginLeft = -state.index * widthUnit + 'rem';
		_dot();
	})
}

setInterval(function(){
		_goNext();
	},4000);
