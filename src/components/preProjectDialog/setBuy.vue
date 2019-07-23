<template>
  <!-- <el-dialog
      append-to-body
      :data="setBuyDialog.data"
      :visible.sync="setBuyDialog.openDialog"
      width="750px"
      :close-on-click-modal="false"
    >
      <set-buy></set-buy>
  </el-dialog>-->
  <section class="setBuy">
    <div slot="title" class="dialog-title">
      <span style="float: left">集中采购</span>
    </div>
    <div>
      <el-row>
        <el-col :span="24">
          <span>采购内容：</span>
          <el-input></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span>采购目录：</span>
          <el-input></el-input>
        </el-col>
        <el-col :span="8">
          <span class="pl-10">采购类型：</span>
          <el-input></el-input>
        </el-col>
        <el-col :span="8">
          <span class="pl-10">采购程序：</span>
          <el-input></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span>采购数量：</span>
          <el-input></el-input>
        </el-col>
        <el-col :span="8">
          <span class="pl-10">计量单位：</span>
          <el-input></el-input>
        </el-col>
        <el-col :span="8">
          <span class="pl-10">预计单价：</span>
          <el-input></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span style="line-height:normal;">技术参数及配置标准：</span>
          <el-input type="textarea" show-word-limit maxlength="600" :rows="5" v-model="textarea"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span style="line-height:normal;">备注：</span>
          <el-input type="textarea" show-word-limit maxlength="600" :rows="5" v-model="textarea"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span>采购时间：</span>
          <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
export default {
  name: 'setBuy',
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      textarea: ''
    }
  },
  mounted() {},
  methods: {},
  computed: {}
}
</script>
<style lang="scss" scoped>
.setBuy {
  .dialog-title {
    overflow: hidden;
    > span {
      width: 100%;
      text-align: left;
      font-size: 0.16rem;
      border-bottom: 1px solid #eaeaea;
    }
  }
  .el-row {
    margin-bottom: 10px;
    &:first-of-type {
      margin-top: 10px;
    }
  }
  .el-col {
    padding-left: 100px;
    margin-bottom: 10px;
    > span {
      position: relative;
      left: -100px;
      width: 100px;
      float: left;
      line-height: 40px;
      text-align: left;
      &.pl-10 {
        padding-left: 10px;
      }
    }
    > .el-input,
    > .el-textarea,
    > .el-date-editor {
      margin-left: -100px;
      width: 100%;
    }
  }
}
</style>
<style lang="stylus"></style>


