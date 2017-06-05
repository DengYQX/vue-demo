<style>

</style>

<template>
    <section class="page usual-info">
        <div class="va marg-top15">
            <div class="col">
                <div class="va-form">
                    <div class="va-form-text">姓名</div>
                    <div class="va-form-el">
                        <input type="text"
                               v-model="linkuser"
                               placeholder="请输入联系人姓名"
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
                               v-model="linktelphone"
                               placeholder="请输入联系人手机号码"
                               class="va-ele">
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="va-form">
                    <div class="va-form-text">联系人关系</div>
                    <div class="va-form-el arrow-right"
                         @click="popupVisible=true">
                        <span class="va-ele"
                              v-model="linkrelative">{{linkrelative}}</span>
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
        </mt-popup>
        <router-view></router-view>
    </section>
</template>

<script>
export default {
    data() {
        return {
            popupVisible: false,
            linkuser: '',//联系人
            linktelphone: '',//联系人电话
            linkrelative: '请选择联系人关系',//请选择联系人关系
            linkrename: '',
            dateSlots: [{
                flex: 1,
                values: [
                    '夫妻', '亲戚', '朋友', '同事', '同学', '其他'
                ],
                className: 'slot1',
                textAlign: 'center'
            }
            ],
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
            linkrelativelistCode: [

            ]
        }
    },
    mounted() {
        var vm = this;
        var linkinfo = _com.getSession('linkinfo');
        if (linkinfo) {
            let d = JSON.parse(linkinfo);
            vm.linkuser = d.linkuser;
            vm.linktelphone = d.linktelphone;
            vm.linkrelative = d.linkrelative;
        }
    },
    methods: {
        isok() {
            var vm = this;
            var errtip = '请输入联系人';
            if (vm.linkuser === '') {
                MintUI.Toast(errtip + '姓名'); return false;
            }
            else if (vm.linktelphone === '') {
                MintUI.Toast(errtip + '电话'); return false;
            }
            else if (vm.linkrelative === '请选择联系人关系') {
                MintUI.Toast(errtip + '关系'); return false;
            } else {
                return true;
            }
        },
        save() {
            var vm = this;
            var _info = {
                GID: usages.api.user.modifylinkman,
                userid: _com.getSession('userid'),
                linkuser: vm.linkuser,
                linktelphone: vm.linktelphone,
                linkrelative: vm.linkrelative,
                rand: Math.random()
            }
            if (vm.isok()) {
                vm.$http.post(usages.domain, _info).then(function (res) {
                    console.log(res);
                    if (res.body.issuccess) {
                        _com.setSession('linkinfo', JSON.stringify(_info));
                        MintUI.MessageBox.alert('设置成功!', '');
                    } else {
                        MintUI.Toast(res.body.rtnmessage);
                    }
                });
            }
        },
        close() {
            this.popupVisible = false;
        },
        sure() {
            var vm = this;
            // var code = vm.linkrelativelistCode[vm.linkrelativelistName.indexOf(vm.linkrelative)];
            this.popupVisible = false;
            this.linkrelative = this.linkrename;
        },
        onDateChange(picker, values) {
            var vm = this;
            vm.linkrename = values[0] || '';
        }
    },
    components: {}
}
</script>