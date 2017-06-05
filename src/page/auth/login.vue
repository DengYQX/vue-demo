<style>
body .mint-popup-kmtop {
	width: 100%;
	height: 40px;
	text-align: center;
	background-color: #FFA05C;
}

.mint-popup-kmtop p {
	line-height: 40px;
	color: #fff;
}
</style>

<template>
	<section class="page login">
		<div class="logo">
			<div>
				<img src="Resources/h5/dist/images/my/logo.png"
				     alt="logo">
			</div>
		</div>
		<div class="va marg-top15">
			<div class="col">
				<div class="va-form">
					<div class="va-form-text">用户名</div>
					<div class="va-form-el">
						<input type="text"
						       v-model="username"
						       name=""
						       placeholder="请输入手机/邮箱/用户名"
						       class="va-ele">
					</div>
				</div>
			</div>
			<div class="col">
				<div class="va-form">
					<div class="va-form-text">密码</div>
					<div class="va-form-el">
						<input type="password"
						       v-model="password"
						       name=""
						       placeholder="请输入登录密码"
						       class="va-ele">
					</div>
				</div>
			</div>
		</div>
		<a class="btn"
		   :class="{ 'on': btnOn }"
		   @click="login()"
		   v-html="subBtnText"></a>
		<div class="table">
			<router-link :to="{ name : 'findpwd' }"
			             class="table-td">找回密码?</router-link>
			<router-link :to="{ name : 'register' }"
			             class="table-td">免费注册</router-link>
		</div>
		<router-view></router-view>
		<mt-popup v-model="popupVisible"
		          :modal="false"
		          position="top"
		          size="large"
		          class="mint-popup-kmtop">
			<p>{{popupMsg}}</p>
		</mt-popup>
	</section>
</template>

<script>

export default {
	data() {
		return {
			username: '',
			password: '',
			btnOn: '',
			subBtnText: '登录',
			popupMsg: '',
			popupVisible: false
		}
	}, mounted() {

	}, vuerify: {
		username: { test: 'required', message: '用户名不能为空' },
		password: { test: 'required', message: '密码不能为空' }
	}, methods: {
		login() {
			var vm = this;
			if ('on' == vm.btnOn) return;

			if (_com.vuerifyCheck(vm)) {
				vm.btnOn = 'on';
				vm.subBtnText = '正在登录...';
				var _p = {
					GID: usages.api.user.logon,
					username: vm.username,
					password: vm.password,
					usertype: '001',
					show: false,
					rand: Math.random()
				}
				vm.$http.post(usages.domain, _p).then(function (res) {
					console.log(res);
					if (res.body.issuccess) {
						_com.setSession('km_login', 1);
						_com.setSession('phone', vm.username);
						_com.setSession('userid', res.body.result.userid);
						console.log(99999);
						vm.$router.push({name:'index'});
					} else {
						vm.popupMsg = res.body.rtnmessage;
						vm.popupVisible = true;
						vm.btnOn = '';
						vm.subBtnText = '登录';
					}
				});
			}
		}
	},
	watch: {
		'popupVisible': function () {
			var vm = this;
			clearTimeout(vm.settime)
			vm.settime = setTimeout(function () {
				vm.popupVisible = false;
			}, 3000);
		}
	}
}
</script>
