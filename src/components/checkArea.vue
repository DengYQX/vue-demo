
<style>

</style>
<template>
    <div class="popup-body">
        <div class="popub-head clearfix">
            <span class="cancel"
                  @click="close()">取消</span>
            <span class="sure"
                  @click="sure()">完成</span>
        </div>
        <div class="popub-content">
            <mt-picker :slots="dateSlots"
                       @change="onDateChange"
                       :visible-item-count="5"
                       :show-toolbar="false"></mt-picker>
        </div>
    </div>
</template>

<script>
//选择省市区（县)子组件
import areaList from '../kit/areajson';
export default {
    data() {
        return {
            dateSlots: [{
                flex: 1,
                values: [],
                className: 'slot1',
                textAlign: 'center'
            },
            {
                flex: 1,
                values: [],
                className: 'slot1',
                textAlign: 'center'
            },
            {
                flex: 1,
                values: [],
                className: 'slot1',
                textAlign: 'center'
            }
            ],
            provCode: [],
            cityCode: [],
            areaCode: [],
            provName: [],
            cityName: [],
            areaName: [],
            provSelectName: '',
            provSelectCode: '',
            citySelectName: '',
            citySelectCode: '',
            areaSelectName: '',
            areaSelectCode: ''
        }
    },
    mounted() {
        var vm = this;
        vm.getProvAddress();
        vm.resetArea();
    },
    methods: {
        close() {
            this.$emit('bindClose');
        },
        sure() {
            var vm = this;
            var prov = vm.provCode[vm.provName.indexOf(vm.provSelectName)],
                city = vm.cityCode[vm.cityName.indexOf(vm.citySelectName)],
                area = vm.areaCode[vm.areaName.indexOf(vm.areaSelectName)];
            var strPca = prov + '-' + city + '-' + area + '|' + vm.provSelectName + '-' + vm.citySelectName + '-' + vm.areaSelectName;
            this.$emit('bindSure', strPca);
        },
        /**重置**/
        resetArea() {
            var vm = this;
            vm.dateSlots[0].values = this.provName;
            vm.dateSlots[1].values = this.cityName;
            vm.dateSlots[2].values = this.areaName;
        },
        onDateChange(picker, values) {
            var vm = this;
            console.log(values);
            vm.provSelectName = values[0] || '';
            vm.citySelectName = values[1] || '';
            vm.areaSelectName = values[2] || '';
            vm.getProvAddress();
            vm.resetArea();
        },

        getProvAddress(fName, sName) {
            var vm = this;
            vm.provCode = [];
            vm.provName = [];
            areaList.forEach(function (item, i) {
                vm.provCode.push(item.value);
                vm.provName.push(item.name);
                if (vm.provSelectName === item.name) {
                    vm.getCityAddress(item.sub);
                } else {
                    if (i === 0) {
                        vm.getCityAddress(item.sub);
                    }
                }

            });
        },
        getCityAddress(citylist) {
            var vm = this;
            vm.cityCode = [];
            vm.cityName = [];
            citylist.forEach(function (item, i) {
                vm.cityCode.push(item.value);
                vm.cityName.push(item.name);
                if (vm.citySelectName === item.name) {
                    vm.getAreaAddress(item.sub);
                } else {
                    if (i === 0) {
                        vm.getAreaAddress(item.sub);
                    }
                }
            });
        },
        getAreaAddress(areaedlist) {
            var vm = this;
            vm.areaCode = [];
            vm.areaName = [];
            areaedlist.forEach(function (item, i) {
                if (i != 0) {
                    vm.areaCode.push(item.value);
                    vm.areaName.push(item.name);
                }
            });

        }
    },
    watch: {
    }
}
</script>