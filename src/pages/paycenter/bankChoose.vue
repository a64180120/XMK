<template>
  <div class="bankChoose">
    <!-- 异常处理 -->
    <el-dialog
      append-to-body
      :visible.sync="data.openDialog"
      width="90%"
      :close-on-click-modal="false"
      class="payCenter"
    >
      <div slot="title" class="dialog-title">
        <span style="float: left">请选择收款方账户</span>
      </div>
      <div class="payCenterDialog">
        <div class="content" style="position:relative">
          <div class="btns">
            <span class="btn" @click="data.openDialog = false">取消</span>
            <span class="btn" @click="bankConfirm">确定</span>
          </div>
          <div style="height: 300px;">
            <bankorder ref="bankorder"></bankorder>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import bankorder from '@/components/bankorder'
export default {
  name: 'bankChoose',
  components: { bankorder },
  props: {
    data: {
      type: Object,
      default: {
        openDialog: false,
        data: {}
      }
    }
  },
  data() {
    return {
      radio: ''
    }
  },
  created() {},
  mounted() {},
  methods: {
    bankConfirm() {
      var data = this.$refs.bankorder.choosedItem
      if (data.length != 1) {
        this.$msgBox.error('请选择一条数据!')
        return
      } else {
        data = data[0]
      }
      this.data.openDialog = false
      this.$emit('getBank', data)
    }
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
.payCenter {
  color: #333;
  font-size: 0.16rem;
  .dialog-title {
    overflow: hidden;
    > span {
      width: 100%;
      text-align: left;
      font-size: 0.16rem;
      border-bottom: 1px solid #eaeaea;
    }
  }
  .payCenterDialog {
    background-color: #fff;
    .content {
      text-align: left;
      font-size: 0.16rem;
      > span {
        line-height: 55px;
      }
      > .el-input {
        width: auto;
        line-height: 55px;
      }
      > img {
        width: 55px;
        height: 55px;
        margin-right: 10px;
      }
      &.payListContent {
        background-color: #f5f5f5;
        padding: 10px;
        margin-top: 15px;
        .payDetail {
          background-color: #fff;
          border-radius: 5px;
        }
        .getDetail {
          background-color: #fff;
        }
      }
    }
    .btns {
      text-align: right;
      padding-top: 10px;
      .btn {
        border: 1px solid $btnColor;
        cursor: pointer;
        &:not(:last-of-type) {
          margin-right: 10px;
        }
        &.btn-cancel {
          background: #fff;
          color: $btnColor;
          border: 1px solid $btnColor;
        }
        &.btn-large {
          width: 88px;
        }
      }
      .payId {
        float: left;
        line-height: 30px;
      }
    }
    .el-collapse {
      margin-top: 10px;
    }
  }
}
</style>

<style lang='scss'>
.payCenter {
  .el-checkbox,
  .el-checkbox__input.is-checked + .el-checkbox__label,
  .el-checkbox-button__inner {
    color: #333;
  }
  .el-checkbox__label {
    font-size: 0.14rem;
  }
  .tableBody .el-checkbox__label {
    font-size: 0.12rem;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-color: rgb(204, 204, 204);
  }
  .el-table--border,
  .el-table--group {
    border-color: rgb(204, 204, 204);
  }
  .payCenterDialog {
    .el-table {
      font-size: 0.14rem;
      th {
        background-color: $btnColor;
        border-right-color: #fff;
      }
      thead {
        color: #fff;
      }
    }
    .el-collapse-item__header {
      font-size: 0.13rem;
      border-bottom: 0px;
    }
    .el-collapse-item__wrap {
      border-bottom: 0px;
    }
    .el-collapse-item__content {
      padding-bottom: 0;
    }
    .el-table__header-wrapper thead .el-checkbox__label {
      color: #fff;
    }
    .el-radio__inner {
      width: 0.16rem;
      height: 0.16rem;
    }
    .el-radio__label {
      font-size: 0.16rem;
    }
    .el-radio:not(:last-of-type) {
      margin-bottom: 10px;
    }
  }
  .account_bank .content .orgList {
    width: 19%;
    margin-top: -40px;
  }
  .account_bank .content .account {
    float: right;
    overflow: hidden;
  }
}
</style>
