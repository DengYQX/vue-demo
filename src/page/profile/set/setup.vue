<style>
/* @import "../../assets/css/profile.css" */
</style>

<template>
	<section class="page setup">
		<div class="va marg-top15">
			<div class="col">
				<router-link :to="{ name : 'setpwd' }"
				             class="va-body arrows-right">
					<span>密码设置</span>
				</router-link>
			</div>
		</div>
		<div class="va">
			<div class="col">
				<div class="va-body">
					<span>客服电话</span>
					<a class="right tel"
					   href="tel:400412223">400412223</a>
				</div>
			</div>
			<div class="col">
				<router-link :to="{ name : 'feedback' }"
				             class="va-body arrows-right">
					<span>意见反馈</span>
				</router-link>
			</div>
		</div>
		<div class="va">
			<div class="col">
				<a @click="logout"
				   class="va-body font-red text-center">退出登录</a>
			</div>
		</div>
		<router-view></router-view>
	</section>
</template>

<script>

export default {
	methods: {
		logout() {
			var vm = this;
			MintUI.MessageBox({
				title: '',
				message: '您确定退出登录吗？',
				showCancelButton: true,
				confirmButtonClass: 'confirm',

			}).then(
				function (value) {
					if ('confirm' == value) {
						_com.setSession('km_login', 0);
						vm.$router.push('/login');
					}
				});
		}
	}
}
</script>
