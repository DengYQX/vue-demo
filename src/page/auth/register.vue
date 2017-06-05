<style>
	/* @import "../../assets/css/profile.css" */
</style>

<template>

<section class="page login">
	<div class="va marg-top15">
		<div class="col">
			<div class="va-form">
				<div class="va-form-text">电话号码</div>
				<div class="va-form-el">
					<div class="box">
						<input type="tel" maxlength="11" v-model="phone" placeholder="预留银行的手机号码" class="va-ele">
						<getMsgCode v-on:bindMsgCode="getMsgCode" :phoneNumber="phone"></getMsgCode>
					</div>
				</div>
			</div>
		</div>
		<div class="col">
			<div class="va-form">
				<div class="va-form-text">验证码</div>
				<div class="va-form-el">
					<div class="box">
						<input type="text" maxlength="5" v-model="code" placeholder="请输入验证码" class="va-ele">
						<graphics></graphics>
					</div>
				</div>
			</div>
		</div>
		<div class="col">
			<div class="va-form">
				<div class="va-form-text">短信码</div>
				<div class="va-form-el">
					<input type="text" maxlength="6" v-model="msgcode" placeholder="请输入短信码" class="va-ele">
				</div>
			</div>
		</div>
		<div class="col">
			<div class="va-form">
				<div class="va-form-text">登录密码</div>
				<div class="va-form-el">
					<input type="password" v-model="password" placeholder="请输入登录密码" class="va-ele">
				</div>
			</div>
		</div>
		<div class="col">
			<div class="va-form">
				<div class="va-form-text">确认密码</div>
				<div class="va-form-el">
					<input type="password" v-model="confirmpassword" placeholder="再次输入登录密码" class="va-ele">
				</div>
			</div>
		</div>
	</div>
	<a class="btn marg-bot15" :class="btnOn" @click="singUp" href="javascript:;" v-html="subBtnText"></a>
	<router-view></router-view>
</section>

</template>

<script>

var getMsgCode = require('../../components/getMsg.vue'),//短信码子组件
	graphics = require('../../components/graphics.vue'),//图形码子组件
	_nostr = '不能为空';

export default {
	data () {
		return {
			phone : '',
			password : '',
			confirmpassword : '',
			msgid : '',
			msgcode : '123456',
			code : '',
			agreebox : true,
			codeForm : {},
			btnOn : '',
			subBtnText : '立即注册'
		}
	},
    vuerify: {
        phone : [{ test: 'required', message: '手机号码' + _nostr },'phone'],
        code : { test: 'required', message: '验证码' + _nostr },
        msgcode: { test: 'required', message: '短信码' + _nostr },
        password: { test: 'required', message: '密码' + _nostr },
        confirmpassword: { test: 'required', message: '确认密码' + _nostr }
    },methods : {
    	checkGraphics (cb){
			var _body = {
				GID : usages.api.user.graphics,
				code : this.code,
				rand: Math.random()
			}
			this.$http.post(usages.domain,_body).then(function(res){
				if( res.data.issuccess ){
					if(cb)cb(false)
				}else{
					if(cb)cb(true,res.data.rtnmessage)
				}
			});
    	},
		singUp (){//注册
			var vm = this;
			if( 'on' == vm.btnOn )return;

			if( _com.vuerifyCheck(vm) ){

				vm.btnOn = 'on';
				vm.subBtnText = '提交中...';

				var _p = {
					GID : usages.api.user.register,
					phone : vm.phone,
					code : vm.code,
					msgcode : vm.msgcode,
					password : vm.password,
					rand: Math.random(),
					msgid : _com.getSession('msgid') || ''
				}

				this.$http.post(usages.domain,_p).then(function(res){
					if( res.body.issuccess ){
						MintUI.Toast('注册成功')
						this.$router.push('/login');
					}else{
						if( '1001' == res.body.rtncode ){
							MintUI.Toast('请先获取手机验证码')
						}else{
							MintUI.Toast(res.body.rtnmessage)
						}
						vm.btnOn = '';
						vm.subBtnText = '立即注册';
					}
				});
			}
		},getMsgCode(isnext) {//获取短信码
			var vm = this;
			if( !isnext ) return; //手机号是否校验通过

	  		vm.codeForm.GID = usages.api.user.sendregistermsg;
	  		vm.codeForm.phone = vm.phone;
	  		vm.codeForm.rand = Math.random();
			vm.$http.post(usages.domain,vm.codeForm).then(function(res){
				if( res.body.issuccess ){
					_com.setSession('msgid',res.body.result.msgid);//存储短信码
				}else{
					MintUI.Toast(res.data.rtnmessage)
				}
		  	});
		}
	},components : {
		getMsgCode,graphics
	},mounted (){

	}
}
</script>
