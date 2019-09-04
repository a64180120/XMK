<template>
  <div>
    <el-dialog append-to-body
               modal-append-to-body
               :visible.sync="sumdialog"
               width="80%"
               @close="closeSum"
               :close-on-click-modal="false">
      <div style="text-align: right;width: 100%;height: 30px;">
        <el-button class="btn" style="float: right" @click="printTable">打印</el-button>
      </div>
      <table ref="printArea">
        <caption>
          <p style="font-size: .35rem">广东省总工会预立项项目汇总表</p>
          <ul>
            <li>申报部门：{{data[0] && data[0].FDeclarationDept_EXName}}</li>
            <li>制表日期：{{(new Date()).getFullYear()+'-'+((new Date()).getMonth()<10?'0'+((new Date()).getMonth()+1):(new Date()).getMonth())+'-'+((new Date()).getDate()<10?'0'+((new Date()).getDate()):(new Date()).getDate())}}</li>
            <li>单位：元</li>
          </ul>
        </caption>
        <colgroup>
          <col width="6%">
          <col width="6%">
          <col width="6%">
          <col width="6%">
          <col width="6%">
          <col width="6%">
          <col width="6%">
          <col width="6%">
          <col width="6%">
          <col width="6%">
          <col width="6%">
          <col width="6%">
          <col width="6%">
          <col width="6%">
          <col width="6%">
        </colgroup>
        <thead>
        <th>序号</th>
        <th>项目编码</th>
        <th>项目名称</th>
        <th>支出类别</th>
        <th>存续期限</th>
        <th>项目属性</th>
        <th>单据状态</th>
        <th>绩效评价</th>
        <th>项目金额</th>
        <th>开始日期</th>
        <th>结束日期</th>
        <th>申报日期</th>
        <th>申报人</th>
        <th>审批人</th>
        <th>审批日期</th>
        </thead>
        <tbody>
        <template v-for="(item,idx) in data">
          <tr>
            <td>{{idx+1}}</td>
            <td>{{item.FProjCode}}</td>
            <td>{{item.FProjName}}</td>
            <td>{{item.FExpenseCategory_EXName}}</td>
            <td>{{item.FDuration_EXName}}</td>
            <td>{{item.FProjAttr_EXName}}</td>
            <td>
              <span v-if="item.FApproveStatus ==1">待上报</span>
              <span v-if="item.FApproveStatus ==2">审批中</span>
              <span v-if="item.FApproveStatus ==3">审批通过</span>
              <span v-if="item.FApproveStatus ==4">已退回</span>
              <span v-if="item.FApproveStatus ==5">暂存</span>
            </td>
            <td>
              <span v-if="item.FIfPerformanceAppraisal ==1">是</span>
              <span v-if="item.FIfPerformanceAppraisal ==2">否</span>
            </td>
            <td>{{item.FProjAmount |NumFormat}}</td>
            <td>{{item.FStartDate && item.FStartDate.replace('T00:00:00','')}}</td>
            <td>{{item.FEndDate && item.FEndDate.replace('T00:00:00','')}}</td>
            <td>{{ item.FDateofDeclaration &&item.FDateofDeclaration.replace('T','')}}</td>
            <td>{{item.FDeclarer}}</td>
            <td>{{item.FApprover_EXName}}</td>
            <td>{{item.FApproveDate &&item.FApproveDate.replace('T','')}}</td>
          </tr>
        </template>
        <tr>
          <td colspan="8">项目金额合计</td>
          <td colspan="7">{{totalAmount |NumFormat}}</td>
        </tr>
        </tbody>
      </table>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "sumTabPrint",
    props:{

      data:{
        type: Array,
        default: function () {
          return [{}]
        }
      },
      totalAmount:{
        type:Number,
        default:0
      }
    },
    data (){
      return{
        sumdialog:false
      }
    },
    methods:{
      printTable: function() {
        this.$print(this.$refs.printArea)
      },
      closeSum(){
        this.sumdialog = false
      }
    }
  }
</script>

<style scoped>
  @page {
    size: A4 landscape;
    margin: 10px;
  }
  @media print {
    table{
      margin: 0 20px;
    }
  }
  table td,th{
    border: 1px solid #ccc;
    height: 38px;
    padding: 0 10px;
  }
  ul li{
    display: inline-block;
    width: 32%;
    text-align: left;
  }
  ul li:nth-of-type(2){
    text-align: center;
  }
  ul li:nth-of-type(3){
    text-align: right;
  }
</style>
