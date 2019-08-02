<template>
    <!--年初收支预算表-->
  <div class="contentPanel">
    <div class="topNav">
      <div @click="book.visiable=true"><span>预算说明书</span></div>
      <!--<div>
        <ul v-if="!edit">
          <li><el-button class="btn" size="mini" @click="edit=true">编辑</el-button></li>
          <li><el-button class="btn" size="mini" @click="">上报预算</el-button></li>
          <li><el-button class="btn" size="mini" @click="">导出</el-button></li>
          <li><el-button class="btn" size="mini" @click="">打印</el-button></li>
          <li><el-button class="btn" size="mini" @click=""><i class="el-icon-refresh"></i></el-button></li>
        </ul>
        <ul v-else>
          <li><el-button class="btn" size="mini" @click="">保存</el-button></li>
          <li><el-button class="btn" size="mini" @click="">保存并上报</el-button></li>
          <li><el-button class="btn" size="mini" @click="edit=false">取消</el-button></li>
        </ul>
      </div>-->
    </div>
    <div class="tbArea" @scroll="tablescroll" ref="scrollTable">
      <table>
        <thead>
          <th>科目编码</th>
          <th>科目名称</th>
          <th>上年决算数（元）</th>
          <th>本年预算数（元）</th>
          <th>说明</th>
        </thead>
        <tbody>
          <template v-for="(item,index) in dataList">
            <tr>
              <td class="left" style="text-indent: 20px">{{item.code}}</td>
              <td>{{item.title}}</td>
              <td class="right">
                <input :value="item.lastBudget | NumFormat" @focus="clearZero" @keydown="clearNoNum" @blur="countMoney(index,pindex)">
              </td>
              <td class="right">
                <input :value="item.nowBudget | NumFormat" @focus="clearZero" @keydown="clearNoNum" @blur="countMoney(index,pindex)">
              </td>
              <td>{{item.descript}}</td>
            </tr>
            <template v-for="(child,cindex) in item.children">
              <tr >
                <td class="left" style="text-indent: 40px">{{child.code}}</td>
                <td>{{child.title}}</td>
                <td class="right">
                  {{child.lastBudget | NumFormat}}</td>
                <td class="right">{{child.nowBudget | NumFormat}}</td>
                <td>{{child.descript}}</td>
              </tr>
            </template>
          </template>

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
          <tr>
            <td colspan="2">本年结余</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>加:上年结余</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>加：本年收回投资</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>减：本年投资</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>减：本年提取后备金</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>期末滚存结余</td>
            <td></td>
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
  import { mapState } from 'vuex'
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
            },
            //表格数据
            dataList:[
              {code:'401',title:'会费收入',lastBudget:'0',nowBudget:'0',descript:'',type:'0',children:[]},
              {code:'402',title:'拨缴经费收入',lastBudget:'0',nowBudget:'0',descript:'',type:'0',children:[]},
              {code:'403',title:'上级补助收入',lastBudget:'0',nowBudget:'0',descript:'',type:'0',children:[
                  {code:'40301',title:'回拨补助',lastBudget:'0',nowBudget:'0',descript:'',type:'0',children:[]},
                  {code:'40302',title:'专项补助',lastBudget:'0',nowBudget:'0',descript:'',type:'0',children:[]},
                  {code:'40303',title:'超收补助',lastBudget:'0',nowBudget:'0',descript:'',type:'0',children:[]}
                ]},
              {code:'501',title:'职工活动支出',lastBudget:'0',nowBudget:'0',descript:'',type:'1',children:[]},
              {code:'502',title:'维权支出',lastBudget:'0',nowBudget:'0',descript:'',type:'1',children:[]},
              {code:'503',title:'业务支出',lastBudget:'0',nowBudget:'0',descript:'',type:'1',children:[
                  {code:'50301',title:'培训费',lastBudget:'0',nowBudget:'0',descript:'',type:'1',children:[]},
                  {code:'50302',title:'会议费',lastBudget:'0',nowBudget:'0',descript:'',type:'1',children:[]},
                  {code:'50303',title:'外事费',lastBudget:'0',nowBudget:'0',descript:'',type:'1',children:[]}
                ]}
            ],
            //启用编辑
            edit:false
          }
      },
      components:{budgetBook},
      computed: {
        ...mapState({
          orgid: state => state.user.orgid, //id
          orgcode: state => state.user.orgcode, //编码
          orgname: state => state.user.orgname, //名称
          year: state => state.user.year, //年份
          userid: state => state.user.userid,
          usercode: state => state.user.usercode,
          menu: state => state.user.menubutton //权限按钮
        })
      },
      mounted(){
        this.getData();
      },
      methods:{
          /*报表数据获取*/
          getData:function(){
            let data={
              UserId:this.userid,
              Fkmlb:'0',//(必填，申报种类 1-基本支出0-收入预算)
              FApproveStatus:'0', //(选填，审批状态0-全部；1-待上报；2-审批中；3-审批通过；4-未通过;5-作废)、
              Year:this.year,//年度
              PageIndex:this.pageSearch.pageIndex,
              PageSize:this.pageSearch.pageSize
          }
            this.getAxios('GYS/BudgetMstApi/GetBudgetMstLists', data)
              .then(res => {
                console.log(res)
                res.Record
              })
              .catch(err => {
                this.$msgBox.show('数据获取异常')
              })
          },
        //表头固定
        tablescroll:function(){
          let vm=this;
          tableScroll('scrollTable',vm)
        },
        changePagesize:function(val){
          console.log('pagesize更改'+val)
        },
        changePageindex(val){
          console.log('pageindex更改'+val)
        },
        /*上报预算*/
        reportBudget:function() {
          this.$confirm('上报预算后无法进行编辑，是否上报预算？', '提示', {
            confirmButtonText: '确定',
            cancelBtnText: '取消',
            type: 'warning'
          }).then(() => {
            this.reportBudgetPost();
          }).catch(() => { })
        },
      //  上报请求接口
        reportBudgetPost:function(){
          console.log('这里添加上报预算接口')
          this.$msgBox.show({
            content: '上报成功。'
          })
        },
        /*保存
        * type: 0只保存 1保存后上报
        * */
        save:function(type){
          var timer=null,vm=this;
          /*if(type==1) {
           timer = setTimeout(() => {
              this.reportBudget()
            }, 3000);
          }*/
          this.$msgBox.show({
            content: '保存成功。',
            fn:function () {
              if(type==1){
                //clearTimeout(timer)
                vm.reportBudget();
              }

            }
          })

        },
        //打印
        printTable:function(){
         this.$print( this.$refs.scrollTable );
        },
        //导出
        exportTable:function(){

        }
      }
    }
</script>

<style lang="scss" scoped>

  @media print {
    @page{
      margin: 10px;
    }
    .tbArea {
      width: 100%;
      overflow: auto;
      padding: 30px;
      >table{
        width: 100%;
        margin-top: 10px;
        th{
          border:solid #eee;
          border-width: 0 1px;
          height: 38px;
          background-color: #d3e9f9;
          position: static;
        }
        td{
          border: 1px solid #eee;
          height: 38px;
          padding: 0 10px;
        }
      }
    }
  }
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
