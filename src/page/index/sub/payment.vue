<style>
@import '../../../assets/css/view/payment.css';
body .pay-page {
	background: #F1F3F5;
}
</style>
<template>
	<section class="page pay-page">
		<mt-header fixed
		           title="付款">
			<router-link to="/"
			             slot="left">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
		<div class="pay pay-top-wrap">
			<div class="head-pic">
				<div class="pic"></div>
			</div>
			<div class="pay-name">
				<p class="name">百胜中国年</p>
				<p class="tel">1588****888</p>
			</div>
			<div class="pay-price">
				<mt-field label="交易金额"
				          placeholder="请输入交易金额"
				          type="number"></mt-field>
			</div>
			<div class="pay-btn">
				<mt-button type="primary"
				           size="large"
				           @click.native="handleClick">确认</mt-button>
				<p class="desc">使用我的钱包付款 </p>
			</div>
		</div>
	</section>
</template>

<script>
var MintUI = require('mint-ui');
var MessageBox = MintUI.MessageBox;
module.exports = {
	data: function () {
		return {
			title: '付款'
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