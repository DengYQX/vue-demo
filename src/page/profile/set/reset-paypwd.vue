<style>
/* @import "../../assets/css/profile.css" */
</style>

<template>
    <section class="page setpwd">
        <div class="va marg-top15">
            <div class="col">
                <div class="va-form">
                    <div class="va-form-text">验证码</div>
                    <div class="va-form-el">
                        <div class="box">
                            <input type="text"
                                   maxlength="11"
                                   v-model="msgcode"
                                   placeholder="请输入验证码"
                                   class="va-ele">
                            <getMsgCode v-on:bindMsgCode="getMsgCode"
                                        :phoneNumber="phone"></getMsgCode>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a class="btn marg-bot15"
           @click="getPassword()"
           href="javascript:;">下一步</a>
        <mt-popup v-model="popupVisible"
                  position="bottom"
                  class="mint-popup-km">
            <comPassWord v-on:bindPwdNext="setPwdNext"
                         v-on:bindClose="close"
                         :visible="popupVisible"></comPassWord>
        </mt-popup>
        <mt-popup v-model="popupVisible2"
                  position="bottom"
                  class="mint-popup-km">
            <comPassWord2 v-on:bindPwdNext="setPwdNext2"
                          v-on:bindClose="close"
                          :visible="popupVisible2"></comPassWord2>
        </mt-popup>
    </section>
</template>

<script>

import getMsgCode from '../../../components/getMsg.vue';//短信码子组件
import iptPassWord from '../../../components/setpassword.vue';//密码子组件
import iptPassWord2 from '../../../components/setpassword2.vue';//密码子组件
export default {
    data() {
        return {
            popupVisible: false,
            popupVisible2: false,
            phone: '',
            km_password: '',
            codeForm: {
                GID: '',
                phone: ''
            },
            msgcode: '',
            formData: {
                GID: usages.api.user.settranspwd,
                userid: _com.getSession('userid'),
                msgid: _com.getSession('msgid') || '',
                msgcode: '',
                password: ''
            },
            paypwd1: '',
            paypwd2: '',
            isMsgOk: false
        }
    }, components: {
        getMsgCode: getMsgCode,
        comPassWord: iptPassWord,
        comPassWord2: iptPassWord2
    },
    mounted() {
        var vm = this;
        vm.phone = localStorage.getItem('phone');
    },
    methods: {
        getPassword() {
            var vm = this;
            vm.popupVisible = true;
            // if (vm.isMsgOk) {
            //     vm.formData.msgcode = vm.msgcode;
            //     vm.popupVisible = true;
            // } else {
            //     MintUI.Toast('短信验证码不能为空');
            // }
        },
        setPwdNext(strPassword) {
            var vm = this;
            vm.paypwd1 = strPassword;
            vm.popupVisible = false;
            vm.popupVisible2 = true;
        },
        setPwdNext2(strPassword) {
            var vm = this;
            vm.paypwd2 = strPassword;
            vm.formData.password = strPassword;
            vm.formData.rand = Math.random();
            console.log('paypwd1:'+vm.paypwd1);
            console.log('paypwd2:'+vm.paypwd2);
            if (vm.paypwd1 == vm.paypwd2 && vm.paypwd1 != '') {
                vm.$http.post(usages.domain, vm.formData).then(function (res) {
                    console.log(res);
                    if (res.body.issuccess) {
                        _com.setSession('km_paypwd', strPassword);
                        MintUI.Toast('设置成功');
                        vm.$router.go(-1);
                    } else {
                        vm.errMsg(res.body.rtnmessage);
                    }
                })
            }
            else {
                MintUI.Toast('两次密码不一致，请重新输入');
                vm.close();
            }
        },
        close() {
            this.popupVisible = false;
            this.popupVisible2 = false;
        }, getMsgCode(isnext) {//获取短信码
            var vm = this;
            if (!isnext) return; //手机号是否校验通过

            vm.codeForm.GID = usages.api.user.sendregistermsg;
            vm.codeForm.phone = vm.phone;
            vm.codeForm.rand = Math.random();
            vm.$http.post(usages.domain, vm.codeForm).then(function (res) {
                if (res.data.issuccess) {
                    vm.isMsgOk = true;
                    _com.setSession('msgid', res.data.result.msgid);//存储短信码
                } else {
                    MintUI.Toast(res.data.rtnmessage)
                }
            });
        },
        errMsg(msg) {
            MintUI.MessageBox('提示', msg).then(action => {
                this.close();
            });
        }
    }
}
</script>
