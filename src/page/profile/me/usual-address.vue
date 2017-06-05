<style>

</style>

<template>
    <section class="page usual-info">
        <div class="row-field bg"
             v-for="(item,index) in addressList"
             :class="{'marg-top15':index==0}">
            <div class="address-info">
                <p class="info">
                    <span class="name fl">{{item.username}}</span>
                    <span class="tel fr">{{item.telphone}}</span>
                </p>
                <p>{{item.prov+item.city+item.area+item.address}}</p>
            </div>
            <div class="address-action">
                <div class="set-default"
                     :class="{'active':index==currentIndex||item.status==1}"
                     @click="setDefault(item.serialno,index)">
                    <i></i>{{index==currentIndex?'默认地址':'设为默认地址'}}
                </div>
                <div class="set-action">
                    <a class="btnb "
                       href="javascript:;"
                       @click="deletes(item.serialno,index)">删除</a>
                    <a class="btnb "
                       href="javascript:;"
                       @click="edits(item.serialno)">编辑</a>
                </div>
            </div>
        </div>
        <div class="usual-footer">
            <a href="javascript:;"
               @click="add()"></a>
            <router-link :to="{name:'usualaddressadd',params:{id:'0'}}">新建地址</router-link>
        </div>
        <router-view></router-view>
    </section>
</template>

<script>
export default {
    data() {
        return {
            currentIndex: 0,
            addressList: [{
                serialno: '001',
                username: '刘备',
                telphone: '133222554444',
                prov:'浙江省',
                city:'杭州市',
                area:'西湖区',
                address: '三马路9号',
                status: true
            }
            ],
            userid: _com.getSession('userid'),
            
        }
    },
    mounted() {
        var vm = this;
        vm.queryaddresslist();
    },
    methods: {
        setDefault(id, index) {
            var vm = this;
            vm.currentIndex = index;
            var vm = this;
            var _p = {
                GID: usages.api.user.setdefaultaddress,
                userid: vm.userid,
                serialno: id,
                rand: Math.random()
            }
             vm.$http.post(usages.domain, _p).then(function (res) {
                console.log(res);
                if (res.body.issuccess) {
                    vm.addressList[index].status=1;
                } else {
                    MintUI.Toast(res.body.rtnmessage);
                }
            });
        },
        deletes(id,index) {
            var vm = this;
            var _p = {
                GID: usages.api.user.deleteaddress,
                userid: vm.userid,
                serialno: id,
                rand: Math.random()
            }
             vm.$http.post(usages.domain, _p).then(function (res) {
                console.log(res);
                if (res.body.issuccess) {
                    vm.addressList.splice(index,1);
                } else {
                    MintUI.Toast(res.body.rtnmessage);
                }
            });

        },
        edits(id) {
            this.$router.push({ name: 'usualaddressadd', params: { id: id } });
        },
        queryaddresslist() {
            var vm = this;
            var _p = {
                GID: usages.api.user.queryaddresslist,
                userid: vm.userid,
                rand: Math.random()
            }
            vm.$http.post(usages.domain, _p).then(function (res) {
                console.log(res);
                if (res.body.issuccess) {

                } else {
                    MintUI.Toast(res.body.rtnmessage);
                }
            });
        }
    },
    components: {}
}
</script>