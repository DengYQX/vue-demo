<style>
body .pay-page {
    background: #F1F3F5;
}

.mint-header {
    background-color: #1B1B20;
}

.mint-popup {
    background: #F1F3F5;
}
</style>
<template>
    <section class="page pay-page">
        <mt-header fixed
                   title="订单确认">
            <router-link to="/"
                         slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
    
        <p class="pay order-head-title">100元专家精心搭配套餐</p>
        <div class="col-field">
            <ul>
                <li>
                    <div class="pay-done-item clearfix">
                        <div class="item-title fl">单价</div>
                        <div class="item-info fr">{{number}}元</div>
                    </div>
                </li>
                <li>
                    <div class="pay-done-item clearfix">
                        <div class="item-title fl">数量</div>
                        <div class="item-info fr">{{price}}张</div>
                    </div>
                </li>
                <li>
                    <div class="pay-done-item clearfix">
                        <div class="item-title fl">总价</div>
                        <div class="item-info fr">{{number*price}}元</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="col-field">
            <ul>
                <li>
                    <div class="pay-done-item clearfix">
                        <div class="item-title fl">支付金额</div>
                        <div class="item-info fr">{{number*price}}元</div>
                    </div>
                </li>
                <li>
                    <div class="pay-done-item clearfix">
                        <div class="item-title fl">手机号码</div>
                        <div class="item-info fr">1581****888</div>
                    </div>
                </li>
                <li>
                    <div class="pay-done-item clearfix">
                        <div class="item-title fl">支付方式</div>
                        <div class="item-info fr">钱包支付</div>
                    </div>
                </li>
            </ul>
        </div>
        <comagree v-on:bindCheck="bindCheck"
                  :link="linkobj"></comagree>
        <div class="order-btn">
            <mt-button type="primary"
                       size="large"
                       @click.native="handleClick">支付订单</mt-button>
        </div>
        <mt-popup v-model="popupVisible"
                  position="bottom"
                  class="mint-popup-km">
            <comPassWord v-on:bindPwdNext="setPwdNext"
                         v-on:bindClose="close"
                         :visible="popupVisible"></comPassWord>
        </mt-popup>
    </section>
</template>

<script>
import iptPassWord from '../../../components/inputpwd.vue';//密码子组件
import agree from '../../../components/agreement.vue';//协议组件
export default {
    data() {
        return {
            linkobj: {
                linkurl: '',
                linktitle: '卡盟平台卡卷服务协议'
            },
            isActive: false,
            popupVisible: false,
            number: 0,
            price: 0,
            formData: {
                GID: usages.api.consumption.ticketbuy,
                userid: '',  //用户编号
                merchantid: '',//商户编号
                ticketbatchid: '',//电子券消费批量编号
                buynumber: '',//电子券销售金额
                buyamount: '',//电子券购买金额
                password: ''//支付密码
            }

        }
    },
    components: {
        comPassWord: iptPassWord,
        comagree: agree
    },
    mounted() {
        //隐藏加载动画
        var vm = this;
        console.log(vm.$route.params);
        vm.number = vm.$route.params.number;
        vm.price = vm.$route.params.price;
        vm.formData.userid = _com.getSession('userid') || '';
        vm.formData.merchantid = vm.$route.params.merchantid;
        vm.formData.ticketbatchid = vm.$route.params.id;
        vm.formData.buynumber = vm.$route.params.price;
        vm.formData.buyamount = vm.number * vm.price;
    },
    methods: {
        bindCheck(isAgree) {
            this.isActive = isAgree;
        },
        setPwdNext(passwordStr) {
            var vm = this;
            vm.formData.password = passwordStr;
            vm.save();
        },
        save() {//购买
            var vm = this;
            vm.formData.rand=Math.random();
            vm.$http.post(usages.domain, vm.formData).then(function (res) {
                console.log(res);
                if (res.body.issuccess) {
                } else {
                    vm.errMsg(res.body.rtnmessage);
                }
            });

        },
        handleClick() {
            var vm = this;
            if (vm.isActive) {
                vm.popupVisible = true;
            } else {
                MintUI.Toast('请先勾选' + vm.linkobj.linktitle);
            }
        },
        close() {
            this.popupVisible = false;
        },
        errMsg(msg) {
            MintUI.MessageBox('提示', msg).then(action => {
                this.popupVisible = false;
            });
        }
    }
}
</script>