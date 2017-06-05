<template>
<section class="cards">
	<div class="c-list">
		<div v-for="key in cardlist" @click="bindBankNo(key.bankno)" class="card box bg-white">
			<div class="c-logo">
				<img :src="'Resources/h5/imgs/my/bank/pay/' + key.bankno + '.png'" alt="bank-logo">
			</div>
			<div class="c-info">
				<div class="c-number">{{ key.accountno }}</div>
			</div>
		</div>
	</div>
</section>
</template>

<script>

export default {
	data () {
		return {
			cardlist : []
		}
	},mounted (){
		this.fundcardlist();
	},methods : {
		fundcardlist (){//获取用户绑定的银行卡
			
			var vm = this,
				_p = {
					userid : _com.getSession('userid'),
					GID : usages.api.user.fundcardlist,
					rand: Math.random()
				};
			vm.$http.post(usages.domain,_p).then(function(res){
				if( res.body.issuccess ){
					vm.cardlist.push.apply(vm.cardlist,res.body.result.cardlist);
				}else{
					MintUI.Toast('获取绑定的银行卡失败')
				}

		  	});
		},bindBankNo (bankno){
			this.$emit('bindBankNo',bankno);
		}
	}
}
</script>
