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
        <div class="consum-info-bot">
            <div class="col-img-link" v-show="dzjList.length>0">
                <ul>
                    <li class="clearfix" v-for="item in dzjList">
                          <div class="left-con fl">
                            <div class="j_img">
                                <img :src="merchPath+item.imageid">
                            </div>
                            <div class="j_info">
                                <h3>{{item.cardshortname}}</h3>
                                <div class="j_price">
                                    <span class="now_price">￥{{item.cardprice * item.radio}}</span>
                                    <span><del>￥{{item.cardprice}}</del></span>
                                </div>
                            </div>
                        </div>
                        <div class="right-con fr">
                            <router-link :to="{name:'yfkinfo',params:{id:item.cardbatchid}}" class="j_btn">
                                <span>开通</span>
                            </router-link>
                        </div>
               </li>
    </ul>
</div>
<div class="no-datalist" v-show="isHide">
    <img src="Resources/h5/dist/images/no-data.png">
</div>
</div>
<router-view></router-view>
</section>
</template>

<script>
   
export default {
    data() {
        return {
            merchPath: config.merchPath, //商户图片前缀
            formData: {
                GID: usages.api.consumption.querymerlist,
                merchantid: '',
                maxcount: 100//查询最大数目
            },
            dzjList: [],
            isHide: false
        }
    },
    components: {},
    // 加载之前
    created() {
        MintUI.Indicator.open();
    },
    mounted() {
        //隐藏加载动画
        var vm = this;
        vm.formData.merchantid = vm.$route.params.merchantid;
        vm.querymerlist();

    },
    methods: {
        querymerlist() {
            var vm = this;
            vm.formData.rand=Math.random();
            vm.$http.post(usages.domain, vm.formData).then(function (res) {
                if (res.body.issuccess) {
                    vm.dzjList = res.body.result.cardlist;
                } else {
                    vm.errMsg(res.body.rtnmessage);
                }
                if (vm.dzjList.length === 0) {
                    vm.isHide = true;
                }
            });
            MintUI.Indicator.close();
        },
        errMsg(msg) {
            MintUI.MessageBox('提示', msg);
        }
    }
}
</script>