<template>
  <div class="container">
    <div class="btnArea">

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
            <col width="10%">
            <col width="15%">
          </colgroup>
          <thead>
            <tr>
              <td>
                <el-checkbox v-model="checked">序号</el-checkbox>
              </td>
              <td>
                申请单编号
              </td>
              <td>
                申请单名称
              </td>
              <td>
                申请单金额（元）
              </td>
              <td>
                申请日期
              </td>
              <td>
                审批状态
              </td>
              <td>
                支付状态
              </td>
              <td>
                申请说明
              </td>
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
            <col width="10%">
            <col width="15%">
          </colgroup>
          <thead>
          <tr v-for="n in 35">
            <td>
              <el-checkbox v-model="checked">序号</el-checkbox>
            </td>
            <td>
              申请单编号
            </td>
            <td>
              申请单名称
            </td>
            <td>
              申请单金额（元）
            </td>
            <td>
              申请日期
            </td>
            <td>
              审批状态
            </td>
            <td>
              支付状态
            </td>
            <td>
              申请说明
            </td>
          </tr>
          </thead>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "index",
      data(){
          return{
            checked:false,//多选选择框
            dataList:{},
          }
      }
    }
</script>

<style scoped>

</style>
