<style>
	/* @import "../../assets/css/profile.css" */
</style>

<template>

<section class="page wallet marg-top15">
	<div class="cover va">
		<a @click="popupVisible = true" v-for="key in fundcardlist" class="mybank bg box arrows-right" href="javascript:;">
			<div class="back-logo">
				<img :src="'Resources/h5/dist/images/my/bank/pay/' + key.bankno + '.png'" alt="bank-logo">
			</div>
			<div class="back-num">{{ key.accountno }}</div>
		</a>
	</div>
	<div class="cover va">
		<div class="box form-row">
			<div class="form-text">充值金额</div>
			<input type="number" placeholder="输入充值金额（单笔限额10000）" value="" v-model="withdrawal">
			<a class="clear_val" href="javascript:;"></a>
		</div>
	</div>
	<div class="cover bal">
		<span>可用余额￥{{balance}}，</span>		
		<a class="w-all" href="javascript:;" @click="withdrawal=balance">全部提现</a>
	</div>
	<div class="cover submit">
		<a class="btn" href="javascript:;">确认充值</a>
	</div>
	<mt-popup v-model="popupVisible" :modal="false"	position="bottom">
		<myBanks v-on:bindBankNo="getBankNo"></myBanks>
	</mt-popup>
</section>

</template>

<script>

import myBanks from '../../../components/myBanks.vue'

export default {
	data () {
		return {
			popupVisible : false,
			fundcardlist : [],
			balance:10000.00,
			withdrawal:''//提现金额
		}
	},mounted (){
		this.fundcardlist.push.apply(this.fundcardlist,JSON.parse(_com.getSession('cardlist')));
	},methods : {
		getBankNo (bankno){
			console.log(bankno)
			this.popupVisible = false;
		}
	},components : {
		myBanks
	}
}
</script>
