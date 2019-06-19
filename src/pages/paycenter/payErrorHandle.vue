<template>
  <div class="payErrorHandle">
    <!-- 异常处理 -->
    <el-dialog
      append-to-body
      :visible.sync="data.openDialog"
      width="350px"
      :close-on-click-modal="false"
      class="payCenter"
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
          <span class="btn" @click="data.openDialog = false">取消</span>
          <span class="btn" @click="errorHandle">确定</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  postRefreshPaymentState,
  postRefreshPaymentsState,
  postUpdatePaymentsState
} from '@/api/paycenter'
import { mapState } from 'vuex'
export default {
  name: 'payErrorHandle',
  components: {},
  props: {
    data: {
      type: Object,
      default: {
        openDialog: false,
        data: {}
      }
    },
    father: {
      default: null
    }
  },
  inject: ['refreshIndexData'],
  data() {
    return {
      radio: ''
    }
  },
  created() {
    console.log(this.data.data)
    console.log(this.data.father)
  },
  mounted() {},
  methods: {
    errorHandle() {
      if (this.radio === '') {
        this.$msgBox.show('请选择一种处理方式。')
        return
      }
      if (this.radio == 0) {
        // 重新刷新支付状态
        var ids = this.data.data.map(item => {
          return item.Mst.PhId
        })
        this.postRefreshPaymentsState(ids)
      } else {
        // 直接更改支付状态
        var ids = this.data.data.map(item => {
          return item.Mst.PhId
        })
        this.postUpdatePaymentsState(ids)
      }
    },
    // 刷新并获取支付单支付状态
    postRefreshPaymentState() {
      postRefreshPaymentState({
        id: this.data.data.Mst.PhId,
        uid: this.userid,
        orgid: this.orgid,
        ryear: this.year || '2019'
      })
        .then(res => {
          if (res.Status == 'error') {
            this.$msgBox.error(res.Msg)
            return
          }
          this.data.openDialog = false
          this.refreshIndexData()
          this.$msgBox.show({
            content: '处理成功'
          })
        })
        .catch(err => {
          this.$msgBox.error('发起线上异常处理失败！')
          console.log(err)
        })
    },
    // 刷新并获取支付单支付状态-多笔
    postRefreshPaymentsState(ids) {
      postRefreshPaymentsState({
        infoData: ids,
        uid: this.userid,
        orgid: this.orgid
      })
        .then(res => {
          if (res.Status == 'error') {
            this.$msgBox.error(res.Msg)
            return
          }
          this.refreshIndexData()
          this.data.openDialog = false
          this.$msgBox.show({
            content: '操作成功！请在2小时后查看状态。'
          })
        })
        .catch(err => {
          this.$msgBox.error('发起线上异常处理失败！')
          console.log(err)
        })
    },
    // 批量更新支付单支付状态
    postUpdatePaymentsState(infoData) {
      postUpdatePaymentsState({
        uid: this.userid,
        orgid: this.orgid,
        infoData: infoData,
        value: 1
      })
        .then(res => {
          if (res.Status == 'error') {
            this.$msgBox.error(res.Msg)
            return
          }
          this.refreshIndexData()
          this.data.openDialog = false
          this.$msgBox.show({
            content: '操作成功！请在2小时后查看状态。'
          })
        })
        .catch(err => {
          this.$msgBox.error('消除异常失败！')
          console.log(err)
        })
    }
  },
  watch: {},
  computed: {
    ...mapState({
      orgid: state => state.user.orgid,
      userid: state => state.user.userid,
      year: state => state.user.year
    })
  }
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
      border-bottom: 1px solid $borderColor_ccc;
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
}
</style>
