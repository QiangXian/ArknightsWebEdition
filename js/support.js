
//显示系统时间
Date.prototype.format = function (fmt) {
            var o = {
                "y+": this.getFullYear, //年
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds() //秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
setInterval("document.getElementById('dateTime').innerHTML = (new Date()).format('yyyy-MM-dd hh:mm:ss');", 10);

//根据屏幕大小适配更改
let docSet = document.documentElement;
reSetRem(docSet);
function reSetRem(docSet){
	if(docSet.clientWidth < 1600 ){
		let width = 10 ;
		docSet.style.fontSize = width + "px";
		//动态缩放图片
		let imgs = document.querySelectorAll("img");
		console.log(imgs);
		for(let i = 0 ; i < imgs.length ; i++ ){
			if(imgs[i].id == "brain"){
				imgs[i].style.marginLeft = '-0.9rem';
			  	imgs[i].style.transform = 'scale(0.7) rotateY(180deg)';
			}else if(imgs[i].classList != "unic"){
				imgs[i].style.transform = 'scale(0.6)';
			}
		}
	}
}
