<style>
	/* @import "../../assets/css/profile.css" */
</style>

<template>

<section class="page news">
	<div class="news-info">
		{{ result.title }} <!-- 特么的conten没值先用title -->
	</div>
</section>

</template>

<script>

export default {
	data () {
		return {
			result : ''
		}
	},mounted (){
		this.queryinfo();
	},methods : {
		
		queryinfo (){
			
			var vm = this,
			_p = {
				GID : usages.api.user.queryinfo,
				userid : _com.getSession('userid'),
				sitemailid : vm.$route.params.id,
				rand: Math.random()
			};
			vm.$http.post(usages.domain,_p).then(function(res){
				if( res.data.issuccess ){
					vm.result = res.data.result;
				}else{
					MintUI.Toast('获取消息详情失败')
				}
		  	});
		}
	}
}
</script>

