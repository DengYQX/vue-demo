<style>
	/* @import "../../assets/css/profile.css" */
</style>

<template>

<section class="page news marg-top15">
	<a class="bg" 
	@click="setstatus(key.readstatus,key.sitemailid)"  
	:class="{ 'on' : 1 == key.readstatus}" 	
	v-for="key in newsList">
		<span class="toverflow">{{ key.title }}</span>
		<label>{{ key.receivetime }}</label>
	</a>
	<router-view></router-view>
</section>

</template>

<script>

export default {
	data () {
		return {
			formData : {},
			newsList : []
		}
	},mounted (){
		this.querylist();
	},methods : {
		
		querylist (){//获取消息列表
			
			var vm = this,
			_p = {
				GID : usages.api.user.querylist,
				userid : _com.getSession('userid'),
				pagesize : 20,
				pagenum : 1,
				rand: Math.random()
			};
			vm.$http.post(usages.domain,_p).then(function(res){
				if( res.body.issuccess ){
					vm.newsList.push.apply(vm.newsList,res.body.result.mails);
				}else{
					MintUI.Toast('获取消息失败')
				}
		  	});
		},setstatus (s,id){//修改已读状态
			if(s == 1){
				var vm = this,
				_p = {
					GID : usages.api.user.setstatus,
					userid : _com.getSession('userid'),
					scope : id,
					mailstatus : '2',
					rand: Math.random()
				};
				vm.$http.post(usages.domain,_p);
			}
			this.$router.push({ name : 'news-info',params : { id : id }})
		}
	}
}
</script>

