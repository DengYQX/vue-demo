<style>
	/* @import "../../assets/css/profile.css" */
</style>

<template>
	<section class="page setup">
		<div class="row-field marg-top15">
			<div class="field arrows-right" @click="popupVisible=true">
				{{selectText}}
			</div>
			<div class="field field-area">
				<textarea v-model="formData.feedbackmsg" rows="4" class="va-ele" placeholder="请输入您的反馈意见"></textarea>
				<p style="font-size:0.8rem;margin:5px 0;">十分感谢您的反馈意见！</p>
			</div>
		</div>


		<mt-popup v-model="popupVisible" position="bottom" class="mint-popup-km">
			<div class="popup-body">
				<div class="popub-head clearfix">
					<span class="cancel" @click="popupVisible=false">取消</span>
					<span class="sure" @click="checkSel">完成</span>
				</div>
				<div class="popub-content">
					<mt-picker :slots="dateSlots" @change="onDateChange" :visible-item-count="5" :show-toolbar="false"></mt-picker>
				</div>
			</div>
		</mt-popup>
		<a class="btn" href="javascript:;" @click="submitfeedback()">提交</a>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				selectText: '请选择反馈类型',
				selectVal: '',
				popupVisible: false,
				dateSlots: [{
					flex: 1,
					values: ['支付问题', '体验问题', '应用缺陷', '页面跳转', '提示信息', '其他问题'],
					className: 'slot1',
					textAlign: 'center'
				}],
				formData: {
					GID: usages.api.user.submitfeedback,
					userid: _com.getSession('userid'),
					feedbacktype: '',
					feedbackmsg: ''
				}
			}
		},
		methods: {
			checkSel() {
				this.selectText = this.selectVal;
				this.formData.feedbacktype = this.selectVal;
				this.popupVisible = false;
			},
			onDateChange(picker, values) {
				var vm = this;
				var selectVal = values[0] || '';
				vm.selectVal = selectVal;
			},
			submitfeedback() {
				var vm = this;
				vm.formData.rand = Math.random();
				vm.$http.post(usages.domain, vm.formData).then(function (res) {
					console.log(res);
					if (res.body.issuccess) {
						MintUI.MessageBox.alert('您的反馈已经提交成功，感谢您的宝贵意见', '');
					} else {
						MintUI.Toast(res.body.rtnmessage);
					}
				});
			}
		}
	}
</script>