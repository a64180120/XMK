<template>
    <!--基本支出申报-->
  <!--<div>基本支出</div>-->
  <div class="contentPanel">
    <div class="topNav">
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
      <table >
        <thead>
        <th>序号</th>
        <th>填报部门</th>
        <th>任务名称</th>
        <th>申报进度</th>
        <th>审批状态</th>
        <th>填报人</th>
        <th>申报日期</th>
        <th>审批人</th>
        <th>审批时间</th>
        </thead>
        <tbody>
        <template v-if="dataList.length==0">
          <tr><td colspan="9">未查询到数据</td></tr>
        </template>
        <template v-else>
          <tr v-for="(item,index) in dataList">
            <td>{{index+1}}</td>
            <td>{{item.FDeclarationDept_EXName}}</td>
            <td>{{item.FProjName}}</td>
            <td></td>
            <td>{{FApproveStatusList[item.FApproveStatus]}}</td>
            <td>{{item.FDeclarer}}</td>
            <td>{{item.FDateofDeclaration}}</td>
            <td>{{item.FApprover_EXName}}</td>
            <td>{{item.FApproveDate}}</td>
          </tr>
        </template>

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
  import { mapState } from 'vuex'
    export default {
        name: "basexpend",
      data(){
          return {
            dataList:[
            ],
            FApproveStatusList:{'1':'未上报','6':'调整中','7':'调整完成'},
            //分页页码
            pageSearch:{
              pageIndex:1,
              pageSize:20,
              total:100
            },
          }
      },
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
              Fkmlb:'1',//(必填，申报种类 1-基本支出0-收入预算)
              FApproveStatus:'0', //(选填，审批状态0-全部；1-待上报；2-审批中；3-审批通过；4-未通过;5-作废)、
              Year:this.year,//年度
              PageIndex:this.pageSearch.pageIndex,
              PageSize:this.pageSearch.pageSize
            }
            this.getAxios('GYS/GHSubject/GetBudgetMstLists', data)
              .then(res => {
                console.log(res)

              })
              .catch(err => {
                this.$msgBox.show('数据获取异常')
              })
          },
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
        width: auto;
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
          min-width: 150px;
          z-index: 100;
          &:nth-of-type(1){
            min-width: 70px;
          }
        }
        td{
          border: 1px solid #eee;
          height: 38px;
          text-align: left;
          white-space: pre-wrap;
          max-width: 200px;
          &:nth-of-type(1){
            text-align: center;
          }
        }
      }
    }
  }

</style>
