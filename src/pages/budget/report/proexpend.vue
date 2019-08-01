<template>
  <!--年初收支预算表-->
  <div class="contentPanel">
    <!--一级栏-->
    <!--<div class="topNav">
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
          <li><el-button class="btn" size="mini" @click="tableType=tableType==0?'1':'0'">切换表格</el-button></li>
          <li><el-button class="btn" size="mini" @click=""><i class="el-icon-refresh"></i></el-button></li>
        </ul>
      </div>
    </div>-->
    <!--二级栏-->
    <div  class="secondNav">
      <div>
        <ul>
          <li>
            <span>单位：</span>
            <el-select size="mini" style="width: 100px;" v-model="searchData.moneyType">
              <el-option v-for="item in moneyTypeList" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </li>
          <li>
            <span>支出类别：</span>
            <el-select size="mini" style="width: 130px;" v-model="searchData.payType">
              <el-option v-for="item in payTypeList" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </li>
          <li>
            <span>审批状态：</span>
            <el-select size="mini" style="width: 100px;" v-model="searchData.approval">
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
          <li v-if="tableType==0">
            <el-popover palcement="bottom" width="500" trigger="click" v-model="popvisiableCol">
              <div class="seniorSearch colShow">
                <div>
                  <span>列表显示选择</span>
                  <span class="el-icon-close" @click="popvisiableCol=false"></span>
                </div>
                <table>
                  <colgroup>
                    <col width="60%">
                    <col width="40%">
                  </colgroup>
                  <tr>
                    <td>列名</td>
                    <td>是否显示</td>
                  </tr>
                  <tr v-for="item in tableContent">
                    <td>{{item.title}}</td>
                    <td><el-checkbox v-model="item.isShow"></el-checkbox></td>
                  </tr>
                </table>
                <div>
                  <span><el-checkbox label="记忆搜索"></el-checkbox></span>
                  <ul>
                    <li>
                      <el-button class="btn" size="mini">取消</el-button>
                    </li>
                    <li>
                      <el-button class="btn" size="mini">保存</el-button>
                    </li>
                  </ul>
                </div>
              </div>

              <el-button class="btn" size="mini" slot="reference">列表显示</el-button>
            </el-popover>
          </li>
          <li><el-button class="btn" size="mini" @click="tableType=tableType==0?'1':'0'">切换表格</el-button></li>
        </ul>
      </div>
    </div>

      <!--普通表格-->
      <template v-if="tableType==0">
        <div class="tbArea" @scroll="tablescroll" id="scrollTable">
          <table >
            <thead>
            <th><input type="checkbox" />序号</th>
            <th v-for="item in tableContent" v-if="item.isShow">
              <span>{{item.title}}</span>
              <span class="upOrDown">
              <i class="el-icon-arrow-up"></i>
              <i class="el-icon-arrow-down"></i>
            </span>
            </th>
            </thead>
            <tbody>
            <tr v-for="(item,index) in 100">
              <td><input type="checkbox" />{{index+1}}</td>
              <template v-for="col in tableContent">
                <td v-if="col.isShow">{{col.title}}</td>
              </template>
            </tr>
            </tbody>
          </table>
        </div>
      </template>

      <!--面板表格-->
      <template v-else>
        <div class="tbArea_panel">
          <paneltable :moneyType="searchData.moneyType"></paneltable>
        </div>
      </template>



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
  //面板表格
  import paneltable from '@/components/panelTable/paneltable'
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
        popvisiable:false,
        //列表显示弹窗
        popvisiableCol:false,
        //表格显示列 列表
        tableContent:[
          {title:'申报部门',isSort:true,isShow:true,prop:''},
          {title:'项目编码',isSort:true,isShow:true,prop:''},
          {title:'项目名称',isSort:true,isShow:true,prop:''},
          {title:'项目金额',isSort:true,isShow:true,prop:''},
          {title:'项目属性',isSort:true,isShow:false,prop:''},
          {title:'缓存期限',isSort:true,isShow:false,prop:''},
          {title:'支出类别',isSort:true,isShow:true,prop:''},
          {title:'项目级别',isSort:true,isShow:false,prop:''},
          {title:'绩效评价',isSort:true,isShow:false,prop:''},
          {title:'绩效指标类别',isSort:true,isShow:false,prop:''},
          {title:'起止日期',isSort:true,isShow:true,prop:''},
          {title:'申报人员',isSort:true,isShow:true,prop:''},
          {title:'申报日期',isSort:true,isShow:true,prop:''},
          {title:'审批状态',isSort:true,isShow:true,prop:''},
        ],
        //切换列表,0-普通列表，1-面板列表
        tableType:0,
        //列表数据
        highlightCurrentRow:false,
        rowNumber:4,
        table1:{
          tableData:[]
        },
      }
    },
    components:{SearchInput,paneltable},
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
    padding-bottom:85px;
    .topNav{
      height: 38px;
      border-bottom: 2px dotted #00b8ee;
      >div{
        display: inline-block;
        >ul{
          >li{
            display: inline-block;
          }
        }
        &:nth-of-type(1){
        /*  float: left;
        }
        &:nth-of-type(2){*/
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
    .secondNav{
      height: 38px;
      border-bottom: 2px dotted #00b8ee;
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
      margin-top: 10px;
      >table{
        width:auto;
        min-width: 100%;
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
          min-width: 150px;
        }
        td{
          border: 1px solid #eee;
          height: 38px;
        }
        .upOrDown{
          display: inline-block;
          height: 40px;
          vertical-align: middle;
          position: absolute;
          right: 8px;
          top: 7px;
          font-size: 13px;
          i{
            display: block;
            cursor: pointer;
            &:hover{
              color: #00b7ee;
            }
            &.isactive{
              color: red;
              font-size: 15px;
            }
          }
        }
      }
    }
    .tbArea_panel {
      height: 100%;
      overflow: hidden;
      padding: 0 1%;
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
    width: 100%;
    td{
      padding: 8px 5px;
    }
  }
}
  .colShow{
    table{
      margin: 10px 0;
      td{
        border: 1px solid #ccc;
      }
    };

  }
</style>
