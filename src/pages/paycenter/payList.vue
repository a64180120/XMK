<template>
  <div class="payIndex">
    <!-- 支付单查看 -->
    <el-dialog :visible.sync="data.openDialog" width="80%" :close-on-click-modal="false">
      <fund-detail :data="fundDetailData" :inner="true"></fund-detail>
      <merge-pay :data="mergePayData" :inner="true"></merge-pay>
      <div slot="title" class="dialog-title">
        <span style="float: left">支付单查看</span>
      </div>
      <div class="payCenterDialog">
        <div class="btns">
          <span class="payId">支付单号：201904180001</span>
          <template v-if="data.itemType == 'error'">
            <span class="btn btn-large" @click="save('errorHandleData')">异常处理</span>
            <span class="btn btn-large" @click="save('new')">重新支付</span>
          </template>
          <template v-if="data.itemType == 'notApprove'">
            <span class="btn btn-large" @click="save('')">保存</span>
            <span class="btn btn-large" @click="save('approveData')">保存并送审</span>
          </template>
          <template v-if="data.itemType =='pay'">
            <span class="btn btn-large" @click="save('mergePayData')">支付</span>
          </template>
          <span class="btn btn-large">打印</span>
        </div>
        <div class="content payList">
          <h1>付款方</h1>
          <div class="payDetail">
            <h2>付款单位：浙江省总工会</h2>
            <h2>
              <span>
                付款账户：
                <el-select v-model="account" placeholder="请选择" size="mini">
                  <el-option label="账号A" value="1"></el-option>
                  <el-option label="账号B" value="2"></el-option>
                  <el-option label="XXXXX" value="3"></el-option>
                </el-select>
              </span>
              <span>
                支付方式：
                <el-select v-model="payWay" placeholder="请选择" size="mini">
                  <el-option label="网银" value="1"></el-option>
                  <el-option label="现金" value="2"></el-option>
                  <el-option label="支票" value="3"></el-option>
                </el-select>
              </span>
            </h2>
          </div>
          <h1>收款方</h1>
          <div class="getDetail">
            <div>
              批量设置转账方式
              <el-select v-model="bankType" placeholder="请选择" size="mini">
                <el-option label="同行" value="1"></el-option>
                <el-option label="跨行" value="2"></el-option>
              </el-select>
            </div>
            <el-table max-height="250px" :data="payList" border>
              <el-table-column type="index" width="80">
                <template slot="header" slot-scope="scope">
                  <el-checkbox @change="selectAll">序号</el-checkbox>
                </template>
                <template slot-scope="scope">
                  <el-checkbox
                    @change="selectOne(scope)"
                    :label="scope.$index"
                    v-model="scope.row.choosed"
                  >{{scope.$index+1}}</el-checkbox>
                </template>
              </el-table-column>
              <el-table-column
                v-for="item in payHeaders1"
                :property="item.name"
                :label="item.label"
                :width="item.width||''"
                :header-align="item.headerAlign||'center'"
              ></el-table-column>
            </el-table>
          </div>
          <div>
            <span>待送审</span>
            <span>未支付</span>
            <span @click="showFundDetail">点击查看关联申请单信息（申请编号：20191010201212）</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import fundDetail from '../payfundapproval/fundDetail'
import mergePay from './mergePay.vue'
export default {
  name: 'payList',
  components: { fundDetail, mergePay },
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
      // 支付单表单
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
          width: '200'
        },
        {
          name: 'descrilbe',
          label: '备注',
          width: ''
        },
        {
          name: 'kemu',
          label: '预算科目',
          width: '120'
        },
        {
          name: 'way',
          label: '转账方式',
          width: '120'
        },
        {
          name: 'getName',
          label: '收款方账户名称',
          width: '120'
        },
        {
          name: 'getAccount',
          label: '收款账号',
          width: '120'
        },
        {
          name: 'bankName',
          label: '开户行',
          width: '120'
        },
        {
          name: 'cardId',
          label: '银行行号',
          width: '120'
        }
      ],
      account: '',
      payWay: '',
      bankType: '',
      payList: [
        {
          choosed: false,
          depart: '杭州市总工会',
          proName: 'XXXXX',
          money: '99999',
          descrilbe: 'beizhu',
          kemu: '',
          way: '',
          getName: '',
          getAccount: '',
          bankName: '',
          cardId: ''
        },
        {
          choosed: false,
          depart: '杭州市总工会',
          proName: 'XXXXX',
          money: '99999',
          descrilbe: 'beizhu',
          kemu: '',
          way: '',
          getName: '',
          getAccount: '',
          bankName: '',
          cardId: ''
        },
        {
          choosed: false,
          depart: '杭州市总工会',
          proName: 'XXXXX',
          money: '99999',
          descrilbe: 'beizhu',
          kemu: '',
          way: '',
          getName: '',
          getAccount: '',
          bankName: '',
          cardId: ''
        },
        {
          choosed: false,
          depart: '杭州市总工会',
          proName: 'XXXXX',
          money: '99999',
          descrilbe: 'beizhu',
          kemu: '',
          way: '',
          getName: '',
          getAccount: '',
          bankName: '',
          cardId: ''
        },
        {
          choosed: false,
          depart: '杭州市总工会',
          proName: 'XXXXX',
          money: '99999',
          descrilbe: 'beizhu',
          kemu: '',
          way: '',
          getName: '',
          getAccount: '',
          bankName: '',
          cardId: ''
        }
      ],
      fundDetailData: {
        openDialog: false,
        data: {}
      },
      mergePayData: {
        openDialog: false,
        data: {}
      }
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
          this.message = '保存成功'
          this.notClosedAll = true
          this.tishi = true
        case 'approveData':
        case 'errorHandleData':
        case 'mergePayData':
          this[type].openDialog = true
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
.payIndex {
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
  .payCenterDialog {
    background-color: #fff;
    .header {
      text-align: left;
      font-size: 0.24rem;
      line-height: 0.24rem;
      height: 0.24rem;
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
      color: #535252;
      position: relative;
      i.el-icon-close {
        float: right;
        cursor: pointer;
        line-height: 0.24rem;
      }
    }
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
  .el-dialog {
    display: inline-block;
    margin: 0 !important;
    vertical-align: middle;
  }
  > .el-dialog__wrapper::after {
    display: inline-block;
    content: '';
    vertical-align: middle;
    height: 100%;
  }
}
</style>
