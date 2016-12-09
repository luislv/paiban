/*微信公众内嵌web app公共脚本*/
function pageResize(){}
var loadingEffect = $(".loadingicon"), spinner;
var spinOpts = {
	lines: 12,
	length: 8,
	width: 4,
	radius: 10,
	corners: 1,
	diraction: 1,
	color: '#FFF',
	speed: 0.5,
	trail: 50,
	top: '18%',
	left: '18%'
}
var arr_scroll = [], arr_scrollwrap = $(".scroll-pagewrap");
function loaddata(){}
function showSelect(){}
function chgSelect(){}
var nav = $(".nav").length ? $(".nav") : '';
var footnav = $(".footnav").length ? $(".footnav") : '';
var scalp = $(".screen").length ? $(".screen") : '' ;
var linklist = $(".unit-list, .doc-list, .news-list, .search-dlist, uc-order-list, consult-list, ac-cs-list");
var popup, ptheight = parseInt($(".pop-title").outerHeight());
var answerheight = parseInt($(".greenanswer-title").outerHeight());
var ny_domain = window.location.host.split(".")[1] + "." + window.location.host.split(".")[2];
var dataParam = '';
var u = navigator.userAgent, app = navigator.appVersion;
var android = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
var ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var hasUTel = !!$(".unit-tel").length;
var nodate = function(){//date兼容检测
	var i = document.createElement('input');
	i.setAttribute('type', 'date');
	if(i.type == 'text'){
		return true;
	}else{
		return false;
	}
}();
//@ init
function init(){
	$(".news-detail iframe").length ? fixFlash() : null;
	$(document).bind("touchstart", function(e){});
	$(".news-bn-img, .news-sj-img").height($(window).width()*0.5);
	$(".uc-family-item").height($(window).width()*0.44926);
	$(".index-banner#tbanner").height($(window).width()*0.33);
	$(".index-banner#mbanner").height($(window).width()*0.25);
	spinner = loadingEffect.length ?  new Spinner(spinOpts).spin(loadingEffect[0]) : '';
	if(nav){
		$(".wrap").addClass("hasNav");
		nav.find(".nav-inav").bind("click", function(e){
			$(".shade").toggleClass("hidden");
			if($(".shade").hasClass("hidden")){
				$(".nav-menu").slideUp(100);
				$(".shade").removeClass("mshade");
			}else{
				$(".nav-menu").slideDown(100);
				$(".shade").addClass("mshade");
			}
		});	
		$(".nav").delegate(".nav-menu-item", "click", function(){
			$(".nav-menu").slideUp(100);
			$(".shade").hide();
		});
	}
	if(footnav){
		$(".wrap").addClass("hasFootnav");
	}
	if(scalp){  
		var curl = window.location.href; 
		var areaid = curl.match(/^(.*area=)([\d]+)(.*?)$/) ? curl.match(/^(.*area=)([\d]+)(.*?)$/)[2] : ''; 
		var levelid = curl.match(/^(.*level=)([A-Z])(.*?)$/) ? curl.match(/^(.*level=)([A-Z])(.*?)$/)[2] : ''; 
		var typeid = curl.match(/^(.*class=)([\d]+)(.*?)$/) ? curl.match(/^(.*class=)([\d]+)(.*?)$/)[2] : ''; 
		if(areaid){ 
			if($("#area .screen-page-item[value='"+areaid+"']").length){
				$(".screen-area").text($("#area .screen-page-item[value='"+areaid+"']").text());
				$("#area .screen-page-item[value='"+areaid+"']").addClass("active").siblings(".screen-page-item").removeClass("active");
			}
		}else{
			$("#area .screen-page-item:first").addClass("active").siblings(".screen-page-item").removeClass("active");
		}
		if(levelid){ 
			if($("#grade .screen-page-item[value='"+levelid+"']").length){ 
				$(".screen-level").text($("#grade .screen-page-item[value='"+levelid+"']").text());
				$("#grade .screen-page-item[value='"+levelid+"']").addClass("active").siblings(".screen-page-item").removeClass("active");
			}
		}else{
			$("#grade .screen-page-item:first").addClass("active").siblings(".screen-page-item").removeClass("active");
		}
		if(typeid){ 
			if($("#type .screen-page-item[value='"+typeid+"']").length){
				$(".screen-type").text($("#type .screen-page-item[value='"+typeid+"']").text());
				$("#type .screen-page-item[value='"+typeid+"']").addClass("active").siblings(".screen-page-item").removeClass("active");
			}
		}else{
			$("#type .screen-page-item:first").addClass("active").siblings(".screen-page-item").removeClass("active");
		}
		if(areaid || levelid || typeid){
			$(".addmore").attr("data-url", curl+'&p=2');
		}
		scalp.delegate(".screen-title-item", "click", function(e){
			var obj = $(this);
			e.stopPropagation();
			obj.toggleClass("active").siblings(".screen-title-item").removeClass("active");
			if(obj.hasClass("active")){
				$(".screen-page").eq(obj.index()).slideDown().siblings(".screen-page").slideUp();
				$(".shade").addClass("nshade");
			}else{
				$(".screen-page").eq(obj.index()).slideUp();
				$(".shade").removeClass("nshade");
			}
		});
		scalp.delegate(".screen-page-item", "click", function(e){
			e.stopPropagation();
			$(".screen-title-item").removeClass("active");
			$(".screen-page").slideUp();
			$(".shade").removeClass("nshade");
			if($(this).parents(".consult")){
				chgSelect(this);
			}
		});
		scalp.find(".screen-page").css("opacity", 1).hide();
	}
	if(linklist.length > 0 && !ios){ //修复swiper中的a没有点击效果
		$(linklist).find("a:not('.addmore')").on("mousedown touchstart", function(){
			$(this).addClass("bg_agray");
		}).on("mouseup touchend", function(){
			$(this).removeClass("bg_agray");
		});
	}
	$(".pop-dwrap").addClass("invisible").show();
	var ptheight = $(".pop-title").outerHeight();
	var answerheight = $(".greenanswer-title").outerHeight();
	var answidth=$(window).width()*0.904;
	var greenpopheight =$(window).width()*0.904*1.5;//一问多答弹窗高度
	var wheight=$(window).height();
	$(".greenanswer-popup").width($(window).width()*0.904);
	if($(window).height()==480){
		$(".greenanswer-popup").height(greenpopheight - answerheight-120);
		$(".answermore-con").height(greenpopheight - answerheight-50-120);
		$(".greenanswer-box").css({"height":greenpopheight-120,"width":answidth,"marginTop":-(greenpopheight-120)/2});
		$(".answbotbtn").css({"bottom":(wheight-greenpopheight+120)/2});
	}else{
		$(".greenanswer-popup").height(greenpopheight - answerheight);
		$(".answermore-con").height(greenpopheight - answerheight-50);
		$(".greenanswer-box").css({"height":greenpopheight,"width":answidth,"marginTop":-greenpopheight/2});
		$(".answbotbtn").css({"bottom":(wheight-greenpopheight)/2});
	}
	if($(window).width() >= 768){
		$(".popup, .consult-popup").height($(window).height() - $(window).width() * 0.048 - ptheight);
	}else{
		$(".popup, .consult-popup").height($(window).height() - $(window).width() * 0.096 - ptheight);
	}
	$(".pop-dwrap").removeClass("invisible").hide();
	popup = new Swiper(".popup", {
		direction: 'vertical',
        scrollbar: '.pop-scrollbar',
        slidesPerView: 'auto',
        grabCursor: true,
        freeMode: true,
        mousewheelSensitivity: 18
	});
	$(".shade").bind("click", function(e){
		e.stopPropagation();
		if($(this).hasClass("nshade")){
			$(".screen-title-item").removeClass("active");
			$(".screen-page").slideUp();
			$(this).removeClass("nshade");
		}else if($(this).hasClass("mshade")){
			$(".nav-menu").slideUp();
			$(this).addClass("hidden").removeClass("mshade");
		}
	});
	if($(".cuttle").length > 0){
		initCuttle();
	}
	if(ios){
		if($(".ac-form-submit, .order-confirm, .order-full, .order-pay, .insurance").length > 0){
			$(".ac-form-submit, .fixedtop, .fixedbtm").css("position", "static");
			$(".wrap").css({"paddingBottom": "0px"});
			if($(".nav").length > 0){
				$("body").css({"position": "relative"});
				$(".nav").css({"position": "absolute"});
			}else{
				$(".wrap").removeClass("hasNav");
			}
			if($(".ac-info-title").length > 0){
				$(".ac-info-title").css("position", "absolute");
			}
		}
		if($(".cs-detail-send").length){
			$(".wrap").css({"paddingBottom": "0px"});
			$(".cs-detail-send").parents(".fixedbtm").css("position", "static");
			$("html, body").scrollTop($(".cs-detail-send").offset().top);
			if($(".wrap").outerHeight() < $(window).height()){
				$(".fixedbtm").css("paddingTop", $(window).height()-$(".wrap").outerHeight());
			}
		}
		if($("input, textarea").length > 0){
			if($(".reg").length > 0){
				$(".nav").css("position", "absolute");
			}else{
				$("input, textarea").bind("select focusin", function(){
					$("html, body").scrollTop($(this).offset().top);
				});	
			}
		}
	}
	if(nodate && $("input[type='date']").length > 0){
		$("input[type='date']").attr("type", "text");
	}
	if($(".index .search-shade").length > 0){
		searchShade();
	}
	if($(".user-footer-link").length > 0){
		if($(window).height() > $(".wrap").outerHeight()){
			var minHeight =  $(window).height() - parseInt($(".wrap").css("paddingTop")) - parseInt($(".wrap").css("paddingBottom"));
			$(".wrap").height(minHeight);
		}
		$(".wrap").addClass("relative").height();
	}
}

//@ resize
function resize(){
	$(".news-detail iframe").length ? fixFlash() : null;
	$(".news-bn-img, .news-sj-img").height($(window).width()*0.5);
	$(".uc-family-item").height($(window).width()*0.44926);
	$(".index-banner#tbanner").height($(window).width()*0.33);
	$(".index-banner#mbanner").height($(window).width()*0.25);
	if(arr_scrollwrap.length > 0){
		var navh = parseInt($(".wrap").css("paddingTop")); 
		$(".scroll-pagewrap").css("height", $(window).height()-navh); 
	}
	$(".pop-dwrap").addClass("invisible").show();
	var ptheight = $(".pop-title").outerHeight();
	var answerheight = $(".greenanswer-title").outerHeight();
	var answidth=$(window).width()*0.904;
	var greenpopheight =$(window).width()*0.904*1.5;//一问多答弹窗高度
	var wheight=$(window).height();
	$(".greenanswer-popup").width($(window).width()*0.904);
	if($(window).height()==480){
		$(".greenanswer-popup").height(greenpopheight - answerheight-120);
		$(".answermore-con").height(greenpopheight - answerheight-50-120);
		$(".greenanswer-box").css({"height":greenpopheight-120,"width":answidth,"marginTop":-(greenpopheight-120)/2});
		$(".answbotbtn").css({"bottom":(wheight-greenpopheight+120)/2});
	}else{
		$(".greenanswer-popup").height(greenpopheight - answerheight);
		$(".answermore-con").height(greenpopheight - answerheight-50);
		$(".greenanswer-box").css({"height":greenpopheight,"width":answidth,"marginTop":-greenpopheight/2});
		$(".answbotbtn").css({"bottom":(wheight-greenpopheight)/2});
	}
	

	if($(window).width() >= 768){
		$(".popup").height($(window).height() - $(window).width() * 0.048 - ptheight);
	}else{
		$(".popup").height($(window).height() - $(window).width() * 0.096 - ptheight);
	}
	$(".pop-dwrap").removeClass("invisible").hide();
	if($(".cuttle").length > 0){
		initCuttle();
	}
	if($(".index .search-shade").length > 0){
		searchShade();
	}
	if($(".user-footer-link").length > 0){
		$(".wrap").removeAttr("style");
		if($(window).height() > $(".wrap").outerHeight()){
			var minHeight =  $(window).height() - parseInt($(".wrap").css("paddingTop")) - parseInt($(".wrap").css("paddingBottom"));
			$(".wrap").height(minHeight);
		}
		$(".wrap").addClass("relative").height();
	}
}

//@ 视频和多媒体文件高度自适应
function fixFlash(){
	var flash = $(".news-detail iframe");
	flash.each(function(){
		var obj = $(this);
		var percent = obj.height() / obj.width();
		var width = $(".news-detail").width();
		obj.width(width).height(width*percent);
		obj.attr({"width": width, "height": width*percent});
	});
}

//@ 显示错误提示
function showTips(msg){
	return popTips(msg);
}

//@ 显示加载中提示
function showLoading(msg){
	var obj = $(".loading");
	if(msg){
		if($(".loadingtips").length > 0){
			$(".loadingtips").html(msg);
		}else{
			var str = "<div class='loadingtips'>" + msg +"</div>";
			$(".loading").append(str);
		}
		$(".loading").css({"marginTop": obj.height()*-0.5, "marginLeft": obj.width()*-0.5});
	}
	$(".loading").show();
}

//@ 显示加载中提示
function hideLoading(msg){
	$(".loading").hide();
	if($(".loadingtips").length > 0){
		$(".loadingtips").remove();
		$(".loading").css({"marginTop": "-40px", "marginLeft": "-40px"});
	}
}

//@ 显示成功提示
function showSuccess(msg){
	var str = msg ? msg : "操作成功";
	$(".success").find(".success-msg").html(str).end().show();
	$(".loading").hide();
	setTimeout(function(){
		$(".success").hide();
	}, 3000);
}

//@ 显示动作提示
//@ param title 提示标题，默认为空
//@ param msg 提示内容，默认为空
//@ param duration 提示持续时间，默认3秒，若为sync则一直显示
//@ param args 对象数组，有name address events属性，存储按钮字面义和链接
function showPrompt(title, msg, duration, args){
	var title = title ? title : "", msg = msg ? msg : "", duration = duration ? duration : 3000, args;
	var event_0 = args[0].events ? args[0].events : function(){}, event_1 = typeof args[1] != 'undefined' ? args[1].events : function(){};
	function reset(){
		$(".prompt").removeClass("show");
		$(".prompt-box").removeClass("slipin");
		$(".prompt-title, .prompt-msg, .prompt-btn").empty();
		$(".prompt-btn").unbind();
		$(".prompt-btn").removeClass("half");
		$(".prompt-box, .prompt-msg").removeClass("style");
	}
	$(".prompt-title").html(title);
	$(".prompt-msg").html(msg);
	if(args.length > 1){
		$(".prompt-btn").addClass("half");
	}
	if(args.length){
		for(var i = 0; i < args.length; i++){
			var curbtn = $(".prompt-btn").eq(i);
			curbtn.text(args[i].name);
			curbtn.attr("href", args[i].address ? args[i].address : "javascript:void(0);");
			curbtn.one("click", function(){
				var action = $(this).index() ? event_1 : event_0;
				if(typeof action == 'function') action(); 
				reset();
			});
		}
	}
	$(".prompt").addClass("show");
	$(".prompt-box").addClass("slipin");
	$(".prompt-msg").css({"maxHeight": $(window).height()*0.6+"px"});
	$(".prompt-box").css({"top": ($(window).height() - $(".prompt-box").height())/2+"px"});
	if(duration != "sync" && duration != "syncs"){
		setTimeout(function(){
			reset();
		}, duration);
	}else if(duration == "sync"){
		$(".prompt").one("click", function(){
			reset();
		});
	}
}

//@ 标签页
function showTab(){
	$(".tab-title").delegate(".tab-titem", "click", function(){
		var obj = $(this);
		obj.addClass("active").siblings(".tab-titem").removeClass("active"); 
		$(".tab-page").eq(obj.index()).removeClass("hidden");
		$(".tab-page").eq(obj.index()).siblings(".tab-page").addClass("hidden");
		if($(".cuttle").length){
			initCuttle();
		}
    if(typeof showPage == 'function'){
      showPage();
    }
	    if($(".pridoctor-list").length){
	    	widths();
    	}
	});
}

// 私人医生服务
function widths(){
    $(".pridoctor-list a").each(function(){
        var widths = $(window).width()*0.904- 60;
        var spanrgt = $(this).find('span.fright').width();
        $(this).find('span.fleft').width(widths-spanrgt);
        if($(this).find('em').hasClass('services-icon')){
            $(this).find('i').removeClass('typo_lgray').addClass('typo_orange');
        }
    });
}
//@ 抽屉初始化
function initCuttle(){
	$(".cuttle").each(function(){
		var obj = $(this), scuttle = obj.find(".cuttle-short"), lcuttle = obj.find(".cuttle-long"), cbtn = obj.find(".cuttle-btn");
		if(parseInt(lcuttle.height()) - parseInt(scuttle.height()) <= 0){
			cbtn.empty();
		}else{
			if(lcuttle.hasClass("hidden")){
				cbtn.html("展开<span class='iconfont'>&#xe625;</span>");
			}else{
				cbtn.html("折叠<span class='iconfont'>&#xe626;</span>");
			}
			if($(".order-confirm").length > 0){
				var str = scuttle.text();
				scuttle.addClass("short").text(str.substr(0, 35));
			}
		}
	});
}
 
//@ 抽屉式展开与折叠
function cuttle(carea){
	if(carea == 'all'){
		$(".cuttle").delegate(".cuttle-short", "click", function(){
			var obj = $(this), wrap = obj.parents(".cuttle"), scuttle = wrap.find(".cuttle-short"), lcuttle = wrap.find(".cuttle-long"), cbtn = wrap.find(".cuttle-btn"); 
			lcuttle.removeClass("hidden");
			scuttle.addClass("hidden");
			cbtn.html("折叠<span class='iconfont'>&#xe626;</span>");
		});	
		$(".cuttle").delegate(".cuttle-long", "click", function(){
			var obj = $(this), wrap = obj.parents(".cuttle"), scuttle = wrap.find(".cuttle-short"), lcuttle = wrap.find(".cuttle-long"), cbtn = wrap.find(".cuttle-btn"); 
			lcuttle.addClass("hidden");
			scuttle.removeClass("hidden");
			cbtn.html("展开<span class='iconfont'>&#xe625;</span>");
		});	
	}else{
		$(".cuttle").delegate(".cuttle-btn", "click", function(){
			var obj = $(this), wrap = obj.parents(".cuttle"), scuttle = wrap.find(".cuttle-short"), lcuttle = wrap.find(".cuttle-long"); 
			$(this).toggleClass("active");
			if($(this).hasClass("active")){
				lcuttle.removeClass("hidden");
				scuttle.addClass("hidden");
				$(this).html("折叠<span class='iconfont'>&#xe626;</span>");
			}else{
				lcuttle.addClass("hidden");
				scuttle.removeClass("hidden");
				$(this).html("展开<span class='iconfont'>&#xe625;</span>");
			}
		});	
	}
}
function lazyloadimg(){
	$(".lazyload").each(function(){
		if($(this).attr("data-url")){
			$(this).attr("src", $(this).attr("data-url")).removeClass("lazyload");
		}
	});
	if($(".lat_lng").length>0){
		var geolocation = new BMap.Geolocation(); 
	    getLocation = {};
	    geolocation.getCurrentPosition (function (r) {  
	    if (this.getStatus() == BMAP_STATUS_SUCCESS) {  
	        var mk = new BMap.Marker(r.point);
	            getLocation.currentLat = r.point.lat;//当前位置纬度
	            getLocation.currentLon = r.point.lng;//当前位置经度
	        } 
	        $(".lat_lng").each(function(){
	            var lat1 = getLocation.currentLat;
	            var lng1 = getLocation.currentLon;
	            var lat2 = parseFloat($(this).attr("lng"));
	            var lng2 = parseFloat($(this).attr("lat"));
	            if($(this).attr("lat")==''||$(this).attr("lng")==''){
                    $(this).html('')
                }else{
                    var distances = CoolWPDistance(lat1,lng1,lat2,lng2)
                    $(this).html(distances);
                }
	        });

	    });
	}
}
// 根据经纬度获取医院距离start
function getRad(d){   
    var PI = Math.PI;    
   return d*PI/180.0;    
}   
function CoolWPDistance(lat1,lng1,lat2,lng2){     
    var f = getRad((lat1 + lat2)/2);     
    var g = getRad((lat1 - lat2)/2);     
    var l = getRad((lng1 - lng2)/2);     
    var sg = Math.sin(g);     
    var sl = Math.sin(l);     
    var sf = Math.sin(f);     
    var s,c,w,r,d,h1,h2;     
    var a = 6378137.0;//The Radius of eath in meter.   
    var fl = 1/298.257;     
    sg = sg*sg;     
    sl = sl*sl;     
    sf = sf*sf;     
    s = sg*(1-sl) + (1-sf)*sl;     
    c = (1-sg)*(1-sl) + sf*sl;     
    w = Math.atan(Math.sqrt(s/c));     
    r = Math.sqrt(s*c)/w;     
    d = 2*w*a;     
    h1 = (3*r -1)/2/c;     
    h2 = (3*r +1)/2/s;     
    s = d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));  
    if(s >= 1000){
        var kilometer = s/1000;
        s = kilometer.toFixed(1) + 'km';
    }else{
        s = Math.round(s) + 'm';
    } 
    // s = s/1000;   
    // s = s.toFixed(2);//指定小数点后的位数。   
    return s;   
}
// 根据经纬度获取医院距离end 


//@ 显示提前加载页
function showPreload(container){
	var wrap = container, lazyload = wrap.find(".lazyload"), addmore = wrap.find(".addmore");
	var pattern = /^(.*?p=)([\d]+)(.*?)$/;
	wrap.find(".addmore-item").removeClass("addmore-item");
	lazyloadimg();
	addmore.each(function(){
		var obj = $(this), maxpage = parseInt(obj.attr("data-maxpage")), url = obj.attr("data-url"), result = url.match(pattern);
    var page = obj.attr("data-page") ? 1 + parseInt(obj.attr("data-page")) : parseInt(result[2]);
		//自定义参数
		if(dataParam != ''){
      var url = window.location.href;
			url += ((url.indexOf('?') !== -1) ? '&' : '?') + 'p=' + page + '&'+dataParam;
		}
		//end自定义参数

		if(page <= parseInt(maxpage)){ 
			if(!obj.hasClass("requesting")){
				obj.addClass("requesting");
				$.ajax({
					type: "get",
					url: url,
					async: true,
					complete: function(xhr, ts){
						obj.removeClass("requesting");
					},
					success: function(res){
						//自定义参数
						if(dataParam != ''){
              if(!obj.attr("data-page")){
                var adds = window.location.href;
                adds += ((adds.indexOf('?') !== -1) ? '&' : '?') + 'p=' + (page+1) + '&'+dataParam;
              }else{
                var adds = window.location.href;
                adds += ((adds.indexOf('?') !== -1) ? '&' : '?') + dataParam;
              }
						}else{
              if(!obj.attr("data-page")){
                var adds = result[1] + (page+1) + result[3];
              }else{
                var adds = result[1] + result[3];
              }
						}
            if(obj.attr("data-page")){
              obj.attr('data-page', page);
            }
						//end自定义参数
						obj.attr("data-url", adds);
						obj.removeClass("preload");
						loaddata(obj, res);
						var order = container.index(".scroll-pagewrap")
						arr_scroll[order].update({updateTranslate: true});
						
						lazyloadimg();
					}
				});			
			}
		}else{
			showSuccess("加载完毕");
			wrap.find(".addmore").remove();
		}
	});
}

//@ 图片和翻页预加载
//num: 单独控制某个scroll下拉滚动
//instant: 即时加载，为true时用户触发才加载，默认为空，预加载一页
function preload(num, instant){ 
	var obj = num ? arr_scrollwrap[num] : arr_scrollwrap;
	$(obj).each(function(){
		var num = $(".scroll-pagewrap").index($(this));
		var scrollbar = $(this).find(".scroll-bar");
		arr_scroll[num] = new Swiper(arr_scrollwrap.eq(num), {
			scrollbar: scrollbar,
			direction: 'vertical',
	        slidesPerView: 'auto',
	        mousewheelControl: !ios,
	        freeMode: true,
	        freeModeMomentumBounce: !ios,
	        freeModeMomentumRatio: 1,
	        mousewheelSensitivity: 18,
	        observer: true,
	        onTransitionStart: function(swiper){
	        	swiper.update({updateTranslate: true});	
	        	if(hasUTel){
	        		$(".unit-tel").fadeOut(500);
	        	}
	        },
	        onTransitionEnd: function(swiper){ 
	        	swiper.update({updateTranslate: true});	
	        	if(swiper.isEnd){
		        	showPreload(arr_scrollwrap.eq(num));
		        	swiper.update({updateTranslate: true});	
		        }
				if(swiper.isBeginning){
	        		$(".btn_top").addClass("hidden");
	        	}else{
	        		$(".btn_top").removeClass("hidden");
	        	}
	        	if(hasUTel){
	        		$(".unit-tel").fadeIn(500);
	        	}
	        	lazyloadimg();
	       }
		});
		$(this).find(".addmore").bind("click", function(){
			showPreload(arr_scrollwrap.eq(num));
			lazyloadimg();
			arr_scroll[num].update({updateTranslate: true});	
		});
		if(!instant){
			showPreload(arr_scrollwrap.eq(num));
			lazyloadimg();
		}
	});	
	$(".btn_top").bind("click", function(){
		var num;
		if($(".wallet-detail").length > 0){
			num = $(".scroll-pagewrap:visible").index();
		}else{
			num = $(".news-page.swiper-slide-active").length > 0 ? $(".news-page.swiper-slide-active").index() : '';
		}
		if(num){
			arr_scroll[num].slideTo(0, 500, false);
		}else{
			arr_scroll[0].slideTo(0, 500, false);
		}
	});
}

function showPageList(page){
  var obj = arr_scrollwrap.eq(0).find('.addmore'),
      page = 1,
      maxpage = parseInt(obj.attr("data-maxpage")),
      url = window.location.href;
  
  if(dataParam != ''){
    url += ((url.indexOf('?') !== -1) ? '&' : '?') + 'p=' + page + '&'+dataParam;
  }
  
  if(!obj.hasClass("requesting")){
    obj.addClass("requesting");
    $.ajax({
      type: "get",
      url: url,
      async: true,
      complete: function(xhr, ts){
        obj.removeClass("requesting");
      },
      success: function(res){
        obj.removeClass("preload").attr('data-page', page);
        loaddata(obj, res);
        var order = arr_scrollwrap.eq(0).index(".scroll-pagewrap");
        arr_scroll[order].update({updateTranslate: true});
      }
    });			
  }
}

//@ 显示弹出page
function showPop(title, code){
	$(".pop-dtitle").text(title);
	$(".pop-dlist").html(code);
	$(".pop-dwrap").show();
	$(".pop-iclose").one("click", function(){
		$(".pop-dwrap").hide();
	});
}

//@ 显示弹出蓝色一问多答
function showgreenPop(title, code){
	$(".greenanswer-dtitle").text(title);
	$(".greenanswer-dlist").html(code);
	$(".greenanswer-dwrap").show();
	$(".greenanswer-iclose").one("click", function(){
		$(".greenanswer-dwrap").hide();
		$("body,html").css({"overflow":"auto"});
		
	});
}

(function($){ 
	$(function(){
		init();
		if(arr_scrollwrap.length > 0){
			var navh = parseInt($(".wrap").css("paddingTop")); 
			$(".scroll-pagewrap").css("height", $(window).height()-navh);
			if($(".doc-wrap").length > 0){
				preload(null, true);
			}else{
				preload();
			}
		}
		$(window).resize(function(){
			resize();
			pageResize(); 
		});
		//GA事件统计
		$("[ga-statistics-click]").each(function(k,v){
			$(this).live('click',function(){
				ga('send','event',$(this).attr('ga-statistics-click'),'点击');
			});
		});
		$("[ga-statistics-show]").each(function(k,v){
      ga('send','event',$(this).attr('ga-statistics-show'),'展示');
		});
    
    //PB事件统计
		$("[jyst-statistics-click]").each(function(k,v){
			$(this).live('click',function(evt){
        //发送进点数据
				jyst('click', evt, $(this).attr('jyst-statistics-click'), '点击');
        return false;
			});
		});
		$("[jyst-statistics-show]").each(function(k,v){
      jyst('show', '', $(this).attr('jyst-statistics-show'), '展示');
		});
	});
  
  //搜索历史记录
  $("#new_search").focus(function () {
    var is_index_search = $(this).attr("index_search");
    getSearchHistoryList(is_index_search);
  }).blur(function () {
    $(document).bind("click", function (e) {//事件委托，在不点击search-history-box时才触发hide事件
//      if (!$(e.target).closest(".search-history-box").get(0)) {
//        hideSearchHistoryList();
//      }
    });
  });

  //清空搜索历史记录
  $(".search-history-clear").click(function () {
    $.cookieHelper('search_history', '', {expires: 315360000, path: '/', domain: ny_domain});
    hideSearchHistoryList();
  });

	  // 新增点评
	$(function(){
		$(".close-repop").on('click',function(){
			$(this).parents(".reviewmask").hide();
		});
	});
	// 新增点评
	lazyloadimg();

})(window.jQuery);

/**
 * 显示搜索历史列表
 * @param int is_index_search 是否是首页
 * @returns {undefined}
 */
function getSearchHistoryList(is_index_search){
  var search_history = getSearchHistoryCookie();
  if(search_history.length > 0){
    var search_history_html = '';
    for(var one in search_history){
      search_history_html += '<a class="search_history_item search_history_index block" >' + search_history[one] + '</a>';
    }
    $(".search-history-list").html(search_history_html);

    $(".search_history_item").click(function(evt){//搜索记录点击事件
      $("#new_search").val($(this).html());
      $("#new_search").parent().submit();

      jyst('click', evt, '搜索首页-历史搜索记录', '点击');
    });
    $(".search-history-box").show();

    if(is_index_search){//首页显示遮罩层
      $(".search-shade").show();
    }
  }
}

/**
 * 隐藏历史记录列表
 * @returns {undefined}
 */
function hideSearchHistoryList(){
  $(".search-history-list").hide();
  if ($("#new_search").attr("index_search")) {
    $(".search-shade").hide();
  }
  $(document).unbind("click");//去除事件
}

/**
 * 提交搜索时将搜索记录入cookie，只保存5条
 * @returns {undefined}
 */
function searchSubmit(){
  var search_history = getSearchHistoryCookie();
  var search_val = $("#new_search").val();
  if(search_val){
    for(var one in search_history){
      if(search_history[one] == search_val){
        search_history.splice(one, 1);
        break;
      }
    }
    search_history.unshift(search_val);
    if(search_history.length > 10){
      search_history.pop();
    }
    $.cookieHelper('search_history', JSON.stringify($.extend({}, search_history)), {expires: 315360000, path: '/', domain: ny_domain});
  }
}
/**
 * 获取cookie中的搜索记录
 * @returns {Array|jsonToArray.arr}
 */
function getSearchHistoryCookie(){
  var search_history = $.cookieHelper('search_history');
  if(search_history){
    search_history = jsonToArray(JSON.parse(search_history));
  }else{
    search_history = new Array();
  }
  return search_history;
}

function arrayToJson(arr){
  var json = Object();
  for(var i=0,len=arr.length; i<len; i++){
    json[i] = arr[i];
  }
  return json;
}
function jsonToArray(json){
  var arr = Array();
  if(typeof json == 'object'){
    for(var one in json){
      arr[one] = json[one];
    }
  }
  return arr;
}
function searchShade(){
	var height = $(window).height() - $(".ads_top:visible").height() - $(".index-nav").outerHeight();
	$(".search-shade").height(height);
}
function popTips(msg){
	var num = $(".user-tips").length;
	var str = '<div class="user-tips hidden typo_white typo_middle textc pagn mt10 lh_def" data-order="' + num + '"><div class="user-tips-msg pagn inblo">' + msg + '</div></div>';
	$(".user-tips").remove();
	$(".wrap").append(str);
	var curTips = $(".user-tips[data-order='"+num+"']");
	var marginTop = ($(window).height() - curTips.outerHeight()) / 2;
	curTips.css({"top": marginTop+"px"});
	curTips.fadeIn(300);
	setTimeout(function(){
		curTips.fadeOut(500);
	}, 3000);
  return false;
}
function setRecord(name, content){
	$.cookieHelper(name, content, {expires: 315360000, path: '/', domain: ny_domain});
}
function getRecord(name){
	var record = $.cookieHelper(name);
	return record;
}
//@param time:滚动间隔
function txtscroll(time){
	var arr_txtscroll = $(".txtscroll-box");
	arr_txtscroll.each(function(){
		var obj = $(this);
		var timer = setInterval(function(){
			var item = obj.find(".txtscroll-item"), list = obj.find(".txtscroll-list");
			if(parseInt(list.css("marginTop")) < 0){
				list.find(".txtscroll-item:first").appendTo(list);
				list.css("marginTop", "0px");
			}
			list.animate({"marginTop": -1*item.outerHeight()+"px"}, 300);
		}, time ? time : 3000);
	});
}


/**
 * 计算周岁
 * @param {type} strBirthday
 * @returns 
 */
function getAge(strBirthday) {
  if (strBirthday == '')
    return 0;

  var returnAge;
  var strBirthdayArr = strBirthday.split("-");
  var birthYear = strBirthdayArr[0];
  var birthMonth = strBirthdayArr[1];
  var birthDay = strBirthdayArr[2];

  var d = new Date();
  var nowYear = d.getFullYear();
  var nowMonth = d.getMonth() + 1;
  var nowDay = d.getDate();

  if (nowYear == birthYear) {
    returnAge = 0;//同年 则为0岁
  } else {
    var ageDiff = nowYear - birthYear; //年份差
    var mouthDiff = nowMonth - birthMonth; // 月份差
    var dayDiff = nowDay - birthDay; // 日差

    // 日差小于0，月份再减1
    if (dayDiff < 0) {
      mouthDiff = mouthDiff - 1;
    }

    // 月份差小于0，年份再减1
    if (mouthDiff < 0) {
      ageDiff = ageDiff - 1;
    }

    if (ageDiff > 0) {
      returnAge = ageDiff;
    } else {
      returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return returnAge;//返回周岁年龄
}

 /**
 * @ignore  =====================================================================================
 * @title   微信端打赏送心意s
 * @author  chenyang
 * @date    created in 2016-03-14
 * @version 1.0.0
 * @ignore  depend Library jquery
 * @ignore  =====================================================================================
 */
 var nykj = nykj || {};
 ;(function($){
   nykj.index = {
     init : function(){
       var _this = nykj.index;
       $('#blesses').on('click','dl',function(){
         $('#blesses dl').removeClass('choosed')
         $(this).addClass('choosed');
       });
       $('#sendBless').on('click',_this.send);
     },
     close : function(e){
       e.preventDefault();
       $('#mobilemask,#rulepop,#carepop').hide();
     },
     send : function(e){
       var _this = nykj.index;
       e.preventDefault();
       if(!$('.choosed').length){
         _this.tips('请选择一个心意');
       }
     },
     tips : function(txt){
       var _this = nykj.index;
       $('#mobilemask,#tippop').show();
       $('#tippop').text(txt);
       setTimeout(function(){
         $('#mobilemask,#tippop').hide();
         $('#tippop').text('');
       },2000)
     }
   };

   nykj.index.init();
 })(jQuery);


function Appendzero(obj) {
    if (obj < 10) return "0" + obj; else return obj;
}
$(function () {
	if($("#back-to-top").length>0){
		$("#back-to-top").hide();
		$(window).scroll(function(){
			if ($(window).scrollTop()>100){
				$("#back-to-top").fadeIn(500);
			}
			else
			{
				$("#back-to-top").fadeOut(500);
			}
		});
		$("#back-to-top").click(function(){
			$('body,html').animate({scrollTop:0},100);
			return false;
		});
	}
});

/**
 * app token 登录
 * @param login_type  
 * auto、自动登录，登录后不做其它操作; 
 * login_page、登录页登录，登录后返回上一页， 
 * call、ajax请求后登录，登录后调用回调地址
 * @returns {undefined}
 */
function appTokenLogin(login_type) {
  if ((typeof (mJavaScriptObject) == 'object')) {
    $(".wap_login_box").hide();
    $(".app_login_box").show(200);//显示手机自动登陆样式
    var app_login_token = getAppToken();
    if (app_login_token) {
      $.ajax({
        type: "post",
        dataType: 'json',
        data: {'app_login_token': app_login_token},
        url: APP_LOGIN_URL,
        async: true,
        success: function (res) {
          if (res.state == 1) {
            if(login_type == 'login_page'){
              window.location.href = res.referer_url;
            }else if(login_type == 'call' && typeof appLoginSuccessCallBackFun == 'function'){
              appLoginSuccessCallBackFun();
            }
          } else if(login_type != 'auto'){//必须强制登录
            weixinCallAppLoginPage();
          }
        }
      });
    } else {
      weixinCallAppLoginPage();
    }//APP自动登陆JS end
  }
}

/**
 * 获取app token
 * @returns {data}
 */
function getAppToken(){
  var app_login_token = mJavaScriptObject.getCacheAccessToken();
  //ios老版本mJavaScriptObject.getCacheAccessToken() 无法获取到token，用老的方法重新获取一次
  if (CHANNEL_ID == '24' && !$.trim(app_login_token)) {
    mJavaScriptObject.getCacheAccessToken(function (data) {
      app_login_token = data;
    });
  }
  return (typeof (app_login_token) == 'string' && app_login_token.length > 32) ? app_login_token : '';
}

/**
 * app 没有登录时打开app登录页
 * @returns {Boolean}
 */
function weixinCallAppLoginPage(){
  if(APP_LOGIN_URL.indexOf('login.html') == -1){
    window.location.href = APP_LOGIN_URL;
    return false;
  }
  mJavaScriptObject.funToLogin();
  //android 无法回调 appWebDidFinishLoad() 方法，需要我们退回上一页
  window.history.back();
}

$(function(){
  //判断为app时且app已经登录状态下，用app的token自动登录
  if (location.href.indexOf('login.html') === -1 && (typeof (mJavaScriptObject) == 'object')) {
    if(getAppToken()){
      appTokenLogin('auto');//APP自动登录
    }
  }
});
/**
 * ios滑动隐藏键盘start
 */
//判断是否为苹果
var isIPHONE = navigator.userAgent.toUpperCase().indexOf('IPHONE')!= -1;

// 元素失去焦点隐藏iphone的软键盘
function objBlur(id,time){
    if(typeof id != 'string') throw new Error('objBlur()参数错误');
    var obj = document.getElementById(id),
        time = time || 0,
        docTouchend = function(event){
            if(event.target!= obj){
                setTimeout(function(){
                     obj.blur();
                    document.removeEventListener('touchend', docTouchend,false);
                },time);
            }
        };
    if(obj){
        obj.addEventListener('focus', function(){
            document.addEventListener('touchend', docTouchend,false);
        },false);
    }else{
        throw new Error('objBlur()没有找到元素');
    }
}
/**
 * ios滑动隐藏键盘end
 */
function getUrlParam(pname) {
    var params = location.search.substr(1); // 获取参数 平且去掉？
    var ArrParam = params.split('&');
    //多个参数参数的情况
    for (var i = 0; i < ArrParam.length; i++) {
        if (ArrParam[i].split('=')[0] == pname) {
            return ArrParam[i].split('=')[1];
        }
    }
} 

/**
 * param 将要转为URL参数字符串的对象
 * key URL参数字符串的前缀
 * encode true/false 是否进行URL编码,默认为true
 * 
 * return URL参数字符串
 */
var urlEncode = function (param, key, encode) {
  if(param==null) return '';
  var paramStr = '';
  var t = typeof (param);
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      paramStr += urlEncode(param[i], k, encode);
    }
  }
  return paramStr;
};

// textarea默认显示一行，输入超过一行自动加高
(function($){
    $.fn.autoTextarea = function(options) {
        var defaults={
            maxHeight:null,//文本框是否自动撑高，默认：null，不自动撑高；如果自动撑高必须输入数值，该值作为文本框自动撑高的最大高度
            minHeight:$(this).height() //默认最小高度，也就是文本框最初的高度，当内容高度小于这个高度的时候，文本以这个高度显示
        };
        var opts = $.extend({},defaults,options);
        return $(this).each(function() {
        $(this).bind("paste cut keydown keyup focus blur",function(){
            var height,style=this.style;
            this.style.height =  opts.minHeight + 'px';
            if (this.scrollHeight > opts.minHeight) {
                if (opts.maxHeight && this.scrollHeight > opts.maxHeight) {
                    height = opts.maxHeight;
                    style.overflowY = 'scroll';
                } 
                else {
                    height = this.scrollHeight;
                    style.overflowY = 'hidden';
                }
                style.height = height  + 'px';
            }
        });
    });
};
})(jQuery);


//日期 转换为 Unix时间戳       
// @param <string> 2014-01-01 20:20:20 日期格式      
function datetime_to_unix(datetime){
    var tmp_datetime = datetime.replace(/:/g,'-');
    tmp_datetime = tmp_datetime.replace(/ /g,'-');
    var arr = tmp_datetime.split("-");
    var now = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5]));
    return parseInt(now.getTime());
}

function pushHistory() { //返回历史页面
	var state = { title: "title", url: ""}; 
	window.history.pushState(state, "title", "");
}
