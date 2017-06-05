<style>
/* @import "../../assets/css/profile.css" */
</style>

<template>
	<section class="page uinfo">
		<div class="row-field bg marg-top15">
			<div class="field field-img">
				<div class="item-title fl">
					头像
				</div>
				<div class="item-info fr">
					<div class="headimg"
					     style="background-image:url('Resources/h5/dist/images/my/defhead.png')"></div>
				</div>
			</div>
		</div>
		<div class="row-field bg">
			<div class="field arrows-right">
				<div class="item-title fl">
					真实姓名
				</div>
				<div class="item-info fr" @click="realName">
					{{ formData.realname||'未实名' }}
				</div>
			</div>
			<div class="field arrows-right">
				<div class="item-title fl">
					手机号码
				</div>
				<div class="item-info fr">
					{{ formData.phonetel }}
				</div>
			</div>
		</div>
		<div class="row-field bg">
			<div class="field arrows-right">
				<div class="item-title fl">
					常用地址
				</div>
				<div class="item-info fr"
				     @click="usual(1)">
					{{usualaddress}}
				</div>
			</div>
			<div class="field arrows-right">
				<div class="item-title fl">
					联系人信息
				</div>
				<div class="item-info fr" @click="usual(2)">
					{{linkuser}}
				</div>
			</div>
		</div>
		<!--<a @click="showQRCode" href="javascript:;" class="arrows-right">
									<span>我的二维码</span>
									<label></label>
								</a>-->
	
		<!--<div v-if="showQR" @click="showQR = false" class="full-bg qrcode">
								<qrcode @click="showQR = false" :size="qrSize" :cls="qrCls" :value="qrText"></qrcode>
							</div>-->
		<router-view></router-view>
	</section>
</template>

<script>
// import Qrcode from 'v-qrcode'
export default {
	data() {
		return {
			formData: {},
			qrCls: 'qrcode',
			qrText: '',
			qrSize: 200,
			showQR: false,

			isRealflag: false,//是否已实名
			certid: '',//身份证号
			realname: '',//用户姓名
			usualaddress: '未填写',//常用地址
			linkuser:'未填写',
			userid: _com.getSession('userid')
		}
	},
	mounted() {
		var vm = this;
		vm.formData = JSON.parse(_com.getSession('userInfo'));
		vm.queryrealnameinfo();
		vm.querydefaultaddress();
		 var linkinfo = _com.getSession('linkinfo');
        if (linkinfo) {
            let d = JSON.parse(linkinfo);
            vm.linkuser = d.linkuser;
        }
	},
	methods: {
		realName(){
			this.$router.push("/realnameinfo");
		},
		querydefaultaddress() {
			var vm = this;
			var data = {
				GID: usages.api.user.querydefaultaddress,
				userid: vm.userid,
				rand: Math.random()
			}
			vm.$http.post(usages.domain, data).then(function (res) {
				console.log(res);
				if (res.body.issuccess) {
					vm.usualaddress = res.body.result.address||'未填写';
				} else {
					vm.usualaddress = '未填写';
				}
			});
		},
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

				} else {
					MintUI.Toast(res.body.rtnmessage);
				}
			});
		},
		usual(type) {
			if(type==1){
			this.$router.push("/usualaddress");
			}else{
			this.$router.push("/linkmanadd");
			}
		},
		//我的二维码
		showQRCode() {
			this.qrText = this.formData.phonetel;
			this.showQR = true;
		}
	},
	components: {
		//Qrcode
	}
}
</script>