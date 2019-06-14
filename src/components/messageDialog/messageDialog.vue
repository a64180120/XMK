<template>
  <el-dialog
    append-to-body
    :visible.sync="openDialog"
    width="390px"
    :close-on-click-modal="false"
    :before-close="close"
    class="saasMsgCon"
  >
    <div slot="title" class="dialog-title">
      <span style="float: left">{{title}}</span>
    </div>
    <div class="saasMsg">
      <div>
        <div class="imgCon">
          <img v-if="status === 'success'" src="../../assets/images/message.png">
          <img v-else-if="status === 'error'" src="../../assets/images/cw.png">
        </div>
        <span style="float:right;width:290px">
          <span v-html="content"></span>
          &nbsp;
          ({{count}}s) 后自动关闭
        </span>
      </div>
      <div>
        <button @click="close" class="btn">{{cancelBtnText}}</button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'messageDialog',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    fn: {
      type: Function,
      default: () => {}
    },
    content: {
      type: String,
      default: '这是弹框内容'
    },
    cancelBtnText: {
      type: String,
      default: '立即关闭'
    }
  },
  data() {
    return {
      openDialog: false,
      interval: null,
      count: 0,
      status: 'success',
      timeOut: 3
    }
  },
  mounted() {},
  methods: {
    close(done) {
      this.openDialog = false
      this.fn()
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
      }
      this.$destroy()
    },
    showMsgBox: function() {
      this.count = this.timeOut
      this.openDialog = true
      this.status = 'success'
      this.$nextTick(() => {
        this.beginCount()
      })
    },
    showError: function() {
      this.count = this.timeOut
      this.openDialog = true
      this.status = 'error'
      this.$nextTick(() => {
        this.beginCount()
      })
    },
    beginCount: function() {
      var that = this
      this.count = this.timeOut
      this.interval = setInterval(() => {
        that.count--
        if (that.count == 0) {
          that.close()
        }
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
.saasMsgCon {
  color: #333;
  font-size: 0.16rem;
  .dialog-title {
    overflow: hidden;
    > span {
      width: 100%;
      text-align: left;
      font-size: 0.18rem;
      border-bottom: 1px solid #eaeaea;
    }
  }
  .saasMsg {
    text-align: left;
    display: inline-block;
    vertical-align: middle;
    background: #fff;
    font-size: 14px;
    > div {
      display: flex;
      align-items: center;
      &:first-of-type {
        height: 60%;
        font-size: 16px;
        overflow-y: auto;
      }
      &:nth-of-type(2) {
        margin-top: 10px;
        justify-content: flex-end;
      }
      > .imgCon {
        float: left;
        width: 50px;
        height: 50px;
        > img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .btn {
    cursor: pointer;
    background: #00b7ee;
    color: #fff;
    text-align: center;
    border: 1px solid #00b7ee;
    border-radius: 5px;
    height: 30px;
    line-height: 30px;
    width: 90px;
  }
  .btn:hover {
    background: #fff;
    color: #00b7ee;
  }
}
</style>

<style lang='scss'>
.saasMsgCon {
  .el-dialog {
    display: inline-block;
    margin: 0 !important;
    vertical-align: middle;
    .el-dialog__body {
      padding: 20px;
    }
  }
  &.el-dialog__wrapper {
    text-align: center;
  }
  &.el-dialog__wrapper::after {
    display: inline-block;
    content: '';
    vertical-align: middle;
    height: 100%;
  }
}
</style>
