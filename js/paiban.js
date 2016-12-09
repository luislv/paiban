var str ='<div class="swiper-slide">';
        str+='<div class="pt10 pb10 pl10 pr10">';
        str+='<div class="bor1bd rsquare">';
        str+='<ul class="weektit no-lst layout">';
        str+='<li>&nbsp;</li>';
        str+='<li>周一<br><em>11-28</em></li>';
        str+='<li>周二<br><em>11-29</em></li>';
        str+='<li>周三<br><em>11-30</em></li>';
        str+='<li>周四<br><em>12-01</em></li>';
        str+='<li>周五<br><em>12-02</em></li>';
        str+='<li>周六<br><em>12-03</em></li>';
        str+='<li>周日<br><em>12-04</em></li>';
        str+='</ul>';
        str+='<ul class="schData no-lst layout">';
        str+='<li>';
        str+='<a>上午</a>';
        str+='<a href="javascript:;" class="yuyue" sch_id="" detl_id=""><span>点击预约</span></a>';
        str+='<a href="javascript:;" class="noNum" sch_id="" detl_id=""></a>';
        str+='<a href="javascript:;" class="full"  sch_id="" detl_id=""><span>约满</span></a>';
        str+='<a href="javascript:;" class="noNum" sch_id="" detl_id=""></a>';
        str+='<a href="javascript:;" class="noNum" sch_id="" detl_id=""></a>';
        str+='<a href="javascript:;" class="noNum" sch_id="" detl_id=""></a>';
        str+='<a href="javascript:;" class="yuyue" sch_id="" detl_id=""><span>点击预约</span></a>';
        str+='</li>';
        str+='<li>';
        str+='<a>下午</a>';
        str+='<a href="javascript:;" class="noNum" sch_id="" detl_id=""></a>';
        str+='<a href="javascript:;" class="yuyue" sch_id="" detl_id=""><span>点击预约</span></a>';
        str+='<a href="javascript:;" class="full"  sch_id="" detl_id=""><span>约满</span></a>';
        str+='<a href="javascript:;" class="noNum" sch_id="" detl_id=""></a>';
        str+='<a href="javascript:;" class="noNum" sch_id="" detl_id=""></a>';
        str+='<a href="javascript:;" class="noNum" sch_id="" detl_id=""></a>';
        str+='<a href="javascript:;" class="mvisit" sch_id="" detl_id=""><span>多地出诊</span></a>';
        str+='</li>';
        str+='</ul>';
        str+='<p class="noti typo_small textc typo_lgray lh24 pt5 pb5">左右滑动日历查看其他日期排班</p>';
        str+='</div>';
        str+='</div>';
        str+='</div>';
    $(".schswiper .swiper-wrapper").append(str);
    
    $(".yuyue").click(function(){
        $(".scheduling,.schedbox").show();
        $("body").css("overflow", "hidden");
        $('body').bind("touchmove",function(e) {
            e.preventDefault();
        });
        $(".scroll-pagewrap").css({'height':'300px'});
        var cswiper = new Swiper('#choosesched', {
            scrollbar: '.scroll-bar',
            direction: 'vertical',
            slidesPerView: 'auto',
            mousewheelControl: true,
            freeMode: true
        });
    });
    $(".schedclose,.scheduling").on('click',function(){
        $(".scheduling,.schedbox").hide();
        $("body").css("overflow", "auto");
        $("body").unbind("touchmove");
    });
