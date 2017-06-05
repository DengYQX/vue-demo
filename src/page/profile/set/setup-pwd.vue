<style>
/* @import "../../assets/css/profile.css" */
</style>

<template>
	<section class="page setpwd">
		<div class="va marg-top15">
			<div class="col">
				<router-link :to="{ name : 'resetpaypwd' }"
				             class="va-body arrows-right">
					<span>{{payText}}</span>
				</router-link>
			</div>
			<div class="col">
				<router-link :to="{ name : 'resetloginpwd' }"
				             class="va-body arrows-right">
					<span>重置登录密码</span>
				</router-link>
			</div>
		</div>
	
		<router-view></router-view>
	</section>
</template>

<script>

export default {
	data() {
		return {
			payText: '设置支付密码'
		}
	},
	mounted() {
		var vm = this;
		if (_com.getSession('km_paypwd')) {
			vm.payText = '重置支付密码';
		}
	},
	methods: {
		logout() {
			if (confirm('确认退出？')) {
				_com.setSession('km_login', 0);
				this.$router.push('/login');
			}
		}
	}
}
</script>
