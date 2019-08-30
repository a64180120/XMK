<template>
  <div>
    <el-button class="btn" @click="printTable">打印</el-button>
    <table ref="printArea">
      <caption>
        <p style="font-size: .35rem">广东省总工会预立项项目汇总表</p>
        <ul>
          <li>申报部门：</li>
          <li>制表日期：</li>
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
        <template v-for="n in 3">
          <tr>
            <td>{{n}}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </template>
        <tr>
          <td colspan="8">项目金额合计</td>
          <td colspan="7"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    export default {
        name: "table_hz",
      data (){
        return{

        }
      },
      methods:{
        printTable: function() {
          this.$print(this.$refs.printArea)
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
