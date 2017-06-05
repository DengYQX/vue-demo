<style>
@import '../../../assets/css/view/consumption.css';
body .pay-page {
    background: #F1F3F5;
}

.mint-header {
    background-color: #1B1B20;
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
                            <span class="p_name">{{result.ticketname}}</span>
                        </div>
                    </div>
                     <p>有效期至：{{parseInt(result.validitytype)===1?result.validity:(result.validity+'天')}}</p>
                    <p>已售：{{result.ticketnumber-result.salenumber}}张</p>
                </div>
            </div>
        </div>
        <div class="col-field">
            <ul>
                <li>
                    <div class="pay-done-item clearfix">
                        <div class="item-title fl"
                             style="line-height: 2.6rem;">转让数量</div>
                        <div class="item-info fr">
                            <div class="oper add fr"
                                 @click="calculate('add')"
                                 :class="{active:isaddActive}"></div>
                            <div class="oper number fr">
                                <input type="number"
                                       name="price"
                                       value="1"
                                       v-model="number">
                            </div>
                            <div class="oper minus fr"
                                 @click="calculate('minus')"
                                 :class="{active:isminusActive}"></div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="pay-done-item clearfix">
                        <div class="item-title fl">支付金额</div>
                        <div class="item-info fr blue">{{total}}元</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="col-text" style="margin-bottom:5rem;">
            <p v-html="result.ticketdescribe"></p>
        </div>
        <footer class="fixd-btn">
            <mt-button type="primary"
                       size="large"
                       @click.native="handleClick">立即抢购</mt-button>
        </footer>
    </section>
</template>

<script>
export default {
    data() {
        return {
            number: 1,
            isaddActive: false,
            isminusActive: false,
            total: 0,
            price: 100,
            merchPath: config.merchPath, //商户图片前缀
            formData: {
                GID: usages.api.consumption.querymerticketinfo,
                merchantid: '',
                ticketbatchid: ''//电子券消费批量编号
            },
            result:{}

        }
    },
    components: {},
    // 加载之前
    created() {
    },
    mounted() {
        //隐藏加载动画
        var vm = this;
        console.log(vm.$route.params);
        vm.formData.ticketbatchid = vm.$route.params.id;
        vm.formData.merchantid = vm.$route.params.merchantid;
        vm.querymerticketinfo();
    },
    methods: {
        querymerticketinfo() {
            var vm = this;
            vm.formData.rand=Math.random();
            vm.$http.post(usages.domain, vm.formData).then(function (res) {
                console.log(res);
                if (res.body.issuccess) {
                    vm.result = res.body.result;
                    vm.price=res.body.result.ticketprice;//电子券单价
                } else {
                    vm.errMsg(res.body.rtnmessage);
                }
            });
        },
        calculate(type) {
            if (type === 'add') {
                this.number++;
                this.isaddActive = true;
                this.isminusActive = false;
            } else {
                if (this.number > 1) {
                    this.isminusActive = true;
                    this.isaddActive = false;
                    this.number--;
                }
            }
            this.total = this.number * this.price;
        },
        handleClick() {
            var vm = this;
            vm.$router.push({
                name: 'dzjorder',
                params: {
                    id: vm.$route.params.id,
                    price:vm.price,
                    number:vm.number,
                    merchantid:vm.formData.merchantid
                }
            });
        },
        errMsg(msg) {
            MintUI.MessageBox('提示', msg);
        }
    }
}
</script>