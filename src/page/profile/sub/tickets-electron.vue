<style>
	/* @import "../../assets/css/profile.css" */
</style>

<template>
	<section class="page electron">
		<div class="t-list a">
			<div class="td-top tn-info">
				<div class="td-name toverflow">中粮集团端午节套装兑换券</div>
				<div class="td-num">2张</div>
			</div>
		</div>
		<div class="t-list t-list-info a">
			<a href="javascript:;" class="t-ticket bg marg-bottom15" @click="showCard()">
				<div class="td-top">
					<div class="td-name toverflow">券号 3896 0316 7515 5288</div>
					<div class="td-num"></div>
				</div>
				<div class="indate">有效期至2017-05-01</div>

			</a>
			<a href="javascript:;" class="t-ticket bg marg-bottom15" @click="showCard()">
				<div class="td-top">
					<div class="td-name toverflow">券号 3896 0316 7515 5288</div>
					<div class="td-num"></div>
				</div>
				<div class="indate">有效期至2017-05-01</div>

			</a>
		</div>
		<div class="footer c-edit tinfo-foot">
			<router-link to="/profile-tickets-electron-usernotice">使用须知</router-link>
			|
			<router-link to="/profile-tickets-electron-usernotice">门店地址</router-link>
		</div>
		<!-- 电子卡 -->
		<div class="msg-box" v-show="isShow" @click="isShow=false">
			<div class="msg-box-inner on">
				<div class="msg-box-head">向商家展示二维码</div>
				<div class="msg-box-body">
					<div class="code-img"></div>
					<div class="code-text">券号 3896 0316 7515 5288</div>
				</div>
			</div>
		</div>
		<router-view></router-view>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				tickList: [],
				isShow: false,
				formData: {
					GID: '',
					userid: _com.getSession('userid')
				}
			}
		},
		mounted() {
			//隐藏加载动画
			var vm = this;
		},
		methods: {
			checkShow() {
				this.isShow = true;
			},
			showCard() {
				this.isShow = true;
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
			errMsg(msg) {
				MintUI.MessageBox('', msg);
			}
		}
	}
</script>