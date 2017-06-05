<style>
/* @import "../../assets/css/profile.css" */
</style>

<template>
	<section class="page ticket">
		<div class="va first t-balance">
			<div class="t-bal">账户余额</div>
			<div class="t-num">888888.88元</div>
			<div class="t-indate">有效期：2020年12月25日</div>
			<div class="t-debit-c col full">
				<div class="va-body">
					<span>预付卡卡号</span>
					<label>8888 8888 8888 888</label>
				</div>
			</div>
		</div>
		<div class="va">
			<div class="col">
				<div class="va-body">
					<span>发卡商家</span>
					<label>杨国福麻辣烫餐饮服务有限公司</label>
				</div>
			</div>
			<div class="col">
				<div class="va-body">
					<span>预付卡特权</span>
					<label>7折优惠</label>
				</div>
			</div>
		</div>
		<div class="va">
			<div class="col" @click="usernotice">
				<div class="va-body arrows-right">
					<span>使用须知</span>
				</div>
			</div>
		</div>
		<router-link :to="{ name : 'debit-recharge' }"
		             class="btn">充值</router-link>
		<router-view></router-view>
	</section>
</template>

<script>
 export default {
	data(){
		return{

		}
	},
	methods: {
		usernotice(){
			this.$router.push({
				name:'debit-usernotice'
			});
		}
	}
 }
</script>
