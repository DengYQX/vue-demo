<style>
@import '../../assets/css/view/consumption.css';
.mint-header {
    background-color: #1B1B20;
}
</style>
<template>
    <section class="page">
        <div class="consumption-page seach-head">
            <div class="search-wrap home">
                <p @click="jumpPage"><span class="search-icon"></span>商户名或地点</p>
            </div>
        </div>
        <div class="consump-nav clearfix"
             v-show="isshow">
            <ul>
                <li>
                    <div class="nav-col"
                         @click="changeList(1)">
                        <div class="bg-img"></div>
                        <p class="nav-name">预付卡</p>
                    </div>
                </li>
                <li>
                    <div class="nav-col"
                         @click="changeList(2)">
                        <div class="bg-img"></div>
                        <p class="nav-name">电子券</p>
                    </div>
                </li>
            </ul>
        </div>
        <nav class="consump-tab"
             ref="navmenu">
            <ul class="nav clearfix">
                <li class="open"
                    @click="openSection(1)">
                    <span v-text="text1"></span>
                    <i></i>
                </li>
                <li @click="openSection(2)">
                    <span v-text="text2"></span>
                    <i></i>
                </li>
                <li @click="openSection(3)">
                    <span v-text="text3"></span>
                    <i></i>
                </li>
            </ul>
        </nav>
        <mt-popup v-model="popupVisible"
                  position="bottom"
                  class="mint-popup-km">
            <div class="popup-body">
                <div class="popub-head clearfix">
                    <span class="cancel"
                          @click="popupVisible=false">取消</span>
                    <span class="sure"
                          @click="sure">完成</span>
                </div>
                <div class="popub-content">
                    <mt-picker :slots="dateSlots"
                               @change="onDateChange"
                               :visible-item-count="5"
                               :show-toolbar="false"></mt-picker>
                </div>
            </div>
        </mt-popup>
        <div class="search-list consum-mb10">
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
            <div class="no-datalist"
                 v-if="merchantList.length==0">
                <img src="Resources/h5/dist/images/no-data.png"
                     style="margin-top:5rem;">
            </div>
        </div>
        <!--点击下载-->
        <download></download>
        <!--end-->
        <!--底部导航-->
        <foot :active="2"></foot>
        <!--end-->
    </section>
</template>

<script>
import download from '../../components/download.vue';
import footer from '../../components/footer.vue';
import areaList from '../../kit/areajson';
import ticketcardtypeList from '../../kit/ticketcardtype';
var locationAdress = '杭州市';

export default {
    data() {
        return {
            merchPath: config.merchPath, //商户图片前缀
            isshow: true,
            popupVisible: false,
            buttonBottom: 0,
            dateSlots: [{
                flex: 1,
                values: [],
                className: 'slot1',
                textAlign: 'center'
            }],
            selectValue: '',
            text1: '全城',
            text2: '商户类型',
            text3: '推荐',
            type: 1,
            formData: {
                GID: usages.api.consumption.querymerchantlist, //接口
                city: '', //地址模糊查询
                businessscope: '', //经营类型
                address: '', //地址模糊查询
                merchantname: '', //商户名称模糊查询
                ticketcardtype: '',
                pagesize: 100,
                pageno: 1
            },
            merchantList: [],
            areaListName: ['全城'],
            areaListCode: [''],
            ticketCardTypeNameList: ['全部'],
            ticketCardTypeCodeList: ['']
        }
    },
    created() {
        //初始化加载数据
        this.getAreaByName(areaList);
        this.getTicketCardName(ticketcardtypeList);
        MintUI.Indicator.open();
    },
    mounted() {
        var vm = this;
        vm.isshow = true;
        vm.formData.ticketcardtype = config.yfkId;
        vm.querymerchantlist();
    },
    methods: {
        getTicketCardName(dataList) {
            var vm = this;
            if (dataList) {
                dataList.forEach(function (ele) {
                    vm.ticketCardTypeNameList.push(ele.name);
                    vm.ticketCardTypeCodeList.push(ele.value);
                })
            }
        },
        getAreaByName(dataList) {
            var vm = this;
            if (dataList) {
                dataList.forEach(function (ele) {
                    var subObj = ele.sub,
                        len = subObj ? subObj.length : 0;
                    if (ele.name === locationAdress) {
                        for (var i = 0; i < len; i++) {
                            if (subObj[i].name != locationAdress) {
                                vm.areaListName.push(subObj[i].name);
                                vm.areaListCode.push(subObj[i].value);
                            }
                        }
                    } else {
                        vm.getAreaByName(subObj);
                    }
                });
            }
        },
        changeList(type) {
            var vm = this;
            vm.isshow = false;
            vm.formData.city = '';
            vm.formData.businessscope = '';
            if (type === 1) {
                vm.formData.ticketcardtype = config.yfkId;
            } else {
                vm.formData.ticketcardtype = config.dzjId;
            }
            vm.querymerchantlist();
        },
        querymerchantlist() {
            var vm = this;
            vm.formData.rand=Math.random();
            vm.$http.post(usages.domain, vm.formData).then(function (res) {
                console.log(res.body);
                var datalist = res.body
                if (datalist.issuccess) {
                    vm.merchantList = datalist.result.merchantlist || [];
                } else {
                    vm.errMsg(datalist.rtnmessage);
                }
            }).then((res) => {
                MintUI.Indicator.close();
            });
        },
        jumpPage: function () { //跳转到搜索页面
            this.$router.push({
                'name': 'search'
            });
        },
        openSection: function (val) {
            var vm = this;
            vm.popupVisible = true;
            vm.type = val;
            vm.dateSlots[0].values = [];
            if (val == 1) {
                vm.dateSlots[0].values = vm.areaListName;
            } else if (val == 2) {
                this.dateSlots[0].values = vm.ticketCardTypeNameList;
            } else {
                vm.dateSlots[0].values = ['默认'];
            }
        },
        sure: function () {
            var vm = this;
            vm.popupVisible = false;
            if (vm.type == 1) {
                vm.text1 = vm.selectValue == '全城' ? '全城' : vm.selectValue;
            } else if (vm.type == 2) {
                vm.text2 = vm.selectValue == '全部' ? '商户类型' : vm.selectValue;
            } else {
                vm.text3 = vm.selectValue == '默认' ? '推荐' : vm.selectValue;
            }
            vm.querymerchantlist(); //查询商户列表
        },
        onDateChange(picker, values) {
            var vm = this;

            var selectVal = values[0] || (vm.type == 1 ? '全城' : '全部');
            vm.selectValue = selectVal;
            var selectCode = selectVal == '全城' || selectVal == '全部' ? '' :
                (vm.type == 1 ? vm.areaListCode[vm.areaListName.indexOf(
                    selectVal)] : vm.ticketCardTypeCodeList[vm.ticketCardTypeNameList.indexOf(
                        selectVal)]);
            if (vm.type == 1) {
                vm.formData.city = selectCode;
            } else if (vm.type == 2) {
                console.log(selectCode);
                vm.formData.businessscope = selectCode;
            } else { //推荐
            }
            console.log('城市code：' + selectCode);
        },
        errMsg(msg) {
            MintUI.MessageBox('', msg);
        }
    },
    components: {
        download: download,
        foot: footer
    },
    watch: {

    }
}
</script>