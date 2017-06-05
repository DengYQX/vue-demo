<style>
	.gather {
		background: #659ff5;
	}

	.gather-content {
		background: #fff;
		border-radius: 10px;
		margin: 5rem 1rem;
		min-height: 8rem;
	}

	.gather-content .title {
		border-bottom: 1px solid #F1F3F5;
	}

	.gather-content .title h2 {
		font-size: 1.2rem;
		color: #333;
		text-align: center;
		line-height: 2.8rem;
	}

	.gather .full-bg.qrcode {
		text-align: center;
		padding: 2rem 0;
	}
</style>
<template>
	<section class="page gather">
		<div class="gather-content">
			<div class="title">
				<h2>扫一扫向我付款</h2>
			</div>
			<div class="gather-img">
				<div class="full-bg qrcode">
					<qrcode :size="qrSize" :cls="qrCls" :value="orderno"></qrcode>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import Qrcode from 'v-qrcode'
	export default {
		data() {
			return {
				title: '首页',
				orderno: '',
				qrSize:150,
				qrCls:150
			}
		},
		components: {
			Qrcode
		},
		mounted() {
			//隐藏加载动画
			this.createtransferorder();
		},
		methods: {
			//扫一扫
			createtransferorder() {
				var vm = this;
				var _data = {
					GID: usages.api.user.createtransferorder,
					userid: _com.getSession('userid'),
					rand: Math.random()
				}
				vm.$http.post(usages.domain, _data).then(function (res) {
					if (res.body.issuccess) {
						vm.orderno = res.body.result.orderno;
					}
				})
			}
		}
	}
</script>