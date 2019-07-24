<template>
  <!--年初收支预算表-->
  <div class="contentPanel">
    <div class="topNav">
      <div>
        <ul>
          <li>
            <span>单位：</span>
            <el-select size="mini" v-model="searchData.moneyType">
              <el-option v-for="item in moneyTypeList" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </li>
          <li>
            <span>支出类别：</span>
            <el-select size="mini" v-model="searchData.payType">
              <el-option v-for="item in payTypeList" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </li>
          <li>
            <span>审批状态：</span>
            <el-select size="mini" v-model="searchData.approval">
              <el-option v-for="item in approvalList" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <search-input
              @btnClick="search()"
              placeholder="项目编码/名称"
              v-model="searchData.value"
            ></search-input>
          </li>
          <li>
            <el-popover palcement="bottom" width="500" trigger="click" v-model="popvisiable">
              <div class="seniorSearch">
                <div>
                  <span>高级查询</span>
                  <span class="el-icon-close" @click="popvisiable=false"></span>
                </div>
                <table>
                  <colgroup>
                    <col width="15%">
                    <col width="15%">
                    <col width="5%">
                    <col width="15%">
                    <col width="15%">
                    <col width="35%">
                  </colgroup>
                  <tr>
                    <td>项目编码</td>
                    <td colspan="5"><el-input size="mini" placeholder="请输入项目编码"></el-input></td>
                  </tr>
                  <tr>
                    <td>项目名称</td>
                    <td colspan="5"><el-input size="mini" placeholder="请输入项目名称"></el-input></td>
                  </tr>
                  <tr>
                    <td>申报部门</td>
                    <td colspan="3"><el-input size="mini" placeholder="请输入项目编码"></el-input></td>
                    <td>项目属性</td>
                    <td><el-input size="mini" placeholder="请输入项目编码"></el-input></td>
                  </tr>
                  <tr>
                    <td>项目金额</td>
                    <td><el-input size="mini"></el-input></td>
                    <td>至</td>
                    <td><el-input size="mini"></el-input></td>
                    <td>续存期限</td>
                    <td><el-input size="mini" placeholder="请输入项目编码"></el-input></td>
                  </tr>
                  <tr>
                    <td>支出类别</td>
                    <td colspan="3">
                      <el-select size="mini" v-model="searchData.payType">
                        <el-option v-for="item in payTypeList" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </td>
                    <td>审批状态</td>
                    <td>
                      <el-select size="mini" v-model="searchData.approval">
                        <el-option v-for="item in approvalList" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </td>
                  </tr>
                  <tr>
                    <td>项目级别</td>
                    <td colspan="3"><el-input size="mini" placeholder="请输入项目编码"></el-input></td>
                    <td>绩效评价</td>
                    <td><el-input size="mini" placeholder="请输入项目编码"></el-input></td>
                  </tr>
                  <tr>
                    <td>起止日期</td>
                    <td colspan="3"><el-input size="mini" placeholder="请输入项目编码"></el-input></td>
                    <td>申报日期</td>
                    <td><el-input size="mini" placeholder="请输入项目编码"></el-input></td>
                  </tr>
                </table>
                <div>
                  <span><el-checkbox label="记忆搜索"></el-checkbox></span>
                  <ul>
                    <li>
                      <el-button class="btn" size="mini">清空</el-button>
                    </li>
                    <li>
                      <el-button class="btn" size="mini">搜索</el-button>
                    </li>
                  </ul>
                </div>
              </div>

              <el-button class="btn" size="mini" slot="reference">高级</el-button>
            </el-popover>
          </li>
          <li><el-button class="btn" size="mini" @click="">导出</el-button></li>
          <li><el-button class="btn" size="mini" @click="">打印</el-button></li>
          <li><el-button class="btn" size="mini" @click=""><i class="el-icon-refresh"></i></el-button></li>
        </ul>
      </div>
    </div>
    <div class="tbArea" @scroll="tablescroll" id="scrollTable">
      <table >
        <thead>
        <th>科目编码</th>
        <th>科目名称</th>
        <th>上年决算数（元）</th>
        <th>本年预算数（元）</th>
        <th>说明</th>
        </thead>
        <tbody>
        <tr v-for="item in 100">
          <td>401</td>
          <td>会费收入</td>
          <td class="right">100</td>
          <td class="right">100</td>
          <td>asdasjdlkajlj</td>
        </tr>
        <tr>
          <td colspan="2">本年合计收入</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colspan="2">本年合计支出</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="pageArea" style="transition: all .3s linear;">
      <el-pagination
        :current-page="pageSearch.pageIndex"
        :page-sizes="[20,30,50,100]"
        :page-size="pageSearch.pageSize"
        layout="total,sizes,prev,pager,next,jumper"
        :total="pageSearch.total"
        @size-change="changePagesize"
        @current-change="changePageindex"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  //表头固定监听事件
  import {tableScroll} from '@/api/upload'
  //搜索框组件
  import SearchInput from '@/components/searchInput/searchInput'
  export default {
    name: "proexpend",
    data(){
      return {
        //分页页码
        pageSearch:{
          pageIndex:1,
          pageSize:20,
          total:100
        },
        searchData:{
          moneyType:0,//单位
          payType:0,//支出类别
          approval:0,//审批状态
          value:''//搜索框
        },
        //金额单位列表
        moneyTypeList:[{label:'元',value:0},{label:'万元',value:1}],
        //支出类别
        payTypeList:[{label:'全部',value:0},{label:'主业类',value:1},{label:'企事业类',value:2},{label:'机关行政类',value:3}],
        //审批状态
        approvalList:[{label:'全部',value:0},{label:'待上报',value:1},{label:'审批中',value:2},{label:'暂存',value:3}],
        //高级弹窗
        popvisiable:false
      }
    },
    components:{SearchInput},
    mounted(){

    },
    methods:{
      //表格滚动事件，表头悬浮
      tablescroll:function(){
        let vm=this;
        tableScroll('scrollTable',vm)
      },
      //修改页面条数
      changePagesize:function(val){
        console.log('pagesize更改'+val)
      },
      //修改页数
      changePageindex(val){
        console.log('pageindex更改'+val)
      },
      //搜索框事件
      search() {
        this.pageSearch.pageSize = 20
        this.pageSearch.pageIndex = 1
        this.loadData()
      },
      //数据获取
      loadData: function(){
        console.log('数据获取')
      },
    }
  }
</script>

<style lang="scss" scoped>
  .contentPanel{
    height: 100%;
    padding-bottom:80px;
    .topNav{
      height: 38px;
      >div{
        display: inline-block;
        >ul{
          >li{
            display: inline-block;
          }
        }
        &:nth-of-type(1){
          float: left;
        }
        &:nth-of-type(2){
          float: right;
          li{
            width: 78px;
            text-align: center;
            color: #ff9900;
            cursor: pointer ;
            &:nth-of-type(1){
              width: auto;
            }
          }
        }
        &:after{
          content: '';
          clear: both;
        }
      }
      &:after{
        content: '';
        clear: both;
      }
    }

    .tbArea{
      position: relative;
      height: 100%;
      overflow: auto;
      >table{
        width: 100%;
        >tbody{
          >tr:nth-of-type(1){
            td{
              border-top: 0;
            }
          }
        }

        th{
          border:solid #eee;
          border-width: 0 1px;
          height: 38px;
          background-color: #d3e9f9;
          position: relative;
          z-index: 100;
        }
        td{
          border: 1px solid #eee;
          height: 38px;
        }
      }
    }
  }
.seniorSearch{
  padding: 5px;
  >div{
    &:nth-of-type(1){
      border-bottom: 2px solid #00B8EE;
      color: #00B8EE;
      font-size: .2rem;
    }
    &:nth-of-type(2){
      padding: 10px 0 0 0;
      border-top: 1px solid #ccc;
      >ul{
        display: inline-block;
        float: right;
        >li{
          display: inline-block;
          margin-left: 5px;
          &:nth-of-type(1){
            >.btn{
              background-color: #fff;
              color: #00B8EE;
            }

          }
        }
      }
    }
    >span:nth-of-type(2){
      float: right;
    }
  }

  table{
    td{
      padding: 8px 5px;
    }
  }
}
</style>
