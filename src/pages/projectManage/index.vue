<template>
  <div class="projectManage">
    <topHandle :title="'项目管理在线工作平台'" @refresh="refresh"></topHandle>
    <el-dialog
      append-to-body
      :visible="true"
      width="90%"
      :close-on-click-modal="false"
      class="prerojectnewproject"
    >
      <prerojectnewproject></prerojectnewproject>
    </el-dialog>
  </div>
</template>

<script>
import topHandle from '@/components/topNav/topHandle'
import prerojectnewproject from '../../components/preProjectDialog/prerojectnewproject'
export default {
  name: 'projectManage',
  methods: {
    refresh() {}
  },
  components: {
    topHandle,
    prerojectnewproject
  }
}
</script>

<style lang="scss" scoped>
.projectManage {
}
</style>

