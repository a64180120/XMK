<template>
  <div class="payIndex">
    <top-handle title="支付中心在线工作平台">
      <div class="navs">
        <div class="nav" @click="mergePay('edit')">收付款信息维护</div>
        <div class="nav" @click="mergePay('merge')">合并支付</div>
        <div class="nav" @click="mergePay('error')">异常处理</div>
        <div class="nav" @click="mergePay('goshen')">送审</div>
      </div>
    </top-handle>
    <div class="container">
      <div class="selects">
        <span>支付单据</span>
        <el-select
          @change="selectType"
          collapse-tags
          multiple
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
        <span class="demonstration">申报日期</span>
        <el-date-picker size="mini" v-model="sbrq" type="date" placeholder="选择日期"></el-date-picker>
        <span class="demonstration">支付日期</span>
        <el-date-picker size="mini" v-model="zfrq" type="date" placeholder="选择日期"></el-date-picker>
        <div class="btns">
          <div class="search">
            <el-input v-model="search" placeholder="申请单编号/名称"></el-input>
            <span class="btn">搜索</span>
          </div>
        </div>
      </div>
      <div class="formArea">
        <div class="tableHead">
          <table>
            <colgroup>
              <col width="5%">
              <col width="15%">
              <col width="15%">
              <col width="15%">
              <col width="15%">
              <col width="10%">
              <col width="5%">
              <col width="10%">
              <col width="10%">
            </colgroup>
            <thead>
              <tr>
                <td>
                  <el-checkbox v-model="checked">序号</el-checkbox>
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
              <col width="15%">
              <col width="15%">
              <col width="15%">
              <col width="15%">
              <col width="10%">
              <col width="5%">
              <col width="10%">
              <col width="10%">
            </colgroup>
            <thead>
              <tr v-for="(item,index) in tableData" :key="index">
                <td>
                  <el-checkbox v-model="checked">{{index+1}}</el-checkbox>
                </td>
                <td>
                  <div>{{item.zfdbh}}</div>
                </td>
                <td>
                  <div>{{item.zfje}}</div>
                </td>
                <td>
                  <div>{{item.djlx}}</div>
                </td>
                <td>
                  <div>{{item.sqdbh}}</div>
                </td>
                <td>
                  <div>{{item.sbrq}}</div>
                </td>
                <td>
                  <div>{{item.spzt}}</div>
                </td>
                <td>
                  <div>{{item.zfzt}}</div>
                </td>
                <td>
                  <div>{{item.zfrq}}</div>
                </td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div class="pages">
        <el-pagination
          @size-change="handleSizeChange"
          :current-page="currentPage"
          :page-size="12"
          layout="slot, jumper"
          :total="total"
        >
          <span>当前 第 {{currentPage}} 页</span>
          <span>共 {{total%pageSize>0?total%pageSize+1:total%pageSize}} 页</span>
          <span
            @click="currentPage!=1?changePage(1):'javascirpt:;'"
            :class="{changePage:true,unclickable:currentPage==1}"
          >首页</span>
          <span
            @click="currentPage!=1?changePage(currentPage-1):'javascirpt:;'"
            :class="{changePage:true,unclickable:currentPage==1}"
          >上一页</span>
          <span
            @click="currentPage!=(total%pageSize>0?total%pageSize+1:total%pageSize)?changePage(currentPage+1):'javascirpt:;'"
            :class="{changePage:true,unclickable:currentPage==(total%pageSize>0?total%pageSize+1:total%pageSize)}"
          >下一页</span>
          <span
            @click="currentPage!=(total%pageSize>0?total%pageSize+1:total%pageSize)?changePage(total%pageSize>0?total%pageSize+1:total%pageSize):'javascirpt:;'"
            :class="{changePage:true,unclickable:currentPage==(total%pageSize>0?total%pageSize+1:total%pageSize)}"
          >最后一页</span>
        </el-pagination>
      </div>
    </div>
    <div class="mask" v-show="showMask"></div>
    <div class="dialogContainer" :class="{lowIndex:index>1}" v-show="showMergePay">
      <div class="payCenterDialog">
        <div class="header">
          合并支付
          <i @click="closeDialog" class="el-icon-close"></i>
        </div>
        <div class="content">
          <img src="@/assets/images/mergepay.png" alt>
          <span>合计支付1982,834.24元？</span>
        </div>
        <div class="btns">
          <span class="btn btn-cancel" @click="closeDialog">取消</span>
          <span class="btn" @click="enterPassword">确定</span>
        </div>
        <el-collapse>
          <el-collapse-item name="1">
            <template slot="title">
              <i class="header-icon el-icon-menu" style="margin-left:10px;"></i>点击查看详细收款信息
            </template>
            <el-table height="250px" :data="gridData" border>
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column property="date" label="收款方姓名" width="200"></el-table-column>
              <el-table-column property="name" label="待付金额" width="200"></el-table-column>
              <el-table-column property="address" label="银行卡号" width="200"></el-table-column>
              <el-table-column property="address" label="银行卡号" width="200"></el-table-column>
              <el-table-column property="address" label="银行卡号" width="200"></el-table-column>
              <el-table-column property="address" label="银行卡号" width="200"></el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="dialogContainer" :class="{lowIndex:index>1}" v-show="showPassword">
      <div class="payCenterDialog smallDialog">
        <div class="header">
          请输入支付口令
          <i @click="closeDialog" class="el-icon-close"></i>
        </div>
        <div class="content">
          <img src="@/assets/images/mergepay.png" alt>
          <el-input v-model="password" placeholder="请输入支付口令" show-password></el-input>
        </div>
        <div class="btns">
          <span class="btn btn-cancel" @click="closeDialog">取消</span>
          <span class="btn" @click="pay">支付</span>
        </div>
      </div>
    </div>
    <div class="dialogContainer" :class="{lowIndex:index>1}" v-show="showPayList">
      <div class="payCenterDialog largeDialog">
        <div class="header">
          支付单查看
          <i @click="closeDialog" class="el-icon-close"></i>
        </div>
        <div class="btns">
          <span class="payId">支付单号：201904180001</span>
          <span class="btn btn-large">保存</span>
          <span class="btn btn-large" @click="songShen">保存并送审</span>
          <span class="btn btn-large">打印</span>
        </div>
        <div class="content payList">
          <h1>付款方</h1>
          <div class="payDetail">
            <h2>付款单位：浙江省总工会</h2>
            <h2>
              <span>
                付款账户：
                <el-select
                  @change="selectType"
                  collapse-tags
                  multiple
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
              </span>
              <span>
                付款账户：
                <el-select
                  @change="selectType"
                  collapse-tags
                  multiple
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
              </span>
            </h2>
          </div>
          <h1>收款方</h1>
          <div class="getDetail">
            <div>
              批量设置转账方式
              <el-select
                @change="selectType"
                collapse-tags
                multiple
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
            </div>
            <el-checkbox-group v-model="checkList">
              <el-table height="250px" :data="gridData" border>
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column property="date" label="收款方姓名" width="200"></el-table-column>
                <el-table-column property="name" label="待付金额" width="200"></el-table-column>
                <el-table-column property="address" label="银行卡号" width="200"></el-table-column>
                <el-table-column property="address" label="银行卡号" width="200"></el-table-column>
                <el-table-column property="address" label="银行卡号" width="200"></el-table-column>
                <el-table-column property="address" label="银行卡号" width="200"></el-table-column>
              </el-table>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
    <div class="dialogContainer" :class="{lowIndex:index>2}" v-show="songShenList">
      <div class="payCenterDialog">
        <div class="header">
          送审
          <i @click="closeDialog" class="el-icon-close"></i>
        </div>
        <div class="btns">
          <span class="btn">取消</span>
          <span class="btn" @click="index = 3">确定</span>
        </div>
      </div>
    </div>
    <div class="dialogContainer" v-show="tishi">
      <div class="payCenterDialog smallDialog">
        <div class="header">
          提示
          <i @click="closeDialog" class="el-icon-close"></i>
        </div>
        <div class="btns">
          <span class="btn">取消</span>
          <span class="btn">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topHandle from '../../components/topNav/topHandle.vue'
export default {
  name: 'pay',
  components: { topHandle },
  data() {
    return {
      tishi: false,
      songShenList: false,
      showMask: false,
      paySuccess: false,
      showMergePay: false,
      showPassword: false,
      showPayList: false,
      index: 1,
      password: '',
      sbrq: '',
      zfrq: '',
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
      checked: '',
      type: null,
      statusList: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '待支付'
        },
        {
          value: 2,
          label: '支付异常'
        },
        {
          value: 3,
          label: '支付成功'
        }
      ],
      status: [],
      tableHeader: [
        {
          label: '支付单编号',
          name: 'zfdbh',
          width: 200
        },
        {
          label: '支付金额',
          name: 'zfje'
        },
        {
          label: '单据类型',
          name: 'djlx'
        },
        {
          label: '申请单编号',
          name: 'sqdbh'
        },
        {
          label: '申报日期',
          name: 'sbrq'
        },
        {
          label: '审批状态',
          name: 'spzt'
        },
        {
          label: '支付状态',
          name: 'zfzt'
        },
        {
          label: '支付日期',
          name: 'zfrq'
        }
      ],
      tableData: [
        {
          zfdbh: 1123123132,
          zfje: 123.1,
          djlx: '资金',
          sqdbh: '123123',
          sbrq: '2019-1-1',
          spzt: 'pass',
          zfzt: 'payed',
          zfrq: '2019-1-1'
        },
        {
          zfdbh: 1123123132,
          zfje: 123.1,
          djlx: '资金',
          sqdbh: '123123',
          sbrq: '2019-1-1',
          spzt: 'pass',
          zfzt: 'payed',
          zfrq: '2019-1-1'
        },
        {
          zfdbh: 1123123132,
          zfje: 123.1,
          djlx: '资金',
          sqdbh: '123123',
          sbrq: '2019-1-1',
          spzt: 'pass',
          zfzt: 'payed',
          zfrq: '2019-1-1'
        },
        {
          zfdbh: 1123123132,
          zfje: 123.1,
          djlx: '资金',
          sqdbh: '123123',
          sbrq: '2019-1-1',
          spzt: 'pass',
          zfzt: 'payed',
          zfrq: '2019-1-1'
        },
        {
          zfdbh: 1123123132,
          zfje: 123.1,
          djlx: '资金',
          sqdbh: '123123',
          sbrq: '2019-1-1',
          spzt: 'pass',
          zfzt: 'payed',
          zfrq: '2019-1-1'
        },
        {
          zfdbh: 1123123132,
          zfje: 123.1,
          djlx: '资金',
          sqdbh: '123123',
          sbrq: '2019-1-1',
          spzt: 'pass',
          zfzt: 'payed',
          zfrq: '2019-1-1'
        }
      ],
      checkAll: false,
      checkedList: [],
      search: '',
      pageSize: 12,
      currentPage: 1,
      total: 100,
      gridData: [
        {
          xuhao: 1,
          date: '浙江省总工会本级女工部',
          name: '20121254',
          address: '上海市普陀区金沙江上海市普陀18 弄'
        },
        {
          xuhao: 1,
          date: '浙江省总工会本级女工部',
          name: '20121254',
          address: '上海市普陀区金沙江上海市路 1518 弄'
        },
        {
          xuhao: 1,
          date: '浙江省总工会本级女工部',
          name: '20121254',
          address: '上海市普陀普区金路 1518 弄'
        },
        {
          xuhao: 1,
          date: '浙江省总工会本级女工部',
          name: '20121254',
          address: '上海市普陀区金沙江上金路 1518 弄'
        }
      ]
    }
  },
  created() {},
  mounted() {},
  methods: {
    songShen() {
      this.index = 2
      this.songShenList = true
    },
    pay() {
      // this.showPassword = false
      // this.paySuccess = true
      this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
        dangerouslyUseHTMLString: true
      })
    },
    mergePay(type) {
      this.showMask = true
      switch (type) {
        case 'merge':
          this.showMergePay = true
          break
        case 'edit':
          this.showPayList = true
          break
      }
    },
    closeDialog() {
      console.log('close')
      if (this.showPassword) {
        this.showPassword = false
        this.showMergePay = true
      } else {
        this.showMask = false
        this.$nextTick(() => {
          this.showMergePay = false
          this.showPayList = false
        })
      }
    },
    enterPassword() {
      this.showMergePay = false
      this.showPassword = true
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    changePage(page) {
      console.log(page)
      this.currentPage = page
    },
    selectType(cur) {
      console.log(cur, this.type)
    },
    selectStatus(cur) {
      console.log(cur, this.type)
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
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 10px;
    padding: 0 15px;
  }
  .tableHead table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background-color: #dcdfe6;
    padding: 0 15px;
  }
  .container {
    .formArea {
      margin-top: 10px;
    }
    .selects {
      text-align: left;
      line-height: 30px;
      height: 30px;
      margin: 20px;
      margin-bottom: 10px;
      box-sizing: border-box;
      font-size: 0.14rem;
      > span:not(:first-of-type) {
        margin-left: 20px;
      }
      > span + div {
        width: 150px;
      }
      .btns {
        float: right;
        .search > span.btn {
          float: right;
          margin-left: -5px;
          position: relative;
          z-index: 2;
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
  .tableBody {
    overflow-x: hidden;
    overflow-y: scroll;
    table td {
      border-left: 0;
      > div {
        height: 30px;
        line-height: 30px;
        border-left: 1px solid #ccc;
      }
    }
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
      margin: 150px auto 0;
      // position: absolute;
      // top: 50%;
      // left: 50%;
      // transform: translate(-50%, -50%);
      // border-radius: 10px;
      padding: 20px;
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
}
</style>

<style lang='scss'>
.payIndex {
  .el-checkbox,
  .el-checkbox-button__inner {
    color: #333;
  }
  .el-checkbox__label {
    font-size: 0.16rem;
  }
  .el-input--mini {
    font-size: 0.14rem;
  }
  .el-select-dropdown__item {
    font-size: 0.14rem;
  }
  .search .el-input {
    width: auto;
    font-size: 0.14rem;
  }
  .search .el-input__inner {
    font-size: 0.14rem;
    border: 1px #bbb9b9 solid;
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
    height: 30px;
    line-height: 30px;
    color: #333;
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
  .el-dialog__header {
    border-bottom: 1px solid rgb(204, 204, 204);
    margin: 0 20px;
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
  }
}
</style>
