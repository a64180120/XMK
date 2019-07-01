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
              <el-table-column
                header-align="center"
                align="center"
                type="index"
                label="序号"
                width="50"
              ></el-table-column>
              <el-table-column header-align="center" property="FDepartmentname" label="收款方姓名"></el-table-column>
              <el-table-column
                property="FAmount"
                header-align="center"
                align="right"
                label="待付金额（元）"
                width="150"
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
                autocomplete="off"
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
            <span>口令确认</span>
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
      <usb-key style="height:1px;width:1px;"></usb-key>
    </el-dialog>
  </div>
</template>

<script>
import {
  postPayPsd,
  postSavePayPsd,
  postJudgePayPsd,
  postSubmitPayment,
  postSubmitPayments,
  getBankServiceState,
  PostPayUsbKeyIsActive
} from '@/api/paycenter'
import md5 from 'js-md5'
import usbKey from './usbKey.vue'
import { mapState } from 'vuex'
import { SearchUSB } from '@/api/paycenter'

export default {
  name: 'mergePay',
  components: {
    usbKey
  },
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
  inject: ['refreshIndexData'],
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
      gridData: [],
      needSet: false
    }
  },
  created() {
    this.data.data.forEach(item => {
      this.gridData = [...this.gridData, ...item.Dtls]
    })
  },
  mounted() {},
  methods: {
    // 提交口令设置
    setPassword() {
      if (this.confirmPassword == '' || this.newPassword == '') {
        this.$msgBox.error('支付口令不能为空！')
        return
      }
      if (this.confirmPassword.length < 6 || this.newPassword.length < 6) {
        this.$msgBox.error('支付口令为6位数字！')
        return
      }
      if (this.confirmPassword !== this.newPassword) {
        this.$msgBox.error('两次输入的支付口令不一致！')
        return
      }
      postSavePayPsd({
        OldPsd: '',
        TypeCode: this.usercode,
        TypeName: this.username,
        Orgid: this.orgid,
        Orgcode: this.orgcode,
        value: md5(this.confirmPassword),
        Isactive: this.radio
      })
        .then(res => {
          if (res.Status == 'error') {
            this.$msgBox.error(res.Msg)
            console.log(res)
            return
          }
          if (this.radio == 0) {
            this.$msgBox.show('保存成功')
            this.needSet = false
            this.showSetting = false
            this.showPassword = true
          } else {
            this.$msgBox.show('保存成功')
            this.needSet = false
            this.showSetting = false
            this.showPassword = false
            this.showMergePay = true
          }
        })
        .catch(err => {
          console.log(err)
          this.$msgBox.error('保存支付口令失败')
        })
    },
    // 检测支付密码状态
    postPayPsd() {
      postPayPsd({
        TypeCode: this.usercode,
        TypeName: this.username,
        Orgid: this.orgid,
        Orgcode: this.orgcode
      })
        .then(res => {
          if (res.Status == 'error') {
            this.$msgBox.error(res.Msg)
            console.log(res)
            return
          }
          if (res == 2) {
            this.needSet = true
          }
          if (res == 1) {
            this.postSubmitPayments()
            return
          }
          this.showMergePay = false
          this.showPassword = true
        })
        .catch(err => {
          console.log(err)
          this.$msgBox.error(err.message || '获取支付口令状态失败！')
        })
    },
    // 进入支付页面
    enterPassword() {
      // this.postPayPsd()
      // 检测加密狗状态
      PostPayUsbKeyIsActive({
        uid: this.userid,
        orgid: this.orgid
      })
        .then(res => {
          if (res.Status == 'error') {
            this.$msgBox.error(res.Msg)
            return
          }
          console.log(res)
          if (res.IsActive == true) {
            // 需要加密锁
            this.$nextTick(() => {
              var re = SearchUSB()
              if (re.Status == 'error') {
                // 加密锁读取失败
                if (re.retuCode == 1) {
                  this.$alert(
                    `加密锁驱动程序未安装！点
            <a style='cursor:pointer;' href="${window.global.UsbKeyUrl +
              'custom2/Resource/UsbKeyEnvSetup.exe'}">客户端安装程序</a>，下载,运行该程序，然后重启电脑即可。`,
                    '提示',
                    {
                      confirmButtonText: '关闭',
                      cancelBtnText: '关闭',
                      dangerouslyUseHTMLString: true,
                      type: 'warning'
                    }
                  )
                    .then(() => {})
                    .catch(() => {})
                  return
                } else if (re.retuCode == -1) {
                  this.$alert(
                    `无法下载新中大客户端控件！请在 "Internet选项"中降低安全级别，使得ActiveX控件允许被下载。点<a style='cursor:pointer;' href="${window
                      .global.UsbKeyUrl +
                      'custom2/Resource/UsbKeyEnvSetup.exe'}">客户端安装程序</a>，下载,运行该程序，然后重启电脑即可。`,
                    '提示',
                    {
                      confirmButtonText: '关闭',
                      cancelBtnText: '关闭',
                      dangerouslyUseHTMLString: true,
                      type: 'warning'
                    }
                  )
                    .then(() => {})
                    .catch(() => {})
                  return
                }
                this.$msgBox.error('加密锁读取失败：' + re.Msg)
                return
              } else {
                // 加密锁读取成功
                // alert('加密锁suc' + re.id)
                if (res.LockKeyIsValid == false) {
                  this.$msgBox.error('加密锁无法获取！')
                  return
                } else if (re.id != res.LockKey) {
                  this.$msgBox.error('请确认是否当前用户的加密锁！')
                  return
                } else {
                  // this.$msgBox.show('加密锁通过验证，将进入支付页面')
                  this.postPayPsd()
                }
              }
            })
          } else {
            // this.$msgBox.show('用户未启用加密锁，将进入支付页面')
            this.postPayPsd()
          }
        })
        .catch(err => {
          console.log(err)
          this.$msgBox.error('获取加密锁状态失败！')
        })
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
    // 进入口令设置页面
    goSetting() {
      this.showPassword = false
      this.showSetting = true
    },
    // 发起支付
    pay() {
      if (this.password == '') {
        this.$msgBox.error('支付口令不能为空！')
        return
      }
      if (this.password.length < 6) {
        this.$msgBox.error('支付口令为6位数字！')
        return
      }
      this.postJudgePayPsd()
      // 判断口令是否正确
    },
    // 请求-支付
    postSubmitPayments() {
      var vm = this
      if (vm.father) {
        // 合并支付
        // 获得银行服务状态
        getBankServiceState({})
          .then(res => {
            if (res.Status == 'error') {
              this.$msgBox.error(res.Msg)
              console.log(res)
              return
            }
            var ids = this.data.data.map(item => {
              return item.Mst.PhId
            })
            postSubmitPayments({
              infoData: ids,
              uid: this.userid,
              orgid: this.orgid,
              ryear: this.year
            })
              .then(res => {
                if (res.Status == 'error') {
                  vm.$msgBox.error(res.Msg)
                  vm.showPassword = false
                  vm.showMergePay = true
                  if (vm.father) vm.father.openDialog = false
                  vm.data.openDialog = false
                  console.log(res)
                  return
                }
                vm.refreshIndexData()
                vm.$msgBox.show({
                  content:
                    res.Msg || '支付操作成功！具体到账情况以银行处理时间为准。',
                  fn: () => {
                    vm.showPassword = false
                    vm.showMergePay = true
                    if (vm.father) vm.father.openDialog = false
                    vm.data.openDialog = false
                  }
                })
              })
              .catch(err => {
                console.log(err)
                this.$msgBox.error(err.Message || '支付失败！')
              })
          })
          .catch(err => {
            console.log(err)
            this.$msgBox.error(err.Message || '获得银行服务状态失败！')
          })
      } else {
        // 单笔支付
        // 支付方式
        var payMethodName =
          this.$parent.detail.Mst.FPaymethod.length == 15 &&
          this.$parent.FPaymethodList.length > 0
            ? this.$parent.FPaymethodList.find(
                item => item.PhId == this.$parent.detail.Mst.FPaymethod
              ).TypeName
            : ''
        if (payMethodName == '网银') {
          postSubmitPayment({
            id: this.data.data[0].Mst.PhId,
            uid: this.userid,
            orgid: this.orgid,
            ryear: this.year
          })
            .then(res => {
              if (res.Status == 'error') {
                vm.$msgBox.error(res.Msg)
                vm.showPassword = false
                vm.showMergePay = true
                if (vm.father) vm.father.openDialog = false
                vm.data.openDialog = false
                console.log(res)
                return
              }
              vm.refreshIndexData()
              vm.$msgBox.show({
                content:
                  res.Msg || '支付操作成功！具体到账情况以银行处理时间为准。',
                fn: () => {
                  vm.showPassword = false
                  vm.showMergePay = true
                  if (vm.father) vm.father.openDialog = false
                  vm.data.openDialog = false
                }
              })
            })
            .catch(err => {
              console.log(err)
              this.$msgBox.error(err.Message || '支付失败！')
            })
        } else {
          // 非网银直接更新状态为支付成功
          // 批量更新支付单支付状态
          postUpdatePaymentsState({
            uid: this.userid,
            orgid: this.orgid,
            infoData: [this.data.data[0].Mst.PhId],
            value: 1
          })
            .then(res => {
              if (res.Status == 'error') {
                this.$msgBox.error(res.Msg)
                return
              }
              this.refreshIndexData()
              vm.showPassword = false
              vm.showMergePay = true
              vm.father.openDialog = false
              vm.data.openDialog = false
              this.$msgBox.show({
                content: '支付成功'
              })
            })
            .catch(err => {
              this.$msgBox.error('支付失败！')
              console.log(err)
            })
        }
      }
    },
    // 请求-判断口令正确-正确直接发起支付
    postJudgePayPsd() {
      postJudgePayPsd({
        TypeCode: this.usercode,
        Value: md5(this.password)
      })
        .then(res => {
          if (res.Status == 'error') {
            this.$msgBox.error(res.Msg)
            return
          }
          if (!res) {
            this.$msgBox.error('支付口令错误，请重新输入！')
            this.password = ''
            return
          }
          // 发起支付请求
          this.postSubmitPayments()
        })
        .catch(err => {
          this.$msgBox.error('口令验证失败！')
          console.log('judge', err)
        })
    },
    clearNoNum(event) {
      var obj = event.target
      obj.value = obj.value.replace(/[^\d]/g, '') //清除“数字”以外的字符
    }
  },
  computed: {
    title() {
      return this.showMergePay
        ? this.father
          ? '支付确认'
          : '合并支付'
        : this.showPassword
        ? '请输入支付口令'
        : this.showSetting
        ? '请设置支付口令'
        : ''
    },
    money() {
      return this.data.data.reduce((prev, item) => {
        return prev + item.Mst.FAmountTotal
      }, 0)
    },
    ...mapState({
      userid: state => state.user.userid,
      orgid: state => state.user.orgid,
      username: state => state.user.username,
      orgcode: state => state.user.orgcode,
      usercode: state => state.user.usercode,
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
  .el-table col.gutter {
    display: table-cell !important;
  }
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
    input::-ms-clear {
      display: none;
    } /*删除文本框中的叉号*/
    input::-ms-reveal {
      display: none;
    } /*删除密码框中的小眼睛*/
  }
}
</style>
