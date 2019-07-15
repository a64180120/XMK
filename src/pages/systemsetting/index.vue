<template>
  <div class="sys-setting">
    <router-view></router-view>
    <navbar></navbar>
  </div>
</template>

<script>
import navbar from '@/components/navbar'
export default {
  name: 'systemsetting',
  mounted () {
    this.updateTitle()
  },
  methods: {
    //修改title
    updateTitle () {
      let title = document.getElementsByTagName('title')[0];
      title.innerText = "系统管理在线工作平台";
    },
  },
  components: {
    navbar
  }
}
</script>

<style lang="scss" scoped>
.sys-setting {
  min-width: 1200px;
  position: relative;
  height: 100%;
}
</style>
