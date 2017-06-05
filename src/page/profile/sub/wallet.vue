<style>
	/* @import "../../assets/css/profile.css" */
</style>

<template>

<section class="page wallet">
	<div class="cover money">
		<div class="m-icon">
			<img src="Resources/h5/dist/images/my/wallte.png" alt="wallte">
		</div>
		<div class="unit">总金额（元）</div>
		<div class="amount">{{ myBalance.balance }}</div>
	</div>
	<div class="cover">
		<router-link :to="{ name : 'recharge' }" class="btn">充值</router-link>
	</div>
	<div class="cover">
		<router-link :to="{ name : 'withdraw' }" class="btn bg-white font-def">提现</router-link>
	</div>
	<div class="abs-bottom text-center">
		<router-link to="/TradingRecord" class="font-gray">查看交易记录</router-link>
	</div>
	<router-view></router-view>
</section>

</template>

<script>

export default {
	data () {
		return {
			myBalance : {}
		}
	},mounted (){

		this.fundcardlist();
		this.myBalance = JSON.parse(_com.getSession('mybalance'));

	},methods : {
		
		fundcardlist (){//查询是否已经绑卡
			
			var vm = this,
				_p = {
				GID : usages.api.user.fundcardlist,
				userid : _com.getSession('userid'),
				rand: Math.random()
			}
			vm.$http.post(usages.domain,_p).then(function(res){
				if( res.data.issuccess ){
					if( res.data.result.cardlist.length < 1 ){
						
						MintUI.MessageBox.alert('您未添加银行卡，无法进行充值','');
						vm.$router.push('/profile-cards-add');
					}else{
						_com.setSession('cardlist',JSON.stringify(res.data.result.cardlist));
					}
				}
			});
		},
		querytranspwdstatus (){//查询客户交易密码状态
			
			var vm = this;
	  		vm.formData.GID = usages.api.user.querytranspwdstatus;
	  		vm.formData.rand = Math.random();
			vm.$http.post(usages.domain,vm.formData).then(function(res){
				console.log(res, "查询客户交易密码状态")
		  	});
		},
		withdrawapply (){//提交提现申请
			
			var vm = this;
			vm.formData.rand = Math.random();
	  		vm.formData.GID = usages.api.user.withdrawapply;
			vm.$http.post(usages.domain,vm.formData).then(function(res){
				console.log(res, "提交提现申请")
		  	});
		}
	}
}
</script>

