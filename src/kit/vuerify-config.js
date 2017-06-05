/*
 * author       : Richa
 * date         : 2016-12-14
 * description  : vuerify 验证规则
 *
 */

module.exports = {
    phone: {
        test: /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/,
        message: '手机号码格式错误'
    },

    idCard: {
        test: isIdCard,
        message: '身份证格式错误'
    },

    bankCard: {
    	test: isBankCard,
    	message: '银行卡格式错误'
    },

    money: {
    	test: /^[1-9]\d*$/,
    	message: '金额输入有误'
    },

    smscode: {
    	test: /^[0-9]{6}$/,
    	message: '短信验证码错误'
    }
}


/**
 * 验证是否是身份证号码
 */
function isIdCard(num) {
	if (num.length === 15) {
        return _15bitRule(num);
    } else if (num.length === 18) {
        return _18bitRule1(num) && _18bitRule2(num);
    } else {
        return false;
    }

    // 校验15位身份证号码
    function _15bitRule(_num) {
    	var yy = _num.substr(6, 2);
	    var mm = parseInt(_num.substr(8, 2));
	    var dd = parseInt(_num.substr(10, 2));
	    var date = new Date(yy, mm - 1, dd);
	    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
	    return 	date.getYear() == parseInt(yy) && 
	    		date.getMonth() == mm - 1 && 
	    		date.getDate() == dd;
    }

    // 校验18位身份证号码
    function _18bitRule1(_num) {
    	var yy = _num.substr(6, 4);
	    var mm = parseInt(_num.substr(10, 2));
	    var dd = parseInt(_num.substr(12, 2));
	    var date = new Date(yy, mm - 1, dd);
	    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
	    return 	date.getFullYear() == parseInt(yy) && 
	    		date.getMonth() == mm - 1 && 
	    		date.getDate() == dd;
    }

    // 校验18位身份证号码
    function _18bitRule2(_num) {
    	var sum = 0;
    	var arr = _num.split('');
    	var wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];	// 加权因子
		var vCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];		// 身份证验证位值，10代表X
		var vCodePos = 0;

	    if (arr[17].toLowerCase() === 'x') arr[17] = 10;

	    for (var i = 0; i < 17; i++) {
	        sum += wi[i] * arr[i];
	    }

	    vCodePos = sum % 11;	// 得到验证码所位置

	    return arr[17] == vCode[vCodePos];
    }
}


/**
 * 验证是否是银行卡
 */
function isBankCard(num) {
	var lastNum = num.substr(-1);		// 取出最后一位（与luhm进行比较）
	var frontNum = num.substr(0, num.length-1);		// 前15或18位
	var reverseFrontNum = frontNum.split('').reverse();		// 前15或18位倒序数组
	var arrJiShu1 = []; 		// 奇数位*2的积 <9
	var arrJiShu2 = []; 		// 奇数位*2的积 >9
	var arrOuShu = []; 			// 偶数位数组

	for (var j = 0; j < reverseFrontNum.length; j++) {
		if ((j + 1) % 2 === 1) {
			if (parseInt(reverseFrontNum[j]) * 2 < 9)
				arrJiShu1.push(parseInt(reverseFrontNum[j]) * 2);
			else
				arrJiShu2.push(parseInt(reverseFrontNum[j]) * 2);
		} else
			arrOuShu.push(reverseFrontNum[j]);
	}

	var jishu_child1 = [];		// 奇数位*2 >9 的分割之后的数组个位数
	var jishu_child2 = [];		// 奇数位*2 >9 的分割之后的数组十位数

	for (var h = 0; h < arrJiShu2.length; h++) {
		jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
		jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
	}

	var sumJiShu = 0; 			// 奇数位*2 < 9 的数组之和
	var sumOuShu = 0; 			// 偶数位数组之和
	var sumJiShuChild1 = 0; 	// 奇数位*2 >9 的分割之后的数组个位数之和
	var sumJiShuChild2 = 0; 	// 奇数位*2 >9 的分割之后的数组十位数之和
	var sumTotal = 0;

	for (var m = 0; m < arrJiShu1.length; m++) {
		sumJiShu = sumJiShu + parseInt(arrJiShu1[m]);
	}

	for (var n = 0; n < arrOuShu.length; n++) {
		sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
	}

	for (var p = 0; p < jishu_child1.length; p++) {
		sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
		sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
	}
	// 计算总和
	sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

	// 计算Luhm值
	var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
	var luhm = 10 - k;
	return lastNum == luhm;
}