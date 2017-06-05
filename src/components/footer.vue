<template>
		<div class="footer">
			<div class="mint-tabbar is-fixed">
				<router-link to="/" class="mint-tab-item" :class="{active:active==1}">
					<div class="mint-tab-item-icon">
					<img src="Resources/h5/dist/images/home-h.png" v-if="active===1">
					<img src="Resources/h5/dist/images/home-b.png" v-else>
					</div>
					<div class="mint-tab-item-label" :class="{active:active==1}"> 首页
					</div>
				</router-link>
				<router-link :to="{name:'consumption',params:{type:0}}" class="mint-tab-item" :class="{active:active==2}">
					<div class="mint-tab-item-icon" :class="{active:active==2}">
						<img src="Resources/h5/dist/images/consum-h.png" v-if="active===2">
					<img src="Resources/h5/dist/images/consum-b.png" v-else>
					</div>
					<div class="mint-tab-item-label"> 消费
					</div>
				</router-link>
				<router-link to="/profile" class="mint-tab-item" :class="{active:active==3}">
					<div class="mint-tab-item-icon" :class="{active:active==3}">
					<img src="Resources/h5/dist/images/myicon-h.png" v-if="active===3">
					<img src="Resources/h5/dist/images/myicon-b.png" v-else></div>
					<div class="mint-tab-item-label"> 我的
					</div>
				</router-link>
			</div>
		</div>
</template>

<script>
export default {
  props:['active'],
  data () {
    return {
 
    }
  },
  methods: {
	  callBack(){
		  
	  }
  }
}
</script>
