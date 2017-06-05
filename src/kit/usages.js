/*!
 * 常用字符串
 * 司惊雷
 * 2017-03-25
 */
export default {
	domain : '/hf-km_web/WebService',
//	domain: 'http://km.zephpay.com/kmmweb//json/default.jsp?',
	api : {
		user : {
			logon : 'member.logon',//4.1.2会员登陆交易
			register : 'member.register',//4.1.1会员注册交易
			logout : 'json/logout.jsp',//登出

			resetloginpw:'member.modifylogonpwd',//4.1.3会员修改登录密码
			settranspwd:'member.settranspwd',//4.1.4会员设置支付密码
			queryrealnameinfo:'member.queryrealnameinfo',//4.1.6会员实名认证信息查询


			sendmsgcode : 'member.sendmsgcode',//4.3.3发送用户验证码短信
			sendregistermsg : 'member.sendregistermsg',//4.3.1发送用户注册短信
			regmsgcodecheck : 'member.regmsgcodecheck',//4.3.2注册短信验证码校验
			graphics : 'check.graphics',//图形验证码校验
			checkfindpwdcode : 'member.checkfindpwdcode',//校验修改密码短信码
			sendfindpwdmsg : 'member.sendfindpwdmsg',//4.3.5会员找回密码验证短信
			resetlogonpwd : 'member.resetlogonpwd',//4.1.5找回密码重新设置密码

			querycount : 'member.sitemail.querycount',//5.3.1查询会员站内信计数
			setstatus : 'member.sitemail.setstatus',//5.3.4	设置会员站内信状态
			querybalance : 'member.querybalance',//4.2.1会员余额查询交易
			queryuser : 'member.queryuser',//会员查询
			chargeapply : 'member.pay.chargeapply',//会员查询

			querybindcard : 'member.pay.querybindcard',//4.4.3查询银行卡绑卡列表
			bindcard : 'member.pay.bindcard',//4.4.2银行卡绑卡
			unbindcard : 'member.pay.unbindcard',//4.4.4银行卡解绑
			getbindcardbank : 'member.pay.getbindcardbank',//4.4.1获取绑卡银行列表

			querylist : 'member.sitemail.querylist',//我的消息
			queryinfo : 'member.sitemail.queryinfo',//消息列表
			modifylinkaddress : 'member.modifylinkaddress',//4.1.11	修改用户联系地址

			submitfeedback : 'member.feedback.submitfeedback',//4.1.10意见信息提交列表
			codelist : 'app.website.codelist',//5.1.1系统代码查询

			fundcardlist : 'member.pay.fundcardlist',//4.4.5资金交易银行卡列表查询；查询是否已经绑卡
			querytranspwdstatus : 'member.querytranspwdstatus',//4.3.7查询客户交易密码状态
			withdrawapply : 'member.pay.withdrawapply',//4.4.7提交提现申请
			translist : 'member.app.translist',//4.7会员交易记录列表查询
			queryticketbatchlist:'member.ticket.queryticketbatchlist',//5.4.2会员电子券列表查询
			querycardbatchlist:'member.prepaidcard.querycardbatchlist',//5.5.2会员预付卡列表查询

			queryaddresslist:'member.express.queryaddresslist',//5.6.3查询收货地址列表
			newaddress:'member.express.newaddress',//5.6.1添加收货地址
			modifyaddress:'member.express.modifyaddress',//5.6.2修改收货地址
			queryaddressinfo:'member.express.queryaddressinfo',//5.6.4查询收货地址详情
			setdefaultaddress:'member.express.setdefaultaddress',//5.6.5设置默认收货地址
			querydefaultaddress:'member.express.querydefaultaddress',//5.6.6查询默认收货地址
			deleteaddress:'member.express.deleteaddress',//5.6.7删除收货地址
			createtransferorder:'member.qrcode.createtransferorder',//收款

			modifylinkman:'member.modifylinkman',//4.1.12修改用户联系人


		},
		index : {
			homepageimage:'app.website.homepageimage',//首页广告图
			homehotmerchant:'app.website.homehotmerchant'//首页热门商户

		},
		consumption : {
			querymerchantlist:'member.merchant.querylist',//5.1.1商户列表查询
			querymerlist:'member.prepaidcard.querymerlist',//5.3.1商户待售预付卡查询列表
			querymerticketlist:'member.ticket.querymerticketlist',//商户全部电子券查询	
			queryinfo:'member.merchant.queryinfo',//5.1.2商户详情查询
			querymerticketinfo:'member.ticket.querymerticketinfo',//5.2.2电子券详情查询
			querycardinfo:'member.prepaidcard.queryinfo',//5.3.2预付卡详情查询
			ticketbuy:'member.ticket.buy',//5.4.1电子券购买
			prepaidcardbuy:'member.prepaidcard.buy',//5.5.1预付卡购买
		},
		weixin:{
			getAuthUrl:'weixin.getAuthUrl',//获取微信端认证
			getJsSign:'weixin.getJsSign',//获取JS签名
			getUserInfo:'weixin.getUserInfo',//获取用户信息
		}
	},
	str : {
		non : '不能为空'
	},
	codepath : 'json/code.jsp'
}