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
						<input type="tel" maxlength="11"  v-model="phone" placeholder="预留银行的手机号码" class="va-ele">
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
	</div>
	<a class="btn" :class="btnOn" @click="subFormData" v-html="subBtnText"></a>
	<router-view></router-view>
</section>

</template>

<script>

var getMsgCode = require('../../../components/getMsg.vue'),//短信码子组件
	graphics = require('../../../components/graphics.vue'),//图形码子组件
	_non = '不能为空';

export default {
	data () {
		return {
			phone : '',
			msgcode : '123456',
			code : '',
			subBtnText : '下一步',
			btnOn : ''
		}
	}, vuerify: {
        phone : [{ test: 'required', message: '手机' + _non },'phone'],
        code: { test: 'required', message: '验证码' + _non },
        msgcode: { test: 'required', message: '短信码' + _non }
    },methods : {
		getMsgCode(isnext) {//获取短信码
			var vm = this;
			if( !isnext ) return; //手机号是否校验通过
	  		var _p = {
	  			GID : usages.api.user.sendfindpwdmsg,
				phone : vm.phone,
				rand: Math.random()
	  		}

			vm.$http.post(usages.domain,_p).then(function(res){
				if( res.data.issuccess ){
					_com.setSession('msgid',res.data.result.msgid);//存储短信码
				}else{
					alert(res.data.rtnmessage)
				}
		  	});
		},
		subFormData (){

			var vm = this;
			if( 'on' == vm.btnOn )return;

			if( _com.vuerifyCheck(vm) ){

				vm.btnOn = 'on';
				vm.subBtnText = '提交中...';

		  		var _p = {
		  			GID : usages.api.user.checkfindpwdcode,
					phone : vm.phone,
					msgcode : vm.msgcode,
					msgid : _com.getSession('msgid'),
					code : vm.code,
					rand: Math.random()
		  		}
				vm.$http.post(usages.domain,_p).then(function(res){
					
					if( res.data.issuccess ){
						_com.setSession('phone',vm.phone);
						_com.setSession('code',vm.code);
						_com.setSession('msgcode',vm.msgcode);
						this.$router.push('/login-findpwd-setpwd');//校验通过跳设置密码
					}else{
						if( '1001' == res.data.rtncode ){
							MintUI.Toast('请先获取手机验证码')
						}else{
							MintUI.Toast(res.data.rtnmessage)
						}
						vm.btnOn = '';
						vm.subBtnText = '下一步';
					}
			  	});
			}
		}
	},components : {
		getMsgCode,graphics
	}
}
</script>
