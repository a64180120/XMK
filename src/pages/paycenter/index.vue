<template>
  <div class="payIndex">
    <top-handle title="支付中心在线工作平台">
      <div>123</div>
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
            <span>搜索</span>
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
                  <el-checkbox v-model="checked">序号</el-checkbox>
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
      <!-- <div class="table">
        <ul class="tableHeader">
          <li>
            <el-checkbox v-model="checkAll">全选</el-checkbox>
          </li>
          <li v-for="(item,index) in tableHeader" :key="index">{{item.label}}</li>
        </ul>
        <ul class="tableContent">
          <el-checkbox-group v-model="checkedList">
            <li v-for="(item,index) in tableData" :key="index">
              <ul class="contentList">
                <li>
                  <div>
                    <el-checkbox :label="index">{{index+1}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-checkbox>
                  </div>
                </li>
                <li>
                  <div>{{item.zfdbh}}</div>
                </li>
                <li>
                  <div>{{item.zfje}}</div>
                </li>
                <li>
                  <div>{{item.djlx}}</div>
                </li>
                <li>
                  <div>{{item.sqdbh}}</div>
                </li>
                <li>
                  <div>{{item.sbrq}}</div>
                </li>
                <li>
                  <div>{{item.spzt}}</div>
                </li>
                <li>
                  <div>{{item.zfzt}}</div>
                </li>
                <li>
                  <div>{{item.zfrq}}</div>
                </li>
              </ul>
            </li>
          </el-checkbox-group>
        </ul>
      </div>-->
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
  </div>
</template>

<script>
import topHandle from '../../components/topNav/topHandle.vue'
export default {
  name: 'pay',
  components: { topHandle },
  data() {
    return {
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
      total: 100
    }
  },
  created() {},
  mounted() {},
  methods: {
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
}

.payIndex .container .selects {
  text-align: left;
  line-height: 30px;
  height: 30px;
  margin: 10px;
  box-sizing: border-box;
  font-size: 0.14rem;
}
.payIndex .container .selects > span:not(:first-of-type) {
  margin-left: 20px;
}
.payIndex .container .selects > span + div {
  width: 150px;
}
.payIndex .container .selects .btns {
  float: right;
}
.payIndex .container .selects .btns .search > span {
  width: 40px;
  line-height: 30px;
  height: 30px;
  background: #3294e8;
  text-align: center;
  float: right;
  margin-left: -5px;
  position: relative;
  z-index: 2;
}
.payIndex .container .pages {
  position: absolute;
  bottom: 0;
  right: 0;
}
.payIndex {
}
</style>

<style lang='scss'>
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
</style>
