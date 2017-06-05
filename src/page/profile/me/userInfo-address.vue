<style>
	/* @import "../../assets/css/profile.css" */
</style>

<template>

<section class="page uinfo">
	<div class="va marg-top15">
		<div class="col">
			<div class="va-form">
				<div class="va-form-text">省\市\区</div>
				<div class="va-form-el">
					<input type="text" v-model="formData.password" name="" placeholder="请输入省\市\区" class="va-ele">
				</div>
			</div>
		</div>
		<div class="col">
			<div class="va-form">
				<div class="va-form-text">详细地址</div>
				<div class="va-form-el">
					<input type="text" v-model="formData.confirmpassword" name="" placeholder="请输入详细地址" class="va-ele">
				</div>
			</div>
		</div>
		<div class="col">
			<div class="va-form">
				<div class="va-form-text">邮政编码</div>
				<div class="va-form-el">
					<input type="text" v-model="formData.confirmpassword" name="" placeholder="请输入邮政编码" class="va-ele">
				</div>
			</div>
		</div>
	</div>
	<a class="btn on" href="javascript:;">保存</a>
</section>

</template>

<script>
export default {
	data () {
		return {
			formData : {}
		}
	},
	mounted (){
	},methods : {
	},
    components: {
    }
}
</script>

