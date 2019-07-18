<template>
  <div class="projectManage">
    <topHandle :title="'项目管理在线工作平台'"
               @refresh="refresh">

    </topHandle>
  </div>
</template>

<script>
import topHandle from '@/components/topNav/topHandle'
export default {
  name: 'projectManage',
  methods: {
    refresh () {

    }
  },
  components: {
    topHandle
  }
}
</script>

<style lang="scss" scoped>
.projectManage {
}
</style>

