<template>
	<a href="javascript:;" @click="bindMsgCode" :class="btnOn" class="va-link tap-tran va-code" v-html="html"></a>
</template>

<script>
export default {
	props : ['phoneNumber'],
	data () {
		return {
			btnOn : '',
			html :'获取验证码',
			phonenum : '',
			isNext : false//返回父组件手机格式校验结果
		}
	},
    vuerify: {
        phonenum : [{ test: 'required', message: '手机号不能为空' },'phone']
    },methods : {
		bindMsgCode (){
			var vm = this;
				vm.phonenum = vm.phoneNumber;

			if( 'on' == vm.btnOn )return;

			if( _com.vuerifyCheck(vm,['phonenum']) ){

				vm.isNext = true;
				vm.btnOn = 'on';

				var setint = null,
					num = 59;

				vm.html = '重新获取('+ num +')';

				setint = setInterval(function(){
					num -- ;
					vm.html = '重新获取('+ num +')';
					if(0 === num){
						clearInterval(setint);
						vm.html = '获取验证码';
						vm.btnOn = '';
					}
				},1000);
			}
			vm.$emit('bindMsgCode', vm.isNext);
		}
	}
}
</script>
