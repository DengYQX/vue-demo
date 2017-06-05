<style>
@import '../../../assets/css/view/payment.css';
</style>
<template>
    <section class="page">
        <div class="trad-wrap"
             v-show="!isHide">
            <dl class="trad-list">
                <dt>本月</dt>
    
                <dd v-for="d in dataList">
                    <router-link :to="{ name : 'tradInfo' , params : { id : d.id}}">
                        <div class="trads">
                            <div class="trad-item-top clearfix">
                                <div class="title w50 fl">{{d.title}}</div>
                                <div class="money w50 fr">{{d.money}}元</div>
                            </div>
                            <div class="trad-item-bot clearfix">
                                <div class="date w50 fl">{{d.datetime}}</div>
                                <div class="state w50 fr red"><span class="red">{{d.stateText}}</span></div>
                            </div>
                        </div>
                    </router-link>
                </dd>
            </dl>
    
            <dl class="trad-list">
                <dt>2月</dt>
                <dd v-for="d in dataList2">
                    <router-link :to="{ name : 'tradInfo' , params : { id : d.id}}">
                        <div class="trads">
                            <div class="trad-item-top clearfix">
                                <div class="title w50 fl">{{d.title}}</div>
                                <div class="money w50 fr">{{d.money}}元</div>
                            </div>
                            <div class="trad-item-bot clearfix">
                                <div class="date w50 fl">{{d.datetime}}</div>
                                <div class="state w50 fr red"><span class="red">{{d.stateText}}</span></div>
                            </div>
                        </div>
                    </router-link>
                </dd>
            </dl>
        </div>
        <div class="no-datalist"
             v-show="isHide">
            <img src="Resources/h5/dist/images/no-data.png">
        </div>
    </section>
</template>

<script>
var MintUI = require('mint-ui');
var MessageBox = MintUI.MessageBox;
module.exports = {
    data: function () {
        return {
            dataList: [],
            dataList2: [],
            transtype: 10,//首页交易记录类型
            isHide: false
        }
    },
    components: {},
    // 加载之前
    created: function () {
    },

    mounted: function () {
        var vm = this;
        //隐藏加载动画
        vm.dataList = [{
            id: 1,
            title: '银行卡充值',
            money: 200.88,
            datetime: '2017-03-22 16:22',
            stateText: '银行处理中'
        }, {
            id: 1,
            title: '充值',
            money: 1999.88,
            datetime: '2017-03-22 16:22',
            stateText: '已完成'
        }, {
            id: 1,
            title: '提现',
            money: -188.88,
            datetime: '2017-03-22 16:22',
            stateText: '进行中'
        }];
        vm.dataList2 = [{
            id: 1,
            title: '充值',
            money: 188.88,
            datetime: '2017-03-22 16:22',
            stateText: '已处理'
        },
        {
            id: 1,
            title: '提现',
            money: 188.88,
            datetime: '2017-03-22 16:22',
            stateText: '已完成'
        },
        {
            id: 1,
            title: '银行卡充值',
            money: 188.88,
            datetime: '2017-03-22 16:22',
            stateText: '银行处理中'
        },
        {
            id: 1,
            title: '银行卡充值',
            money: 188.88,
            datetime: '2017-03-22 16:22',
            stateText: '银行处理中'
        },
        {
            id: 1,
            title: '银行卡充值',
            money: 188.88,
            datetime: '2017-03-22 16:22',
            stateText: '银行处理中'
        }
        ];
        if (vm.dataList.length > 0 || vm.dataList2.length  > 0) {
            vm.isHide = false;
        }
        vm.gettranslist();
    },
    methods: {
        //扫一扫
        gettranslist() {
            var vm = this;
            var _p = {
                GID: usages.api.user.translist,
                transtype: 10,
                userid: _com.getSession('userid'),
                pagesize: 100,
                pageno: 1,
                rand: Math.random()
            }
            vm.$http.post(usages.domain, _p).then(function (res) {
                console.log(res);

            })
        },
        handleClick: function () {
            MessageBox('提示', '提交成功');
        }
    }
}
</script>