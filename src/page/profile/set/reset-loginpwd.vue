<style>
	/* @import "../../assets/css/profile.css" */
</style>

<template>

<section class="page login">
	<div class="va marg-top15">
        <div class="col">
			<div class="va-form">
				<div class="va-form-text">原密码</div>
				<div class="va-form-el">
					<input type="password" v-model="oldpassword" placeholder="请输入原密码" class="va-ele">
				</div>
			</div>
		</div>
		<div class="col">
			<div class="va-form">
				<div class="va-form-text">新密码</div>
				<div class="va-form-el">
					<input type="password" v-model="newpassword" placeholder="请输入新密码" class="va-ele">
				</div>
			</div>
		</div>
		<div class="col">
			<div class="va-form">
				<div class="va-form-text">确认密码</div>
				<div class="va-form-el">
					<input type="password" v-model="confrimpassword" placeholder="请确认新密码" class="va-ele">
				</div>
			</div>
		</div>
	</div>
	<a class="btn" :class="btnOn" @click="subFormData" href="javascript:;" v-html="subBtnText"></a>
</section>

</template>

<script>
export default {
	data () {
		return {
			oldpassword:'',
			newpassword : '',
			confrimpassword : '',
			btnOn : '',
			subBtnText : '确认'
		}
	},vuerify: {
        oldpassword : [{ test: 'required', message: '原密码不能为空' }],
        newpassword : [{ test: 'required', message: '新密码不能为空' }],
        confrimpassword: { test: 'required', message: '确认新密码不能为空' }
    },methods : {
		subFormData (){
			var vm = this;
			if( 'on' == vm.btnOn )return;

			if( _com.vuerifyCheck(vm) ){

				if( vm.newpassword != vm.confrimpassword ){
					MintUI.Toast('两次输入密码不一致')
					return;
				}

				vm.btnOn = 'on';
				vm.subBtnText = '提交中...';

				var _p = {
					GID : usages.api.user.updateloginpw,
					userid : _com.getSession('userid'),
                    				oldpassword: vm.oldpassword,
					newpassword : vm.newpassword,
					rand: Math.random()
				}

				vm.$http.post(usages.domain,_p).then(function(res){
					if( res.body.issuccess ){
						MintUI.Toast('修改成功')
						this.$router.push('/login');
					}else{
						MintUI.Toast(res.body.rtnmessage)
						vm.btnOn = '';
						vm.subBtnText = '确认';
					}
			  	});
			}
		}
	}
}
</script>
