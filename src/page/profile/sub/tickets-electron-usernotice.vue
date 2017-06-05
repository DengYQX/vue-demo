<template>
	<section class="page ticket">
		<div class="va marg-top15">
			<div class="col">
				<div class="va-body">
					<span class="use-icon i-condition"></span>
					<span style="left: 3rem;">使用条件</span>
				</div>
			</div>
			<div class="col" style="padding:0.5rem 0;">
				<p class="use-info">
					优惠价：888
					<br> 有效期：截止到2017-06-01（周末、法定节假日通用）
					<br> 服务承诺：随时退、过期退、极速退
					<br> 套餐详情：有机复合肥、生物有机肥、掺混肥一袋
				</p>
			</div>
		</div>
		<div class="va marg-top8">
			<div class="col">
				<div class="va-body">
					<span class="use-icon i-shop"></span>
					<span style="left: 3rem;">门店地址</span>
				</div>
			</div>
			<div class="col" style="padding:0.5rem 0;">
				<p class="use-info">
					浙江省杭州市下城区环城北路63号财富中心(多了换行)
				</p>
			</div>
		</div>
		<router-view></router-view>
	</section>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>