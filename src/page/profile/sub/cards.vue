<style>
/* @import "../../assets/css/profile.css" */
</style>

<template>
	<section class="page cards">
		<div class="c-list">
			<div v-for="key in cardlist"
			     @click="selectCard(key.serialno)"
			     :class="[{ 'edit-card' : isEdit },{ 'on' : isSelected }]"
			     class="card box bg-white">
				<div class="c-logo">
					<img :src="'Resources/h5/dist/images/my/bank/pay/' + key.bankno + '.png'"
					     alt="bank-logo">
				</div>
				<div class="c-info">
					<div class="c-number">{{ key.accountno }}</div>
				</div>
			</div>
		</div>
		<div v-if="!isEdit"
		     class="va">
			<div class="col">
				<router-link :to="{ name : 'add-card' }"
				             class="va-body icon-add">添加银行卡</router-link>
			</div>
		</div>
		<div v-if="cardlist.length > 0"
		     class="va box c-edit">
			<a v-if="!isSelected && !isEdit"
			   class="edit"
			   @click="isEdit = true"
			   href="javascript:;">编辑</a>
			<a v-if="isEdit"
			   class="font-gray edit-off"
			   @click="isSelected = false;isEdit = false"
			   href="javascript:;">取消</a>
			<a v-if="isEdit"
			   class="font-red"
			   @click="delSedCard"
			   href="javascript:;">删除</a>
		</div>
	</section>
</template>
<script>
export default {
	data() {
		return {
			cardlist: [
				{
					bankno: '0204',
					accountno: '88888888',
					serialno: '111111'
				}
			],
			isEdit: false,
			isSelected: false,
			serialno: '',
		}
	}, mounted() {
		this.fundcardlist();
	}, methods: {

		querybindcard() {//获取绑定的银行卡

			var vm = this;
			vm.formData.GID = usages.api.user.querybindcard;
			vm.formData.rand = Math.random();
			vm.$http.post(usages.domain, vm.formData).then(function (res) {
				console.log(res, "获取绑定的银行卡")
			});
		},
		fundcardlist() {//获取绑定的银行卡

			var vm = this,
				_p = { userid: _com.getSession('userid'), GID: usages.api.user.fundcardlist, rand: Math.random()};

			vm.$http.post(usages.domain, _p).then(function (res) {

				if (res.data.issuccess) {
					vm.cardlist.push.apply(vm.cardlist, res.data.result.cardlist);
				} else {
					console.log("请求错误！")
				}

			});
		},
		unbindcard() {//银行卡解绑

			var vm = this;
			vm.formData.GID = usages.api.user.unbindcard;
			vm.formData.rand = Math.random();
			vm.$http.post(usages.domain, vm.formData).then(function (res) {
				console.log(res, "银行卡解绑")
			});
		},
		selectCard(serialno) {//选择要编辑的卡
			this.serialno = serialno;
			if (this.isEdit) this.isSelected = true;

		},
		delSedCard() {
			if (this.serialno == '') {MintUI.Toast('请选择要操作的银行卡');return false;}
			if (MintUI.MessageBox.confirm('是否确认删除？','')) {
				MintUI.Indicator.open('删除中...');
				console.log(this.serialno)
					vm.formData.GID = usages.api.user.unbindcard;
					vm.formData.rand = Math.random();
			vm.$http.post(usages.domain, vm.formData).then(function (res) {

			});
			}
		}
	}
}
</script>

