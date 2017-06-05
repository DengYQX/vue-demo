<template>
	<a v-if="formValue != ''" href="javascript:;" @click="clear" class="clear_val"></a>
</template>

<script>
export default {
	props : ['formValue'],
	data () {
		return {
			formData :{},
			btnOn : '',
			html :'获取验证码'
		}
	},methods : {
			clear (){
				this.formValue = '';
			}
		}
	}
</script>
