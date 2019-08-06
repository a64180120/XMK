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
          <el-input type="textarea" show-word-limit :maxlength="maxWord" :rows="5" v-model="textarea"></el-input>
        </el-col>
      </el-row>
    </div>
    <el-col :span="24" style="margin-top:10px;margin-bottom: 10px">
      <div class="top-btn" style="float:right;">
        <el-button class="btn" size="mini" @click="close(0)">取消</el-button>
        <el-button class="btn" size="mini" @click="close(1)">保存</el-button>
      </div>
    </el-col>
  </section>
</template>

<script>
export default {
  name: 'textareaDialog',
  props: {
    data: {
      type: Object
    },
    maxWord:{
      type: String,
      default:600
    }
  },
  data() {
    return {
      textarea: '',
      oldTextarea: ''
    }
  },
  mounted() {
    this.textarea = this.data.data[this.data.property]
    this.oldTextarea = this.data.data[this.data.property]
  },
  methods: {
    close(type) {
      this.data.data[this.data.property] = type
        ? this.textarea
        : this.oldTextarea
      this.data.openDialog = false
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


