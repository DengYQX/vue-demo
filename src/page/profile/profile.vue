<style>
	 /*@import "../../assets/css/profile.css" */
</style>

<template>

<section class="page profile">
	<div class="pro marg-top15">
		<div class="pro-head">
			<img src="Resources/h5/dist/images/my/defhead.png" alt="head">
		</div>
		<div class="pro-to">
			<router-link :to="{ name : 'userInfo' }" class="arrows-right">
				<span class="l">{{ userInfo.phonetel }}</span>
				<span class="r">个人信息</span>
			</router-link>
		</div>
	</div>
	<div class="nav marg-top8">
		<div class="nav-row box two">
			<router-link :to="{ name : 'setup' }">
				<div class="nav-warp">
					<div class="nav-title">						
						<div class="nav-icon">
							<img src="Resources/h5/dist/images/my/setup.png">
						</div>
						<span class="nav-name">设置</span>
					</div>
				</div>
			</router-link>
			<router-link :to="{ name : 'news' }">
				<div class="nav-warp">
					<div class="nav-title">
						<div class="nav-icon" :class="{ 'hasmsg' : (queryMsgcount|0) > 0}">
							<img src="Resources/h5/dist/images/my/msg.png">
						</div>
						<span class="nav-name">我的消息{{ queryMsgcount > 0 ? '(' + queryMsgcount + ')' : '' }}</span>
					</div>
				</div>
			</router-link>
		</div>
	</div>
	<div class="nav marg-top8">
		<div class="nav-row box del">
			<router-link :to="{ name : 'wallet' }">
				<div class="nav-warp flex">
					<div class="nav-icon">
						<img src="Resources/h5/dist/images/my/01.png">
					</div>
					<div class="nav-title">
						<span class="nav-name">我的钱包</span>
						<span class="nav-sub">{{ myBalance.balance }}元</span>
					</div>
				</div>
			</router-link>
			<router-link :to="{ name : 'cards' }">
				<div class="nav-warp flex">
					<div class="nav-icon">
						<img src="Resources/h5/dist/images/my/02.png">
					</div>
					<div class="nav-title">
						<span class="nav-name">银行卡</span>
						<span class="nav-sub">共 3 张</span>
					</div>
				</div>
			</router-link>
			<router-link :to="{ name : 'tickets' }">
				<div class="nav-warp flex">
					<div class="nav-icon">
						<img src="Resources/h5/dist/images/my/03.png">
					</div>
					<div class="nav-title">
						<span class="nav-name">我的卡券</span>
					</div>
				</div>
			</router-link>
		</div>
	</div>
	<router-view></router-view>
</section>

</template>


<script>

export default {
	data () {
		return {
    		formData : {},
    		userInfo : {},
    		queryMsgcount : 0,
    		myBalance : {},
    		_userId : ''
		}
	},mounted (){
		var vm = this;
		vm._userId = _com.getSession('userid');
		vm.queryuser();
		vm.querycount();
		vm.querybalance();

	},methods : {
		querycount (){//获取我的消息
			
			var vm = this,
			_p = {
				userid : vm._userId,
				GID : usages.api.user.querycount,
				rand: Math.random()
			};
			vm.$http.post(usages.domain,_p).then(function(res){
				vm.queryMsgcount = res.data.result.unreadcount;
		  	});
		},
		querybalance (){//会员余额查询交易
			var vm = this,
			_p = {
				userid : vm._userId,
				GID : usages.api.user.querybalance,
				rand: Math.random()
			};
			vm.$http.post(usages.domain,_p).then(function(res){
				if( res.data.issuccess ){
					vm.myBalance = res.data.result;
					_com.setSession('mybalance',JSON.stringify(vm.myBalance));
				}
		  	});
		},
		queryuser (){

			var vm = this,
				_p = {
					userid : vm._userId,
					GID : usages.api.user.queryuser,
					rand: Math.random()
				};
			vm.$http.post(usages.domain,_p).then(function(res){

				if( res.data.issuccess ){
					vm.userInfo = res.data.result;
					_com.setSession('userInfo',JSON.stringify(vm.userInfo));
				}else{
					MintUI.Toast(res.data.rtnmessage)
				}

		  	});
		}
	}
}
</script>
