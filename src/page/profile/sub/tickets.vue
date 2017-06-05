<style>
/* @import "../../assets/css/profile.css" */
</style>

<template>
	<section class="page ticket">
		<header class="t-head box">
			<a @click="selector(0)"
			   :class="{ 'on' : navOn == 0 }"><span>预付卡</span></a>
			<a @click="selector(1)"
			   :class="{ 'on' : navOn == 1 }"><span>电子卡</span></a>
		</header>
		<!-- 预付卡 -->
		<div v-show="navOn == 0"
		     class="t-list b">
			<router-link :to="{ name : 'debit' }"
			             class="t-ticket bg marg-bot15">
				<div class="t-icon"></div>
				<div class="t-title toverflow arrows-right">中粮集团代金券</div>
			</router-link>
	
			<router-link :to="{ name : 'debit' }"
			             class="t-ticket bg marg-bot15">
				<div class="t-icon"></div>
				<div class="t-title toverflow arrows-right">中粮集团代金券</div>
			</router-link>
		</div>
		<!-- 电子券 -->
		<div v-show="navOn == 1"
		     class="t-list a">
			<router-link :to="{ name : 'electron' }"
			             class="t-ticket t-ticket-item  bg marg-bot15">
				<div class="td-top">
					<div class="td-name toverflow">中粮集团端午节套装兑换券</div>
					<div class="td-num">共2张</div>
				</div>
				<div class="indate">有效期至2017-05-01</div>
			</router-link>
			<router-link :to="{ name : 'electron' }"
			             class="t-ticket t-ticket-item bg marg-bot15">
				<div class="td-top">
					<div class="td-name toverflow">中粮集团端午节套装兑换券</div>
					<div class="td-num">共2张</div>
				</div>
				<div class="indate">有效期至2017-05-01</div>
			</router-link>
		</div>
		<div class="no-datalist"
		     v-show="">
			<img src="Resources/h5/dist/images/empty.png">
			<p>
				暂无数据，可
				<router-link :to="{name:'consumption',params:{type:0}}"
				             style="color: #2791DA;">立即购买</router-link>
			</p>
		</div>
		<router-view></router-view>
	</section>
</template>

<script>
export default {
	data() {
		return {
			tickList: [],
			cardList: [],
			isShow: false,
			formData: {
				GID: '',
				userid: _com.getSession('userid')
			},
			navOn: 0,
			msgbox: false
		}
	},
	mounted() {
		//隐藏加载动画
		var vm = this;
		vm.querycardbatchlist();
		vm.queryticketbatchlist();
		if (vm.tickList.length > 0 || vm.cardList.length > 0) {
			vm.isShow = false;
		} else {
			vm.isShow = true;
		}
	},
	methods: {
		selector(type) {
			this.navOn = type;
		},
		showCard(id) {
			this.msgbox = true;
		},
		queryticketbatchlist() { //个人电子券列表
			var vm = this;
			vm.formData.GID = usages.api.user.queryticketbatchlist;
			vm.formData.rand = Math.random();
			vm.$http.post(usages.domain, vm.formData).then(function (res) {
				console.log(res);
				if (res.body.issuccess) {
					vm.tickList = res.body.result.ticketlist;
				} else {
					vm.errMsg(res.body.rtnmessage);
				}
			});
			MintUI.Indicator.close();
		},
		querycardbatchlist() { //预付卡
			var vm = this;
			vm.formData.GID = usages.api.user.querycardbatchlist;
			vm.formData.rand = Math.random();
			vm.$http.post(usages.domain, vm.formData).then(function (res) {
				console.log(res);
				if (res.body.issuccess) {
					vm.cardlist = res.body.result.cardlist;
				} else {
					vm.errMsg(res.body.rtnmessage);
				}
			});
		},
		errMsg(msg) {
			MintUI.MessageBox('', msg);
		}
	}
}
</script>
