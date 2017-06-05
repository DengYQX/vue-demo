<style>
/* @import "../../assets/css/profile.css" */
</style>

<template>
	<section class="page s-cards">
		<div v-for="key in banklist"
		     @click="getBankNo(key.bankno,key.bankname)"
		     class="card box bg-white">
			<div class="c-logo">
				<img :src="'Resources/h5/dist/images/my/bank/pay/' + key.bankno + '.png'"
				     alt="bank-logo">
			</div>
			<div class="c-info">
				<div class="c-number">{{ key.bankname }}</div>
			</div>
		</div>
	</section>
</template>

<script>

export default {
	data() {
		return {
			banklist: []
		}
	}, mounted() {
		this.getbindcardbank();
	}, methods: {
		getbindcardbank() {//获取绑定的银行卡
			var vm = this,
				_p = { GID: usages.api.user.getbindcardbank, rand: Math.random() };

			vm.$http.post(usages.domain, _p).then(function (res) {
				if (res.data.issuccess) {
					vm.banklist.push.apply(vm.banklist, res.data.result.banklist);
				} else {

				}
			});
		}, getBankNo(no, name) {
			_com.setSession('bankData', JSON.stringify({ no: no, name: name }));
			history.go(-1);
		}
	}
}
</script>
