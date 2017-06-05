<style>

</style>

<template>
    <section class="page usual-info">
        <div class="va marg-top15">
            <div class="col">
                <div class="va-form">
                    <div class="va-form-text">收货人</div>
                    <div class="va-form-el">
                        <input type="text"
                               v-model="takename"
                               placeholder="请输入收货人姓名"
                               class="va-ele">
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="va-form">
                    <div class="va-form-text">手机号码</div>
                    <div class="va-form-el">
                        <input type="text"
                               maxlength="11"
                               v-model="takephone"
                               placeholder="请输入手机号码"
                               class="va-ele">
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="va-form">
                    <div class="va-form-text">所在地区</div>
                    <div class="va-form-el arrow-right"
                         @click="popupVisible=true">
                        <span class="va-ele"
                              v-model="areaname">{{areaname}}</span>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="va-form">
                    <div class="va-form-text">详细地址</div>
                    <div class="va-form-el">
                        <input type="text"
                               v-model="addressinfo"
                               placeholder="请输入详细地址"
                               class="va-ele">
                    </div>
                </div>
            </div>
        </div>
        <div class="usual-footer">
            <a href="javascript:;"
               @click="save()">保存</a></a>
        </div>
        <mt-popup v-model="popupVisible"
                  position="bottom"
                  class="mint-popup-km">
            <checkArea v-on:bindClose="popupVisible=false"
                       v-on:bindSure="sureCheck"></checkArea>
        </mt-popup>
        <router-view></router-view>
    </section>
</template>

<script>

var checkArea = require('../../../components/checkArea.vue');//选择城市组件
export default {
    data() {
        return {
            popupVisible: false,
            takename: '',//收货人
            takephone: '',//电话
            areaname: '请选择省市区',//省市
            addressinfo: '',//详细地址
            formData: {
                GID: usages.api.user.newaddress,
                userid: _com.getSession('userid'),
                username: '',
                telphone: '',
                address: '',
                prov: '',
                city: '',
                area: '',
                serialno: ''
            },

        }
    },
    mounted() {
        var vm = this;
        var id = vm.$route.params.id;
        vm.formData.serialno = id;
        if (id != 0) {
            // alert(id + '编辑');
            vm.getEditInfo(id);
        }
    },
    methods: {
        sureCheck(strArea) {
            this.areaname = strArea.split('|')[1];
            this.popupVisible = false;
        },
        getEditInfo(id) {
            var vm = this;
            var _p = {
                GID: usages.api.user.queryaddressinfo,
                userid: _com.getSession('userid'),
                serialno: id,
                rand: Math.random()
            }
            vm.$http.post(usages.domain, _p).then(function (res) {
                console.log(res);
                if (res.body.issuccess) {
                    vm.takename = '';
                    vm.takephone = '';
                    vm.areaname = '';
                    vm.addressinfo = '';
                } else {
                    MintUI.Toast(res.body.rtnmessage);
                }
            });
        },
        save() {
            var vm = this;
            if (vm.formData.serialno != 0) {
                vm.formData.GID = usages.api.user.modifyaddress;
            }
            vm.formData.username = vm.takename;
            vm.formData.telphone = vm.takephone;
            vm.formData.address = vm.addressinfo;
            vm.formData.rand = Math.random();
            vm.formData.prov = vm.areaname.split('-')[0] || '';
            vm.formData.city = vm.takename.split('-')[0] || '';
            vm.formData.area = vm.takename.split('-')[0] || '';
            vm.$http.post(usages.domain, vm.formData).then(function (res) {
                console.log(res);
                if (res.body.issuccess) {
                    this.$router.go(-1);
                } else {
                    MintUI.Toast(res.body.rtnmessage);
                }
            });
        }
    },
    components: { checkArea }
}
</script>