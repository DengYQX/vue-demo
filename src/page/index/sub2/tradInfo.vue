<style>
@import '../../../assets/css/view/payment.css';
.pay-page {
	background: #F1F3F5;
}
</style>
<template>
	<section class="page pay-page">
		<mt-header fixed
		           title="交易详情">
			<router-link to="/"
			             slot="left">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
	
		<div class="pay pay-done-top">
			<div class="payer">
				<div class="pic fl"></div>
				<div class="name fl">百胜中国年</div>
			</div>
		</div>
	
		<div class="pay-done-wrap">
			<h2 class="money">-888.88元</h2>
			<p class="tip">支付成功</p>
		</div>
		<div class="col-field">
			<ul>
				<li>
					<div class="pay-done-item clearfix">
						<div class="item-title fl">交易流水号</div>
						<div class="item-info fr">201703221001004023801122341</div>
					</div>
				</li>
				<li>
					<div class="pay-done-item clearfix">
						<div class="item-title fl">交易商户</div>
						<div class="item-info fr">百胜中国年(杭州建国北路店)</div>
					</div>
				</li>
				<li>
					<div class="pay-done-item clearfix">
						<div class="item-title fl">交易账户</div>
						<div class="item-info fr">我的钱包</div>
					</div>
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
var MintUI = require('mint-ui');
var MessageBox = MintUI.MessageBox;
module.exports = {
	data: function () {
		return {
			title: '交易详情'
		}
	},
	components: {},
	// 加载之前
	created: function () {
		document.title = this.title;
	},

	mounted: function () {
		//隐藏加载动画
	},
	methods: {
		//扫一扫
		openWxSys: function () {
			MessageBox('提示', '扫一扫');
		},
		handleClick: function () {
			MessageBox('提示', '提交成功');
		}
	}
}
</script>