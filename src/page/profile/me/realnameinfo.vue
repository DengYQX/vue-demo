<style>
/* @import "../../assets/css/profile.css" */
</style>

<template>
	<section class="page uinfo">
		<div class="row-field bg marg-top15">
			<div class="field">
				<div class="item-title fl">
					真实姓名
				</div>
				<div class="item-info fl"
				     :style="cssStyle">
					{{ formData.realname }}
				</div>
			</div>
			<div class="field">
				<div class="item-title fl">
					证件类型
				</div>
				<div class="item-info fl"
				     :style="cssStyle">
					身份证
				</div>
			</div>
			<div class="field">
				<div class="item-title fl">
					证件号码
				</div>
				<div class="item-info fl"
				     :style="cssStyle">
					{{ formData.certid }}
				</div>
			</div>
		</div>
	</section>
</template>

<script>
// import Qrcode from 'v-qrcode'
export default {
	data() {
		return {
			formData: {
				realname: '',
				certid: ''
			},
			userid: _com.getSession('userid'),
			cssStyle: 'text-align:left'
		}
	},
	mounted() {
		var vm = this;
		vm.queryrealnameinfo();
	},
	methods: {
		//获取实名认证信息
		queryrealnameinfo() {
			var vm = this;
			var _p = {
				GID: usages.api.user.queryrealnameinfo,
				userid: vm.userid,
				rand: Math.random()
			}
			vm.$http.post(usages.domain, _p).then(function (res) {
				console.log(res);
				if (res.body.issuccess) {
					vm.formData.realname = res.body.result.realname;
					vm.formData.certid = res.body.result.certid;
				} else {
					MintUI.Toast(res.body.rtnmessage);
				}
			});
		}
	},
	components: {
		//Qrcode
	}
}
</script>