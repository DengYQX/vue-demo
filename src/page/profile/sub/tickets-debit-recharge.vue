<style>
/* @import "../../assets/css/profile.css" */
</style>

<template>
	<section class="page debit-recharge">
		<div class="va first">
			<div class="col">
				<div class="va-row">
					<span class="va-row-title">持卡人</span>
					<span class="va-row-val">张三</span>
				</div>
				<div class="va-row">
					<span class="va-row-title">卡号</span>
					<span class="va-row-val">8888 8888 8888 888</span>
				</div>
			</div>
	
			<div class="col">
				<div class="va-row">
					<span class="va-row-val">选择充值金额</span>
				</div>
				<div class="va-box clearfix">
					<div class="va-box-inner"
					     v-for="(money,index) in price"
					     @click="checkprice(money,index)"
					     :class="{cp:currentIndex==index}">
						<div>{{money}}</div>
					</div>
				</div>
			</div>
		</div>
		<agree v-on:bindCheck="bindCheck"
		       :link="linkobj"></agree>
		<a class="btn">下一步</a>
		<div class="p-col center">付款账号：我的钱包></div>
	</section>
</template>

<script>
var agree = require('../../../components/agreement.vue');//
export default {
	data() {
		return {
			linkobj: {
				linkurl: '',
				linktitle: '卡盟平台卡卷服务协议',
				style: 'margin-top:-1rem;margin-bottom: 0.2rem;'
			},
			price: [100, 200, 300, 500, 800, 1000],
			currentIndex: 0,
			money: 0,
			isActive: false
		}
	},
	methods: {
		bindCheck(isAgree) {
			this.isActive = isAgree;
		},
		checkprice(money, index) {
			var vm = this;
			vm.currentIndex = index;
			vm.money = money;
		},
		save() {
			var data = {
				GID: '',
				userid: _com.getSession('userid')

			}
		}
	},
	components: {
		agree
	}
}
</script>
