<template>
  <div class="payList">
    <!-- 支付单查看 -->
    <el-dialog
      append-to-body
      :visible.sync="data.openDialog"
      width="80%"
      :close-on-click-modal="false"
      class="payCenter"
      :before-close="payListClose"
    >
      <div slot="title" class="dialog-title">
        <span style="float: left">支付单查看</span>
      </div>
      <div class="payCenterDialog">
        <div class="btns">
          <span class="payId">支付单号：201904180001</span>
          <template v-if="data.itemType == 'error'">
            <span class="btn btn-large" @click="save('payErrorHandleData')">异常处理</span>
            <span class="btn btn-large" @click="save('new')">重新支付</span>
          </template>
          <template v-if="data.itemType == 'notApprove'">
            <span class="btn btn-large" @click="save('')">保存</span>
            <span class="btn btn-large" style="padding:0" @click="save('approvalData')">保存并送审</span>
          </template>
          <template v-if="data.itemType =='pay'">
            <span class="btn btn-large" @click="save('mergePayData')">支付</span>
          </template>
          <template v-if="data.itemType =='approval'">
            <span class="btn btn-large" @click="save('approval')">审批</span>
          </template>
          <span class="btn btn-large">打印</span>
        </div>
        <div class="content payListContent">
          <h1>付款方</h1>
          <div class="payDetail">
            <h2>付款单位：浙江省总工会</h2>
            <h2 class="selects">
              <span>
                付款账户：
                <template v-if="data.itemType == 'notApprove'">
                  <el-select
                    popper-class="payList-largeSelects"
                    v-model="account"
                    placeholder="请选择"
                  >
                    <el-option label="账号A" value="1"></el-option>
                    <el-option label="账号B" value="2"></el-option>
                    <el-option label="XXXXX" value="3"></el-option>
                  </el-select>
                </template>
                <div class="el-select" v-else>{{account}}</div>
              </span>
              <span>
                支付方式：
                <template v-if="data.itemType == 'notApprove'">
                  <el-select popper-class="payList-largeSelects" v-model="payWay" placeholder="请选择">
                    <el-option label="网银" value="1"></el-option>
                    <el-option label="现金" value="2"></el-option>
                    <el-option label="支票" value="3"></el-option>
                  </el-select>
                </template>
                <div class="el-select" v-else>{{payWay}}</div>
              </span>
            </h2>
          </div>
          <h1>收款方</h1>
          <div class="getDetail">
            <div v-if="data.itemType == 'notApprove'">
              批量设置转账方式
              <el-select v-model="bankType" placeholder="请选择">
                <el-option label="同行" value="1"></el-option>
                <el-option label="跨行" value="2"></el-option>
              </el-select>
            </div>
            <el-table max-height="250px" style="margin-top:10px;" :data="payList" border>
              <!-- 序号列 -->
              <el-table-column type="index" width="80" header-align="center" align="center">
                <template slot="header" slot-scope="scope">
                  <el-checkbox
                    @change="selectAll"
                    v-model="allSelected"
                    v-if="data.itemType == 'notApprove'"
                  >序号</el-checkbox>
                  <template v-else>序号</template>
                </template>
                <template slot-scope="scope">
                  <el-checkbox
                    v-if="data.itemType == 'notApprove'||(data.itemType == 'error'&&scope.row.status=='支付异常')"
                    @change="selectOne(scope)"
                    :label="scope.$index"
                    v-model="scope.row.choosed"
                  >{{scope.$index+1}}</el-checkbox>
                  <template v-else>
                    <span
                      :style="data.itemType == 'error'&&scope.row.status!='支付异常'?'padding-left:25px':''"
                    >{{scope.$index+1}}</span>
                  </template>
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
                  <!-- 预算科目  -->
                  <div
                    v-if="scope.column.property=='kemu'&& data.itemType == 'notApprove'"
                    class="table-item"
                  >
                    <el-select
                      v-model="scope.row[scope.column.property+'ID']"
                      placeholder="请选择预算科目"
                    >
                      <el-option label="501 活动支出" value="501"></el-option>
                      <el-option label="501001 活动支出001" value="501001"></el-option>
                      <el-option label="501002 活动支出002" value="501002"></el-option>
                    </el-select>
                  </div>
                  <!-- 收款方账户名称 -->
                  <div
                    v-else-if="scope.column.property=='getName'&&data.itemType == 'notApprove'"
                    class="table-item"
                    @click="selectBank(scope.row)"
                  >{{scope.row[scope.column.property]}}</div>
                  <!-- 支付方式 -->
                  <div
                    v-else-if="scope.column.property=='way'&&data.itemType == 'notApprove'"
                    class="table-item"
                  >
                    <el-select
                      v-model="scope.row[scope.column.property+'ID']"
                      placeholder="请选择支付方式"
                    >
                      <el-option label="同行" value="0"></el-option>
                      <el-option label="跨行" value="1"></el-option>
                    </el-select>
                  </div>
                  <div class="table-item" v-else>{{scope.row[scope.column.property]}}</div>
                </template>
              </el-table-column>
              <!-- 支付异常列 -->
              <template v-if="data.itemType=='error'">
                <el-table-column
                  v-for="(item,index) in payHeaders2"
                  :key="index+10"
                  :property="item.name"
                  :label="item.label"
                  :width="item.width||''"
                  :header-align="item.headerAlign||'center'"
                ></el-table-column>
              </template>
              <!-- 支付成功列 -->
              <template v-if="data.itemType=='success'">
                <el-table-column
                  :property="payHeaders2[0].name"
                  :label="payHeaders2[0].label"
                  :width="payHeaders2[0].width||''"
                  :header-align="payHeaders2[0].headerAlign||'center'"
                ></el-table-column>
              </template>
            </el-table>
          </div>
          <div class="bottom">
            <span>
              <template v-if="data.itemType == 'notApprove'">待送审</template>
              <template v-else-if="data.itemType == ''">审批中</template>
              <template v-else>审批通过</template>
            </span>
            <span>
              <template v-if="data.itemType == 'error'">支付异常</template>
              <template v-else-if="data.itemType=='success'">支付成功</template>
              <template v-else>待支付</template>
            </span>
            <span @click="showFundDetail">点击查看关联申请单信息（申请编号：20191010201212）</span>
          </div>
        </div>
      </div>
      <!-- 支付单查看 -->
      <el-dialog
        append-to-body
        :visible.sync="fundDetailData.openDialog"
        width="80%"
        :close-on-click-modal="false"
      >
        <div slot="title" class="dialog-title">
          <span>查看申请</span>
        </div>
        <apply-bill v-if="fundDetailData.openDialog" :data="fundDetailData" :applyNum="1"></apply-bill>
      </el-dialog>
      <!-- 合并支付组件 -->
      <merge-pay
        v-if="mergePayData.openDialog"
        v-bind="mergePayData.openDialog"
        :data="mergePayData"
      ></merge-pay>
      <!-- 异常处理 -->
      <pay-error-handle v-if="payErrorHandleData.openDialog" :data="payErrorHandleData"></pay-error-handle>
      <!-- 送审 -->
      <go-approval v-if="approvalData.openDialog" :father="data" :data="approvalData"></go-approval>
      <!-- 银行档案 -->
      <bank-choose :data="bankChooseData"></bank-choose>
    </el-dialog>
  </div>
</template>

<script>
import applyBill from '@/components/applyBill/applybill'
import mergePay from './mergePay.vue'
import payErrorHandle from './payErrorHandle.vue'
import goApproval from './goApproval.vue'
import bankChoose from './bankChoose'

export default {
  name: 'payList',
  components: {
    applyBill,
    mergePay,
    payErrorHandle,
    goApproval,
    bankChoose
  },
  props: {
    data: {
      type: Object,
      default: {
        openDialog: false,
        data: {},
        itemType: ''
      }
    }
  },
  data() {
    return {
      kemu: '',
      way: '',
      // 支付单表单
      // 未送审
      payHeaders1: [
        {
          name: 'depart',
          label: '收款单位/部门',
          width: '200'
        },
        {
          name: 'proName',
          label: '明细项目名称',
          width: '200'
        },
        {
          name: 'money',
          label: '申请金额（元）',
          width: '150',
          bodyAlign: 'right'
        },
        {
          name: 'descrilbe',
          label: '备注',
          width: '300'
        },
        {
          name: 'kemu',
          label: '预算科目',
          width: '200'
        },
        {
          name: 'way',
          label: '转账方式',
          width: '200',
          bodyAlign: 'center'
        },
        {
          name: 'getName',
          label: '收款方账户名称',
          width: '200'
        },
        {
          name: 'getAccount',
          label: '收款账号',
          width: '200'
        },
        {
          name: 'bankName',
          label: '开户行',
          width: '200'
        },
        {
          name: 'cardId',
          label: '银行行号',
          width: '200'
        }
      ],
      // 支付异常的三列
      payHeaders2: [
        {
          name: 'status',
          label: '支付状态',
          width: '120',
          bodyAlign: 'center'
        },
        {
          name: 'reason',
          label: '支付异常原因',
          width: '350',
          bodyAlign: 'center'
        },
        {
          name: 'reID',
          label: '重新支付后关联支付单编号',
          width: '250',
          bodyAlign: 'center'
        }
      ],
      account: '账号A',
      payWay: '网银',
      bankType: '',
      payList: [
        {
          choosed: false,
          depart: '杭州市总工会',
          proName: 'XXXXX',
          money: '99999',
          descrilbe: 'beizhu',
          kemu: '501 活动支出',
          way: '同行',
          wayID: '同行',
          getName: '123',
          kemuID: '501',
          getAccount: '321',
          bankName: '123',
          cardId: '321',
          status: '支付异常',
          reason: '支付请求响应失败/对方账号不存在',
          reID: '201904180002'
        },
        {
          choosed: false,
          depart: '杭州市总工会',
          proName: 'XXXXX',
          money: '99999',
          descrilbe: 'beizhu',
          kemu: '501 活动支出',
          kemuID: '501',
          wayID: '同行',
          way: '同行',
          getName: '312312',
          getAccount: '12312',
          bankName: '3123',
          cardId: '123123'
        },
        {
          choosed: false,
          depart: '杭州市总工会',
          proName: 'XXXXX',
          money: '99999',
          descrilbe: 'beizhu',
          kemuID: '501',
          kemu: '501 活动支出',
          wayID: '同行',
          way: '同行',
          getName: '1',
          getAccount: '1',
          bankName: '1',
          cardId: '1',
          status: '支付异常',
          reason: '支付请求响应失败/对方账号不存在',
          reID: '201904180002'
        },
        {
          choosed: false,
          depart: '杭州市总工会',
          proName: 'XXXXX',
          money: '99999',
          descrilbe: 'beizhu',
          kemu: '501 活动支出',
          kemuID: '501',
          wayID: '同行',
          way: '同行',
          getName: 1,
          getAccount: '1',
          bankName: 1,
          cardId: '1'
        },
        {
          choosed: false,
          depart: '杭州市总工会',
          proName: 'XXXXX',
          money: '99999',
          descrilbe: 'beizhu',
          kemuID: '501',
          kemu: '501 活动支出',
          wayID: '同行',
          way: '同行',
          getName: '1',
          getAccount: '1',
          bankName: '1',
          cardId: '1'
        }
      ],
      fundDetailData: {
        openDialog: false,
        data: {}
      },
      mergePayData: {
        openDialog: false,
        data: {}
      },
      payErrorHandleData: {
        openDialog: false,
        data: {}
      },
      approvalData: {
        openDialog: false,
        data: {}
      },
      bankChooseData: {
        openDialog: false,
        data: {}
      },
      reSetting: false,
      allSelected: false
    }
  },
  created() {
    console.log('paylist created')
  },
  mounted() {
    console.log('paylist mounted')
  },
  methods: {
    payListClose(done) {
      if (this.reSetting) {
        this.reSetting = false
        this.data.itemType = 'error'
      } else {
        this.$forceUpdate()
        done()
      }
    },
    showFundDetail() {
      this.fundDetailData.openDialog = true
    },
    // dialog中的check事件
    selectOne($scope) {
      console.log($scope.row.choosed)
      if ($scope.row.choosed) {
        this.allSelected = this.payList.every(item => item.choosed)
      } else {
        this.allSelected = false
      }
    },
    selectAll(choosed) {
      console.log(choosed)
      this.payList.forEach(item => {
        item.choosed = choosed
      })
    },
    // 支付单详情事件
    save(type) {
      console.log(type)
      switch (type) {
        case '':
          this.$msgBox.showMsgBox({
            content: '保存成功'
          })
        case 'approvalData':
        case 'payErrorHandleData':
        case 'mergePayData':
          this[type].openDialog = true
          break
        case 'new':
          this.reSetting = true
          this.data.itemType = 'notApprove'
          break
        case 'approval':
          debugger
          this.$refs.approval.changeDialog()
          break
      }
    },
    // 选择银行
    selectBank(item) {
      console.log(item)
      this.bankChooseData.openDialog = true
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
      font-size: 0.18rem;
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
        > h1 {
          font-size: 0.18rem;
          margin-bottom: 10px;
        }
        .payDetail {
          background-color: #fff;
          border-radius: 5px;
          padding: 10px;
          margin-bottom: 10px;
          font-size: 0.18rem;
          h2 {
            line-height: 40px;
            &.selects {
              display: flex;
              > span:first-child {
                flex: 1;
                display: flex;
                line-height: 40px;
                padding-right: 50px;
                > .el-select {
                  flex: 1;
                }
              }
              > span:nth-child(2) {
                .el-select {
                  min-width: 200px;
                }
              }
            }
          }
        }
        .getDetail {
          background-color: #fff;
          border-radius: 10px;
          padding: 10px;
          .table-item {
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
            > .el-select {
              height: 100%;
            }
          }
        }
      }
      .bottom {
        margin-top: 10px;
        font-size: 0.18rem;
        padding-left: 20px;
        span {
          cursor: pointer;
          margin-right: 20px;
          &:first-of-type,
          &:nth-of-type(2) {
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
          }
          &:last-of-type {
            float: right;
          }
        }
      }
    }
    .btns {
      text-align: right;
      .btn {
        border: 1px solid $btnColor;
        cursor: pointer;
        line-height: 28px;
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
        font-size: 0.18rem;
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
    .payDetail h2 .el-input__inner {
      font-size: 0.18rem;
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
    }
  }
  .el-dialog {
    display: inline-block;
    margin: 0 !important;
    vertical-align: middle;
    .el-dialog__body {
      padding-top: 0px;
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
.payList-largeSelects.el-popper .el-select-dropdown__item {
  font-size: 0.18rem;
}
</style>
