<style>
	/* @import "../../assets/css/profile.css" */
</style>

<template>
	<section class="page login">
		<div class="va marg-top15">
			<div class="col">
				<div class="va-form">
					<div class="va-form-text">持卡人</div>
					<div class="va-form-el">
						<input type="text" v-model="accountname" placeholder="请输入持卡人" class="va-ele">
					</div>
				</div>
			</div>
			<div class="col">
				<div class="va-form">
					<div class="va-form-text">银行卡号</div>
					<div class="va-form-el">
						<input type="text" v-model="accountno" placeholder="请输入银行卡号" class="va-ele">
					</div>
				</div>
			</div>
			<div class="col">
				<div class="va-form">
					<div class="va-form-text">身份证号</div>
					<div class="va-form-el">
						<input type="text" v-model="certid" placeholder="请输入身份证号" class="va-ele">
					</div>
				</div>
			</div>
			<div class="col">
				<div class="va-form">
					<div class="va-form-text">开户银行</div>
					<div class="va-form-el arrow-right" @click="popupVisiblebank=true">
						<span class="va-ele" v-model="bankname">{{bankname}}</span>
					</div>
				</div>
			</div>
			<div class="col">
				<div class="va-form">
					<div class="va-form-text">开户城市</div>
					<div class="va-form-el" @click="popupVisible=true">
						<span class="va-ele" v-model="selectArea">{{selectArea}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="va">
			<div class="col">
				<div class="va-form">
					<div class="va-form-text">预留手机</div>
					<div class="va-form-el">
						<div class="box">
							<input type="text" v-model="phonetel" placeholder="预留银行的手机号码" class="va-ele" maxlength="11">
							<getMsgCode v-on:bindMsgCode="getMsgCode" :phoneNumber="phonetel"></getMsgCode>
						</div>
					</div>
				</div>
			</div>
			<div class="col">
				<div class="va-form">
					<div class="va-form-text">验证码</div>
					<div class="va-form-el">
						<div class="box">
							<input type="text" maxlength="5" v-model="code" placeholder="请输入验证码" class="va-ele">
							<graphics></graphics>
						</div>
					</div>
				</div>
			</div>
			<div class="col">
				<div class="va-form">
					<div class="va-form-text">短信码</div>
					<div class="va-form-el">
						<input type="text" maxlength="6" v-model="msgcode" placeholder="请输入验证码" class="va-ele">
					</div>
				</div>
			</div>
		</div>
		<agree v-on:bindCheck="bindCheck" :link="linkobj"></agree>
		<a class="btn marg-bot15" @click="bindcard" :class="btnOn" href="javascript:;" v-html="subBtnText"></a>
		<mt-popup v-model="popupVisible" position="bottom" class="mint-popup-km">
			<checkArea v-on:bindClose="popupVisible=false" v-on:bindSure="sureCheck"></checkArea>
		</mt-popup>
		<mt-popup v-model="popupVisiblebank" position="bottom" class="mint-popup-km">
			<bankList v-on:bindClose="popupVisiblebank=false" v-on:bindBankSure="sureBankCheck"></bankList>
		</mt-popup>
	</section>
</template>

<script>
	var getMsgCode = require('../../../components/getMsg.vue'), //短信码子组件
		graphics = require('../../../components/graphics.vue'), //图形码子组件
		checkArea = require('../../../components/checkArea.vue'), //选择城市组件
		bankList = require('../../../components/banklist.vue'), //开户银行列表
		agree = require('../../../components/agreement.vue'), //协议组件
		_nostr = '不能为空';
	export default {
		data() {
			return {
				linkobj: {
					linkurl: '',
					linktitle: '卡盟平台用户服务协议',
					style:'margin-top:-1rem;margin-bottom: 0.2rem;'
				},
				selectArea: '请选择开户城市', //选择的城市，以逗号隔开
				popupVisible: false,
				popupVisiblebank: false, //开户银行列表
				accountname: '', //户名
				isActive: false,
				// banknameplace:'请选择开户银行',
				// selectAreaplace:'请选择开户城市',
				bankname: '请选择开户银行',
				certid: '',
				accountno: '',
				phonetel: '',
				city: '',
				bankNum: '',
				bankno: '',
				code: '',
				msgid: '',
				msgcode: '123456',
				accountText: '',
				subBtnText: '添加',
				btnOn: '',
				agreebox: false
			}
		},
		mounted() {
			var vm = this;
		},
		vuerify: {
			accountname: [{
				test: 'required',
				message: '持卡人' + _nostr
			}],
			accountno: [{
				test: 'required',
				message: '银行卡号' + _nostr
			}],
			certid: [{
				test: 'required',
				message: '身份证号' + _nostr
			}, 'idCard'],
			bankname: {
				test: 'required',
				message: '请选择开户银行'
			},
			city: {
				test: 'required',
				message: '请选择开户城市'
			},
			phonetel: [{
				test: 'required',
				message: '预留手机号' + _nostr
			}, 'phone'],
			code: {
				test: 'required',
				message: '验证码' + _nostr
			},
			msgcode: {
				test: 'required',
				message: '短信码' + _nostr
			},
		},
		methods: {
			bindCheck(isAgree) {
				this.isActive = isAgree;
			},
			sureCheck(strPca) { //选择开户城市
				var vm = this;
				vm.selectArea = strPca.split('|')[1];
				vm.city = strPca.split('|')[0].split('-')[1];
				vm.popupVisible = false;
			},
			sureBankCheck(bankName) { //选择开户银行
				var vm = this;
				vm.bankname = bankName.split(',')[0];
				vm.bankno = bankName.split(',')[1];
				vm.popupVisiblebank = false;
			},
			bindcard() { //银行卡绑卡

				var vm = this;
				if ('on' == vm.btnOn) return;
				if (_com.vuerifyCheck(vm)) {
					if (!vm.isActive) {
						MintUI.Toast('请先勾选' + vm.linkobj.linktitle);
						return;
					}
					vm.btnOn = 'on';
					vm.subBtnText = '添加中...';

					var _p = {
						GID: usages.api.user.bindcard,
						userid: _com.getSession('userid'),
						accountname: vm.accountname,
						bankno: vm.bankno,
						accountno: vm.accountno,
						certid: vm.certid,
						phonetel: vm.phonetel,
						city: vm.city,
						msgid: _com.getSession('msgid'),
						msgcode: vm.msgcode,
						rand: Math.random()
					}
					vm.$http.post(usages.domain, _p).then(function (res) {

						if (res.body.issuccess) {
							MintUI.Toast('绑定成功')
						} else {
							MintUI.Toast(res.body.rtnmessage)
							vm.btnOn = '';
							vm.subBtnText = '添加';
						}
					});
				}
			},
			getMsgCode(isnext) { //获取短信码
				var vm = this;
				if (!isnext) return; //手机号是否校验通过

				var _p = {
					GID: usages.api.user.sendmsgcode,
					userid: _com.getSession('userid'),
					msgtype: 'BindCard',
					rand: Math.random()
				}
				vm.$http.post(usages.domain, _p).then(function (res) {

					if (res.data.issuccess) {
						_com.setSession('msgid', res.data.result.msgid); //存储短信码
					} else {
						MintUI.Toast(res.data.rtnmessage)
					}
				});
			}
		},
		// watch: {
		// 	bankname() {
		// 		this.banknameplace = this.bankname;
		// 	}
		// },
		components: {
			getMsgCode,
			graphics,
			checkArea,
			bankList,
			agree
		}
	}
</script>