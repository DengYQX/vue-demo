<template>
  <div class="checkbox-field" :style="cssstyle">
    <p @click="checkClick"><span class="chebox"
            :class="{active:isActive}"></span>我已阅读并同意
      <router-link :to="linkurl">
        《{{linktitle}}》
      </router-link>
    </p>
  </div>
</template>

<script>
export default {
  props: ['link'],
  data() {
    return {
      isActive: false,
      linkurl:'',
      linktitle:'卡盟平台卡卷服务协议',
      cssstyle:''
    }
  },
  mounted() {
    var vm=this;
    vm.linkurl=this.link.linkurl;
    vm.linktitle=this.link.linktitle;
    vm.cssstyle=this.link.style;
  },
  methods: {
    checkClick() {
      var vm = this;
      vm.isActive = !vm.isActive;
      vm.$emit('bindCheck', vm.isActive);
    }
  }
}
</script>
