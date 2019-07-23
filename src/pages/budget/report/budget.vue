<template>
    <!--年初收支预算表-->
  <div class="contentPanel">
    <div class="topNav">
        <div><span>预算说明书</span></div>
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
            <td>100</td>
            <td>100</td>
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
  import {tableScroll} from '@/api/upload'
    export default {
        name: "budget",
      data(){
          return {
            pageSearch:{
              pageIndex:1,
              pageSize:20,
              total:100
            }
          }
      },
      mounted(){
          //document.getElementById('scrollTable')
        //document.getElementById('scrollTable').addEventListener('scroll', tableScroll('scrollTable',this), true);  // 监听（绑定）滚轮滚动事件
      },
      destroyed(){
        //document.getElementById('scrollTable').removeEventListener('scroll', tableScroll('scrollTable',this), true);  // 监听（绑定）滚轮滚动事件
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
    padding-bottom:80px;
    .topNav{
      height: 38px;
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

</style>
