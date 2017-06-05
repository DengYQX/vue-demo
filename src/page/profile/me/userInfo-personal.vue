<style>
	/* @import "../../assets/css/profile.css" */
</style>

<template>

<section class="page uinfo">
	<div class="va marg-top15">
		<div class="col">
			<div class="va-form">
				<div class="va-form-text">姓名</div>
				<div class="va-form-el">
					<input type="text" v-model="formData.password" name="" placeholder="请输入姓名" class="va-ele">
				</div>
			</div>
		</div>
		<div class="col">
			<div class="va-form">
				<div class="va-form-text">手机号码</div>
				<div class="va-form-el">
					<input type="text" v-model="formData.confirmpassword" name="" placeholder="请输入手机号码" class="va-ele">
				</div>
			</div>
		</div>
		<div class="col">
			<div class="va-form">
				<div class="va-form-text">关系</div>
				<div class="va-form-el">
					<input type="text" v-model="formData.confirmpassword" name="" placeholder="请输入关系" class="va-ele">
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
		this.getRelativeType()
	},methods : {
		
		getRelativeType (){
			var vm = this,
			_p = {
				GID : usages.api.user.codelist,
				codeno : "RelativeType",
				rand: Math.random()
			};
			vm.$http.post(usages.domain,_p).then(function(res){
				if( res.data.issuccess ){
					console.log(res.data)
				}else{
					MintUI.Toast(res.data.rtnmessage)
				}
		  	});
		}
	},
    components: {
    }
}
</script>

