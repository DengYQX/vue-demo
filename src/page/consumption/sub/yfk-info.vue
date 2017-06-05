<style>
@import '../../../assets/css/view/consumption.css';
body .pay-page {
    background: #F1F3F5;
}
</style>
<template>
    <section class="page pay-page">
        <div class="search-list p_info">
            <div class="item Fix">
                <div class="pic">
                    <img :src="merchPath+result.imageid">
                </div>
                <div class="content">
                    <div class="name">
                        <div class="itemname">
                            <span class="p_name">{{result.cardname}}</span>
                        </div>
                    </div>
                    <p>有效期至：{{parseInt(result.validitytype)===1?result.validity:result.validity+'天'}}</p>
                    <p>已售：{{result.cardnumber-result.salenumber}}张</p>
                </div>
            </div>
        </div>
        <div class="col-text">
            <p>门店地址 <br>
            • {{result.address}}
            </p>
        </div>
        <div class="col-text">
            <p v-html="result.carddescribe"> </p>
        </div>
    
        <footer class="fixd-btn">
            <mt-button type="primary"
                       size="large"
                       @click.native="handleClick">立即开通</mt-button>
        </footer>
    </section>
</template>

<script>

export default {
    data() {
        return {
            merchPath: config.merchPath, //商户图片前缀
            formData: {
                GID: usages.api.consumption.querycardinfo,
                merchantid: '',
                cardbatchid: ''//预付卡id
            },
           result:{}
        }
    },
    components: {},
    // 加载之前
    created() {
        // MintUI.Indicator.open();
    },
    mounted() {
        //隐藏加载动画
        var vm = this;
        vm.formData.merchantid = vm.$route.params.merchantid;
        vm.formData.cardbatchid = vm.$route.params.id;
        vm.querycardinfo();

    },
    methods: {
        querycardinfo() {
            var vm = this;
            vm.formData.rand=Math.random();
            vm.$http.post(usages.domain, vm.formData).then(function (res) {
                if (res.body.issuccess) {
                    vm.result = res.body.result;
                } else {
                    vm.errMsg(res.body.rtnmessage);
                }
            });
        },
        errMsg(msg) {
            MintUI.MessageBox('提示', msg);
        }
    }
}
</script>