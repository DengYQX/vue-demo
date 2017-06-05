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
                            <span class="p_name" v-text="result.merchantshortname"></span>
                        </div>
                    </div>
                    <div class="comment" style="display:none">
                        <span class="star star-45">4.5</span>
                        <span class="pj">共98条评价</span>
                    </div>
                    <div class="type">
                        <span class="p_type">{{result.businessscopename}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-field">
            <ul>
                <li>
                    <div class="pay-done-item clearfix">
                        <div class="item-title fl">地址</div>
                        <div class="item-info fr">{{result.address}}</div>
                    </div>
                </li>
                <li>
                    <div class="pay-done-item clearfix">
                        <div class="item-title fl">电话</div>
                        <div class="item-info fr blue">{{result.linktel}}</div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="consum-info-bot">
            <div class="kj_head clearfix">
                <div class="tilte fl">
                    <div class="img img-dzj">
                        <span>电子券</span>
                    </div>
                </div>
                <div class="more fr">
                    <router-link :to="{name:'dzjlist',params:{merchantid:formData.merchantid}}">
                        查看全部&gt;
                    </router-link>
                </div>
            </div>
            <div class="col-img-link">
                <ul>
                    <li class="clearfix" v-for="item in dzjList">
                        <router-link :to="{name:'dzjinfo',params:{id:item.ticketbatchid,merchantid:formData.merchantid}}">
                            <div class="left-con fl">
                                <div class="j_img">
                                    <img :src="merchPath+item.imageid">
                                </div>
                                <div class="j_info">
                                    <h3>{{item.ticketshortname}}</h3>
                                    <div class="j_price">
                                        <span class="now_price">￥{{item.ticketprice}}</span>
                                        <span><del>￥{{item.ticketactprice}}</del></span>
                                    </div>
                                </div>
                            </div>
                            <div class="right-con fr">
                                <span>
                                已售{{item.ticketnumber}}张
                            </span>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="kj_head clearfix">
                <div class="tilte fl">
                    <div class="img img-yfk">
                        <span>预付卡</span>
                    </div>
                </div>
                <div class="more fr">
                    <router-link :to="{name:'yfklist',params:{merchantid:formData.merchantid}}">
                        查看全部&gt;
                    </router-link>
                </div>
            </div>
            <div class="col-img-link">
                <ul>
                    <li class="clearfix" v-for="item in yfkList">
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
                            <router-link :to="{name:'yfkinfo',params:{id:item.cardbatchid,merchantid:formData.merchantid}}" class="j_btn">
                                <span>开通</span>
                            </router-link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                merchPath: config.merchPath, //商户图片前缀
                merchantid:'',
                formData: {
                    GID: usages.api.consumption.queryinfo,
                    merchantid: ''
                },
                result: {},
                dzjList: [],
                yfkList: []
            }
        },
        mounted() {
            var vm = this;
            vm.formData.merchantid =vm.$route.params.id;
            vm.queryinfo();
            vm.queryDzjList();
            vm.queryYfkList();
        },
        methods: {
            queryinfo() {
                var vm = this;
                vm.formData.rand=Math.random();
                vm.$http.post(usages.domain, vm.formData).then(function (res) {
                    
                    if (res.body.issuccess) {
                        vm.result = res.body.result;
                    }
                });
            },
            queryDzjList() {
                var vm = this;
                vm.formData.GID = usages.api.consumption.querymerticketlist;
                vm.formData.rand=Math.random();
                vm.$http.post(usages.domain, vm.formData).then(function (res) {
                    console.log(res);
                    if (res.body.issuccess) {
                        console.log(res.body.result);
                        vm.dzjList = res.body.result.ticketlist;
                        console.log(vm.dzjList);
                    }
                });
            },
            queryYfkList() {
                var vm = this;
                vm.formData.GID = usages.api.consumption.querymerlist;
                vm.formData.rand=Math.random();
                vm.$http.post(usages.domain, vm.formData).then(function (res) {
                    console.log(res);
                    if (res.body.issuccess) {
                        vm.yfkList = res.body.result.cardlist;
                    }
                });
            }
        }
    }
</script>