<template>
<div class="code-img"><img @click="refreshImg" :src="codePath" /></div>
</template>

<script>
export default {
	data () {
		return {
			codePath : usages.codepath + "?rand=" + Math.random()
		}
	},methods : {
		refreshImg (){//获取验证码
			this.codePath = usages.codepath + "?rand=" + Math.random()
		}
	}
}
</script>
