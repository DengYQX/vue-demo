<style>
@import '../../../assets/css/view/consumption.css';
.mint-header {
    background-color: #1B1B20;
}
</style>
<template>
    <section class="page">
        <div class="consumption-page seach-head">
            <div class="search-wrap seach">
                <p>
                    <span class="search-icon"></span>
                    <input type="text"
                           v-model="keyword"
                           value=""
                           placeholder="商户名或地点">
                    <span class="close-icon"
                          @click="$router.go(-1)"></span>
                </p>
            </div>
        </div>
    
        <div class="consum-info-bot">
            <div class="search-list"
                 v-if="merchantList.length>0">
                <ul>
                    <li v-for="d in merchantList">
                        <router-link :to="{name:'consumptioninfo',params:{id:d.merchantid}}"
                                     class="item Fix">
                            <div class="pic">
                                <img :src="merchPath+d.imageid">
                            </div>
                            <div class="content">
                                <div class="name">
                                    <div class="itemname">
                                        <span class="p_name">{{d.merchantshortname}}</span>
                                        <span class="p_type">{{d.businessscopename}}</span>
                                    </div>
                                </div>
                                <div class="comment"
                                     v-show="false">
                                    <span class="star star-45">4.5</span>
                                    <span class="pj">共98条评价</span>
                                </div>
                                <div class="new-coupon"
                                     v-if="d.saleremark1!=''||d.saleremark2!=''">
                                    <div class="p_j"
                                         v-if="d.saleremark1!=''">
                                        <div class="img img-j"></div>
                                        <span>{{d.saleremark1}}</span>
                                    </div>
                                    <div class="p_j">
                                        <div class="img img-k"></div>
                                        <span>{{d.saleremark2}}</span>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
    
            <div class="no-datalist"
                 v-if="merchantList.length==0">
                <img src="Resources/h5/dist/images/no-data.png"
                     style="margin-top:5rem;">
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            merchPath: config.merchPath, //商户图片前缀
            merchantList: [],
            keyword: '',
            formData: {
                GID: usages.api.consumption.querymerchantlist, //接口
                city: '', //地址模糊查询
                businessscope: '', //经营类型
                address: '', //地址模糊查询
                merchantname: '', //商户名称模糊查询
                ticketcardtype: '',
                pagesize: 100,
                pageno: 1
            }
        }
    },
    components: {},

    mounted() {
        this.querymerchantlist();
    },
    methods: {
        querymerchantlist() {
            var vm = this;
            vm.formData.merchantname = vm.keyword;
            vm.formData.rand=Math.random();
            vm.$http.post(usages.domain, vm.formData).then(function (res) {
                console.log(res.body);
                var datalist = res.body
                if (datalist.issuccess) {
                    vm.merchantList = datalist.result.merchantlist || [];
                }
            });
        }
    },
    watch: {
        keyword() {
            this.querymerchantlist();
        }
    }
}
</script>