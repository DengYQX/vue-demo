
<style>

</style>
<template>
    <div class="popup-body">
        <div class="popub-head clearfix">
            <span class="cancel"
                  @click="close()">取消</span>
            <span class="sure"
                  @click="sure()">完成</span>
        </div>
        <div class="popub-content">
            <mt-picker :slots="dateSlots"
                       @change="onDateChange"
                       :visible-item-count="5"
                       :show-toolbar="false"></mt-picker>
        </div>
    </div>
</template>

<script>
//选择开户银行列表
import areaList from '../kit/areajson';
export default {
    data() {
        return {
            dateSlots: [{
                flex: 1,
                values: [],
                className: 'slot1',
                textAlign: 'center'
            }
            ],
            bankListName: [],
            bankListCode: [],
            bankName: ''
        }
    },
    mounted() {
        var vm = this;
        vm.bankListName = [];
        vm.bankListCode = [];
        vm.getbindcardbank();
    },
    methods: {
        close() {
            this.$emit('bindClose');
        },
        sure() {
            var vm = this;
            var code = vm.bankListCode[vm.bankListName.indexOf(vm.bankName)];
            var strPca = vm.bankName + ',' + code;
            this.$emit('bindBankSure', strPca);
        },
        onDateChange(picker, values) {
            var vm = this;
            vm.bankName = values[0] || '';
        },
        /**重置**/
        getbindcardbank() {//获取绑定的银行卡
            var vm = this,
                _p = { GID: usages.api.user.getbindcardbank, rand: Math.random() };
            vm.$http.post(usages.domain, _p).then(function (res) {
                if (res.body.issuccess) {
                    var bankList = res.body.result.banklist;
                    bankList.forEach(function (item) {
                        vm.bankListName.push(item.bankname);
                        vm.bankListCode.push(item.bankno);
                    });
                }
                vm.dateSlots[0].values = vm.bankListName;
            });
        }
    }
}
</script>