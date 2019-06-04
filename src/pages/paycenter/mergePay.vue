<template>
  <div class="mergePay">
    <!-- 支付流程 -->
    <el-dialog
      append-to-body
      :visible.sync="data.openDialog"
      class="payCenter"
      :width="showMergePay?'550px':showPassword?'500px':'50%'"
      :close-on-click-modal="false"
      :before-close="beforeClose"
    >
      <div slot="title" class="dialog-title">
        <span style="float: left">{{title}}</span>
      </div>
      <!-- 合并支付 -->
      <div class="dialogContainer" v-show="showMergePay">
        <div class="payCenterDialog">
          <div class="content">
            <img src="@/assets/images/mergepay.png" alt>
            <span>合计支付{{money | NumFormat}}元？</span>
          </div>
          <div class="btns">
            <span class="btn btn-cancel" @click="beforeClose('btn')">取消</span>
            <span class="btn" @click="enterPassword">确定</span>
          </div>
          <!-- <el-collapse>
            <el-collapse-item name="1">
              <template slot="title">
                <i class="header-icon el-icon-menu" style="margin-left:10px;"></i>点击查看详细收款信息
              </template>
              <el-table max-height="200px" :data="gridData" border>
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column property="FDepartmentname" label="收款方姓名"></el-table-column>
                <el-table-column
                  property="FAmount"
                  header-align="center"
                  align="right"
                  label="待付金额"
                  width="150"
                  class-name="pr15"
                >
                  <template slot-scope="scope">{{scope.row[scope.column.property] | NumFormat}}</template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse>-->
          <div @click="showList = !showList" class="collapse" style>
            <i class="header-icon el-icon-menu" style="margin-left:10px;"></i>点击查看详细收款信息
            <i
              :class="{'el-icon-arrow-right':true,'trDown':showList}"
              style="float:right"
            ></i>
          </div>
          <template v-if="showList">
            <el-table max-height="200px" :data="gridData" border>
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column property="FDepartmentname" label="收款方姓名"></el-table-column>
              <el-table-column
                property="FAmount"
                header-align="center"
                align="right"
                label="待付金额"
                width="150"
                class-name="pr15"
              >
                <template slot-scope="scope">{{scope.row[scope.column.property] | NumFormat}}</template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
      <!-- 支付口令 -->
      <div class="dialogContainer" v-show="showPassword">
        <div class="payCenterDialog">
          <div class="content password">
            <img src="@/assets/images/mergepay.png" alt>
            <div class="passwordContent">
              <el-input
                :type="passwordCanSee?'text':'password'"
                v-model="password"
                placeholder="请输入支付口令"
                :maxlength="6"
                :disabled="needSet"
                @keyup.native="clearNoNum"
              ></el-input>
              <img
                v-show="passwordCanSee"
                class="eye"
                src="@/assets/images/zy.png"
                @click="passwordCanSee= !passwordCanSee"
              >
              <img
                v-show="!passwordCanSee"
                class="eye"
                src="@/assets/images/by.png"
                @click="passwordCanSee= !passwordCanSee"
              >
              <div class="notice" v-show="needSet">
                <span @click="goSetting">支付口令已启用，不允许为空，请点击维护。</span>
              </div>
            </div>
          </div>
          <div class="btns">
            <span class="btn btn-cancel" @click="beforeClose('btn')">取消</span>
            <span class="btn btn-disable" v-if="needSet">支付</span>
            <span class="btn" v-else @click="pay">支付</span>
          </div>
        </div>
      </div>
      <!-- 设置支付口令 -->
      <div class="dialogContainer" v-show="showSetting&&needSet">
        <div class="payCenterDialog">
          <div class="content password setting">
            <span>支付口令</span>
            <div class="passwordContent">
              <el-input
                :type="newPasswordCanSee?'text':'password'"
                v-model="newPassword"
                placeholder="请输入6位数字口令"
                :maxlength="6"
                @keyup.native="clearNoNum"
              ></el-input>
              <img
                v-show="newPasswordCanSee"
                class="eye"
                src="@/assets/images/zy.png"
                @click="newPasswordCanSee= !newPasswordCanSee"
              >
              <img
                v-show="!newPasswordCanSee"
                class="eye"
                src="@/assets/images/by.png"
                @click="newPasswordCanSee= !newPasswordCanSee"
              >
            </div>
            <span>确认口令</span>
            <div class="passwordContent">
              <el-input
                :type="confirmPasswordCanSee?'text':'password'"
                :maxlength="6"
                v-model="confirmPassword"
                placeholder="请输入6位数字口令"
                @keyup.native="clearNoNum"
              ></el-input>
              <img
                v-show="confirmPasswordCanSee"
                class="eye"
                src="@/assets/images/zy.png"
                @click="confirmPasswordCanSee= !confirmPasswordCanSee"
              >
              <img
                v-show="!confirmPasswordCanSee"
                class="eye"
                src="@/assets/images/by.png"
                @click="confirmPasswordCanSee= !confirmPasswordCanSee"
              >
            </div>
            <span>启用/停用</span>
            <el-radio-group v-model="radio">
              <el-radio :label="0">启用</el-radio>
              <el-radio :label="1">停用</el-radio>
            </el-radio-group>
          </div>
          <div class="btns">
            <span class="btn btn-cancel" @click="beforeClose('btn')">取消</span>
            <span class="btn" @click="setPassword">保存</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { postSubmitPayment } from '@/api/paycenter'

export default {
  name: 'mergePay',
  components: {},
  props: {
    data: {
      type: Object,
      default: {
        openDialog: false,
        data: null,
        itemType: ''
      }
    },
    father: {
      default: null
    }
  },
  data() {
    return {
      radio: 0,
      showList: false,
      newPassword: '',
      newPasswordCanSee: false,
      confirmPassword: '',
      confirmPasswordCanSee: false,
      passwordCanSee: false,
      showMergePay: true,
      showPassword: false,
      showSetting: false,
      password: '',
      gridData: []
    }
  },
  created() {
    console.log(this.data.data)
    if (Array.isArray(this.data.data)) {
      this.data.data.forEach(item => {
        this.gridData = [...this.gridData, ...item.Dtls]
      })
    } else {
      this.gridData = [...this.gridData, ...this.data.data.Dtls]
    }
  },
  methods: {
    setPassword() {
      this.showSetting = false
      this.$parent.needSet = false
      this.$parent.$parent.needSet = false
      this.showPassword = true
    },
    enterPassword() {
      this.showMergePay = false
      this.showPassword = true
    },
    beforeClose(done) {
      if (this.showMergePay) {
        this.data.openDialog = false
      } else if (this.showPassword) {
        this.showMergePay = true
        this.showPassword = false
      } else if (this.needSet) {
        this.showSetting = false
        this.showPassword = true
      }
    },
    goSetting() {
      this.showPassword = false
      this.showSetting = true
    },
    pay() {
      if (Array.isArray(this.data.data) && this.data.data.length > 0) {
        return
        postSubmitPayment({})
      } else {
        postSubmitPayment({
          id: '324190603000001',
          // id: this.data.data.Mst.PhId,
          uid: '521180820000001',
          orgid: '547181121000001',
          ryear: '2019'
        }).then(res => {
          if (res.Status == 'error') {
            this.$msgBox.error(res.Msg)
            console.log(res)
            return
          }
          this.$msgBox.show({
            content: '支付操作成功！具体到账情况以银行处理时间为准。',
            fn: () => {
              this.showPassword = false
              this.showMergePay = true
              if (this.father) this.father.openDialog = false
              this.data.openDialog = false
            }
          })
        })
      }
    },
    clearNoNum(event) {
      var obj = event.target
      obj.value = obj.value.replace(/[^\d]/g, '') //清除“数字”以外的字符
    }
  },
  computed: {
    title() {
      return this.showMergePay
        ? '合并支付'
        : this.showPassword
        ? '请输入支付口令'
        : this.showSetting
        ? '请设置支付口令'
        : ''
    },
    money() {
      if (Array.isArray(this.data.data)) {
        return this.data.data.reduce((prev, item) => {
          return prev + item.Mst.FAmountTotal
        }, 0)
      } else {
        return this.data.data.Mst.FAmountTotal
      }
    },
    needSet() {
      return this.$parent.needSet || this.$parent.$parent.needSet
    }
  },
  watch: {
    // 隐藏后关闭弹框
    'data.openDialog'(newVal) {}
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
      padding: 0 25px;
      &.password {
        margin-left: 90px;
        &.setting {
          > span {
            float: left;
            position: relative;
            left: -90px;
            clear: both;
            line-height: 55px;
            ~ .passwordContent,
            ~ .el-radio-group {
              width: 100%;
              float: left;
              margin-left: -150px;
              line-height: 55px;
              position: relative;
              left: 80px;
            }
            ~ .passwordContent {
              .eye {
                top: 8px;
              }
            }
          }
        }
        > img {
          float: left;
          position: relative;
          left: -90px;
        }
        > .passwordContent {
          font-size: 14px;
          width: 100%;
          float: left;
          margin-left: -90px;
          line-height: 70px;
          position: relative;
          .eye {
            position: absolute;
            width: 56px;
            height: 40px;
            top: 14px;
            right: 0;
          }
          .notice {
            text-align: center;
            text-decoration: underline;
            color: red;
            line-height: 30px;
            margin-bottom: 10px;
            > span {
              cursor: pointer;
            }
          }
        }
      }
      > span {
        line-height: 70px;
        font-size: 0.2rem;
      }
      > img {
        width: 70px;
        height: 70px;
        margin-right: 20px;
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
      text-align: center;
      padding-top: 10px;
      clear: both;
      .btn {
        border: 1px solid $btnColor;
        cursor: pointer;
        &:not(:last-of-type) {
          margin-right: 100px;
        }
        &.btn-cancel {
          background: #fff;
          color: $btnColor;
          border: 1px solid $btnColor;
        }
        &.btn-large {
          width: 88px;
        }
        &.btn-disable {
          background-color: $primaryColor;
          border-color: $primaryColor;
          cursor: not-allowed;
          color: #fff;
        }
      }
      .payId {
        float: left;
        line-height: 30px;
      }
    }
    .collapse {
      padding-top: 10px;
      border-top: 1px solid $borderColor_ccc;
      text-align: left;
      margin-top: 10px;
      margin-bottom: 10px;
      cursor: pointer;
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
    .passwordContent .el-input__inner {
      padding-right: 56px;
    }
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
      .el-table__body {
        .pr15 {
          padding-right: 15px !important;
        }
      }
    }
    .el-table__header-wrapper thead .el-checkbox__label {
      color: #fff;
    }
    .el-radio__label {
      font-size: 0.14rem;
    }
    .el-radio:not(:last-of-type) {
      margin-bottom: 10px;
    }
    .content.password.setting {
      .el-radio-group {
        line-height: 55px;
      }
      .el-radio {
        line-height: 55px;
        margin-bottom: 0;
      }
      .el-radio__label {
        font-size: 0.2rem;
      }
      .el-radio__inner {
        width: 0.2rem;
        height: 0.2rem;
      }
    }
  }
  .el-dialog {
    display: inline-block;
    margin: 0 !important;
    vertical-align: middle;
    .el-dialog__body {
      padding-top: 0px;
      padding-bottom: 15px;
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
