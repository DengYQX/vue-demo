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
	<div class="va cover">
		<div class="box form-row">
			<div class="form-text">充值金额</div>
			<input type="tel" v-model="amount" placeholder="输入充值金额（单笔限额10000）" name="">
			<a class="clear_val" href="javascript:;"></a>
		</div>
	</div>
	 <agree v-on:bindCheck="bindCheck"
                  :link="linkobj"></agree>
	<div class="cover submit">
		<a class="btn" @click="subData" href="javascript:;">确认充值</a>
	</div>

	<mt-popup v-model="popupVisible" :modal="false"	position="bottom">
		<myBanks v-on:bindBankNo="getBankNo"></myBanks>
	</mt-popup>

</section>

</template>

<script>

import myBanks from '../../../components/myBanks.vue'
import agree from '../../../components/agreement.vue';//协议组件
export default {
	data () {
		return {
			 linkobj: {
                linkurl: 'profile-wallet',
                linktitle: '卡盟平台用户服务协议',
				style:'margin-top:-1rem;'
            },
			isActive:false,
			popupVisible : false,
			amount : '',
			fundcardlist : []
		}
	},mounted (){
		this.fundcardlist.push.apply(this.fundcardlist,JSON.parse(_com.getSession('cardlist')));
	},methods : {
		  bindCheck(isAgree) {
            this.isActive = isAgree;
        },
		getBankNo (bankno){
			console.log(bankno)
			this.popupVisible = false;
		},
		subData (){

			var vm = this,
				_p = {
					userid : _com.getSession('userid'),
					GID : usages.api.user.chargeapply,
					amount : vm.amount,
					password : '123456',
					cardserialno : vm.fundcardlist[0].serialno,
					rand: Math.random()
				};

			vm.$http.post(usages.domain,_p).then(function(res){
				if( res.data.issuccess ){
					MintUI.Toast('充值成功')
				}else{
					MintUI.Toast(res.data.rtnmessage)
				}

		  	});
		}
	},components : {
		myBanks,agree
	}
}
</script>
