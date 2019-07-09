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
        <span style="float: left">支付状态清查</span>
      </div>
      <div class="payCenterDialog">
        <div class="content">
          <el-radio-group v-model="radio">
            <el-radio :label="0">发起线上异常处理。</el-radio>
            <div class="notice">（支付中单据处理）</div>
            <el-radio :label="1">线下确认已成功支付，消除异常。</el-radio>
            <div class="notice">（支付异常单据处理）</div>
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
        this.$msgBox.error('请选择一种处理方式。')
        return
      }
      if (this.radio == 0) {
        if (!this.data.data.every(i => i.Mst.FState == 3)) {
          this.$msgBox.error('只能对支付中的单据进行此操作。')
          return
        }
        // 重新刷新支付状态
        var ids = this.data.data.map(item => {
          return item.Mst.PhId
        })
        this.postRefreshPaymentsState(ids)
      } else {
        if (!this.data.data.every(i => i.Mst.FState == 2)) {
          this.$msgBox.error('只能对支付异常的单据进行此操作。')
          return
        }
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
      .el-radio {
        margin-bottom: 0;
      }
      .notice {
        font-size: 0.16rem;
        line-height: 22px;
        padding-left: 12px;
        &:first-of-type {
          margin-bottom: 10px;
        }
      }
    }
    .btns {
      text-align: right;
      padding-top: 10px;
      .btn {
        &:not(:last-of-type) {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>

<style lang='scss'>
.payCenter {
  .payCenterDialog {
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
  }
  .el-dialog__body {
    padding-bottom: 10px;
  }
}
</style>
