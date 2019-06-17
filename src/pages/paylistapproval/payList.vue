<template>
  <div class="payList">
    <!-- 支付单查看 -->
    <el-dialog
      append-to-body
      :visible.sync="openDialog"
      width="80%"
      :close-on-click-modal="false"
      class="payCenter payList"
      :before-close="payListClose"
    >
      <div slot="title" class="dialog-title">
        <span style="float: left">支付单查看</span>
      </div>
      <el-row :gutter="10">
        <el-col :span="24">
          <span style="float:left;font-size:0.16rem;line-height:28px;">支付单号：{{detail.Mst.FCode}}</span>
          <div class="top-btn">
            <template v-if="data.itemType =='approval'">
              <span class="btn btn-large" @click="save('approval')">审批</span>
            </template>
            <span class="btn btn-large">打印</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="content" :gutter="10">
        <!--付款方信息-->
        <el-col :span="5" style="min-height:240px">
          <div class="left-card">
            <span>付款方</span>
            <div>
              <ul class="apply-info">
                <li>
                  <span>付款单位：</span>
                  <div>{{payDepart}}</div>
                </li>
                <li>
                  <span>付款账户：</span>
                  <div>{{(accountList.length && account&&account!='0')?(accountList.find(item=>{return item.PhId == account})).FBankname:''}}</div>
                </li>
                <li>
                  <span>支付方式：</span>
                  <div>{{payType}}</div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <!--收款方信息-->
        <el-col :span="19">
          <div class="detail-table">
            <div class="title">
              <span>收款方</span>
            </div>
            <div class="top"></div>
            <div class="getDetail">
              <el-table
                max-height="350px"
                ref="payListTable"
                style="margin-top:10px;"
                :data="detail.Dtls"
                border
                :span-method="tabelColspan"
              >
                <!-- 序号列 -->
                <el-table-column type="index" width="80" header-align="center" align="center">
                  <template slot="header" slot-scope="scope">
                    <template>序号</template>
                  </template>
                  <template slot-scope="scope">
                    <span>{{scope.$index+1}}</span>
                  </template>
                </el-table-column>
                <!-- 公共列 -->
                <el-table-column
                  v-for="(item,index) in payHeaders1"
                  :key="index"
                  :property="item.name"
                  :label="item.label"
                  :width="item.width||''"
                  :header-align="item.headerAlign||'center'"
                  :align="item.bodyAlign||'left'"
                  empty-text="————"
                >
                  <template slot-scope="scope">
                    <!-- 申请金额 -->
                    <div
                      v-if="scope.column.property=='FAmount'"
                      :title="scope.row[scope.column.property] | NumFormat"
                      class="table-item"
                    >{{scope.row[scope.column.property] | NumFormat}}</div>
                    <!-- 预算科目  -->
                    <div v-else-if="scope.column.property=='QtKmdm'" class="table-item nopadding">
                      <template>{{scope.row.QtKmdm}} {{scope.row.QtKmmc}}</template>
                    </div>
                    <!-- 支付方式 -->
                    <div
                      v-else-if="scope.column.property=='FSamebank'"
                      class="table-item nopadding"
                    >
                      <template>{{FSamebankList.find(item=>item.value==scope.row[scope.column.property]).label}}</template>
                    </div>
                    <!-- 收款方账户名称 -->
                    <div
                      v-else-if="scope.column.property=='FRecAcntname'&&data.itemType == 'notApprove'"
                      class="table-item"
                      @click="selectBank(scope.row)"
                    >{{scope.row[scope.column.property]}}</div>
                    <!-- 其他 -->
                    <div :title="scope.row[scope.column.property]" class="table-item" v-else>
                      <span>{{scope.row[scope.column.property]}}</span>
                    </div>
                  </template>
                </el-table-column>
                <!-- 支付异常列 -->
                <template v-if="data.itemType=='error'">
                  <el-table-column
                    v-for="(item,index) in payHeaders2"
                    :key="index+20"
                    :property="item.name"
                    :label="item.label"
                    :width="item.width||''"
                    :header-align="item.headerAlign||'center'"
                    :align="item.bodyAlign||'left'"
                  >
                    <template slot-scope="scope">
                      <div v-if="scope.column.property=='FState'" class="table-item">
                        <template>{{FStateList.find(item=>item.value==scope.row[scope.column.property]).label}}</template>
                      </div>
                      <div :title="scope.row[scope.column.property]" class="table-item" v-else>
                        <span v-if="scope.row.FState == 1">————</span>
                        <span v-else>{{scope.row[scope.column.property]||'————'}}</span>
                      </div>
                    </template>
                  </el-table-column>
                </template>
                <!-- 支付成功列 -->
                <template v-if="data.itemType=='success'">
                  <el-table-column
                    :property="payHeaders2[0].name"
                    :label="payHeaders2[0].label"
                    :width="payHeaders2[0].width||''"
                    :header-align="payHeaders2[0].headerAlign||'center'"
                    :align="payHeaders2[0].bodyAlign||'left'"
                  >
                    <template slot-scope="scope">
                      <div v-if="scope.column.property=='FState'" class="table-item">
                        <!-- <template>{{FStateList.find(item=>item.value==scope.row[scope.column.property]).label}}</template> -->
                        支付成功
                      </div>
                    </template>
                  </el-table-column>
                </template>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <div class="bottom">
          <span>
            <template v-if="data.itemType == 'notApprove'">待送审</template>
            <template v-else-if="data.itemType == ''">审批中</template>
            <template v-else-if="data.itemType == 'approval'">待审批</template>
            <template v-else>审批通过</template>
          </span>
          <span class="dj" @click="openDetailDialog()">点击查看关联申请单信息（申请编号：{{detail.Mst.RefbillCode}}）</span>
        </div>
      </el-row>
    </el-dialog>
    <!-- 关联申请单信息查看 -->
    <el-dialog
      append-to-body
      :visible.sync="fundDetailData.openDialog"
      width="80%"
      :close-on-click-modal="false"
      class="dialog detail-dialog payCenter"
    >
      <div slot="title" class="dialog-title">
        <span style="float: left;">查看申请</span>
      </div>
      <apply-bill v-if="fundDetailData.openDialog" :applyNum="applyNum" @showImg="showImg">
        <div slot="btn-group">
          <el-button class="btn" size="mini">打印</el-button>
        </div>
      </apply-bill>
    </el-dialog>
    <!--图片预览-->
    <el-dialog
      class="dialog img-dialog payCenter"
      :visible.sync="imgDialog"
      :close-on-click-modal="false"
      width="60%"
      height="600px"
    >
      <div slot="title" class="dialog-title">
        <span style="float: left">查看附件</span>
      </div>
      <div class="btn-load" style="text-align:right;">
        <el-button class="btn">下载</el-button>
      </div>
      <img-view v-if="imgDialog"></img-view>
    </el-dialog>
    <!--    <auditfollow :visible="showAuditfollow" @update:visible="closeAuditFollow"></auditfollow>-->
    <!-- 审批弹框 -->
  </div>
</template>

<script>
import applyBill from '@/components/applyBill/applybill'
import auditfollow from '@/components/auditFollow/auditfollow'
import ImgView from '@/components/imgView/imgView'
import { getPayment, getBudgetAccountsList } from '@/api/paycenter'
import { mapState } from 'vuex'
import { BankAccountList } from '@/api/bankaccount'
import { GetSysSetList } from '@/api/systemSetting/dataSafe'

export default {
  name: 'payList',
  components: {
    applyBill,
    auditfollow,
    ImgView
  },
  props: {
    data: {
      type: Object,
      default: function() {
        return {}
      }
    },
    openDialog: {
      type: Boolean,
      default: false
    },
    OrgTree: {
      type: Array,
      default: function() {
        let arr = new Array()
        return arr
      }
    }
  },
  data() {
    return {
      imgDialog: false, //图片预览弹框
      showAuditfollow: false,
      // 支付单表单
      // 未送审
      payHeaders1: [
        {
          name: 'XmProjcode',
          label: '项目编码',
          width: '200',
          bodyAlign: 'center'
        },
        {
          name: 'XmProjname',
          label: '项目名称',
          width: '200',
          bodyAlign: 'center'
        },
        {
          name: 'FDepartmentname',
          label: '收款单位/部门',
          width: '200'
        },
        {
          name: 'BudgetdtlName',
          label: '明细项目名称',
          width: '200'
        },
        {
          name: 'FAmount',
          label: '申请金额（元）',
          width: '150',
          bodyAlign: 'right'
        },
        {
          name: 'FDescribe',
          label: '备注',
          width: '300'
        },
        {
          name: 'QtKmdm',
          label: '预算科目',
          width: '200',
          bodyAlign: 'center'
        },
        {
          name: 'FSamebank',
          label: '转账方式',
          width: '200',
          bodyAlign: 'center'
        },
        {
          name: 'FRecAcntname',
          label: '收款方账户名称',
          width: '200'
        },
        {
          name: 'FRecAcnt',
          label: '收款账号',
          width: '200'
        },
        {
          name: 'FPayBankcode',
          label: '开户行',
          width: '200'
        },
        {
          name: 'FRecBankcode',
          label: '银行行号',
          width: '200'
        }
      ],
      // 支付异常的三列
      payHeaders2: [
        {
          name: 'FState',
          label: '支付状态',
          width: '150',
          bodyAlign: 'center'
        },
        {
          name: 'FResultmsg',
          label: '支付异常原因',
          width: '350',
          bodyAlign: 'center'
        },
        {
          name: 'FNewCode',
          label: '重新支付后关联支付单编号',
          width: '250',
          bodyAlign: 'center'
        }
      ],
      account: '',
      accountList: [],
      FStateList: [
        {
          label: '待支付',
          value: 0
        },
        {
          label: '支付成功',
          value: 1
        },
        {
          label: '支付异常',
          value: 2
        },
        {
          label: '支付中',
          value: 3
        }
      ],
      FPaymethodList: [
        {
          label: '现金',
          value: 1
        },
        {
          label: '网银',
          value: 2
        },
        {
          label: '支票',
          value: 3
        }
      ],
      bankType: '',
      kemuList: [],
      FSamebankList: [
        {
          label: '同行',
          value: 1
        },
        {
          label: '跨行',
          value: 0
        }
      ],
      fundDetailData: {
        openDialog: false,
        data: {}
      },
      approvalData: {
        openDialog: false,
        data: {}
      },
      appDialog: {
        title: '',
        btnGroup: {
          cancelName: '',
          onfirmName: ''
        }
      },
      allSelected: false,
      detail: {
        Mst: {
          FCode: '',
          FPaymethod: 1
        },
        Dtls: []
      },
      payDepart: '', //支付部门
      payType: '', //支付类型
      applyNum: '' //单据编号
    }
  },
  computed: {
    ...mapState({
      Orglist: state => state.user.orglist
    })
  },
  mounted() {
    this.getData()
  },
  methods: {
    //获取银行信息
    getBack(e) {
      GetSysSetList({
        DicType: 'PayMethod'
      })
        .then(res => {
          if (res) {
            for (let key in res.Record) {
              if (res.Record[key].PhId == e) {
                this.payType = res.Record[key].TypeName
              }
            }
          }
          console.log(res)
        })
        .catch(err => {
          this.$msgBox.error('拉取银行信息失败')
        })
    },
    // 获取支付单详情
    getData() {
      console.log('----------------------')
      console.log(this.Orglist)
      let that = this
      getPayment({
        id: this.data.RefbillPhid,
        // id: 401190528000001,
        uid: this.userid || 488181024000001, //用户id
        orgid: this.orgid, //组织id
        ryear: '2019' //年度
      })
        .then(res => {
          console.log('payList', res)
          if (res.Status == 'error') {
            return
          }
          Object.assign(this.detail.Mst, res.Mst)
          res.Dtls.forEach(item => (item.choosed = false))
          this.detail.Dtls = res.Dtls
          this.account = res.Dtls[0].BankPhid
          this.getAccountList({ OrgPhid: this.data.OrgId, selectStr: '' })
          this.getOrgName(res.Mst.OrgCode)
          this.getBack(res.Mst.FPaymethod)
        })
        .catch(err => {
          this.$msgBox.error('获取支付单详情失败！')
          console.log('payList', err)
        })
    },
    // 获取预算科目列表
    getBudgetAccountsList() {
      getBudgetAccountsList({})
        .then(res => {
          if (res.Status == 'error') {
            this.$msgBox.error(res.Msg)
            return
          }
          this.kemuList = res.Record
          console.log('account', res)
        })
        .catch(err => {
          this.$msgBox.error('获取预算科目列表失败！')
          console.log('account error', err)
        })
    },
    // 获取付款银行档案
    getAccountList(data) {
      BankAccountList(data)
        .then(res => {
          if (res.Status == 'error') {
            this.$msgBox.error(res.Msg)
          } else {
            // this.account = this.detail.Mst.OrgPhid
            this.accountList = res.Record
          }
        })
        .catch(err => {
          this.$msgBox.error('获取银行档案列表失败!')
        })
    },
    // 支付单 按钮事件
    save(type) {
      switch (type) {
        case 'approval':
          this.appDialog.title = '查看'
          this.appDialog.btnGroup.cancelName = '取消'
          this.appDialog.btnGroup.onfirmName = '确认'
          this.$refs.approvalDialog.changeDialog()
          break
      }
    },
    //打开图片预览
    showImg(file) {
      console.log(file)
      this.imgDialog = true
    },
    // 表格合并方法
    tabelColspan({ row, column, rowIndex, columnIndex }) {
      if (this.detail.Dtls.length == 0) return
      if (columnIndex === 1 || columnIndex === 2) {
        let count = 1
        if (rowIndex == 0) {
          while (
            rowIndex < this.detail.Dtls.length - 1 &&
            this.detail.Dtls[rowIndex][column.property] ==
              this.detail.Dtls[rowIndex + 1][column.property]
          ) {
            count++
            rowIndex++
          }
          if (count > 1) {
            return [count, 1]
          }
        } else {
          if (
            this.detail.Dtls[rowIndex][column.property] !=
            this.detail.Dtls[rowIndex - 1][column.property]
          ) {
            while (
              rowIndex < this.detail.Dtls.length - 1 &&
              this.detail.Dtls[rowIndex][column.property] ==
                this.detail.Dtls[rowIndex + 1][column.property]
            ) {
              count++
              rowIndex++
            }
            if (count > 1) {
              return [count, 1]
            }
          } else {
            return [0, 0]
          }
        }
      }
    },
    // 关闭审批流程框
    closeAuditFollow() {
      this.showAuditfollow = false
    },
    // 关闭支付单弹框
    payListClose(done) {
      this.$emit('closeDetail', false)
    },
    // dialog中的check事件
    selectOne($scope) {
      console.log($scope.row)
      if ($scope.row.choosed) {
        if (this.data.itemType == 'error') {
          var newDtls = this.detail.Dtls.filter(item => item.FState == 2)
          this.allSelected = newDtls.every(item => item.choosed)
          return
        }
        this.allSelected = this.detail.Dtls.every(item => item.choosed)
      } else {
        this.allSelected = false
      }
      this.$forceUpdate()
    },
    selectAll(choosed) {
      this.detail.Dtls.forEach(item => {
        item.choosed = choosed
      })
      this.$forceUpdate()
    },
    //通过遍历找出orgName
    getOrgName(e) {
      let arr = this.toArray(this.OrgTree)
      for (let k in arr) {
        if (e == arr[k].OCode) {
          this.payDepart = arr[k].OName
        }
      }
    },
    toArray(nodes, parentId = '') {
      if (!nodes) {
        return []
      }
      let childKey = 'children'
      let r = []
      if (nodes instanceof Array) {
        for (let item of nodes) {
          let node = []
          for (let key in item) {
            if (key != childKey) {
              node[key] = item[key]
            }
          }
          node['parent'] = parentId
          r.push(node)
          if (item[childKey]) {
            r = r.concat(this.toArray(item[childKey], item.id))
          }
        }
      } else {
      }
      return r
    },
    openDetailDialog() {
      this.fundDetailData.openDialog = true
      this.applyNum = this.detail.Mst.RefbillPhid
    }
  },
  watch: {},
  computed: {
    ...mapState({
      orgid: state => state.user.orgid,
      userid: state => state.user.userid,
      orgid: state => state.user.orgid
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
      border-bottom: 1px solid #eaeaea;
    }
  }
  .content {
    padding: 20px 0 0 0;
    height: 100%;
    margin-bottom: 45px;
  }
  .left-card {
    max-width: 100%;
    border-radius: 8px;
    position: relative;
    padding: 7%;
    padding-bottom: 0;
    > i {
      font-size: 0.2rem;
      color: #91bff8;
    }
    > span {
      padding-top: 7%;
      font-size: 0.2rem;
      color: #ffff00;
      position: absolute;
      height: 140px;
      background-color: $btnColor;
      border-radius: 8px;
      left: 0;
      top: 0;
      width: 100%;
    }
    > div {
      background-color: #ffffff;
      width: 86%;
      border-radius: 8px;
      box-shadow: 0px 2px 10px #888888;
      margin: 50px auto 0;
      overflow: auto;
      position: relative;
      z-index: 2;
      > .apply-info {
        padding: 8px;
        text-align: left;
        font-size: 0.14rem;
        line-height: 0.25rem;
        > li {
          padding-left: 0.75rem;
          overflow: hidden;
          margin-top: 5px;
          margin-bottom: 10px;
          border-bottom: 1px #cccccc9e solid;
          padding-bottom: 10px;
          > span {
            position: relative;
            float: left;
            margin-left: -0.75rem;
          }
          > div {
            float: left;
            position: relative;
            // float: none;
            // margin-top: 35px;
            // margin-left: -0.9rem;
          }
        }
      }
    }
  }

  .detail-table {
    overflow: auto;
    width: 100%;
    > .title {
      background-color: #3294e8;
      border-radius: 6px 6px 0 0;
      height: 35px;
      > span {
        font-size: 0.2rem;
        line-height: 35px;
        color: #ffffff;
      }
    }
    > .top {
      text-align: left;
      margin-top: 10px;
    }
  }
  .top-btn {
    text-align: right;
    > .btn {
      width: 80px;
      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
  .getDetail {
    background-color: #fff;
    border-radius: 10px;
    .table-item {
      padding: 0 15px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      line-height: 48px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      > span {
        display: inline-block;
        vertical-align: middle;
      }
      &.nopadding {
        padding: 0;
      }
      &:after {
        content: '';
        display: inline-block;
        vertical-align: middle;
        height: 100%;
      }
    }
  }
  &.payList .bottom {
    margin-top: 10px;
    font-size: 0.18rem;
    padding-left: 20px;
    overflow: hidden;
    text-align: left;
    span {
      cursor: pointer;
      margin-right: 20px;
      position: relative;
      padding-left: 0.3rem;
      &::before {
        content: '';
        display: inline-block;
        background-image: url('../../assets/images/yk1.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 0 center;
        width: 0.2rem;
        height: 0.2rem;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -0.1rem;
      }
      &:nth-of-type(2) {
        cursor: auto;
        &::before {
          background-image: url('../../assets/images/wzf.png');
        }
        &.success::before {
          background-image: url('../../assets/images/zfcg.png');
        }
      }
      &:last-of-type {
        float: right;
        &::before {
          background-image: url('../../assets/images/dj.png');
          margin-top: -0.09rem;
        }
      }
    }
  }
}
</style>

<style lang='scss'>
.payCenter {
  .el-dialog__body {
    font-size: 0.14rem;
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
    border-color: $borderColor_ccc;
  }
  .el-table--border,
  .el-table--group {
    border-color: $borderColor_ccc;
  }
  .getDetail {
    .el-table {
      font-size: 0.14rem;
      thead {
        color: #333;
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
      color: #333;
    }
    .el-table__body-wrapper {
      max-height: 280px !important;
    }

    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: #fff;
    }
    .el-radio__label {
      font-size: 0.14rem;
    }
    .el-radio:not(:last-of-type) {
      margin-bottom: 10px;
    }
    .table-item {
      > .el-select {
        > .el-input {
          > .el-input__inner {
            border: 0;
            background-color: transparent;
          }
        }
      }
      .el-input__inner {
        font-size: 0.14rem;
        background-color: transparent;
        border: 0;
      }
    }
  }
  .el-dialog {
    display: inline-block;
    margin: 0 !important;
    vertical-align: middle;
    &.payList {
      min-height: 60%;
    }
    .el-dialog__body {
      padding-top: 0px;
    }
  }
  &.el-dialog__wrapper::after {
    display: inline-block;
    content: '';
    vertical-align: middle;
    height: 100%;
  }
  .apply-info {
    .el-input__inner {
      line-height: 30px;
      height: 30px;
    }
    .el-input__icon {
      line-height: 30px;
    }
  }
  &.payList > .el-dialog {
    min-width: 1200px;
  }
  .detail-table .top {
    .el-input__inner {
      line-height: 35px;
      height: 35px;
    }
    .el-input__icon {
      line-height: 35px;
    }
  }
}
.payList-largeSelects.el-popper .el-select-dropdown__item {
  font-size: 0.14rem;
}
</style>
