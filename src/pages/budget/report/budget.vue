<template>
    <!--年初收支预算表-->
  <div class="contentPanel">
    <div class="topNav">
      <div @click="book.visiable=true"><span>预算说明书</span></div>
      <div>
        <ul>
          <li><el-button class="btn" size="mini" @click="">编辑</el-button></li>
          <li><el-button class="btn" size="mini" @click="">上报预算</el-button></li>
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

    <!--经费收支预算表弹窗-->
    <el-dialog :visible="book.visiable" title="预算说明书" width="1200px" @close="book.visiable=false">
        <budget-book></budget-book>
    </el-dialog>
  </div>
</template>

<script>
  //表头固定监听事件
  import {tableScroll} from '@/api/upload'
  //预算说明书组件
  import budgetBook from './budgetBook'
    export default {
        name: "budget",
      data(){
          return {
            //分页页码
            pageSearch:{
              pageIndex:1,
              pageSize:20,
              total:100
            },
            //预算说明书
            book:{
              visiable:false
            }
          }
      },
      components:{budgetBook},
      mounted(){

      },
      methods:{
        tablescroll:function(){
          let vm=this;
          tableScroll('scrollTable',vm)
        },
        changePagesize:function(val){
          console.log('pagesize更改'+val)
        },
        changePageindex(val){
          console.log('pageindex更改'+val)
        }
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
        &:nth-of-type(1){
          float: left;
          border-radius: 0 15px 15px 0;
          padding: 3px 15px;
          background-color: #ff9900;
          color: #fff;
          vertical-align: middle;
          font-size: .13rem;
          cursor: pointer;
        }
        &:nth-of-type(2){
          float: right;
          >ul{
            >li{
              display: inline-block;
              width: 78px;
              text-align: center;
              color: #ff9900;
              cursor: pointer ;
            }
          }
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

</style>
