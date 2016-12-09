var send = 1, tips = {"code": 1, "msg": ''}, submitForm = function(){};

//@ 复选框样式控制
function checkbox(){
	$(".input_checkbox").bind("click", function(){
		var input_check = $("#" + $(this).attr("for"));
		$(this).toggleClass("active");
		input_check.attr("value", $(this).hasClass("active") ? 1 : '').trigger("change");
	});
}

//@ 单选框样式控制
function radio(){
	$(".radio_item").bind("click", function(){
		var input_radio = $("#" + $(this).attr("for"));
		$(this).addClass("active").siblings(".radio_item").removeClass("active");
		input_radio.attr("value", $(this).parent().find(".radio_item.active").attr("data-val"));
	});
}

//@ 密码可见开关
function pwVisible(){
	$(".input_ivisible").bind("click", function(){
		var input_ivisible = $("#" + $(this).attr("data-for"));
		$(this).toggleClass("active");
		if($(this).hasClass("active")){
			input_ivisible.attr("type", "text");
		}else{
			input_ivisible.attr("type", "password");
		}
		input_ivisible.trigger("select");
	});
}

//@ 用户模块提示
function acTips(msg){
	var tips = "<span class='iconfont ac-iwarning'>&#xe613;</span>" + msg;
	$(".ac-form-submit").removeClass("active").addClass("warning").html(tips);
}

//@ 用户模块显示提交按钮
function showACBtn(mode){
	$(".ac-form-submit").removeClass("warning").addClass("active").html(mode);
}

//@ 表单检验
function validate(){ 
	var phone = $("[data-type='phone'], [data-type='guardian_phone']");
	var guardname = $("[data-type='guardian_name']");
	var guardcard = $("[data-type='guardian_card_no'], [data-type='card_no']");
	$("#submit").on("click", function(evt){
		if(send == 1){
			send = 0;
			var identifie = $(".multi-form").length > 0 ? $(".multi-form:visible").find(".input") : $(".input"); 
			for(var i = 0; i < identifie.length; i++){
				if(!singleVali(identifie[i])){ 
					return false;
				}
			}
			showLoading();
			submitForm(evt);	
		}
	});
	if(guardname.length > 0){
		guardname.attr("data-required", "true");
		guardname.bind("input", function(){
			var value = $(this).val();
			if(value.length > 18){
				$(this).val(value.substr(0, 18));
			}
		});
	}
	if(guardcard.length > 0){
		guardcard.on("input", function(){
			var obj = $(this);
			var type = {
				"身份证" : 18,
				"港澳居民证": 18,
				"护照": 20,
				"其他证件": 20
			};
			var cardtype = $(".insur-input-cardtype:visible").find("option:selected").text();
			var value = obj.val();
			if(value.length > type[cardtype]){
				obj.val(value.substr(0, type[cardtype]));
			}
		});
	}
	if(phone.length > 0){
		phone.bind("input", function(){
			var value = $(this).val();
			if(value.length > 11){
				$(this).val(value.substr(0, 11));
			}
		});
	}	
}
function singleVali(obj, mode){ 
	var ele = $(obj),
		required = ele.attr("data-required") ? ele.attr("data-required") : '',
		type = ele.attr("data-type") ? ele.attr("data-type") : '',
		name = ele.attr("data-name") ? ele.attr("data-name") : '',
	    value = $.trim(ele.val()),
	    pattern = {
	    	'birth': '^[0-9]{4}(||-|/)(((0[13578]|(10|12))(||-|/)(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$',
			'age': '[0-9]{1,3}',
			'num': '^[1-9][0-9]*$',
			'attack': '(\<script\>)|(\<SCRIPT\>)',
			'phone': '^0?(13[0-9]|14[5|7|9]|15[0|1|2|3|5|6|7|8|9]|17[0|1|3|5|6|7|8]|18[0-9])[0-9]{8}$',
			'password': "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]+$", // 包含且只能有数字和字母
			//'password': "^(?=.{6,20}$)(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z!\"#$%&'()*+,-./:;<=>?@\\[\\]^_`{|}~]+$", // 密码不能单独为数字、字母、特殊字符
			'idcard': '[0-9]{17}[0-9xX]{1}',
			'truename': '^[\u30A0-\u30FF\u3040-\u309F\u3400-\u4DB5\u4E00-\u9FBF]{2,7}B{0,2}$',
			'email': '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}',
			'money': '^[0-9]+(.[0-9]{1,2})?$',
			'contactway': '^(1[3|4|5|7|8][0-9]{9})$|^([A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4})$',
			'guardian_phone': '^1[3|4|5|7|8][0-9]{9}$'
	    },
	    lengthArea = ele.attr("data-length") ? ele.attr("data-length").split("-") : '',
	    isEmpty = value ==='',
	    isLess = lengthArea ? value.length < lengthArea[0] : false,
	    isOver = lengthArea ? value.length > lengthArea[1] : false,
	    isError = type ? !new RegExp(pattern[type]).test(value) : false,
	    isAttack = isEmpty ? '' : !!new RegExp(pattern['attack']).test(value),
	    isPassed = true,
	    isMax = ele.attr('max'),
	    mode = mode ? mode : '';
	if(type == "truename" && isError){
		isError = !new RegExp('^[\u30A0-\u30FF\u3040-\u309F\u3400-\u4DB5\u4E00-\u9FBF]{1,8}[\.\u2027]{0,1}[\u30A0-\u30FF\u3040-\u309F\u3400-\u4DB5\u4E00-\u9FBF]{1,8}B{0,2}$').test(value);
	}
    function stopSubmit(){
    	if(mode){
    		acTips(tips.msg);
    		ele.removeClass("passed");
    	}else{
    		showTips(tips.msg);
    	}
    	send = 1;
    	isPassed = false;
    }
	if(isEmpty){
		if(required){
			if(type == "radio" || type == "select"){
				tips.msg = "请选择" + name;
			}else if(type == "score"){
				tips.msg = "请给" + name + "评分";
			}else if(type =="protocol"){
				tips.msg = "请选择同意" + name;
			}else{
				tips.msg = name + "不能为空";
			}
			stopSubmit();
			return false;
		}
	}else if(required && type == "radio" && value < 0){
		tips.msg = "请选择" + name;
		stopSubmit();
		return false;
	}
	if(isAttack){
		tips.msg = name + "不能含有非法字符";
		stopSubmit();
		return false;
	}
	if(isLess && !isEmpty){
		if(type == "phone" || type =="password"){
			tips.msg = name + "不能少于" + lengthArea[0] + "位";
		}else{
			tips.msg = name + "不能少于" + lengthArea[0] + "个字";
		}
		stopSubmit();
		return false;
	}
	if(isOver && type != "phone"){
		if(type =="password"){
			tips.msg = name + "不能多于" + lengthArea[1] + "位";
		}else{
			tips.msg = name + "不能多于" + lengthArea[1] + "个字";
		}
		stopSubmit();
		return false;
	}else if(type == "phone"){
		value = value.substr(0, 11);
		isError = type ? !new RegExp(pattern[type]).test(value) : false;
		ele.val(value);
	}
	if(isError && !isEmpty){
		if(type == "truename"){
			tips.msg = "请输入您的真实" + name;
		}else if(type == "password"){
			tips.msg = "请输入6-20位的字母、数字或符号";
		}else if(type == "cardnum"){
			tips.msg = "证件号码错误，请输入正确证件号码";
		}else{
			tips.msg = "请输入正确的" + name;
		}
		stopSubmit();
		return false;
	}
	if(type == 'date' && !isEmpty){
		if(value > isMax){
			tips.msg = "请输入" + name;
		}
	}
	if(type == "birth" && !isEmpty){
		var dpattern = '^([0-9]{4})(||-|/)([0-9]{2})(||-|/)([0-9]{2})$';
		var today = new Date(), arr_tdate = [];
		arr_tdate[0] = today.getFullYear();
		arr_tdate[1] = today.getMonth()+1;
		arr_tdate[2] = today.getDate();
		var arr_date = value.match(dpattern);
		//获取时间点毫秒数
        cDate = new Date(parseInt(arr_date[1]), parseInt(arr_date[3]), parseInt(arr_date[5])).getTime();
        nDate = new Date(parseInt(arr_tdate[0]), parseInt(arr_tdate[1]), parseInt(arr_tdate[2])).getTime();
		if(nDate < cDate){
			tips.msg = "请输入正确的" + name;
			stopSubmit();
			return false;
		}	
	}
	if(mode && isPassed){
		ele.addClass("passed");
	}
	return isPassed;
}

//@ 用户模块表单验证
function acValidate(mode){
	function validateAC(obj){
		var obj = $(obj),
		type = obj.attr("data-type") ? obj.attr("data-type") : '',
		id = obj.attr("id") ? obj.attr("id") : '',
		clear = $(".ac-form-icancel[data-for='"+id+"']"),
		length = 1;
		switch (type){
			case 'phone':
				length = 11;
				break;
			case 'password':
				length = 6;
				break;
			default:
				break;
		}
		if(clear.length > 0 && obj.val().length){
			clear.removeClass("hidden");
			$("label[for='"+id+"']").removeClass("typo_dgray").addClass("typo_gray");
		}else{
			clear.addClass("hidden");
			$("label[for='"+id+"']").addClass("typo_dgray").removeClass("typo_gray");
		}
		if(obj.val() && obj.val().length >= length && obj.val() && singleVali(obj, mode)){
			var identifie = $(".ac-info-page").length > 0 ? $(".ac-info-page:visible .input") : $(".input");
			for(var i = 0; i < identifie.length; i++){
				if(!$(identifie[i]).hasClass("passed")){
					$(".ac-form-submit").removeClass("warning active").html(mode);
					return false;
				}else if(type == "phone" && $("#sendCode").length ? !$("#sendCode").hasClass("sending") : ''){
					$("#sendCode").removeClass("btn_dround").addClass("btn_ground");
				}
			}
			$(".ac-form-submit").removeClass("warning").addClass("active").html(mode);
		}else if(singleVali(obj, mode)){
			
		}
	}
	$("#submit").on("click", function(evt){
		if(send == 1 && $(this).hasClass("active")){
			send = 0;
			var identifie = $(".ac-info-page").length > 0 ? $(".ac-info-page:visible .input") : $(".input");
			for(var i = 0; i < identifie.length; i++){
				if(!singleVali(identifie[i], mode)){ 
					return false;
				}
			}
			showLoading();
			submitForm(evt);	
		}
	});
	$(".ac-form").delegate(".input", "input change focusout", function(){
		validateAC($(this));
	});
}

//@ 清除输入
function clearInput(){
	$(".wrap").delegate(".ac-form-icancel", "click", function(){ 
		var id = $(this).attr("data-for");
		$("#"+id).val('').removeClass("passed").trigger("select");
		$(this).addClass("hidden");
		if($(this).parents(".ac-form").length){
			$("label[for='"+id+"']").removeClass("typo_gray").addClass("typo_dgray");
			if($(".ac-form-submit").hasClass("active")){
				$(".ac-form-submit").removeClass("active")
			}
		}
	});
}
//@ 下拉选择
function showSelect(){
	var $select = $('.select'); 
	$select.children('select').on('change',function() {
        var $this = $(this),
        $option = $this.children('[value="' + $this.val() + '"]'),
        $text = $this.prev('.select-value');
		var input_select = $("#" + $(this).attr("for"));
		input_select.attr("value", $option.attr("data-val"));
        $text.text($option.text()); 
    });
    $select.on('click',function() {
        $(this).children('select').trigger('change');
    });
    // 若无下拉选项会将已有的值再次赋空 modify in 2015/9/17 by Liucong
    $select.each(function() {
        var $this = $(this),
        $selected = $this.find('option').filter(':selected');
        if($selected.text()) $this.children('.select-value').text($selected.text());
        if($this.find(".select-clip").length > 0 && !ios){
	    	$this.one("mousedown touchstart", function(){
	    		$(this).find(".select-clip").remove();
	    	});
	    }
    });
}

//@ 浮点数运算
function formatFloat(num, length){
  length = length || 2;
	num = num + "";
	num = parseFloat(num.replace(/[^\d\.-]/g, ""));
	return Math.ceil(num*Math.pow(10,length))/Math.pow(10,length).toFixed(2);
}
function addFloat(fir, sec){
	return formatFloat((fir * 100 + sec * 100) / 100, 2);
}
function minusFloat(fir, sec){
	return formatFloat((fir * 100 - sec * 100) / 100, 2);
}
function compareFloat(fir, sec){ 
	return (fir * 100 - sec * 100) >= 0
}
function formatMoney(s){
	if(!/[^0-9\.]/.test(s)){
		s = s + "";
		s=s.replace(/^(\d*)$/,"$1.");  
	    s=(s+"00").replace(/(\d*\.\d\d)\d*/,"$1");  
	    s=s.replace(".",",");  
	    var re=/(\d)(\d{3},)/;  
	    while(re.test(s)){  
	        s=s.replace(re,"$1,$2");  
	    }  
	    s=s.replace(/,(\d\d)$/,".$1");  
	    return s.replace(/^\./,"0.");
	}
}

//@ 删除选择的图片
//@ param num 图片序号
function cancelImg(num){
	$(".cs-cs .cs-cs-photo").eq(num).remove();
	$(".cs-cs .upimg").eq(num).remove();
}

function userValidate(){
	var arr_input = $(".input");
	arr_input.each(function(){
		var obj = $(this);
		var arr_length = !!obj.attr("data-length") ? obj.attr("data-length").split("-") : '';
		var id = !!obj.attr("id") ? obj.attr("id") : '';
		if(obj.attr("data-length")){
			obj.on("input", function(){
				var value = obj.val();
				if(value.length > arr_length[1]){
					obj.val(value.substr(0, arr_length[1]));
				}else if(value.length == arr_length[1]){
					userSingleVali(obj);
				}
			});
		}
		if(id && $(".user-input-icancel[data-for='"+id+"']").length > 0){
			var btn_cancel = $(".user-input-icancel[data-for='"+id+"']");
			obj.on("focus input", function(){
				if(obj.val()){
					btn_cancel.removeClass("hidden");
				}
			});
			obj.on("blur", function(e){
				userSingleVali(obj);
				setTimeout(function(){
					btn_cancel.addClass("hidden");
				}, 500);
			});
			btn_cancel.on("click", function(){
				obj.val('');
				btn_cancel.addClass("hidden");
				obj.focus();
			});
		}
		if(id && $(".user-input-ivisible[data-for='"+id+"']").length > 0){
			var btn_visible = $(".user-input-ivisible[data-for='"+id+"']");
			btn_visible.on("click", function(){
				var ele = $(this);
				ele.toggleClass("active");
				var type = ele.hasClass("active") ? "text" : "password";
				obj.attr("type", type);
				//obj.focus();
			});
		}
		obj.on("blur", function(e){
			userSingleVali(obj);
		});
	});
	$("#submit").on("click", function(evt){
		if(send == 1){
			send = 0;
			var identifie = $(".input"); 
			for(var i = 0; i < identifie.length; i++){
				if(!userSingleVali(identifie[i])){ 
					return false;
				}
			}
			showLoading();
			submitForm(evt);	
		}
	});
}
function userSingleVali(obj){ 
	var ele = $(obj),
		required = ele.attr("data-required") ? ele.attr("data-required") : '',
		type = ele.attr("data-type") ? ele.attr("data-type") : '',
		name = ele.attr("data-name") ? ele.attr("data-name") : '',
	    value = $.trim(ele.val()),
	    pattern = {
	    	'birth': '^[0-9]{4}(||-|/)(((0[13578]|(10|12))(||-|/)(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$',
			'age': '[0-9]{1,3}',
			'num': '^[1-9][0-9]*$',
			'attack': '(\<script\>)|(\<SCRIPT\>)',
			'phone': '^0?(13[0-9]|14[5|7|9]|15[0|1|2|3|5|6|7|8|9]|17[0|1|3|5|6|7|8]|18[0-9])[0-9]{8}$',
			'password': "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]+$", // 包含且只能有数字和字母
			//'password': "^(?=.{6,20}$)(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z!\"#$%&'()*+,-./:;<=>?@\\[\\]^_`{|}~]+$", // 密码不能单独为数字、字母、特殊字符
			'idcard': '[0-9]{17}[0-9xX]{1}',
			'truename': '^[\u30A0-\u30FF\u3040-\u309F\u3400-\u4DB5\u4E00-\u9FBF]{2,7}B{0,2}$',
			'email': '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}',
			'money': '^[0-9]+(.[0-9]{1,2})?$',
			'contactway': '^(1[3|4|5|7|8][0-9]{9})$|^([A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4})$'
	    },
	    lengthArea = ele.attr("data-length") ? ele.attr("data-length").split("-") : '',
	    isEmpty = value ==='',
	    isLess = lengthArea ? value.length < lengthArea[0] : false,
	    isOver = lengthArea ? value.length > lengthArea[1] : false,
	    isError = type ? !new RegExp(pattern[type]).test(value) : false,
	    isAttack = isEmpty ? '' : !!new RegExp(pattern['attack']).test(value),
	    isPassed = true;
	if(type == "truename" && isError){
		isError = !new RegExp('^[\u30A0-\u30FF\u3040-\u309F\u3400-\u4DB5\u4E00-\u9FBF]{1,8}[\.\u2027]{0,1}[\u30A0-\u30FF\u3040-\u309F\u3400-\u4DB5\u4E00-\u9FBF]{1,8}B{0,2}$').test(value);
	}
    function stopSubmit(){
    	popTips(tips.msg);
    	send = 1;
    	isPassed = false;
    }
	if(isEmpty){
		if(required){
			if(type == "radio"){
				tips.msg = "请选择" + name;
			}else if(type == "score"){
				tips.msg = "请给" + name + "评分";
			}else if(type =="protocol"){
				tips.msg = "请选择同意" + name;
			}else{
				tips.msg = name + "不能为空";
			}
			stopSubmit();
			return false;
		}
	}else if(required && type == "radio" && value < 0){
		tips.msg = "请选择" + name;
		stopSubmit();
		return false;
	}
	if(isAttack){
		tips.msg = name + "不能含有非法字符";
		stopSubmit();
		return false;
	}
	if(isOver){
		if(type == "phone" || type =="password"){
			tips.msg = name + "不能多于" + lengthArea[1] + "位";
		}else{
			tips.msg = name + "不能多于" + lengthArea[1] + "个字";
		}
		stopSubmit();
		return false;
	}
	if(isError && !isEmpty){
		if(type == "truename"){
			tips.msg = "请输入您的真实" + name;
		}else if(type == "password"){
			tips.msg = "请输入包含数字和字母的6-20位密码";
		}else{
			tips.msg = "请输入正确的" + name;
		}
		stopSubmit();
		return false;
	}
	if(type == "birth" && !isEmpty){
		var dpattern = '^([0-9]{4})(||-|/)([0-9]{2})(||-|/)([0-9]{2})$';
		var today = new Date(), arr_tdate = [];
		arr_tdate[0] = today.getFullYear();
		arr_tdate[1] = today.getMonth()+1;
		arr_tdate[2] = today.getDate();
		var arr_date = value.match(dpattern);
		//获取时间点毫秒数
        cDate = new Date(parseInt(arr_date[1]), parseInt(arr_date[3]), parseInt(arr_date[5])).getTime();
        nDate = new Date(parseInt(arr_tdate[0]), parseInt(arr_tdate[1]), parseInt(arr_tdate[2])).getTime();
		if(nDate < cDate){
			tips.msg = "请输入正确的" + name;
			stopSubmit();
			return false;
		}	
	}
	return isPassed;
}
(function(){
	if($(".editaccount").length > 0){
		$("#cardnum").on("input", function(){
			var obj = $(this);
			var type = $("#card option:selected").text();
			var length = {
				"身份证" : 18,
				"港澳居民证": 18,
				"护照": 20
			};
			if(obj.val().length > length[type]){
				obj.val(obj.val().substr(0, length[type]));
			}
		});
		$("#cardnum").on("blur", function(){
			var obj = $(this);
			var type = $("#card option:selected").text();
			var pattern = '^[0-9]{17}[0-9xX]{1}$';
			var value = obj.val();
			if(type == "身份证"){
				if(!!new RegExp(pattern).test(value)){
					var sex = value.toString().slice(16, 17) % 2 ? 0 : 1;
					var year = value.toString().slice(6, 10);
					var mon = value.toString().slice(10, 12);
					var day = value.toString().slice(12, 14);
					var birth = year+"-"+mon+"-"+day;
					var str = '<div class="nobor typo_gray uc-iform-msg textr block fright birth">' + birth + '</div>';
					$("#sex").val(sex).trigger("change").addClass("hidden");
					$(".birth").remove();
					$("#birthday").val(birth).addClass("hidden").before(str);	
				}else{
					if(value){
						showTips("证件号码错误，请输入正确证件号码");
					}else{
						showTips("证件号码不能为空");
					}
				}
			}
		});
		$("#card").on("change", function(){
			var type = $("#card option:selected").text();
			if(type == "身份证"){
				$("#sex").addClass("hidden");
				$("#birthday").addClass("hidden");
				if($("#birthday").val()){
					$(".birth").remove();
					var str = '<div class="nobor typo_gray uc-iform-msg textr block fright birth">' + $("#birthday").val() + '</div>';
					$("#birthday").before(str);
				}
			}else{
				if($(".birth").length > 0){
					$("#birthday").val($(".birth:last").text());
					$(".birth").remove();
				}
				$("#birthday").removeClass("hidden");
				$("#sex").removeClass("hidden");
			}
		});
		$("#username, #address").on("input", function(){
			var value = $(this).val();
			var lengthArea = $(this).attr("data-length") ? $(this).attr("data-length").split("-") : '';
			if(value.length > lengthArea[1]){
				$(this).val(value.substr(0, lengthArea[1]));
			}
		});
	}
})();
