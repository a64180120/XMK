<template>
  <div class="mergePay">
    <!-- 支付单查看 -->
    <el-dialog
      :append-to-body="inner"
      :visible.sync="data.openDialog"
      width="350px"
      :close-on-click-modal="false"
    >
      <div slot="title" class="dialog-title">
        <span style="float: left">支付异常处理</span>
      </div>
      <div class="payCenterDialog">
        <div class="content">
          <el-radio-group v-model="radio">
            <el-radio :label="0">发起线上异常处理。</el-radio>
            <el-radio :label="1">线下确认已成功支付，消除异常。</el-radio>
          </el-radio-group>
        </div>
        <div class="btns">
          <span class="btn">取消</span>
          <span class="btn">确定</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'mergePay',
  components: {},
  props: {
    data: {
      type: Object,
      default: {
        openDialog: false,
        data: {},
        itemType: ''
      }
    },
    inner: {
      type: Boolean,
      default: false
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
    showFundDetail() {
      this.showMask = false
      this.fundDetailData.openDialog = true
    },
    // dialog中的check事件
    selectOne($scope) {
      console.log($scope)
    },
    selectAll(choosed) {
      console.log(choosed)
    },
    // 支付单详情事件
    save(type) {
      console.log(type)
      switch (type) {
        case '':
          this.index = 2
          this.message = '保存成功'
          this.notClosedAll = true
          this.tishi = true
        case 'showApprove':
        case 'showErrorHandle':
        case 'showMergePay':
          this.index = 2
          this[type] = true
          break
        case 'new':
          alert('newTable????')
          break
      }
    }
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
.mergePay {
  color: #333;
  font-size: 0.16rem;
  .dialog-title {
    > span {
      width: 100%;
      text-align: left;
      font-size: 0.16rem;
      border-bottom: 1px solid #eaeaea;
    }
  }
  .dialogContainer {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2001;
    .payCenterDialog {
      &.smallDialog {
        width: 300px;
      }
      &.largeDialog {
        width: 80%;
      }
      z-index: 2001;
      background-color: #fff;
      width: 50%;
      padding: 20px;
      display: inline-block;
      vertical-align: middle;

      .content {
        margin-top: 10px;
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
        &.payList {
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
    &::after {
      content: '';
      display: inline-block;
      vertical-align: middle;
      height: 100%;
    }
  }
}
</style>

<style lang='scss'>
.payIndex {
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
    &.smallDialog {
      .el-radio__inner {
        width: 0.14rem;
        height: 0.14rem;
      }
      .el-radio__label {
        font-size: 0.14rem;
      }
      .el-radio:not(:last-of-type) {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
