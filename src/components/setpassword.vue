<template>
	<div class="km-input-pw">
		<h2><span class="close" @click="close()"></span> 请输入密码</h2>
		<div class="pw">
			<div class="pay-pwd-box">
				<ul>
					<li v-for="key in ismark"
					    :class="{zmarked:key}"><i></i></li>
				</ul>
			</div>
		</div>
		<div class="keylist clearfix">
			<ul>
				<li @click="keyImport('1')">
					<p>1</p>
					<p class="yy">&nbsp;</p>
				</li>
				<li @click="keyImport('2')">
					<p>2</p>
					<p class="yy">ABC</p>
				</li>
				<li @click="keyImport('3')">
					<p>3</p>
					<p class="yy">DEF</p>
				</li>
				<li @click="keyImport('4')">
					<p>4</p>
					<p class="yy">GHI</p>
				</li>
				<li @click="keyImport('5')">
					<p>5</p>
					<p class="yy">JKL</p>
				</li>
				<li @click="keyImport('6')">
					<p>6</p>
					<p class="yy">MNO</p>
				</li>
				<li @click="keyImport('7')">
					<p>7</p>
					<p class="yy">PQRS</p>
				</li>
				<li @click="keyImport('8')">
					<p>8</p>
					<p class="yy">TUV</p>
				</li>
				<li @click="keyImport('9')">
					<p>9</p>
					<p class="yy">WXYZ</p>
				</li>
				<li @click="keyImport('.')"
				    style="background:#d1d5db; ">
					<p>&nbsp;</p>
				</li>
				<li @click="keyImport('0')">
					<p>0</p>
				</li>
				<li @click="keyImport('clear')"
				    style="background:#d1d5db; ">
					<p>
						<span class="clear"><i>&nbsp;</i></span>
					</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	props: ['visible'],
	data() {
		return {
			popupVisible: false,
			ismark: [],
			passwordStr: '',
		}
	}, mounted() {
		//隐藏加载动画
		var vm = this;
		vm.popupVisible = vm.visible;
		for (var i = 0; i < 6; i++) {
			vm.ismark.push(false);
		}
	},
	methods: {
		keyImport(val) {
			var vm = this;
			if (val != '') {
				if (val === 'clear' && vm.passwordStr != '') {
					var pwd = vm.passwordStr.substring(0, vm.passwordStr.length - 1);
					vm.passwordStr = pwd;
					if (pwd.length > -1) {
						// vm.ismark[pwd.length] = false;   //数组监听事件不能使用=要用下面的替换方式，否则无效
						vm.ismark.splice(pwd.length, 1, false);
					}
				} else {
					if (vm.passwordStr.length < 6 && val != 'clear') {
						vm.passwordStr += val;
						vm.ismark.splice(vm.passwordStr.length - 1, 1, true);
					}
				}
				if (vm.passwordStr.length === 6) {
					// MintUI.MessageBox('提示', '提交密码：' + vm.passwordStr);
					// vm.formData.password = vm.passwordStr;
					vm.$emit('bindPwdNext', vm.passwordStr);
				}
			}
		},
		close() {
			this.$emit('bindClose');
		}
	}, watch: {
		visible() {
			if (!this.visible) {
				this.ismark = [false, false, false, false, false, false];
				this.passwordStr = '';
			}
		}
	}
}
</script>
