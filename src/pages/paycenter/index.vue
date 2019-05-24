<template>
  <div class="payIndex">
    <top-handle title="支付中心在线工作平台">
      <div class="navs">
        <div class="nav" @click="payNav('payListData')">收付款信息维护</div>
        <div class="nav" @click="payNav('mergePayData')">合并支付</div>
        <div class="nav" @click="payNav('payErrorHandleData')">异常处理</div>
        <div class="nav" @click="payNav('approvalData')">送审</div>
      </div>
    </top-handle>
    <!-- 主体内容 -->
    <div class="container">
      <div class="formArea">
        <div class="selects">
          <span>支付单据</span>
          <el-select
            @change="selectType"
            collapse-tags
            v-model="type"
            placeholder="请选择"
            size="mini"
          >
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span>支付状态</span>
          <el-select
            @change="selectStatus"
            collapse-tags
            v-model="status"
            multiple
            placeholder="请选择"
            size="mini"
          >
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span>申报日期</span>
          <el-date-picker
            v-model="sbrq"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            class="large-input"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
          <span>支付日期</span>
          <el-date-picker
            v-model="zfrq"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            class="large-input"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
          <div class="btns">
            <div class="search">
              <el-input v-model="search" placeholder="申请单编号/名称"></el-input>
              <span class="btn" @click="getData">搜索</span>
            </div>
          </div>
        </div>
        <div class="tableHead">
          <table>
            <colgroup>
              <col width="5%">
              <col width="13%">
              <col width="13%">
              <col width="10%">
              <col width="13%">
              <col width="13%">
              <col width="10%">
              <col width="10%">
              <col width="13%">
            </colgroup>
            <thead>
              <tr>
                <td>
                  <el-checkbox v-model="checkAll" @change="handleCheckAll">序号</el-checkbox>
                </td>
                <td v-for="(item,index) in tableHeader" :key="index">{{item.label}}</td>
              </tr>
            </thead>
          </table>
        </div>
        <div class="tableBody">
          <table>
            <colgroup>
              <col width="5%">
              <col width="13%">
              <col width="13%">
              <col width="10%">
              <col width="13%">
              <col width="13%">
              <col width="10%">
              <col width="10%">
              <col width="13%">
            </colgroup>
            <thead>
              <tr v-for="(item,index) in tableData" :key="index">
                <td>
                  <el-checkbox v-model="item.checked" @change="handleCheckOne(item)">{{index+1}}</el-checkbox>
                </td>
                <td>
                  <div @click="payNav('payListData',item)" style="cursor:pointer">{{item.FCode}}</div>
                </td>
                <td>
                  <div>{{item.FAmountTotal}}</div>
                </td>
                <td>
                  <div>{{item.FBilltype}}</div>
                </td>
                <td>
                  <div>{{item.RefbillCode}}</div>
                </td>
                <td>
                  <div>{{item.NgInsertDt}}</div>
                </td>
                <td>
                  <div>
                    <template v-if="item.FApproval==0">待送审</template>
                    <template v-else-if="item.FApproval==1">待审批</template>
                    <template v-else-if="item.FApproval==2">未通过</template>
                    <template v-else-if="item.FApproval==9">审批通过</template>
                    <template v-else>————</template>
                  </div>
                </td>
                <td>
                  <div>
                    <template v-if="item.FState==0">待支付</template>
                    <template v-else-if="item.FState==1">支付成功</template>
                    <template v-else-if="item.FState==2">支付异常</template>
                    <template v-else>————</template>
                  </div>
                </td>
                <td>
                  <div>{{item.FDate||"————"}}</div>
                </td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div class="pages">
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="slot, jumper"
          :total="total"
        >
          <span>当前 第 {{currentPage}} 页</span>
          <span>共 {{Math.ceil(total/pageSize)}} 页</span>
          <span
            @click="currentPage!=1?changePage(1):'javascirpt:;'"
            :class="{changePage:true,unclickable:currentPage==1}"
          >首页</span>
          <span
            @click="currentPage!=1?currentPage--:'javascirpt:;'"
            :class="{changePage:true,unclickable:currentPage==1}"
          >上一页</span>
          <span
            @click="currentPage!=(Math.ceil(total/pageSize))?(currentPage++):'javascirpt:;'"
            :class="{changePage:true,unclickable:currentPage==(Math.ceil(total/pageSize))}"
          >下一页</span>
          <span
            @click="currentPage!=(total%pageSize>0?total%pageSize+1:total%pageSize)?currentPage=(Math.ceil(total/pageSize)):'javascirpt:;'"
            :class="{changePage:true,unclickable:currentPage==Math.ceil(total/pageSize)}"
          >最后一页</span>
        </el-pagination>
      </div>
    </div>
    <!-- 支付单查看 -->
    <pay-list v-if="payListData.openDialog" :data="payListData"></pay-list>
    <merge-pay v-if="mergePayData.openDialog" :data="mergePayData"></merge-pay>
    <pay-error-handle v-if="payErrorHandleData.openDialog" :data="payErrorHandleData"></pay-error-handle>
    <go-approval v-if="approvalData.openDialog" :data="approvalData"></go-approval>
  </div>
</template>

<script>
import topHandle from '../../components/topNav/topHandle.vue'
import payList from './payList.vue'
import mergePay from './mergePay.vue'
import payErrorHandle from './payErrorHandle.vue'
import goApproval from './goApproval.vue'
export default {
  name: 'pay',
  components: { topHandle, payList, mergePay, payErrorHandle, goApproval },
  data() {
    return {
      // dialog数据
      fundDetailData: { openDialog: false, data: {} },
      mergePayData: { openDialog: false, data: {} },
      payListData: {
        openDialog: false,
        data: {},
        itemType: 'error'
      },
      payErrorHandleData: {
        openDialog: false,
        data: {}
      },
      approvalData: {
        openDialog: false,
        data: {}
      },
      radio: '',
      itemType: '',
      tishi: false,
      message: '',
      // 筛选数据
      sbrq: [],
      zfrq: [],
      typeList: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '资金拨付单'
        },
        {
          value: 2,
          label: '项目支出单'
        }
      ],
      type: '',
      statusList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 0,
          label: '待支付'
        },
        {
          value: 2,
          label: '支付异常'
        },
        {
          value: 1,
          label: '支付成功'
        }
      ],
      status: '',
      // 搜索数据
      search: '',
      // 分页
      pageSize: 2,
      currentPage: 1,
      total: 0,
      // 首页表格数据
      tableHeader: [
        {
          label: '支付单编号',
          width: 200
        },
        {
          label: '支付金额'
        },
        {
          label: '单据类型'
        },
        {
          label: '申请单编号'
        },
        {
          label: '申报日期'
        },
        {
          label: '审批状态'
        },
        {
          label: '支付状态'
        },
        {
          label: '支付日期'
        }
      ],
      tableData: [],
      checkAll: false
    }
  },
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    getData() {
      console.log('12')
      debugger
      this.getAxios('/GKPaymentMstApi/GetPaymentList', {
        queryfilter: JSON.stringify({
          'NgInsertDt*date*ge*1': this.sbrq[0] || '',
          'NgInsertDt*date*le*1': this.sbrq[1] || '',
          'FDateDt*date*ge*1': this.zfrq[0] || '',
          'FDateDt*date*le*1': this.zfrq[1] || '',
          'FApproval*byte*eq*1': this.type,
          'FState*byte*eq*1': this.status,
          'FBilltype*str*eq*1': 'zjbf',
          '[or-dictionary0]*dictionary*or': {
            'RefbillCode*str*like*1': this.search,
            'FCode*str*like*1': this.search
          }
        }),
        PageIndex: this.currentPage - 1, //当前第几页，从0开始
        PageSize: this.pageSize, //每页显示行数
        uid: '521180820000001', //用户id
        orgid: '547181121000001', //组织id
        ryear: '2019'
      })
        .then(res => {
          console.log(res)
          if (res.Status == 'error') {
            return
          }
          this.total = res.totalRows
          this.tableData = res.Record.map(item => {
            item.checked = false
            return item
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 主体全选事件
    handleCheckAll(val) {
      this.tableData.forEach(item => {
        item.checked = val
      })
    },
    handleCheckOne(item) {
      if (!item.checked) {
        this.checkAll = false
      } else {
        this.checkAll = this.tableData.every(item => item.checked)
      }
    },
    // 导航栏事件
    payNav(type, item) {
      this.noDataRefresh()
      if (item) {
        console.log(item)
        if (item.FApproval == 0 || item.FApproval == 2) {
          this.payListData.itemType = 'notApprove'
        } else if (item.FState == 2) {
          this.payListData.itemType = 'error'
        } else if (item.FState == 0 && item.FApproval == 9) {
          this.payListData.itemType = 'pay'
        } else if (item.FState == 1) {
          this.payListData.itemType = 'success'
        } else {
          this.payListData.itemType = ''
        }
      } else {
        var handleitem = []
        let checkedCount = this.tableData.reduce((prev, cur) => {
          if (cur.checked) handleitem.push(cur)
          return prev + cur.checked
        }, 0)
        if (handleitem.length < 1) {
          this.$msgBox.showMsgBox({
            content: '请至少选择一条数据进行操作。'
          })
          return
        }
        switch (type) {
          case 'payListData':
            if (checkedCount != 1) {
              this.$msgBox.showMsgBox('请选择一条数据进行维护。')
              return
            } else if (
              handleitem[0].FApproval == 0 ||
              handleitem[0].FApproval == 2
            ) {
              this.payListData.itemType = 'notApprove'
            } else {
              this.$msgBox.showMsgBox(`单据已经${handleitem[0].FApproval}。`)
              return
            }
            break
          case 'mergePayData':
            if (
              !handleitem.every(item => {
                return item.FApproval == 9 && item.FState == 0
              })
            ) {
              this.$msgBox.showMsgBox(
                '只有审批状态为“审批通过”，支付状态为“待支付”的单据，才可以使用【合并支付】。'
              )
              return
            }
            break
          case 'payErrorHandleData':
            if (
              !handleitem.every(item => {
                return item.FState == '支付异常'
              })
            ) {
              this.$msgBox.showMsgBox('只能对支付异常的单据进行处理。')
              return
            }
            break
          case 'approvalData':
            if (
              !handleitem.every(item => {
                return item.FApproval == 0
              })
            ) {
              console.log(123)
              this.$msgBox.showMsgBox('只能对待送审的单据进行处理。')
              return
            }
            break
        }
      }
      this[type].openDialog = true
    },
    // tableData无数据处理
    noDataRefresh() {
      if (this.tableData.length === 0) {
        this.notClosedAll = false
        this.showMask = true
        this.message = '暂无数据可以操作。'
        this.tishi = true
        return
      }
    },
    // 筛选
    selectType(cur) {
      console.log(cur, this.type)
    },
    selectStatus(cur) {
      console.log(cur, this.type)
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    changePage(page) {
      console.log(page)
      this.currentPage = page
    }
  },
  watch: {
    currentPage() {
      console.log(123)
      this.getData()
    }
  }
}
</script>
<style lang="scss" scoped>
.payIndex {
  color: #333;
  font-size: 0.16rem;
  .navs {
    padding-top: 7px;
    height: 60px;
    > .nav {
      display: inline-block;
      font-size: 0.12rem;
      color: #676767;
      cursor: pointer;
      &:not(:last-child) {
        margin-right: 60px;
      }
      &::before {
        content: '';
        display: block;
        width: 100%;
        height: 27px;
        background-image: url(../../assets/images/zj6.png);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center 0;
      }
      img {
        width: 100%;
      }
    }
  }
  .tableBody table {
    border-collapse: separate;
    border-spacing: 0 10px;
    padding: 0 15px;
  }
  .tableHead table {
    border-collapse: separate;
    border-spacing: 0;
    padding: 0 15px;
  }
  .container {
    .selects {
      text-align: left;
      line-height: 30px;
      height: 30px;
      margin: 8px;
      box-sizing: border-box;
      font-size: 0.12rem;
      color: #757575;
      > span:not(:first-of-type) {
        margin-left: 20px;
      }
      > span + div {
        width: 150px;
        margin-left: 10px;
        &.large-input {
          width: 210px;
        }
      }
      .btns {
        float: right;
        .search > span.btn {
          float: right;
          margin-left: -5px;
          position: relative;
          z-index: 2;
          height: 30px;
          cursor: pointer;
          border-radius: 0;
          background-color: $btnColor;
        }
      }
    }
    .pages {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2000;
  }
  .dialogContainer {
    &.lowIndex {
      z-index: 1999;
    }
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
  .selects {
    .el-input--mini .el-input__inner {
      height: 30px;
      line-height: 30px;
    }
    .search .el-input {
      width: auto;
      font-size: 0.12rem;
    }
    .search .el-input__inner {
      font-size: 0.12rem;
      border: 1px #bbb9b9 solid;
      border-bottom-left-radius: 20px;
      border-top-left-radius: 20px;
      height: 30px;
      line-height: 30px;
      color: #333;
    }
    .el-range-editor--mini.el-input__inner {
      height: 30px;
      line-height: 30px;
    }
    .el-input--mini,
    .el-select-dropdown__item,
    .el-range-editor--mini .el-range-separator,
    .el-range-editor--mini .el-range-input {
      font-size: 0.12rem;
      color: #757575;
    }
  }
  .el-pagination {
    color: #333;
    font-weight: normal;
    font-size: 0.14rem;
  }
  .el-pagination button,
  .el-pagination span:not([class*='suffix']) {
    font-size: 0.14rem;
  }
  .pages slot > span.changePage {
    text-decoration: underline;
    cursor: pointer;
    &.unclickable {
      cursor: not-allowed;
      color: #c0c4cc;
    }
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
