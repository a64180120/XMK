<template>
    <div>
      <el-button class="btn" @click="printTable">打印</el-button>
      <table ref="printArea">
        <caption>
          <p style="font-size: .35rem">广东省总工会预立项项目申报表</p>
          <p style="text-align: right">单据号：12345642154</p>
        </caption>
        <colgroup>
          <col width="20%">
          <col width="5%">
          <col width="15%">
          <col width="10%">
          <col width="10%">
          <col width="10%">
          <col width="10%">
          <col width="20%">
        </colgroup>
        <tr>
          <td>申报部门</td>
          <td colspan="2"></td>
          <td>申报日期</td>
          <td colspan="2"></td>
          <td>填表人</td>
          <td></td>
        </tr>
        <tr>
          <td>项目名称</td>
          <td colspan="5"></td>
          <td>项目编码</td>
          <td></td>
        </tr>
        <tr>
          <td>项目属性</td>
          <td colspan="7"></td>
        </tr>
        <tr>
          <td>续存期限</td>
          <td colspan="7"></td>
        </tr>
        <tr>
          <td>支出类别</td>
          <td colspan="7"></td>
        </tr>
        <tr>
          <td>项目起止时间</td>
          <td colspan="7"></td>
        </tr>
        <tr>
          <td>部门职能概述</td>
          <td colspan="7"></td>
        </tr>
        <tr>
          <td>项目申报依据（需要上传附件）</td>
          <td colspan="7"></td>
        </tr>
        <tr>
          <td>项目可行性和必要性</td>
          <td colspan="7"></td>
        </tr>

        <!--这里进行明细数据插入-->
        <tr>
          <td rowspan="3">项目预算明细</td>
          <td>序号</td>
          <td>明细项目名称</td>
          <td>预算科目</td>
          <td>金额</td>
          <td>支付方式</td>
          <td>支出渠道</td>
          <td>测试过程及其他需要说明的事项</td>
        </tr>
        <template>
          <tr>
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
          <td>合计</td>
          <td colspan="6"></td>
        </tr>

        <tr>
          <td>项目资金申请（万元）</td>
          <td colspan="7"></td>
        </tr>
        <tr>
          <td rowspan="2">项目实施进度计划</td>
          <td colspan="3">项目实施内容</td>
          <td colspan="2">开始时间</td>
          <td colspan="2">完成时间</td>
        </tr>
        <tr>
          <td colspan="3"></td>
          <td colspan="2"></td>
          <td colspan="2"></td>
        </tr>
        <tr>
          <td rowspan="2">绩效目标</td>
          <td colspan="3">年度目标</td>
          <td colspan="4">长期目标</td>
        </tr>
        <tr>
          <td colspan="3"></td>
          <td colspan="4"></td>
        </tr>
        <tr>
          <td rowspan="2">项目审核小组意见</td>
          <td>会议时间</td>
          <td colspan="3"></td>
          <td>会议纪要编号</td>
          <td colspan="2"></td>
        </tr>
        <tr>
          <td>会议决议</td>
          <td colspan="6"></td>
        </tr>
        <tr>
          <td>党组会议意见</td>
          <td colspan="4"></td>
          <td>主席办公意见</td>
          <td colspan="2"></td>
        </tr>
        <tr>
          <td>备注</td>
          <td colspan="7"></td>
        </tr>
      </table>
    </div>

</template>

<script>
    export default {
        name: "table_ms",
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
    size: A4 portrait;
    margin: 10px;
  }
  @media print {
    table{
      margin: 0 20px;
    }
  }
table td{
  border: 1px solid #ccc;
  height: 38px;
  padding: 0 10px;
}
</style>
