<template>
  <!-- <el-dialog
      append-to-body
      :visible.sync="textareaDialog.openDialog"
      width="750px"
      :close-on-click-modal="false"
    >
      <textarea-dialog :data="textareaDialog.data"></textarea-dialog>
  </el-dialog>-->
  <section class="textareadialog">
    <div slot="title" class="dialog-title">
      <span style="float: left">输入内容</span>
    </div>
    <div>
      <el-row>
        <el-col :span="24">
          <el-input type="textarea" show-word-limit maxlength="600" :rows="5" v-model="textarea"></el-input>
        </el-col>
      </el-row>
    </div>
    <el-col :span="24" style="margin-top:10px;margin-bottom: 10px">
      <div class="top-btn" style="float:right;">
        <slot name="btn"></slot>
      </div>
    </el-col>
  </section>
</template>

<script>
export default {
  name: 'textareaDialog',
  props: {
    data: {
      type: String
    }
  },
  data() {
    return {
      textarea: ''
    }
  },
  mounted() {
    console.log(this.data)
    this.textarea = this.data
  },
  watch: {
    textarea(val) {
      this.$emit('update:data', val)
    }
  }
}
</script>
<style lang="scss" scoped>
.textareadialog {
  .dialog-title {
    overflow: hidden;
    margin-bottom: 10px;
    > span {
      width: 100%;
      text-align: left;
      font-size: 0.16rem;
      border-bottom: 1px solid #eaeaea;
    }
  }
}
</style>


